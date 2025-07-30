const fs = require('fs');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('data/odata-edm-structure.json', 'utf8'));

console.log(`Starting to add targets to reference attributes...`);

// Define mappings of reference attribute names to their target types
const referenceTargets = {
    // ComplexType and EntityType references
    'BaseType': ['ComplexType', 'EntityType'],
    
    // Action and Function references
    'Action': ['Action'],
    'Function': ['Function'],
    
    // EntityType references
    'EntityType': ['EntityType'],
    'Type': ['EntityType', 'ComplexType', 'EnumType', 'TypeDefinition', 'PrimitiveType'],
    
    // EntityContainer references
    'Extends': ['EntityContainer'],
    
    // EntitySet and Singleton references
    'EntitySet': ['EntitySet', 'Singleton'],
    
    // Term references
    'Term': ['Term'],
    'BaseTerm': ['Term'],
    
    // Namespace references (these point to Schema elements)
    'Namespace': ['Schema'],
    'TermNamespace': ['Schema'],
    'TargetNamespace': ['Schema'],
    
    // Primitive type references
    'UnderlyingType': ['PrimitiveType', 'EnumType']
};

// Function to determine targets based on attribute name and context
function determineTargets(attributeName, elementName, description) {
    // Direct mapping from attribute name
    if (referenceTargets[attributeName]) {
        return referenceTargets[attributeName];
    }
    
    // Special cases based on description or context
    if (description.includes('qualified entity type')) {
        return ['EntityType'];
    }
    
    if (description.includes('qualified entity container')) {
        return ['EntityContainer'];
    }
    
    if (description.includes('qualified action name')) {
        return ['Action'];
    }
    
    if (description.includes('qualified function name')) {
        return ['Function'];
    }
    
    if (description.includes('qualified term name')) {
        return ['Term'];
    }
    
    if (description.includes('namespace reference')) {
        return ['Schema'];
    }
    
    if (description.includes('qualified type name')) {
        return ['EntityType', 'ComplexType', 'EnumType', 'TypeDefinition', 'PrimitiveType'];
    }
    
    if (description.includes('primitive type')) {
        return ['PrimitiveType'];
    }
    
    if (description.includes('entity set')) {
        return ['EntitySet'];
    }
    
    // Default fallback - this should be rare
    console.log(`⚠️  Could not determine targets for: ${attributeName} in ${elementName} - "${description}"`);
    return ['Unknown'];
}

// Process all elements and their attributes
let processedCount = 0;
let referenceAttributeCount = 0;

jsonData.elements.forEach((element, elementIndex) => {
    element.attributes.forEach((attribute, attributeIndex) => {
        if (attribute.category === 'reference') {
            referenceAttributeCount++;
            
            // Determine the targets
            const targets = determineTargets(attribute.name, element.name, attribute.description || '');
            
            // Add the targets property after subcategory (or at the end if no subcategory)
            const newAttribute = { ...attribute };
            
            // Reorder properties: category, description, name, ref, subcategory, targets, then others
            const orderedAttribute = {};
            if (newAttribute.category) orderedAttribute.category = newAttribute.category;
            if (newAttribute.description) orderedAttribute.description = newAttribute.description;
            if (newAttribute.name) orderedAttribute.name = newAttribute.name;
            if (newAttribute.ref) orderedAttribute.ref = newAttribute.ref;
            if (newAttribute.subcategory) orderedAttribute.subcategory = newAttribute.subcategory;
            
            // Add targets
            orderedAttribute.targets = targets;
            
            // Add any remaining properties
            Object.keys(newAttribute).forEach(key => {
                if (!['category', 'description', 'name', 'ref', 'subcategory'].includes(key)) {
                    orderedAttribute[key] = newAttribute[key];
                }
            });
            
            // Update the attribute in the data
            jsonData.elements[elementIndex].attributes[attributeIndex] = orderedAttribute;
            
            console.log(`${referenceAttributeCount}. ${element.name}.${attribute.name} -> targets: [${targets.join(', ')}]`);
            processedCount++;
        }
    });
});

// Write back to file
fs.writeFileSync('data/odata-edm-structure.json', JSON.stringify(jsonData, null, 4));

console.log(`\nTargets addition completed!`);
console.log(`Processed ${processedCount} reference attributes across ${jsonData.elements.length} elements.`);
console.log('Reference attributes now include "targets" property indicating what element types they can reference.');
