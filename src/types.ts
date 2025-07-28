
export interface SymbolicValue {
  name: string;
  description: string;
  constraints?: string;
  default?: string;
  notes?: string;
}

export interface AttributeSubcategory {
  name: string;
  description: string;
  symbolicValues?: SymbolicValue[];
  constraints?: string;
  default?: string;
  notes?: string;
}

export interface AttributeCategory {
  name: string;
  description: string;
  subcategories?: AttributeSubcategory[];
}

export interface AttributeCategories {
  basic: AttributeCategory;
  reference: AttributeCategory;
  path: AttributeCategory;
}


export interface ElementAttribute {
  name: string;
  description: string;
  ref?: string;
  
  category: "basic" | "reference" | "path";
  subcategory?: string;
  symbols?: string[];

  constraints?: string;
  context?: string;  
}


export interface EdmElement {
  name: string;
  attributes: ElementAttribute[];
  children?: string[];
  ref?: string;
  description: string;
  [key: string]: any; // Allow for additional properties
}



export interface Metadata {
  title: string;
  description: string;  
  source?: string;
  sourceUrl?: string;
  baseUrl?: string;
}

export interface Summary {
  basicAttributesCount: number;
  referenceAttributesCount: number;
  pathAttributesCount: number;
  totalElements: number;
}


export interface ODataEdmStructure {
  metadata: Metadata;
  attributeCategories: AttributeCategories;
  elements: EdmElement[];         // Flat array of all elements

}

/**
 * Configuration interface for markdown generation
 */

export interface MarkdownGenerationConfig {
  includeTableOfContents: boolean;
  includeAttributeDetails: boolean;
  includeSummaryStatistics: boolean;
  outputFormat: "github" | "standard";
}

/**
 * Options for customizing the generated markdown
 */
export interface MarkdownOptions {
  title?: string | undefined;
  includeMetadata?: boolean;
  customCss?: string;
  headerLevel?: number;
}
