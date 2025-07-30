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
        // Helper for formatting attribute types
        Handlebars.registerHelper('formatAttributeType', (attribute: ElementAttribute) => {

            let type = '';
            const readableSubcategory = attribute.subcategory ? this.kebabToReadable(attribute.subcategory) : '';

            switch (attribute.category) {
                case 'basic':
                    // Handle basic attributes
                    if (attribute.symbols && attribute.subcategory) {
                        const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
                        type = `Basic (${readableSubcategory} or ${symbolList})`;
                    } else if (attribute.symbols && !attribute.subcategory) {
                        const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
                        type += `Basic (${symbolList})`;
                    } else {
                        type = `Basic (${readableSubcategory})`;
                    }
                    break;
                case 'path':
                    // Handle path attributes
                    type = `${readableSubcategory} path`;
                case 'reference':
                    // Handle reference attributes          
                    type = `${readableSubcategory} reference`;

                    if (attribute.targets) {
                        const targetLinks = attribute.targets
                            .map(target => `[${target}](#${target.toLowerCase()}-element)`)
                            .join(', ');
                        type += ` to ${targetLinks}`;
                    }
            }
            return new Handlebars.SafeString(type);
        });

        // Helper for formatting attribute descriptions
        Handlebars.registerHelper('formatAttributeDescription', (attribute: ElementAttribute) => {
            let description = attribute.description || "";

            if (attribute.constraints) {
                description += `<br/>*Constraints: ${attribute.constraints}*`;
            }

            if (attribute.context) {
                description += `<br/>*Context: ${attribute.context}*`;
            }

            return new Handlebars.SafeString(description);
        });

        // Helper for creating attribute links
        Handlebars.registerHelper('externalLink', this.externalLink);
        Handlebars.registerHelper('headerMark', this.headerMark);
        Handlebars.registerHelper('lower', this.lower);
        Handlebars.registerHelper('replace', this.replace);
        Handlebars.registerHelper('capitalizeFirst', this.capitalizeFirst);
    }

    // Helper for element links
    public externalLink(name: string, ref?: string, baseUrl?: string): Handlebars.SafeString {

        if (ref && baseUrl) {
            const fullUrl = baseUrl + ref;
            return new Handlebars.SafeString(`<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`);
        }
        return new Handlebars.SafeString(`\`${name}\``);
    }

    private headerMark(level: number): Handlebars.SafeString {
        return new Handlebars.SafeString('#'.repeat(level));
    }

    public lower(str: string): string {
        return str.toLowerCase();
    }

    public replace(str: string, searchValue: string, replaceValue: string): string {
        if (!str) {
            return "undefined"
        }
        return str.replace(new RegExp(searchValue, 'g'), replaceValue);
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

    private capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private kebabToReadable(text: string): string {
        return text.replace(/-/g, " ");
    }
}
