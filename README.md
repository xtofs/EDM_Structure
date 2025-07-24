# OData EDM Structure Converter

This project transforms the OData EDM (Entity Data Model) structure documentation from a manually authored semi-structured markdown document into:

1. **Machine-readable JSON format** - Structured data that can be easily processed programmatically
2. **Consistent, readable markdown documentation** - Generated using TypeScript scripts for consistency and maintainability

## Project Structure

```
d:\oasis\AppendixC\
├── data/
│   └── odata-edm-structure.json      # Machine-readable OData EDM structure data
├── schema/
│   └── odata-edm-schema.json         # JSON schema for validation
├── src/
│   ├── types.ts                      # TypeScript interfaces and types
│   ├── parser.ts                     # JSON data parsing and validation
│   ├── generator.ts                  # Markdown generation logic
│   ├── cli.ts                        # Command-line interface
│   └── index.ts                      # Main exports
├── generated/                        # Output directory for generated markdown
├── generate.ts                       # Demonstration script
├── package.json                      # NPM package configuration
├── tsconfig.json                     # TypeScript configuration
└── OData_EDM_Structure.md           # Original semi-structured markdown
```

## Features

### Machine-Readable JSON Format

The `data/odata-edm-structure.json` contains:

- **Metadata**: Title, description, version, and source information
- **Attribute Categories**: Detailed classification of attribute types (Basic, Reference, Path)
- **Element Groups**: Hierarchical organization of EDM elements
- **Elements and Attributes**: Complete catalog with categorized attributes
- **Summary Statistics**: Counts and breakdowns by category

### TypeScript Conversion Tools

#### Core Classes

- **`ODataEdmParser`**: Loads, validates, and queries the JSON data
- **`MarkdownGenerator`**: Generates consistent markdown documentation
- **`ODataEdmCli`**: Command-line interface for batch processing

#### Key Features

- **Data Validation**: Ensures JSON structure integrity
- **Flexible Generation**: Create full documentation or specific sections
- **Statistics**: Analyze element and attribute distributions
- **Customizable Output**: Control headers, metadata, navigation, etc.

## Usage

### Prerequisites

```bash
# Install dependencies
npm install
```

### Build the Project

```bash
# Compile TypeScript
npm run build
```

### Generate Documentation

```bash
# Run the demonstration script
npx ts-node generate.ts

# Or use the CLI directly
npx ts-node src/cli.ts data/odata-edm-structure.json -o generated/documentation.md --stats
```

### CLI Options

```bash
# Basic usage
npx ts-node src/cli.ts <input-file>

# Full options
npx ts-node src/cli.ts \
  --input data/odata-edm-structure.json \
  --output generated/documentation.md \
  --title "Custom Title" \
  --header-level 1 \
  --stats \
  --no-metadata \
  --no-navigation
```

## Generated Output Examples

The system generates several types of documentation:

1. **Complete Documentation** (`OData_EDM_Structure_Generated.md`)
   - Full overview with table of contents
   - All attribute categories explained
   - All element groups with detailed tables
   - Summary statistics

2. **Group-Specific Documentation** (e.g., `schema-elements.md`)
   - Focused on a single element group
   - Detailed attribute tables for each element

3. **Element-Specific Documentation** (e.g., `edm-entitytype.md`)
   - Individual element reference
   - Complete attribute breakdown

## JSON Data Structure

### Attribute Categories

- **Basic Attributes**: Simple values (strings, booleans, numbers, identifiers)
  - Special handling for symbolic values (MaxLength, Scale, SRID)
- **Reference Attributes**: References to other model elements
  - Absolute vs. Relative references
- **Path Attributes**: Path expressions through model structures
  - Absolute vs. Relative paths

### Element Organization

Elements are organized into logical groups:

- Schema Elements
- Entity Model Elements  
- Action and Function Elements
- Entity Container Elements
- Vocabulary and Annotation Elements
- Core EDMX Elements
- Annotation Expression Elements

### Statistics Summary

Current data includes:
- **92 Basic Attributes**
- **26 Reference Attributes**  
- **12 Path Attributes**
- **78 Total Elements** across 7 major groups

## Development

### Scripts

```bash
npm run build      # Compile TypeScript
npm run dev        # Watch mode compilation
npm run test       # Run tests (when implemented)
npm run lint       # ESLint checking
npm run format     # Prettier formatting
npm run clean      # Remove dist folder
```

### Adding New Features

1. **Extend Types**: Add new interfaces in `src/types.ts`
2. **Enhance Parser**: Add new query methods in `src/parser.ts`
3. **Customize Generation**: Modify templates in `src/generator.ts`
4. **Update CLI**: Add new options in `src/cli.ts`

## Benefits

### For Documentation Maintainers

- **Consistency**: Generated markdown follows strict templates
- **Validation**: JSON schema ensures data integrity
- **Automation**: Regenerate docs when data changes
- **Flexibility**: Multiple output formats from single source

### For Developers

- **Programmatic Access**: Query the structured data directly
- **Integration**: Use as library in other tools
- **Extensibility**: Easy to add new output formats
- **Type Safety**: Full TypeScript support

### For Users

- **Readability**: Clean, consistent markdown format
- **Navigation**: Table of contents and cross-references
- **Completeness**: All elements and attributes documented
- **Accuracy**: Generated from validated source data

## License

MIT License - See package.json for details.

## Contributing

This project transforms the OASIS OData CSDL XML Representation Version 4.02 specification into structured, maintainable documentation. Contributions that improve accuracy, readability, or functionality are welcome.
