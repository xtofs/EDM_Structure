import * as fs from 'fs';
import * as path from 'path';

interface ParentChild {
  parent: string;
  child: string;
}

interface Element {
  name: string;
  permittedChildren?: string[];
  [key: string]: any;
}

interface ElementGroup {
  name: string;
  elements: Element[];
}

interface ODataStructure {
  elementGroups: ElementGroup[];
  [key: string]: any;
}

// Read CSV file and parse parent-child relationships
function parseCSV(csvPath: string): ParentChild[] {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');
  const relationships: ParentChild[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const [parent, child] = lines[i].split(',');
    relationships.push({ parent: parent.trim(), child: child.trim() });
  }
  
  return relationships;
}

// Update JSON structure with permitted children
function updatePermittedChildren(jsonPath: string, csvPath: string): void {
  console.log('🔍 Reading CSV file...');
  const relationships = parseCSV(csvPath);
  
  console.log('📊 Found', relationships.length, 'parent-child relationships');
  
  console.log('📖 Reading JSON file...');
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
  const data: ODataStructure = JSON.parse(jsonContent);
  
  // Create a map of parent -> children
  const parentChildMap = new Map<string, string[]>();
  
  for (const rel of relationships) {
    if (!parentChildMap.has(rel.parent)) {
      parentChildMap.set(rel.parent, []);
    }
    parentChildMap.get(rel.parent)!.push(rel.child);
  }
  
  console.log('🔧 Updating elements...');
  let updatedCount = 0;
  let alreadyHadChildren = 0;
  
  // Update each element with its permitted children
  for (const group of data.elementGroups) {
    for (const element of group.elements) {
      const children = parentChildMap.get(element.name);
      
      if (children && children.length > 0) {
        if (element.permittedChildren && element.permittedChildren.length > 0) {
          // Element already has children defined, check if we need to merge
          const existingChildren = new Set(element.permittedChildren);
          const newChildren = children.filter(child => !existingChildren.has(child));
          
          if (newChildren.length > 0) {
            element.permittedChildren = [...element.permittedChildren, ...newChildren].sort();
            console.log(`  📝 Updated ${element.name} (added ${newChildren.length} new children)`);
            updatedCount++;
          } else {
            console.log(`  ✅ ${element.name} already has all children defined`);
            alreadyHadChildren++;
          }
        } else {
          // Element doesn't have children defined, add them
          element.permittedChildren = children.sort();
          console.log(`  ➕ Added permittedChildren to ${element.name} (${children.length} children)`);
          updatedCount++;
        }
      }
    }
  }
  
  console.log('💾 Writing updated JSON file...');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4));
  
  console.log('✅ Update completed!');
  console.log(`📊 Elements updated: ${updatedCount}`);
  console.log(`📊 Elements already had children: ${alreadyHadChildren}`);
  console.log(`📊 Total parent-child relationships processed: ${relationships.length}`);
}

// Main execution
const csvPath = path.join(__dirname, 'input-docs', 'parent_child_relationships.csv');
const jsonPath = path.join(__dirname, 'data', 'odata-edm-structure.json');

console.log('🚀 Starting update process...');
console.log('📁 CSV file:', csvPath);
console.log('📁 JSON file:', jsonPath);

updatePermittedChildren(jsonPath, csvPath);
