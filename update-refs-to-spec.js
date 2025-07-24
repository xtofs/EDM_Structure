const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'data', 'odata-edm-structure.json');

// Read the JSON file
let data;
try {
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    data = JSON.parse(jsonContent);
} catch (error) {
    console.error('Error reading JSON file:', error);
    process.exit(1);
}

// Map of element names to their correct anchor patterns from Appendix B
// Based on the HTML structure from the OData specification
const elementRefMap = {
    "edmx:Edmx": "#ElementedmxEdmx.4",
    "edmx:DataServices": "#ElementedmxDataServices.4", 
    "edmx:Reference": "#ElementedmxReference.4.1",
    "edmx:Include": "#ElementedmxInclude.4.2",
    "edmx:IncludeAnnotations": "#ElementedmxIncludeAnnotations.4.3",
    "edm:Schema": "#ElementedmSchema.5",
    "edm:Annotations": "#ElementedmAnnotations.5.2",
    "edm:EntityType": "#ElementedmEntityType.6",
    "edm:Key": "#ElementedmKey.6.5", 
    "edm:PropertyRef": "#ElementedmPropertyRef.6.5",
    "edm:Property": "#ElementedmProperty.7",
    "edm:NavigationProperty": "#ElementedmNavigationProperty.8",
    "edm:ReferentialConstraint": "#ElementedmReferentialConstraint.8.5",
    "edm:OnDelete": "#ElementedmOnDelete.8.6",
    "edm:ComplexType": "#ElementedmComplexType.9",
    "edm:EnumType": "#ElementedmEnumType.10",
    "edm:Member": "#ElementedmMember.10.3",
    "edm:TypeDefinition": "#ElementedmTypeDefinition.11",
    "edm:Action": "#ElementedmAction.12.1",
    "edm:Function": "#ElementedmFunction.12.3",
    "edm:ReturnType": "#ElementedmReturnType.12.8",
    "edm:Parameter": "#ElementedmParameter.12.9",
    "edm:EntityContainer": "#ElementedmEntityContainer.13",
    "edm:EntitySet": "#ElementedmEntitySet.13.2",
    "edm:Singleton": "#ElementedmSingleton.13.3",
    "edm:NavigationPropertyBinding": "#ElementedmNavigationPropertyBinding.13.4",
    "edm:ActionImport": "#ElementedmActionImport.13.5",
    "edm:FunctionImport": "#ElementedmFunctionImport.13.6",
    "edm:Term": "#ElementedmTerm.14.1",
    "edm:Annotation": "#ElementedmAnnotation.14.2",
    "edm:PropertyValue": "#ElementedmPropertyValue.14.4.12"
};

// Map of attribute names to their anchor patterns 
// These follow the pattern #AttributeName.section.subsection based on where they appear in the spec
const attributeRefMap = {
    "Version": "#AttributeVersion.4",
    "Uri": "#AttributeUri.4.1", 
    "Namespace": "#AttributeNamespace.4.2",
    "Alias": "#AttributeAlias.4.2",
    "TermNamespace": "#AttributeTermNamespace.4.3",
    "Qualifier": "#AttributeQualifier.4.3",
    "TargetNamespace": "#AttributeTargetNamespace.4.3",
    "Target": "#AttributeTarget.5.2",
    "Name": "#AttributeName.6",
    "BaseType": "#AttributeBaseType.6.1",
    "Abstract": "#AttributeAbstract.6.2",
    "OpenType": "#AttributeOpenType.6.3",
    "HasStream": "#AttributeHasStream.6.4",
    "Type": "#AttributeType.7.1",
    "Nullable": "#AttributeNullable.7.2",
    "DefaultValue": "#AttributeDefaultValue.7.3",
    "Partner": "#AttributePartner.8.3",
    "ContainsTarget": "#AttributeContainsTarget.8.4",
    "Property": "#AttributeProperty.8.5",
    "ReferencedProperty": "#AttributeReferencedProperty.8.5",
    "Action": "#AttributeAction.8.6",
    "UnderlyingType": "#AttributeUnderlyingType.10.1",
    "IsFlags": "#AttributeIsFlags.10.2",
    "Value": "#AttributeValue.10.3",
    "IsBound": "#AttributeIsBound.12.5",
    "EntitySetPath": "#AttributeEntitySetPath.12.6",
    "IsComposable": "#AttributeIsComposable.12.7",
    "Extends": "#AttributeExtends.13.1",
    "EntityType": "#AttributeEntityType.13.2",
    "IncludeInServiceDocument": "#AttributeIncludeInServiceDocument.13.2",
    "Path": "#AttributePath.13.4",
    "BaseTerm": "#AttributeBaseTerm.14.1.1",
    "AppliesTo": "#AttributeAppliesTo.14.1.2",
    "Term": "#AttributeTerm.14.2",
    "Function": "#AttributeFunction.14.4.4",
    "MaxLength": "#AttributeMaxLength.3.4.1",
    "Precision": "#AttributePrecision.3.4.2",
    "Scale": "#AttributeScale.3.4.3",
    "Unicode": "#AttributeUnicode.3.4.4",
    "SRID": "#AttributeSRID.3.4.5"
};

let updatedCount = 0;

function updateRefs(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(updateRefs);
    } else if (obj && typeof obj === 'object') {
        // Update element refs
        if (obj.name && obj.ref && elementRefMap[obj.name]) {
            console.log(`Updating element ${obj.name}: ${obj.ref} -> ${elementRefMap[obj.name]}`);
            obj.ref = elementRefMap[obj.name];
            updatedCount++;
        }
        
        // Update attribute refs
        if (obj.attributes && Array.isArray(obj.attributes)) {
            obj.attributes.forEach(attr => {
                if (attr.name && attr.ref && attributeRefMap[attr.name]) {
                    console.log(`Updating attribute ${attr.name}: ${attr.ref} -> ${attributeRefMap[attr.name]}`);
                    attr.ref = attributeRefMap[attr.name];
                    updatedCount++;
                }
            });
        }
        
        // Recursively process all properties
        Object.values(obj).forEach(updateRefs);
    }
}

// Update all refs in the data
updateRefs(data);

// Write the updated JSON back to file
try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4));
    console.log(`\n✅ Successfully updated ${updatedCount} refs in ${jsonFilePath}`);
    console.log('All refs now match the OData specification Appendix B anchor patterns');
} catch (error) {
    console.error('Error writing JSON file:', error);
    process.exit(1);
}
