const fs = require('fs');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('data/odata-edm-structure.json', 'utf8'));

console.log(`Starting with ${jsonData.elements.length} elements`);

// Build dependency graph from children relationships
function buildDependencyGraph(elements) {
    const dependencies = new Map(); // child -> [parents]
    const elementMap = new Map();
    
    // Initialize maps
    elements.forEach(element => {
        dependencies.set(element.name, []);
        elementMap.set(element.name, element);
    });
    
    // Build reverse dependencies (child depends on parent)
    elements.forEach(element => {
        const parentName = element.name;
        const childNames = element.children || [];
        
        childNames.forEach(childName => {
            if (dependencies.has(childName)) {
                dependencies.get(childName).push(parentName);
            }
        });
    });
    
    return { dependencies, elementMap };
}

// Enhanced topological sort with alphabetical ordering for same-level elements
function topologicalSortAlphabetical(elements) {
    const { dependencies, elementMap } = buildDependencyGraph(elements);
    const inDegree = new Map();
    
    // Calculate in-degrees
    elements.forEach(element => {
        inDegree.set(element.name, dependencies.get(element.name).length);
    });
    
    console.log('\nElements by dependency level:');
    
    // Find elements with no dependencies (in-degree 0)
    let queue = [];
    inDegree.forEach((degree, name) => {
        if (degree === 0) {
            queue.push(name);
        }
    });
    
    const result = [];
    const processed = new Set();
    let level = 0;
    
    while (queue.length > 0) {
        // Sort queue alphabetically for consistent ordering at the same topological level
        queue.sort();
        console.log(`Level ${level}: [${queue.join(', ')}]`);
        
        const currentLevel = [...queue];
        queue = [];
        
        // Process all elements at the current level
        currentLevel.forEach(current => {
            if (processed.has(current)) {
                return;
            }
            
            result.push(elementMap.get(current));
            processed.add(current);
            
            // Get children of current element
            const currentChildren = elementMap.get(current).children || [];
            
            // Reduce in-degree for each child
            currentChildren.forEach(childName => {
                if (inDegree.has(childName)) {
                    const newDegree = inDegree.get(childName) - 1;
                    inDegree.set(childName, newDegree);
                    if (newDegree === 0) {
                        queue.push(childName);
                    }
                }
            });
        });
        
        level++;
    }
    
    // Handle any remaining elements (cycle resolution)
    const remaining = [];
    elements.forEach(element => {
        if (!processed.has(element.name)) {
            remaining.push(element.name);
        }
    });
    
    if (remaining.length > 0) {
        console.log(`\nRemaining elements (potential cycles): [${remaining.sort().join(', ')}]`);
        remaining.sort().forEach(name => {
            result.push(elementMap.get(name));
        });
    }
    
    return result;
}

// Sort elements topologically with alphabetical ordering at each level
const sortedElements = topologicalSortAlphabetical(jsonData.elements);

// Update the JSON data
jsonData.elements = sortedElements;

// Write back to file
fs.writeFileSync('data/odata-edm-structure.json', JSON.stringify(jsonData, null, 4));

console.log(`\nTopological-alphabetical sort completed! Sorted ${sortedElements.length} elements.`);

// Show the new order with grouping by dependency level
console.log('\nFinal element order:');
sortedElements.forEach((element, index) => {
    const childrenCount = element.children ? element.children.length : 0;
    console.log(`${index + 1}. ${element.name} (${childrenCount} children)`);
});
