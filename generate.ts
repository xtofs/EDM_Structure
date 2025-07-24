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
      includeNavigation: true,
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
    const outputPath = path.join(outputDir, 'OData_EDM_Structure_Generated.md');
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    console.log(`✓ Generated markdown saved to: ${outputPath}`);

    // Show statistics
    const stats = parser.getStatistics();
    console.log('\n--- Generation Statistics ---');
    console.log(`📊 Total Groups: ${stats.totalGroups}`);
    console.log(`📊 Total Elements: ${stats.totalElements}`);
    console.log(`📊 Elements with Attributes: ${stats.elementsWithAttributes}`);
    console.log(`📊 Elements without Attributes: ${stats.elementsWithoutAttributes}`);
    console.log(`📊 Total Attributes: ${stats.totalAttributes}`);
    console.log('\n--- Attributes by Category ---');
    Object.entries(stats.attributesByCategory).forEach(([category, count]) => {
      console.log(`📊 ${category.charAt(0).toUpperCase() + category.slice(1)}: ${count}`);
    });

    // Generate individual group documentation as examples
    console.log('\n--- Generating Individual Group Examples ---');
    const groupsToGenerate = ['Schema Elements', 'Entity Model Elements', 'Action and Function Elements'];
    
    for (const groupName of groupsToGenerate) {
      try {
        const groupMarkdown = generator.generateGroupMarkdown(groupName);
        const groupFileName = groupName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + '.md';
        const groupOutputPath = path.join(outputDir, groupFileName);
        fs.writeFileSync(groupOutputPath, groupMarkdown, 'utf-8');
        console.log(`✓ Generated ${groupName} documentation: ${groupOutputPath}`);
      } catch (error) {
        console.error(`❌ Failed to generate ${groupName}:`, error);
      }
    }

    // Generate sample element documentation
    console.log('\n--- Generating Individual Element Examples ---');
    const elementsToGenerate = ['edm:EntityType', 'edm:Property', 'edm:NavigationProperty'];
    
    for (const elementName of elementsToGenerate) {
      try {
        const elementMarkdown = generator.generateElementMarkdown(elementName);
        const elementFileName = elementName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + '.md';
        const elementOutputPath = path.join(outputDir, elementFileName);
        fs.writeFileSync(elementOutputPath, elementMarkdown, 'utf-8');
        console.log(`✓ Generated ${elementName} documentation: ${elementOutputPath}`);
      } catch (error) {
        console.error(`❌ Failed to generate ${elementName}:`, error);
      }
    }

    console.log('\n🎉 Documentation generation completed successfully!');
    console.log(`📁 All files saved in: ${outputDir}`);

  } catch (error) {
    console.error('❌ Error during documentation generation:', error);
    process.exit(1);
  }
}

// Run the generation
generateDocumentation();
