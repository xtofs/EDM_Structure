# Utility Scripts

This folder contains utility and maintenance scripts used during development and data maintenance.

## Scripts

- **`add-refs.js`** - Adds reference links to attributes in the JSON data structure
- **`fix-all-refs.js`** - Comprehensive script to fix all element and attribute references to match OData CSDL XML specification
- **`update-refs-to-spec.js`** - Updates reference links to point to the correct specification sections
- **`check-refs.sh`** - Shell script to validate reference integrity

## Usage

These are one-time maintenance scripts. They are not part of the main application workflow and are kept for historical purposes and future maintenance needs.

The main application scripts are located in the root directory:
- `generate.ts` - Main documentation generator
- `preview.ts` - HTML preview generator
- `validate-links.ts` - Link validation utility
