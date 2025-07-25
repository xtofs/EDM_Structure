const fs = require('fs');
const path = require('path');

// Load the JSON data
const jsonPath = path.join(__dirname, 'data', 'odata-edm-structure.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Common attribute refs based on OData CSDL specification
const attributeRefs = {
    "Name": "#AttributeName",
    "Alias": "#AttributeAlias", 
    "Namespace": "#AttributeNamespace",
    "Target": "#AttributeTarget",
    "Qualifier": "#AttributeQualifier",
    "Abstract": "#AttributeAbstract",
    "OpenType": "#AttributeOpenType",
    "HasStream": "#AttributeHasStream",
    "Nullable": "#AttributeNullable",
    "DefaultValue": "#AttributeDefaultValue",
    "IsBound": "#AttributeIsBound",
    "IsComposable": "#AttributeIsComposable",
    "EntitySetPath": "#AttributeEntitySetPath",
    "Partner": "#AttributePartner",
    "ContainsTarget": "#AttributeContainsTarget",
    "Property": "#AttributeProperty",
    "ReferencedProperty": "#AttributeReferencedProperty",
    "Action": "#AttributeAction",
    "Extends": "#AttributeExtends",
    "EntityType": "#AttributeEntityType",
    "IncludeInServiceDocument": "#AttributeIncludeInServiceDocument",
    "Path": "#AttributePath",
    "Function": "#AttributeFunction",
    "EntitySet": "#AttributeEntitySet",
    "BaseTerm": "#AttributeBaseTerm",
    "AppliesTo": "#AttributeAppliesTo",
    "Term": "#AttributeTerm",
    "Version": "#AttributeVersion",
    "Uri": "#AttributeUri",
    "TermNamespace": "#AttributeTermNamespace",
    "TargetNamespace": "#AttributeTargetNamespace",
    "Value": "#AttributeValue",
    "UnderlyingType": "#AttributeUnderlyingType",
    "IsFlags": "#AttributeIsFlags"
};

// Add missing refs to attributes
function addMissingRefs(data) {
    for (const group of data.elementGroups) {
        for (const element of group.elements) {
            for (const attribute of element.attributes) {
                if (!attribute.ref && attributeRefs[attribute.name]) {
                    attribute.ref = attributeRefs[attribute.name];
                    console.log(`Added ref for ${element.name}.${attribute.name}: ${attribute.ref}`);
                }
                // Special case for Type attribute which has different refs
                if (attribute.name === "Type" && !attribute.ref) {
                    if (attribute.ref === undefined) {
                        attribute.ref = "#AttributeType";
                        console.log(`Added ref for ${element.name}.${attribute.name}: ${attribute.ref}`);
                    }
                }
            }
        }
    }
    return data;
}

// Update the data
const updatedData = addMissingRefs(data);

// Save the updated JSON
fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 4));
console.log('Successfully added missing refs to JSON structure');
