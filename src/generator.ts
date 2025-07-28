import {
  ODataEdmStructure,
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

    // Header before elements list
    const headerLevel = (this.options.headerLevel || 1) + 1;
    sections.push(`${'#'.repeat(headerLevel)} EDM Model Elements`);

    // Elements overview
    sections.push(this.generateElementsOverview());

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
    const template = this.templateManager.getTemplate('metadata');
    
    const headerLevel = (this.options.headerLevel || 1) + 1;
    
    return template({
      headerLevel: headerLevel,
      description: this.data.metadata.description,
      source: this.data.metadata.source,
      sourceUrl: this.data.metadata.sourceUrl
    }).trim();
  }

  /**
   * Generate attribute categories section
   */
  private generateAttributeCategories(): string {
    const template = this.templateManager.getTemplate('attribute-categories');
    
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const subHeaderLevel = headerLevel + 1;
    
    return template({
      headerLevel: headerLevel,
      subHeaderLevel: subHeaderLevel,
      categories: Object.values(this.data.attributeCategories)
    }).trim();
  }


  /**
   * Generate elements overview section (flat, no grouping)
   */
  private generateElementsOverview(): string {
    const template = this.templateManager.getTemplate('element-markdown');
    const headerLevel = (this.options.headerLevel || 1) + 1;
    return this.data.elements.map(element => {
      return template({
        headerLevel: headerLevel,
        name: element.name,
        ref: element.ref,
        description: element.description,
        attributes: element.attributes.length > 0 ? element.attributes : null,
        baseUrl: this.data.metadata.baseUrl
      }).trim();
    }).join('\n\n');
  }




  /**
   * Generate markdown for a specific element (no group)
   */
  public generateElementMarkdown(elementName: string): string {
    // Find the element
    const element = this.data.elements.find(e => e.name === elementName);
    if (!element) {
      throw new Error(`Element '${elementName}' not found`);
    }

    const template = this.templateManager.getTemplate('element-markdown');
    const headerLevel = this.options.headerLevel || 1;
    const attributesHeaderLevel = headerLevel + 1;

    return template({
      headerLevel: headerLevel,
      attributesHeaderLevel: attributesHeaderLevel,
      name: element.name,
      ref: element.ref,
      attributes: element.attributes.length > 0 ? element.attributes : null,
      baseUrl: this.data.metadata.baseUrl
    }).trim();
  }
}
