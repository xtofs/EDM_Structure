const fs = require('fs');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('data/odata-edm-structure.json', 'utf8'));

console.log(`Starting property order standardization for ${jsonData.elements.length} elements`);

// Function to reorder properties in the desired sequence
function reorderProperties(element) {
    const desiredOrder = ['name', 'description', 'ref', 'children', 'attributes'];
    const reordered = {};
    
    // Add properties in the desired order
    desiredOrder.forEach(prop => {
        if (element.hasOwnProperty(prop)) {
            reordered[prop] = element[prop];
        }
    });
    
    // Add any other properties that might exist (shouldn't be any, but just in case)
    Object.keys(element).forEach(prop => {
        if (!desiredOrder.includes(prop)) {
            reordered[prop] = element[prop];
        }
    });
    
    return reordered;
}

// Reorder properties for all elements
let processedCount = 0;
jsonData.elements = jsonData.elements.map(element => {
    const reordered = reorderProperties(element);
    processedCount++;
    return reordered;
});

// Write back to file
fs.writeFileSync('data/odata-edm-structure.json', JSON.stringify(jsonData, null, 4));

console.log(`Property order standardization completed! Processed ${processedCount} elements.`);
console.log('All elements now follow the order: name, description, ref, children, attributes');
