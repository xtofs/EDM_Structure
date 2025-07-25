import * as fs from "fs";
import { ODataEdmStructure, EdmElement } from "./types";

/**
 * ODataEdmParser - Handles loading and parsing of OData EDM structure data
 */
export class ODataEdmParser {
  private data: ODataEdmStructure | null = null;

  /**
   * Load OData EDM structure data from JSON file
   */
  public loadFromFile(filePath: string): void {
    try {
      const jsonContent = fs.readFileSync(filePath, "utf-8");
      this.data = JSON.parse(jsonContent) as ODataEdmStructure;
    } catch (error) {
      throw new Error(
        `Failed to load OData EDM structure from ${filePath}: ${error}`,
      );
    }
  }

  /**
   * Load OData EDM structure data from JSON string
   */
  public loadFromJson(jsonString: string): void {
    try {
      this.data = JSON.parse(jsonString) as ODataEdmStructure;
    } catch (error) {
      throw new Error(`Failed to parse OData EDM structure JSON: ${error}`);
    }
  }

  /**
   * Get the loaded data
   */
  public getData(): ODataEdmStructure {
    if (!this.data) {
      throw new Error(
        "No data loaded. Call loadFromFile() or loadFromJson() first.",
      );
    }
    return this.data;
  }

  /**
   * Get all elements of a specific category
   */
  public getElementsByCategory(
    category: "basic" | "reference" | "path",
  ): EdmElement[] {
    const data = this.getData();
    const elements: EdmElement[] = [];

    for (const group of data.elementGroups) {
      for (const element of group.elements) {
        if (element.attributes.some((attr) => attr.category === category)) {
          elements.push(element);
        }
      }
    }

    return elements;
  }

  /**
   * Get all elements in a specific group
   */
  public getElementsByGroup(groupName: string): EdmElement[] {
    const data = this.getData();
    const group = data.elementGroups.find((g) => g.name === groupName);
    return group ? group.elements : [];
  }

  /**
   * Find an element by name
   */
  public findElement(elementName: string): EdmElement | null {
    const data = this.getData();

    for (const group of data.elementGroups) {
      const element = group.elements.find((e) => e.name === elementName);
      if (element) {
        return element;
      }
    }

    return null;
  }

  /**
   * Get statistics about the loaded data
   */
  public getStatistics(): {
    totalGroups: number;
    totalElements: number;
    elementsWithAttributes: number;
    elementsWithoutAttributes: number;
    totalAttributes: number;
    attributesByCategory: Record<string, number>;
  } {
    const data = this.getData();

    let totalElements = 0;
    let elementsWithAttributes = 0;
    let elementsWithoutAttributes = 0;
    let totalAttributes = 0;
    const attributesByCategory: Record<string, number> = {
      basic: 0,
      reference: 0,
      path: 0,
    };

    for (const group of data.elementGroups) {
      totalElements += group.elements.length;

      for (const element of group.elements) {
        if (element.attributes.length > 0) {
          elementsWithAttributes++;
          totalAttributes += element.attributes.length;

          for (const attribute of element.attributes) {
            attributesByCategory[attribute.category]++;
          }
        } else {
          elementsWithoutAttributes++;
        }
      }
    }

    return {
      totalGroups: data.elementGroups.length,
      totalElements,
      elementsWithAttributes,
      elementsWithoutAttributes,
      totalAttributes,
      attributesByCategory,
    };
  }

  /**
   * Get all unique attribute names by category
   */
  public getAttributeNamesByCategory(): Record<string, string[]> {
    const data = this.getData();
    const attributeNames: Record<string, Set<string>> = {
      basic: new Set(),
      reference: new Set(),
      path: new Set(),
    };

    for (const group of data.elementGroups) {
      for (const element of group.elements) {
        for (const attribute of element.attributes) {
          attributeNames[attribute.category].add(attribute.name);
        }
      }
    }

    return {
      basic: Array.from(attributeNames.basic).sort(),
      reference: Array.from(attributeNames.reference).sort(),
      path: Array.from(attributeNames.path).sort(),
    };
  }

  /**
   * Validate the loaded data structure
   */
  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.data) {
      errors.push("No data loaded");
      return { isValid: false, errors };
    }

    const data = this.data;

    // Validate metadata
    if (!data.metadata || !data.metadata.title || !data.metadata.version) {
      errors.push("Invalid metadata: title and version are required");
    }

    // Validate attribute categories
    if (
      !data.attributeCategories ||
      !data.attributeCategories.basic ||
      !data.attributeCategories.reference ||
      !data.attributeCategories.path
    ) {
      errors.push(
        "Invalid attribute categories: basic, reference, and path are required",
      );
    }

    // Validate element groups
    if (!Array.isArray(data.elementGroups) || data.elementGroups.length === 0) {
      errors.push("Invalid element groups: must be a non-empty array");
    } else {
      for (let i = 0; i < data.elementGroups.length; i++) {
        const group = data.elementGroups[i];
        if (!group.name || !Array.isArray(group.elements)) {
          errors.push(
            `Invalid element group at index ${i}: name and elements array are required`,
          );
        }

        for (let j = 0; j < group.elements.length; j++) {
          const element = group.elements[j];
          if (!element.name) {
            errors.push(
              `Invalid element at group ${i}, element ${j}: name is required`,
            );
          }

          if (!Array.isArray(element.attributes)) {
            errors.push(
              `Invalid element at group ${i}, element ${j}: attributes must be an array`,
            );
          } else {
            for (let k = 0; k < element.attributes.length; k++) {
              const attribute = element.attributes[k];
              if (
                !attribute.name ||
                !attribute.category ||
                !["basic", "reference", "path"].includes(attribute.category)
              ) {
                errors.push(
                  `Invalid attribute at group ${i}, element ${j}, attribute ${k}: name and valid category are required`,
                );
              }
            }
          }
        }
      }
    }

    return { isValid: errors.length === 0, errors };
  }
}
