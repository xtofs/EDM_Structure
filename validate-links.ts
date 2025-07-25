import * as fs from 'fs';
import * as path from 'path';
import { ODataEdmStructure } from './src/types';

/**
 * Link Validator - Validates that all ref links in the JSON data point to existing anchors
 * in the OData specification HTML document
 */

interface ValidationResult {
    element: string;
    attribute?: string;
    url: string;
    anchor: string;
    exists: boolean;
    error?: string;
}

class LinkValidator {
    private data: ODataEdmStructure;
    private specificationHtml: string = '';
    private baseUrl: string;

    constructor(data: ODataEdmStructure) {
        this.data = data;
        this.baseUrl = data.metadata.baseUrl || '';
        
        if (!this.baseUrl) {
            throw new Error('Base URL is required in metadata for link validation');
        }
    }

    /**
     * Fetch the OData specification HTML document
     */
    private async fetchSpecificationHtml(): Promise<void> {
        console.log(`📥 Fetching specification document from: ${this.baseUrl}`);
        
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            this.specificationHtml = await response.text();
            console.log(`✅ Successfully fetched specification document (${this.specificationHtml.length} characters)`);
        } catch (error) {
            throw new Error(`Failed to fetch specification document: ${error}`);
        }
    }

    /**
     * Check if an anchor exists in the HTML document
     */
    private checkAnchorExists(anchor: string): boolean {
        if (!this.specificationHtml) {
            throw new Error('Specification HTML not loaded');
        }

        // Remove the leading # if present
        const cleanAnchor = anchor.startsWith('#') ? anchor.substring(1) : anchor;
        
        // Check for various anchor patterns in HTML:
        // 1. <a name="anchor">
        // 2. <a id="anchor">  
        // 3. <h1 id="anchor">, <h2 id="anchor">, etc.
        // 4. <div id="anchor">
        // 5. <span id="anchor">
        const anchorPatterns = [
            new RegExp(`<a[^>]+name\\s*=\\s*["']${this.escapeRegex(cleanAnchor)}["'][^>]*>`, 'i'),
            new RegExp(`<[^>]+id\\s*=\\s*["']${this.escapeRegex(cleanAnchor)}["'][^>]*>`, 'i')
        ];

        return anchorPatterns.some(pattern => pattern.test(this.specificationHtml));
    }

    /**
     * Escape special regex characters
     */
    private escapeRegex(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Validate all links in the data structure
     */
    public async validateAllLinks(): Promise<ValidationResult[]> {
        await this.fetchSpecificationHtml();
        
        const results: ValidationResult[] = [];
        
        console.log('🔍 Validating element references...');
        
        // Validate element refs
        for (const group of this.data.elementGroups) {
            for (const element of group.elements) {
                if (element.ref) {
                    const fullUrl = this.baseUrl + element.ref;
                    const exists = this.checkAnchorExists(element.ref);
                    
                    results.push({
                        element: element.name,
                        url: fullUrl,
                        anchor: element.ref,
                        exists
                    });
                }

                // Validate attribute refs
                for (const attribute of element.attributes) {
                    if (attribute.ref) {
                        const fullUrl = this.baseUrl + attribute.ref;
                        const exists = this.checkAnchorExists(attribute.ref);
                        
                        results.push({
                            element: element.name,
                            attribute: attribute.name,
                            url: fullUrl,
                            anchor: attribute.ref,
                            exists
                        });
                    }
                }
            }
        }

        return results;
    }

    /**
     * Generate a validation report
     */
    public generateReport(results: ValidationResult[]): string {
        const validLinks = results.filter(r => r.exists);
        const invalidLinks = results.filter(r => !r.exists);
        
        let report = '# Link Validation Report\n\n';
        report += `**Generated on**: ${new Date().toLocaleString()}\n\n`;
        report += `## Summary\n\n`;
        report += `- **Total Links Checked**: ${results.length}\n`;
        report += `- **Valid Links**: ${validLinks.length}\n`;
        report += `- **Invalid Links**: ${invalidLinks.length}\n`;
        report += `- **Success Rate**: ${((validLinks.length / results.length) * 100).toFixed(1)}%\n\n`;

        if (invalidLinks.length > 0) {
            report += `## ❌ Invalid Links (${invalidLinks.length})\n\n`;
            report += `| Element | Attribute | Anchor | URL |\n`;
            report += `|---------|-----------|--------|-----|\n`;
            
            for (const result of invalidLinks) {
                const element = result.element;
                const attribute = result.attribute || '-';
                const anchor = result.anchor;
                const url = result.url;
                report += `| \`${element}\` | \`${attribute}\` | \`${anchor}\` | [Link](${url}) |\n`;
            }
            report += '\n';
        }

        if (validLinks.length > 0) {
            report += `## ✅ Valid Links (${validLinks.length})\n\n`;
            report += `All ${validLinks.length} links point to existing anchors in the specification document.\n\n`;
        }

        return report;
    }
}

/**
 * Main validation function
 */
async function validateLinks() {
    try {
        console.log('🚀 Starting link validation...\n');
        
        // Load data
        const dataPath = path.join(__dirname, 'data', 'odata-edm-structure.json');
        const data: ODataEdmStructure = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        // Create validator and run validation
        const validator = new LinkValidator(data);
        const results = await validator.validateAllLinks();
        
        // Generate and save report
        const report = validator.generateReport(results);
        const reportPath = path.join(__dirname, 'generated', 'link-validation-report.md');
        
        // Ensure generated directory exists
        const generatedDir = path.join(__dirname, 'generated');
        if (!fs.existsSync(generatedDir)) {
            fs.mkdirSync(generatedDir);
        }
        
        fs.writeFileSync(reportPath, report);
        
        // Display summary
        const validCount = results.filter(r => r.exists).length;
        const invalidCount = results.filter(r => !r.exists).length;
        
        console.log('\n📊 Validation Summary:');
        console.log(`✅ Valid links: ${validCount}`);
        console.log(`❌ Invalid links: ${invalidCount}`);
        console.log(`📄 Report saved to: ${reportPath}`);
        
        if (invalidCount > 0) {
            console.log('\n⚠️  Found invalid links. Check the report for details.');
            process.exit(1);
        } else {
            console.log('\n🎉 All links are valid!');
        }
        
    } catch (error) {
        console.error('❌ Validation failed:', error);
        process.exit(1);
    }
}

// Run validation if this script is executed directly
if (require.main === module) {
    validateLinks();
}

export { LinkValidator, ValidationResult };
