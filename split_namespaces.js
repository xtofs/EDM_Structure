const fs = require('fs');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('data/odata-edm-structure.json', 'utf8'));

console.log(`Starting namespace separation for ${jsonData.elements.length} elements`);

// Function to split namespace-prefixed names
function splitNamespaceAndName(fullName) {
    const parts = fullName.split(':');
    if (parts.length === 2) {
        return {
            name: parts[1],
            xmlNamespace: parts[0]
        };
    } else {
        // No namespace prefix
        return {
            name: fullName,
            xmlNamespace: null
        };
    }
}

// Function to update children references
function updateChildrenReferences(children) {
    if (!children || !Array.isArray(children)) {
        return children;
    }
    
    return children.map(childName => {
        const { name } = splitNamespaceAndName(childName);
        return name;
    });
}

// Function to reorder properties in the desired sequence with xmlNamespace
function reorderPropertiesWithNamespace(element) {
    const { name, xmlNamespace } = splitNamespaceAndName(element.name);
    
    // Desired order: name, xmlNamespace (if exists), description, ref, children, attributes
    const reordered = {};
    
    // Add name first
    reordered.name = name;
    
    // Add xmlNamespace if it exists
    if (xmlNamespace) {
        reordered.xmlNamespace = xmlNamespace;
    }
    
    // Add other properties in order
    if (element.description) reordered.description = element.description;
    if (element.ref) reordered.ref = element.ref;
    if (element.children) reordered.children = updateChildrenReferences(element.children);
    if (element.attributes) reordered.attributes = element.attributes;
    
    return reordered;
}

// Process all elements
let processedCount = 0;
jsonData.elements = jsonData.elements.map(element => {
    const updated = reorderPropertiesWithNamespace(element);
    processedCount++;
    
    const { name, xmlNamespace } = splitNamespaceAndName(element.name);
    console.log(`${processedCount}. ${element.name} -> name: "${name}", xmlNamespace: "${xmlNamespace || 'none'}"`);
    
    return updated;
});

// Write back to file
fs.writeFileSync('data/odata-edm-structure.json', JSON.stringify(jsonData, null, 4));

console.log(`\nNamespace separation completed! Processed ${processedCount} elements.`);
console.log('Properties now follow the order: name, xmlNamespace (if exists), description, ref, children, attributes');
console.log('Children references have been updated to use unqualified names');
