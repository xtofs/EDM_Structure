import {
  ODataEdmStructure,
  EdmElement,
  ElementAttribute,
  MarkdownOptions,
} from "./types";
import { TemplateManager } from "./template-manager";

/**
 * MarkdownGenerator - Generates consistent, readable markdown documentation from OData EDM structure data
 */
export class MarkdownGenerator {
  private data: ODataEdmStructure;
  private options: MarkdownOptions;
  private templateManager: TemplateManager;

  constructor(data: ODataEdmStructure, options: MarkdownOptions = {}) {
    this.data = data;
    this.options = {
      includeMetadata: true,
      headerLevel: 1,
      ...options,
    };
    this.templateManager = new TemplateManager();
  }

  /**
   * Generate complete markdown documentation
   */
  public generateMarkdown(): string {
    const sections: string[] = [];

    // Title and metadata
    if (this.options.includeMetadata) {
      sections.push(this.generateHeader());
      sections.push(this.generateMetadata());
    }

    // Attribute categories overview
    sections.push(this.generateAttributeCategories());

    // Element groups
    sections.push(this.generateElementGroups());

    return sections.join("\n\n");
  }

  /**
   * Generate the main header
   */
  private generateHeader(): string {
    const title = this.options.title || this.data.metadata.title;
    const headerMark = "#".repeat(this.options.headerLevel || 1);
    return `${headerMark} ${title}`;
  }

  /**
   * Generate metadata section
   */
  private generateMetadata(): string {
    const { metadata } = this.data;
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = "#".repeat(headerLevel);

    let content = `${headerMark} Overview\n\n`;
    content += `${metadata.description}\n\n`;

    // Consolidate source, and reference into a single line with link
    if (metadata.source && metadata.sourceUrl) {
      content += `**Source**: [${metadata.source}](${metadata.sourceUrl})\n\n`;
    } else if (metadata.source) {
      content += `**Source**: ${metadata.source}\n\n`;
    }

    return content.trim();
  }

  /**
   * Generate attribute categories section
   */
  private generateAttributeCategories(): string {
    const template = this.templateManager.getTemplate('attribute-categories');
    
    return template({
      headerMark: '#'.repeat((this.options.headerLevel || 1) + 1),
      subHeaderMark: '#'.repeat((this.options.headerLevel || 1) + 2),
      categories: Object.values(this.data.attributeCategories)
    }).trim();
  }

  /**
   * Generate element groups section
   */
  private generateElementGroups(): string {
    const template = this.templateManager.getTemplate('element-groups');
    
    // Prepare data with calculated permittedParents
    const elementGroupsWithParents = this.data.elementGroups.map(group => ({
      ...group,
      elements: group.elements.map(element => {
        const permittedParents = this.data.elementGroups
          .flatMap((g) => g.elements)
          .filter((e) => e.permittedChildren?.includes(element.name))
          .map((e) => e.name);

        return {
          ...element,
          permittedParents: permittedParents.length > 0 ? permittedParents : null
        };
      })
    }));

    return template({
      headerMark: '#'.repeat((this.options.headerLevel || 1) + 1),
      subHeaderMark: '#'.repeat((this.options.headerLevel || 1) + 2),
      elementHeaderMark: '#'.repeat((this.options.headerLevel || 1) + 3),
      elementGroups: elementGroupsWithParents,
      baseUrl: this.data.metadata.baseUrl
    }).trim();
  }

  /**
   * Generate attribute table for an element
   */
  private generateAttributeTable(attributes: ElementAttribute[]): string {
    let table = "| Attribute | Type | Description |\n";
    table += "|-----------|------|-------------|\n";

    for (const attribute of attributes) {
      const type = this.formatAttributeType(attribute);
      const description = this.formatAttributeDescription(attribute);

      // Make attribute name clickable if it has a ref link
      let attributeName = attribute.name;
      if (attribute.ref && this.data.metadata.baseUrl) {
        const fullUrl = this.data.metadata.baseUrl + attribute.ref;
        attributeName = `[${attribute.name}](${fullUrl})`;
      }

      table += `| **${attributeName}** | ${type} | ${description} |\n`;
    }

    return table;
  }

  /**
   * Convert kebab-case to readable format (e.g., "simple-identifier" -> "simple identifier")
   */
  private kebabToReadable(text: string): string {
    return text.replace(/-/g, " ");
  }

  /**
   * Format attribute type with category, subcategory, and symbols
   */
  private formatAttributeType(attribute: ElementAttribute): string {
    let type = this.capitalizeFirst(attribute.category);

    if (attribute.subcategory) {
      const readableSubcategory = this.kebabToReadable(attribute.subcategory);
      if (attribute.symbols && attribute.symbols.length > 0) {
        // Format as "subcategory or symbol1, symbol2"
        const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
        type += ` (${readableSubcategory} or ${symbolList})`;
      } else {
        type += ` (${readableSubcategory})`;
      }
    } else if (attribute.symbols && attribute.symbols.length > 0) {
      // Format as "symbol1, symbol2" when no subcategory is specified
      const symbolList = attribute.symbols.map((s) => `\`${s}\``).join(", ");
      type += ` (${symbolList})`;
    }

    return type;
  }

  /**
   * Format attribute description with constraints, context, and standard link
   */
  private formatAttributeDescription(attribute: ElementAttribute): string {
    let description = attribute.description || "";

    if (attribute.constraints) {
      description += ` *Constraints: ${attribute.constraints}*`;
    }

    if (attribute.context) {
      description += ` *Context: ${attribute.context}*`;
    }

    // Note: Link is now in the attribute name, not in description

    return description;
  }

  /**
   * Capitalize first letter of a string
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generate markdown for a specific element group
   */
  public generateGroupMarkdown(groupName: string): string {
    const group = this.data.elementGroups.find((g) => g.name === groupName);
    if (!group) {
      throw new Error(`Group '${groupName}' not found`);
    }

    const headerLevel = this.options.headerLevel || 1;
    const headerMark = "#".repeat(headerLevel);
    const elementHeaderMark = "#".repeat(headerLevel + 1);

    let content = `${headerMark} ${group.name}\n\n`;

    if (group.description) {
      content += `${group.description}\n\n`;
    }

    for (const element of group.elements) {
      // Make element name clickable if standard link is available
      if (element.ref && this.data.metadata.baseUrl) {
        const fullUrl = this.data.metadata.baseUrl + element.ref;
        content += `${elementHeaderMark} [\`${element.name}\`](${fullUrl})\n\n`;
      } else {
        content += `${elementHeaderMark} \`${element.name}\`\n\n`;
      }

      if (element.attributes.length === 0) {
        content += "*No attributes*\n\n";
      } else {
        content += this.generateAttributeTable(element.attributes);
        content += "\n";
      }
    }

    return content.trim();
  }

  /**
   * Generate markdown for a specific element
   */
  public generateElementMarkdown(elementName: string): string {
    let element: EdmElement | null = null;
    let groupName = "";

    // Find the element
    for (const group of this.data.elementGroups) {
      const found = group.elements.find((e) => e.name === elementName);
      if (found) {
        element = found;
        groupName = group.name;
        break;
      }
    }

    if (!element) {
      throw new Error(`Element '${elementName}' not found`);
    }

    const headerLevel = this.options.headerLevel || 1;
    const headerMark = "#".repeat(headerLevel);

    // Make element name clickable if standard link is available
    let content: string;
    if (element.ref && this.data.metadata.baseUrl) {
      const fullUrl = this.data.metadata.baseUrl + element.ref;
      content = `${headerMark} [\`${element.name}\`](${fullUrl})\n\n`;
    } else {
      content = `${headerMark} \`${element.name}\`\n\n`;
    }
    content += `*Part of: ${groupName}*\n\n`;

    if (element.attributes.length === 0) {
      content += "*No attributes*\n\n";
    } else {
      content += "## Attributes\n\n";
      content += this.generateAttributeTable(element.attributes);
      content += "\n";
    }

    return content.trim();
  }
}
