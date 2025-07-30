import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { ElementAttribute } from './types';

/**
 * Template manager for Handlebars templates
 */
export class TemplateManager {
    private templates: Map<string, HandlebarsTemplateDelegate> = new Map();
    private templatesDir: string;

    constructor(templatesDir: string = path.join(__dirname, '../templates')) {
        this.templatesDir = templatesDir;
        this.registerHelpers();
        this.registerPartials();
    }

    /**
     * Register partial templates
     */
    private registerPartials(): void {
        // Register attribute-table as a partial
        const attributeTablePath = path.join(this.templatesDir, 'attribute-table.hbs');
        if (fs.existsSync(attributeTablePath)) {
            const attributeTableSource = fs.readFileSync(attributeTablePath, 'utf-8');
            Handlebars.registerPartial('attribute-table', attributeTableSource);
        }
    }

    /**
     * Register custom Handlebars helpers
     */
    private registerHelpers(): void {
        Handlebars.registerHelper('formatAttributeType', TemplateManager.formatAttributeType);
        Handlebars.registerHelper('formatAttributeDescription', TemplateManager.formatAttributeDescription);
        Handlebars.registerHelper('externalLink', TemplateManager.externalLink);
        Handlebars.registerHelper('headerMark', TemplateManager.headerMark);
        Handlebars.registerHelper('lower', TemplateManager.lower);
        Handlebars.registerHelper('replace', TemplateManager.replace);
        Handlebars.registerHelper('capitalizeFirst', TemplateManager.capitalizeFirst);
    }

    // Helper for element links
    public static externalLink(name: string, ref?: string, baseUrl?: string): Handlebars.SafeString {

        if (ref && baseUrl) {
            const fullUrl = baseUrl + ref;
            return new Handlebars.SafeString(`<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`);
        }
        return new Handlebars.SafeString(`\`${name}\``);
    }

    private static headerMark(level: number): Handlebars.SafeString {
        return new Handlebars.SafeString('#'.repeat(level));
    }

    private static lower(str: string): string {
        return str.toLowerCase();
    }

    private static replace(str: string, searchValue: string, replaceValue: string): string {
        if (!str) {
            return "undefined"
        }
        return str.replace(new RegExp(searchValue, 'g'), replaceValue);
    }

    private static formatAttributeType(attribute: ElementAttribute): Handlebars.SafeString {
        let type = '';
        const readableSubcategory = attribute.subcategory ? TemplateManager.kebabToReadable(attribute.subcategory) : '';

        switch (attribute.category) {
            case 'basic':
                // Handle basic attributes
                const kind = 'Basic';
                if (attribute.symbols && attribute.subcategory) {
                    const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
                    type = `${kind} (${readableSubcategory} or ${symbolList})`;
                } else if (attribute.symbols && !attribute.subcategory) {
                    const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
                    type = `${kind} (${symbolList})`;
                } else {
                    type = `${kind} (${readableSubcategory})`;
                }
                break;
            case 'path':
                // Handle path attributes
                type = `Path (${readableSubcategory})`;
                break;
            case 'reference':
                // Handle reference attributes          
                type = `Reference (${readableSubcategory})`;

                if (attribute.targets && attribute.targets.length > 0) {
                    const targetLinks = attribute.targets
                        .filter(target => target !== 'PrimitiveType' && target !== 'Unknown') // Skip primitive types and unknown
                        .map(target => `[${target}](#${target.toLowerCase()}-element)`)
                        .join(', ');
                    
                    if (targetLinks) {
                        type += ` → ${targetLinks}`;
                    }
                }
                break;
        }
        return new Handlebars.SafeString(type);
    }

    private static formatAttributeDescription(attribute: ElementAttribute): Handlebars.SafeString {
        let description = attribute.description || "";

        if (attribute.constraints) {
            description += `<br/>*Constraints: ${attribute.constraints}*`;
        }

        if (attribute.context) {
            description += `<br/>*Context: ${attribute.context}*`;
        }

        return new Handlebars.SafeString(description);
    }


    /**
     * Load and compile a template
     */
    public getTemplate(templateName: string): HandlebarsTemplateDelegate {
        if (!this.templates.has(templateName)) {
            const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);

            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template not found: ${templatePath}`);
            }

            const templateSource = fs.readFileSync(templatePath, 'utf-8');
            const compiled = Handlebars.compile(templateSource);
            this.templates.set(templateName, compiled);
        }

        return this.templates.get(templateName)!;
    }

    private static capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static kebabToReadable(text: string): string {
        return text.replace(/-/g, " ");
    }
}
