import { ODataEdmStructure, EdmElement, ElementAttribute, MarkdownOptions } from './types';

/**
 * MarkdownGenerator - Generates consistent, readable markdown documentation from OData EDM structure data
 */
export class MarkdownGenerator {
  private data: ODataEdmStructure;
  private options: MarkdownOptions;

  constructor(data: ODataEdmStructure, options: MarkdownOptions = {}) {
    this.data = data;
    this.options = {
      includeMetadata: true,
      includeNavigation: true,
      headerLevel: 1,
      ...options
    };
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

    // Table of contents
    if (this.options.includeNavigation) {
      sections.push(this.generateTableOfContents());
    }

    // Attribute categories overview
    sections.push(this.generateAttributeCategories());

    // Element groups
    sections.push(this.generateElementGroups());

    // Summary statistics
    sections.push(this.generateSummary());

    return sections.join('\n\n');
  }

  /**
   * Generate the main header
   */
  private generateHeader(): string {
    const title = this.options.title || this.data.metadata.title;
    const headerMark = '#'.repeat(this.options.headerLevel || 1);
    return `${headerMark} ${title}`;
  }

  /**
   * Generate metadata section
   */
  private generateMetadata(): string {
    const { metadata } = this.data;
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = '#'.repeat(headerLevel);

    let content = `${headerMark} Overview\n\n`;
    content += `${metadata.description}\n\n`;

    if (metadata.source) {
      content += `**Source**: ${metadata.source}\n\n`;
    }

    if (metadata.version) {
      content += `**Version**: ${metadata.version}\n\n`;
    }

    if (metadata.appendixUrl) {
      content += `**Reference**: [Appendix B](${metadata.appendixUrl})\n\n`;
    }

    return content.trim();
  }

  /**
   * Generate table of contents
   */
  private generateTableOfContents(): string {
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = '#'.repeat(headerLevel);

    let content = `${headerMark} Table of Contents\n\n`;
    
    // Add attribute categories
    content += '- [Attribute Type Categories](#attribute-type-categories)\n';
    for (const category of Object.values(this.data.attributeCategories)) {
      const anchor = this.createAnchor(category.name);
      content += `  - [${category.name}](#${anchor})\n`;
    }

    // Add element groups
    content += '- [EDM Elements](#edm-elements)\n';
    for (const group of this.data.elementGroups) {
      const anchor = this.createAnchor(group.name);
      content += `  - [${group.name}](#${anchor})\n`;
    }

    content += '- [Summary](#summary)\n';

    return content;
  }

  /**
   * Generate attribute categories section
   */
  private generateAttributeCategories(): string {
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = '#'.repeat(headerLevel);
    const subHeaderMark = '#'.repeat(headerLevel + 1);

    let content = `${headerMark} Attribute Type Categories\n\n`;

    for (const category of Object.values(this.data.attributeCategories)) {
      content += `${subHeaderMark} ${category.name}\n\n`;
      content += `${category.description}\n\n`;

      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategory of category.subcategories) {
          content += `**${subcategory.name}**: ${subcategory.description}\n\n`;

          if (subcategory.symbolicValues && subcategory.symbolicValues.length > 0) {
            content += 'Symbolic values:\n';
            for (const symbolicValue of subcategory.symbolicValues) {
              content += `- \`${symbolicValue.name}\`: ${symbolicValue.description}\n`;
            }
            content += '\n';
          }

          if (subcategory.constraints) {
            content += `*Constraints*: ${subcategory.constraints}\n\n`;
          }

          if (subcategory.default) {
            content += `*Default*: ${subcategory.default}\n\n`;
          }

          if (subcategory.notes) {
            content += `*Note*: ${subcategory.notes}\n\n`;
          }
        }
      }
    }

    return content.trim();
  }

  /**
   * Generate element groups section
   */
  private generateElementGroups(): string {
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = '#'.repeat(headerLevel);
    const subHeaderMark = '#'.repeat(headerLevel + 1);
    const elementHeaderMark = '#'.repeat(headerLevel + 2);

    let content = `${headerMark} EDM Elements\n\n`;

    for (const group of this.data.elementGroups) {
      content += `${subHeaderMark} ${group.name}\n\n`;
      
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
          content += '*No attributes*\n\n';
        } else {
          content += this.generateAttributeTable(element.attributes);
          content += '\n';
        }
      }
    }

    return content.trim();
  }

  /**
   * Generate attribute table for an element
   */
  private generateAttributeTable(attributes: ElementAttribute[]): string {
    let table = '| Attribute | Type | Description |\n';
    table += '|-----------|------|-------------|\n';

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
   * Format attribute type with category and subcategory
   */
  private formatAttributeType(attribute: ElementAttribute): string {
    let type = this.capitalizeFirst(attribute.category);
    
    if (attribute.subcategory) {
      type += ` (${attribute.subcategory})`;
    }

    return type;
  }

  /**
   * Format attribute description with constraints, context, and standard link
   */
  private formatAttributeDescription(attribute: ElementAttribute): string {
    let description = attribute.description || '';

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
   * Generate summary section
   */
  private generateSummary(): string {
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const headerMark = '#'.repeat(headerLevel);

    let content = `${headerMark} Summary\n\n`;

    // Calculate statistics
    const stats = this.calculateStatistics();

    content += `### Statistics\n\n`;
    content += `- **Total Element Groups**: ${stats.totalGroups}\n`;
    content += `- **Total Elements**: ${stats.totalElements}\n`;
    content += `- **Elements with Attributes**: ${stats.elementsWithAttributes}\n`;
    content += `- **Elements without Attributes**: ${stats.elementsWithoutAttributes}\n`;
    content += `- **Total Attributes**: ${stats.totalAttributes}\n\n`;

    content += `### Attributes by Category\n\n`;
    content += `- **Basic Attributes**: ${stats.basicAttributes}\n`;
    content += `- **Reference Attributes**: ${stats.referenceAttributes}\n`;
    content += `- **Path Attributes**: ${stats.pathAttributes}\n\n`;

    return content.trim();
  }

  /**
   * Calculate statistics from the data
   */
  private calculateStatistics() {
    let totalElements = 0;
    let elementsWithAttributes = 0;
    let elementsWithoutAttributes = 0;
    let totalAttributes = 0;
    let basicAttributes = 0;
    let referenceAttributes = 0;
    let pathAttributes = 0;

    for (const group of this.data.elementGroups) {
      totalElements += group.elements.length;

      for (const element of group.elements) {
        if (element.attributes.length > 0) {
          elementsWithAttributes++;
          totalAttributes += element.attributes.length;

          for (const attribute of element.attributes) {
            switch (attribute.category) {
              case 'basic':
                basicAttributes++;
                break;
              case 'reference':
                referenceAttributes++;
                break;
              case 'path':
                pathAttributes++;
                break;
            }
          }
        } else {
          elementsWithoutAttributes++;
        }
      }
    }

    return {
      totalGroups: this.data.elementGroups.length,
      totalElements,
      elementsWithAttributes,
      elementsWithoutAttributes,
      totalAttributes,
      basicAttributes,
      referenceAttributes,
      pathAttributes
    };
  }

  /**
   * Create anchor link from text
   */
  private createAnchor(text: string): string {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
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
    const group = this.data.elementGroups.find(g => g.name === groupName);
    if (!group) {
      throw new Error(`Group '${groupName}' not found`);
    }

    const headerLevel = this.options.headerLevel || 1;
    const headerMark = '#'.repeat(headerLevel);
    const elementHeaderMark = '#'.repeat(headerLevel + 1);

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
        content += '*No attributes*\n\n';
      } else {
        content += this.generateAttributeTable(element.attributes);
        content += '\n';
      }
    }

    return content.trim();
  }

  /**
   * Generate markdown for a specific element
   */
  public generateElementMarkdown(elementName: string): string {
    let element: EdmElement | null = null;
    let groupName = '';

    // Find the element
    for (const group of this.data.elementGroups) {
      const found = group.elements.find(e => e.name === elementName);
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
    const headerMark = '#'.repeat(headerLevel);

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
      content += '*No attributes*\n\n';
    } else {
      content += '## Attributes\n\n';
      content += this.generateAttributeTable(element.attributes);
      content += '\n';
    }

    return content.trim();
  }
}
