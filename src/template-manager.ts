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
      let type = this.capitalizeFirst(attribute.category);

      if (attribute.subcategory) {
        const readableSubcategory = this.kebabToReadable(attribute.subcategory);
        if (attribute.symbols && attribute.symbols.length > 0) {
          const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
          type += ` (${readableSubcategory} or ${symbolList})`;
        } else {
          type += ` (${readableSubcategory})`;
        }
      } else if (attribute.symbols && attribute.symbols.length > 0) {
        const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
        type += ` (${symbolList})`;
      }

      return new Handlebars.SafeString(type);
    });

    // Helper for formatting attribute descriptions
    Handlebars.registerHelper('formatAttributeDescription', (attribute: ElementAttribute) => {
      let description = attribute.description || "";

      if (attribute.constraints) {
        description += ` *Constraints: ${attribute.constraints}*`;
      }

      if (attribute.context) {
        description += ` *Context: ${attribute.context}*`;
      }

      return new Handlebars.SafeString(description);
    });

    // Helper for creating attribute links
    Handlebars.registerHelper('externalAttributeLink', (attribute: ElementAttribute, baseUrl?: string) => {
      if (attribute.ref && baseUrl) {
        const fullUrl = baseUrl + attribute.ref;
        return new Handlebars.SafeString(`[\`${attribute.name} ↗\`](${fullUrl})`);
      }
      return new Handlebars.SafeString(`${attribute.ref} ${attribute.name} ${baseUrl}`);
    });

    // Helper for element links
    Handlebars.registerHelper('externalElementLink', (elementName: string, ref?: string, baseUrl?: string) => {
      if (ref && baseUrl) {
        const fullUrl = baseUrl + ref;
        // return new Handlebars.SafeString(`[\`${elementName}\`](${fullUrl})`);
        return new Handlebars.SafeString(`[\`${elementName} ↗\`](${fullUrl})`);
      }
      return `\`${elementName}\``;
    });

    // Helper for generating header marks
    Handlebars.registerHelper('headerMark', (level: number) => {
      return new Handlebars.SafeString('#'.repeat(level));
    });

    // Helper for lowercase conversion
    Handlebars.registerHelper('lower', (str: string) => {
      return str.toLowerCase();
    });

    // Helper for string replacement
    Handlebars.registerHelper('replace', (str: string, searchValue: string, replaceValue: string) => {
      return str.replace(new RegExp(searchValue, 'g'), replaceValue);
    });
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

  /**
   * Helper methods (moved from generator)
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private kebabToReadable(text: string): string {
    return text.replace(/-/g, " ");
  }
}
