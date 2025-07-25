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
   * Generate element groups section
   */
  private generateElementGroups(): string {
    const template = this.templateManager.getTemplate('element-groups');
    
    const headerLevel = (this.options.headerLevel || 1) + 1;
    const subHeaderLevel = headerLevel + 1;
    const elementHeaderLevel = headerLevel + 2;
    
    // Prepare data with calculated permittedParents
    const elementGroupsWithParents = this.data.elementGroups.map(group => {
      // Get elements for this group
      const groupElements = this.data.elements.filter(element => element.group === group.id);
      
      const elementsWithParents = groupElements.map(element => {
        const permittedParents = this.data.elements
          .filter((e) => e.permittedChildren?.includes(element.name))
          .map((e) => e.name);

        return {
          ...element,
          permittedParents: permittedParents.length > 0 ? permittedParents : null
        };
      });

      return {
        ...group,
        elements: elementsWithParents
      };
    });

    return template({
      headerLevel: headerLevel,
      subHeaderLevel: subHeaderLevel,
      elementHeaderLevel: elementHeaderLevel,
      elementGroups: elementGroupsWithParents,
      baseUrl: this.data.metadata.baseUrl
    }).trim();
  }

  /**
   * Generate markdown for a specific element group
   */
  public generateGroupMarkdown(groupName: string): string {
    const group = this.data.elementGroups.find((g) => g.name === groupName);
    if (!group) {
      throw new Error(`Group '${groupName}' not found`);
    }

    const template = this.templateManager.getTemplate('group-markdown');
    
    const headerLevel = this.options.headerLevel || 1;
    const elementHeaderLevel = headerLevel + 1;

    // Get elements for this group
    const groupElements = this.data.elements.filter(element => element.group === group.id);

    return template({
      headerLevel: headerLevel,
      elementHeaderLevel: elementHeaderLevel,
      name: group.name,
      description: group.description,
      elements: groupElements,
      baseUrl: this.data.metadata.baseUrl
    }).trim();
  }

  /**
   * Generate markdown for a specific element
   */
  public generateElementMarkdown(elementName: string): string {
    // Find the element
    const element = this.data.elements.find(e => e.name === elementName);
    if (!element) {
      throw new Error(`Element '${elementName}' not found`);
    }

    // Find the group name
    const group = this.data.elementGroups.find(g => g.id === element.group);
    const groupName = group ? group.name : element.group;

    const template = this.templateManager.getTemplate('element-markdown');
    
    const headerLevel = this.options.headerLevel || 1;
    const attributesHeaderLevel = headerLevel + 1;

    return template({
      headerLevel: headerLevel,
      attributesHeaderLevel: attributesHeaderLevel,
      name: element.name,
      ref: element.ref,
      groupName: groupName,
      attributes: element.attributes.length > 0 ? element.attributes : null,
      baseUrl: this.data.metadata.baseUrl
    }).trim();
  }
}
