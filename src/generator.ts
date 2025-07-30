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

    // Header before elements list
    const headerLevel = (this.options.headerLevel || 1) + 1;
    sections.push(`${'#'.repeat(headerLevel)} EDM Model Elements`);

    // Elements overview
    sections.push(this.generateElementsOverview());

    // Attribute categories overview
    sections.push(this.generateAttributeCategories());

    // Footer
    sections.push(this.generateFooter());

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
   * Generate the footer
   */
  private generateFooter(): string {
   
    const template = this.templateManager.getTemplate('footer');

    // const headerLevel = (this.options.headerLevel || 1) + 1;

    return template({
      source: this.data.metadata.source,
      sourceUrl: this.data.metadata.sourceUrl,
      sourceContent: JSON.stringify(this.data, null, 2)
    }).trim();
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
   * Sort elements topologically (parents before children), then alphabetically
   */
  private sortElementsTopologicallyThenAlphabetically(elements: any[]): any[] {
    // Create a map of element name to element for quick lookup
    const elementMap = new Map(elements.map(el => [el.name, el]));
    
    // Create adjacency list and in-degree count
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();
    
    // Initialize adjacency list and in-degree count
    elements.forEach(element => {
      adjacencyList.set(element.name, element.children || []);
      inDegree.set(element.name, 0);
    });
    
    // Calculate in-degrees
    elements.forEach(element => {
      (element.children || []).forEach((child: string) => {
        if (inDegree.has(child)) {
          inDegree.set(child, inDegree.get(child)! + 1);
        }
      });
    });
    
    // Topological sort using Kahn's algorithm with alphabetical secondary sort
    const result: any[] = [];
    const queue: string[] = [];
    
    // Start with elements that have no incoming edges, sorted alphabetically
    elements
      .filter(element => inDegree.get(element.name) === 0)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(element => queue.push(element.name));
    
    while (queue.length > 0) {
      // Sort queue alphabetically to ensure consistent ordering
      queue.sort();
      const currentName = queue.shift()!;
      const currentElement = elementMap.get(currentName)!;
      result.push(currentElement);
      
      // Process children of current element
      const children = adjacencyList.get(currentName) || [];
      const childrenToAdd: string[] = [];
      
      children.forEach(childName => {
        if (inDegree.has(childName)) {
          inDegree.set(childName, inDegree.get(childName)! - 1);
          if (inDegree.get(childName) === 0) {
            childrenToAdd.push(childName);
          }
        }
      });
      
      // Add children with zero in-degree to queue (will be sorted in next iteration)
      childrenToAdd.forEach(child => queue.push(child));
    }
    
    // Handle any remaining elements (circular dependencies)
    const remaining = elements.filter(element => !result.includes(element));
    if (remaining.length > 0) {
      // Sort remaining elements alphabetically and add them
      remaining.sort((a, b) => a.name.localeCompare(b.name));
      result.push(...remaining);
    }
    
    return result;
  }

  /**
   * Generate elements overview section (flat, no grouping)
   */
  private generateElementsOverview(): string {
    const template = this.templateManager.getTemplate('element-markdown');
    const headerLevel = (this.options.headerLevel || 1) + 1;

    const parentsLookup = this.createParentsLookup(this.data)

    // Sort elements topologically first, then alphabetically
    const sortedElements = this.sortElementsTopologicallyThenAlphabetically(this.data.elements);

    return sortedElements
      .map(element => {
      return template({
        headerLevel: headerLevel,
        name: element.name,
        ref: element.ref,
        description: element.description,
        attributes: element.attributes.length > 0 ? element.attributes : null,
        children: element.children,
        parents: parentsLookup.get(element.name),
        baseUrl: this.data.metadata.baseUrl
      }).trim();
    }).join('\n\n');
  }


  private createParentsLookup(data: ODataEdmStructure): Map<string, string[]> {

    const elements = data.elements;

    // Step 1: Create [child, parent] pairs using flatMap
    const childParentPairs = elements.flatMap(el =>
      (el.children || []).map(child => [child, el.name] as [string, string])
    );

    // Step 2: Reduce to a Map of child -> list of parents
    const childToParentsMap = childParentPairs.reduce((acc, [child, parent]) => {
      if (!acc.has(child)) {
        acc.set(child, []);
      }
      acc.get(child)!.push(parent);
      return acc;
    }, new Map<string, string[]>());

    return childToParentsMap;
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
