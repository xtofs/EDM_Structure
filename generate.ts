import { ODataEdmParser } from './src/parser';
import { MarkdownGenerator } from './src/generator';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Demonstration script to generate markdown from the OData EDM structure JSON
 */
async function generateDocumentation() {
  try {
    console.log('Starting OData EDM Structure documentation generation...');

    // Load the JSON data
    const dataPath = path.join(__dirname, 'data', 'odata-edm-structure.json');
    console.log(`Loading data from: ${dataPath}`);

    const parser = new ODataEdmParser();
    parser.loadFromFile(dataPath);

    // Validate the data
    const validation = parser.validate();
    if (!validation.isValid) {
      console.error('Data validation failed:');
      validation.errors.forEach(error => console.error(`  - ${error}`));
      return;
    }
    console.log('✓ Data validation passed');

    // Generate markdown
    const data = parser.getData();
    const generator = new MarkdownGenerator(data, {
      includeMetadata: true,
      headerLevel: 1
    });

    console.log('Generating markdown documentation...');
    const markdown = generator.generateMarkdown();

    // Ensure output directory exists
    const outputDir = path.join(__dirname, 'generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the generated markdown
    const outputPath = path.join(outputDir, 'edm_structure.md');
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    console.log(`✓ Generated markdown saved to: ${outputPath}`);

    // Show statistics
    const stats = parser.getStatistics();
    console.log('\n--- Generation Statistics ---');
    console.log(`📊 Total Groups: ${stats.totalGroups}`);
    console.log(`📊 Total Elements: ${stats.totalElements}`);
    console.log(`📊 Elements with Attributes: ${stats.elementsWithAttributes}`);
    console.log(`📊 Total Attributes: ${stats.totalAttributes}`);
    console.log('\n--- Attributes by Category ---');
    Object.entries(stats.attributesByCategory).forEach(([category, count]) => {
      console.log(`📊 ${category.charAt(0).toUpperCase() + category.slice(1)}: ${count}`);
    });

    console.log('\n🎉 Documentation generation completed successfully!');
    console.log(`📁 All files saved in: ${outputDir}`);

  } catch (error) {
    console.error('❌ Error during documentation generation:', error);
    process.exit(1);
  }
}

// Run the generation
generateDocumentation();
