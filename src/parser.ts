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
    categoryType: "basic" | "reference" | "path",
  ): EdmElement[] {
    const data = this.getData();
    const filteredElements: EdmElement[] = [];

    for (const element of data.elements) {
      const hasCategory = element.attributes.some(
        (attr) => attr.category === categoryType,
      );
      if (hasCategory) {
        filteredElements.push(element);
      }
    }

    return filteredElements;
  }



  /**
   * Get a specific element by name
   */
  public getElementByName(elementName: string): EdmElement | null {
    const data = this.getData();
    return data.elements.find(element => element.name === elementName) || null;
  }

  /**
   * Generate summary statistics
   */
  public generateSummary(): {
    totalElements: number;
    basicAttributesCount: number;
    referenceAttributesCount: number;
    pathAttributesCount: number;
  } {
    const data = this.getData();
    let totalElements = data.elements.length;
    let basicAttributesCount = 0;
    let referenceAttributesCount = 0;
    let pathAttributesCount = 0;

    for (const element of data.elements) {
      for (const attribute of element.attributes) {
        switch (attribute.category) {
          case "basic":
            basicAttributesCount++;
            break;
          case "reference":
            referenceAttributesCount++;
            break;
          case "path":
            pathAttributesCount++;
            break;
        }
      }
    }

    return {
      totalElements,
      basicAttributesCount,
      referenceAttributesCount,
      pathAttributesCount,
    };
  }
  /**
   * Get all unique attribute names used across elements
   */
  public getAllAttributeNames(): string[] {
    const data = this.getData();
    const attributeNames = new Set<string>();

    for (const element of data.elements) {
      for (const attribute of element.attributes) {
        attributeNames.add(attribute.name);
      }
    }

    return Array.from(attributeNames).sort();
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
    if (!data.metadata || !data.metadata.title ) {
      errors.push("Invalid metadata: title is required");
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



    // Validate elements array
    if (!Array.isArray(data.elements) || data.elements.length === 0) {
      errors.push("elements array is missing or empty");
    } else {
      for (let i = 0; i < data.elements.length; i++) {
        const element = data.elements[i];
        if (!element.name) {
          errors.push(
            `elements[${i}] is missing required 'name' property`,
          );
        }
        if (!Array.isArray(element.attributes)) {
          errors.push(`elements[${i}].attributes must be an array`);
        }
      }
    }
    return { isValid: errors.length === 0, errors };
  }
}
