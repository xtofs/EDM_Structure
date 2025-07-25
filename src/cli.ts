#!/usr/bin/env node

import { ODataEdmParser } from "./parser";
import { MarkdownGenerator } from "./generator";
import { MarkdownOptions } from "./types";

/**
 * Main CLI application for transforming OData EDM structure to markdown
 */
class ODataEdmCli {
  private parser: ODataEdmParser;

  constructor() {
    this.parser = new ODataEdmParser();
  }

  /**
   * Run the CLI application
   */
  public async run(args: string[]): Promise<void> {
    try {
      // Parse command line arguments
      const options = this.parseArguments(args);

      // Load the data
      console.log(`Loading data from: ${options.inputFile}`);
      this.parser.loadFromFile(options.inputFile);

      // Validate the data
      const validation = this.parser.validate();
      if (!validation.isValid) {
        console.error("Data validation failed:");
        validation.errors.forEach((error) => console.error(`  - ${error}`));
        process.exit(1);
      }
      console.log("Data validation passed");

      // Generate markdown
      console.log("Generating markdown documentation...");
      const data = this.parser.getData();

      const markdownOptions: MarkdownOptions = {
        title: options.title,
        includeMetadata: options.includeMetadata,
        includeNavigation: options.includeNavigation,
        headerLevel: options.headerLevel,
      };

      const generator = new MarkdownGenerator(data, markdownOptions);
      const markdown = generator.generateMarkdown();

      // Write output
      if (options.outputFile) {
        const fs = await import("fs");
        fs.writeFileSync(options.outputFile, markdown, "utf-8");
        console.log(`Markdown written to: ${options.outputFile}`);
      } else {
        console.log("\n--- Generated Markdown ---\n");
        console.log(markdown);
      }

      // Show statistics
      if (options.showStats) {
        console.log("\n--- Statistics ---");
        const stats = this.parser.getStatistics();
        console.log(`Total Groups: ${stats.totalGroups}`);
        console.log(`Total Elements: ${stats.totalElements}`);
        console.log(
          `Elements with Attributes: ${stats.elementsWithAttributes}`,
        );
        console.log(
          `Elements without Attributes: ${stats.elementsWithoutAttributes}`,
        );
        console.log(`Total Attributes: ${stats.totalAttributes}`);
        console.log("Attributes by Category:");
        Object.entries(stats.attributesByCategory).forEach(
          ([category, count]) => {
            console.log(`  ${category}: ${count}`);
          },
        );
      }
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  }

  /**
   * Parse command line arguments
   */
  private parseArguments(args: string[]): {
    inputFile: string;
    outputFile?: string | undefined;
    title?: string | undefined;
    includeMetadata: boolean;
    includeNavigation: boolean;
    headerLevel: number;
    showStats: boolean;
  } {
    const options = {
      inputFile: "",
      outputFile: undefined as string | undefined,
      title: undefined as string | undefined,
      includeMetadata: true,
      includeNavigation: true,
      headerLevel: 1,
      showStats: false,
    };

    for (let i = 2; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case "-i":
        case "--input":
          options.inputFile = args[++i];
          break;
        case "-o":
        case "--output":
          options.outputFile = args[++i];
          break;
        case "-t":
        case "--title":
          options.title = args[++i];
          break;
        case "--no-metadata":
          options.includeMetadata = false;
          break;
        case "--no-navigation":
          options.includeNavigation = false;
          break;
        case "--header-level":
          options.headerLevel = parseInt(args[++i], 10);
          break;
        case "--stats":
          options.showStats = true;
          break;
        case "-h":
        case "--help":
          this.showHelp();
          process.exit(0);
        default:
          if (!options.inputFile && !arg.startsWith("-")) {
            options.inputFile = arg;
          }
          break;
      }
    }

    if (!options.inputFile) {
      console.error("Input file is required");
      this.showHelp();
      process.exit(1);
    }

    return options;
  }

  /**
   * Show help information
   */
  private showHelp(): void {
    console.log(`
OData EDM Structure to Markdown Converter

Usage: node cli.js [options] <input-file>

Options:
  -i, --input <file>      Input JSON file path (required)
  -o, --output <file>     Output Markdown file path (optional, prints to console if not specified)
  -t, --title <title>     Custom title for the document
  --no-metadata          Exclude metadata section
  --no-navigation        Exclude table of contents
  --header-level <level>  Starting header level (default: 1)
  --stats                 Show statistics after generation
  -h, --help             Show this help message

Examples:
  node cli.js data/odata-edm-structure.json
  node cli.js -i data/odata-edm-structure.json -o output/documentation.md
  node cli.js --input data.json --output docs.md --title "Custom Title" --stats
`);
  }
}

// Run the CLI if this file is executed directly
if (require.main === module) {
  const cli = new ODataEdmCli();
  cli.run(process.argv).catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
}

export { ODataEdmCli };
