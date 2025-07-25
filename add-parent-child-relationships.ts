import * as fs from 'fs';
import * as path from 'path';

// Read and parse the parent-child relationships CSV
const csvPath = path.join(__dirname, 'input-docs', 'parent_child_relationships.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV into parent-child relationships
const lines = csvContent.trim().split('\n');
const relationships: { parent: string; child: string }[] = [];

// Skip header line
for (let i = 1; i < lines.length; i++) {
    const [parent, child] = lines[i].split(',');
    if (parent && child) {
        relationships.push({ parent: parent.trim(), child: child.trim() });
    }
}

// Build lookup maps
const childrenByParent = new Map<string, string[]>();
const parentsByChild = new Map<string, string[]>();

relationships.forEach(({ parent, child }) => {
    // Build children lookup
    if (!childrenByParent.has(parent)) {
        childrenByParent.set(parent, []);
    }
    childrenByParent.get(parent)!.push(child);

    // Build parents lookup
    if (!parentsByChild.has(child)) {
        parentsByChild.set(child, []);
    }
    parentsByChild.get(child)!.push(parent);
});

// Load current JSON data
const jsonPath = path.join(__dirname, 'data', 'odata-edm-structure.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Add parent/child information to each element
data.elementGroups.forEach((group: any) => {
    group.elements.forEach((element: any) => {
        const elementName = element.name;
        
        // Add permitted children
        const children = childrenByParent.get(elementName) || [];
        if (children.length > 0) {
            element.permittedChildren = children;
        }
        
        // Add permitted parents
        const parents = parentsByChild.get(elementName) || [];
        if (parents.length > 0) {
            element.permittedParents = parents;
        }
    });
});

// Save updated JSON
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4));

console.log('✅ Added parent/child relationships to JSON data');
console.log(`📊 Processed ${relationships.length} relationships`);
console.log(`📊 ${childrenByParent.size} elements have children`);
console.log(`📊 ${parentsByChild.size} elements have parents`);
