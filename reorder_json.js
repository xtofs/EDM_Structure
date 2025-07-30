const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'data', 'odata-edm-structure.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Function to reorder object properties
function reorderProperties(obj, order) {
    const reordered = {};
    
    // Add properties in the specified order
    order.forEach(prop => {
        if (obj.hasOwnProperty(prop)) {
            reordered[prop] = obj[prop];
        }
    });
    
    // Add any remaining properties that weren't in the order list
    Object.keys(obj).forEach(prop => {
        if (!order.includes(prop)) {
            reordered[prop] = obj[prop];
        }
    });
    
    return reordered;
}

// Desired property order for elements
const elementOrder = ['name', 'description', 'ref', 'children', 'attributes'];

// Reorder all elements
if (data.elements && Array.isArray(data.elements)) {
    data.elements = data.elements.map(element => {
        return reorderProperties(element, elementOrder);
    });
}

// Write the reordered JSON back to file
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');

console.log('JSON properties have been reordered successfully!');
console.log(`Processed ${data.elements ? data.elements.length : 0} elements`);
