/**
 * OData EDM Structure Converter
 *
 * This module provides tools to convert OData EDM structure data from
 * machine-readable JSON format into consistent, readable markdown documentation.
 */

export { ODataEdmParser } from "./parser";
export { MarkdownGenerator } from "./generator";
export { ODataEdmCli } from "./cli";
export * from "./types";

// Version information
export const VERSION = "1.0.0";

/**
 * Convenience function to generate markdown from JSON file
 */
export async function generateMarkdownFromFile(
  inputPath: string,
  outputPath?: string,
  options?: {
    title?: string;
    includeMetadata?: boolean;
    includeNavigation?: boolean;
  },
): Promise<string> {
  const { ODataEdmParser } = await import("./parser");
  const { MarkdownGenerator } = await import("./generator");

  const parser = new ODataEdmParser();
  parser.loadFromFile(inputPath);

  const data = parser.getData();
  const generator = new MarkdownGenerator(data, options);
  const markdown = generator.generateMarkdown();

  if (outputPath) {
    const fs = await import("fs");
    fs.writeFileSync(outputPath, markdown, "utf-8");
  }

  return markdown;
}

/**
 * Convenience function to generate markdown from JSON string
 */
export function generateMarkdownFromJson(
  jsonString: string,
  options?: {
    title?: string;
    includeMetadata?: boolean;
    includeNavigation?: boolean;
  },
): string {
  const { ODataEdmParser } = require("./parser");
  const { MarkdownGenerator } = require("./generator");

  const parser = new ODataEdmParser();
  parser.loadFromJson(jsonString);

  const data = parser.getData();
  const generator = new MarkdownGenerator(data, options);

  return generator.generateMarkdown();
}
