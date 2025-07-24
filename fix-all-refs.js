const fs = require('fs');

// Load the JSON file
const jsonFile = 'data/odata-edm-structure.json';
const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// Comprehensive mapping from HTML - Element refs
const elementRefMap = {
    'edmx:Edmx': '#ElementedmxEdmx.2',
    'edmx:DataServices': '#ElementedmxDataServices.3',
    'edmx:Reference': '#ElementedmxReference.4',
    'edmx:Include': '#ElementedmxInclude.5',
    'edmx:IncludeAnnotations': '#ElementedmxIncludeAnnotations.6',
    'edm:Schema': '#ElementedmSchema.7',
    'edm:Annotations': '#ElementedmAnnotations.8',
    'edm:EntityType': '#ElementedmEntityType.9',
    'edm:Key': '#ElementedmKey.10',
    'edm:PropertyRef': '#ElementedmPropertyRef.11',
    'edm:Property': '#ElementedmProperty.12',
    'edm:NavigationProperty': '#ElementedmNavigationProperty.13',
    'edm:ReferentialConstraint': '#ElementedmReferentialConstraint.14',
    'edm:OnDelete': '#ElementedmOnDelete.15',
    'edm:ComplexType': '#ElementedmComplexType.16',
    'edm:EnumType': '#ElementedmEnumType.17',
    'edm:Member': '#ElementedmMember.18',
    'edm:TypeDefinition': '#ElementedmTypeDefinition.19',
    'edm:Action': '#ElementedmAction.20',
    'edm:Function': '#ElementedmFunction.21',
    'edm:ReturnType': '#ElementedmReturnType.22',
    'edm:Parameter': '#ElementedmParameter.23',
    'edm:EntityContainer': '#ElementedmEntityContainer.24',
    'edm:EntitySet': '#ElementedmEntitySet.25',
    'edm:Singleton': '#ElementedmSingleton.26',
    'edm:NavigationPropertyBinding': '#ElementedmNavigationPropertyBinding.27',
    'edm:ActionImport': '#ElementedmActionImport.28',
    'edm:FunctionImport': '#ElementedmFunctionImport.29',
    'edm:Term': '#ElementedmTerm.30',
    'edm:Annotation': '#ElementedmAnnotation.31',
    'edm:Binary': '#ExpressionedmBinary.32',
    'edm:Bool': '#ExpressionedmBool.33',
    'edm:Date': '#ExpressionedmDate.34',
    'edm:DateTimeOffset': '#ExpressionedmDateTimeOffset.35',
    'edm:Decimal': '#ExpressionedmDecimal.36',
    'edm:Duration': '#ExpressionedmDuration.37',
    'edm:EnumMember': '#ExpressionedmEnumMember.38',
    'edm:Float': '#ExpressionedmFloat.39',
    'edm:Guid': '#ExpressionedmGuid.40',
    'edm:Int': '#ExpressionedmInt.41',
    'edm:String': '#ExpressionedmString.42',
    'edm:TimeOfDay': '#ExpressionedmTimeOfDay.43',
    'edm:AnnotationPath': '#ExpressionedmAnnotationPath.44',
    'edm:ModelElementPath': '#ExpressionedmModelElementPath.45',
    'edm:NavigationPropertyPath': '#ExpressionedmNavigationPropertyPath.46',
    'edm:PropertyPath': '#ExpressionedmPropertyPath.47',
    'edm:Path': '#ExpressionedmPath.48',
    'edm:And': '#ExpressionsedmAnd.49',
    'edm:Or': '#sec_Or',
    'edm:Not': '#ExpressionedmNot.50',
    'edm:Eq': '#ExpressionsedmEq.51',
    'edm:Ne': '#sec_Ne',
    'edm:Gt': '#sec_Gt',
    'edm:Ge': '#sec_Ge',
    'edm:Lt': '#sec_Lt',
    'edm:Le': '#sec_Le',
    'edm:Has': '#sec_Has',
    'edm:In': '#sec_In',
    'edm:Neg': '#ExpressionedmNeg.52',
    'edm:Add': '#ExpressionsedmAdd.53',
    'edm:Sub': '#sec_Sub',
    'edm:Mul': '#sec_Mul',
    'edm:Div': '#sec_Div',
    'edm:DivBy': '#sec_DivBy',
    'edm:Mod': '#sec_Mod',
    'edm:Apply': '#ExpressionedmApply.54',
    'edm:Cast': '#ExpressionedmCast.55',
    'edm:Collection': '#ExpressionedmCollection.56',
    'edm:If': '#ExpressionedmIf.57',
    'edm:IsOf': '#sec_IsOf',
    'edm:LabeledElement': '#ExpressionedmLabeledElement.59',
    'edm:LabeledElementReference': '#ExpressionedmLabeledElementReference.60',
    'edm:Null': '#ExpressionedmNull.61',
    'edm:Record': '#ExpressionedmRecord.62',
    'edm:PropertyValue': '#ElementedmPropertyValue.63',
    'edm:UrlRef': '#ExpressionedmUrlRef.64'
};

// Comprehensive mapping from HTML - Attribute refs
const attributeRefMap = {
    // Type Facet Attributes
    'MaxLength': '#AttributeMaxLength.1.1',
    'Precision': '#AttributePrecision.1.2',
    'Scale': '#AttributeScale.1.3',
    'Unicode': '#AttributeUnicode.1.4',
    'SRID': '#AttributeSRID.1.5',
    
    // edmx:Edmx attributes
    'Version': '#AttributeVersion.2.1',
    
    // edmx:Reference attributes  
    'Uri': '#AttributeUri.4.1',
    
    // edmx:Include attributes
    'Namespace': '#AttributeNamespace.5.1', // for edmx:Include context
    'Alias': '#AttributeAlias.5.2', // for edmx:Include context
    
    // edmx:IncludeAnnotations attributes
    'TermNamespace': '#AttributeTermNamespace.6.1',
    'Qualifier': '#AttributeQualifier.6.2', // for edmx:IncludeAnnotations context
    'TargetNamespace': '#AttributeTargetNamespace.6.3',
    
    // edm:Schema attributes
    // 'Namespace': '#AttributeNamespace.7.1', // for edm:Schema context - conflicts with above
    // 'Alias': '#AttributeAlias.7.2', // for edm:Schema context - conflicts with above
    
    // edm:Annotations attributes
    'Target': '#AttributeTarget.8.1',
    // 'Qualifier': '#AttributeQualifier.8.2', // for edm:Annotations context - conflicts with above
    
    // edm:EntityType attributes
    'Name': '#AttributeName.9.1', // Most common case - EntityType context
    'BaseType': '#AttributeBaseType.9.2',
    'Abstract': '#AttributeAbstract.9.3',
    'OpenType': '#AttributeOpenType.9.4',
    'HasStream': '#AttributeHasStream.9.5', // This is the main fix!
    
    // edm:PropertyRef attributes
    // 'Name': '#AttributeName.11.1', // conflicts with above
    // 'Alias': '#AttributeAlias.11.2', // conflicts with above
    
    // edm:Property attributes
    // 'Name': '#AttributeName.12.1', // conflicts with above
    'Type': '#AttributeType.12.2',
    'Nullable': '#AttributeNullable.12.3',
    'DefaultValue': '#AttributeDefaultValue.12.4',
    
    // edm:NavigationProperty attributes
    // 'Name': '#AttributeName.13.1', // conflicts with above
    // 'Type': '#AttributeType.13.2', // conflicts with above
    // 'Nullable': '#AttributeNullable.13.3', // conflicts with above
    'Partner': '#AttributePartner.13.4',
    'ContainsTarget': '#AttributeContainsTarget.13.5',
    
    // edm:ReferentialConstraint attributes
    'Property': '#AttributeProperty.14.1',
    'ReferencedProperty': '#AttributeReferencedProperty.14.2',
    
    // edm:OnDelete attributes
    'Action': '#AttributeAction.15.1',
    
    // edm:ComplexType attributes
    // 'Name': '#AttributeName.16.1', // conflicts with above
    // 'BaseType': '#AttributeBaseType.16.2', // conflicts with above
    // 'Abstract': '#AttributeAbstract.16.3', // conflicts with above
    // 'OpenType': '#AttributeOpenType.16.4', // conflicts with above
    
    // edm:EnumType attributes
    // 'Name': '#AttributeName.17.1', // conflicts with above
    'UnderlyingType': '#AttributeUnderlyingType.17.2',
    'IsFlags': '#AttributeIsFlags.17.3',
    
    // edm:Member attributes
    // 'Name': '#AttributeName.18.1', // conflicts with above
    'Value': '#AttributeValue.18.2',
    
    // edm:TypeDefinition attributes
    // 'Name': '#AttributeName.19.1', // conflicts with above
    // 'UnderlyingType': '#AttributeUnderlyingType.19.2', // conflicts with above
    
    // edm:Action attributes
    // 'Name': '#AttributeName.20.1', // conflicts with above
    
    // edm:Function attributes
    // 'Name': '#AttributeName.21.1', // conflicts with above
    'IsBound': '#AttributeIsBound.21.2',
    'EntitySetPath': '#AttributeEntitySetPath.21.3',
    'IsComposable': '#AttributeIsComposable.21.4',
    
    // edm:ReturnType attributes
    // 'Type': '#AttributeType.22.1', // conflicts with above
    // 'Nullable': '#AttributeNullable.22.2', // conflicts with above
    
    // edm:Parameter attributes
    // 'Name': '#AttributeName.23.1', // conflicts with above
    // 'Type': '#AttributeType.23.2', // conflicts with above
    // 'Nullable': '#AttributeNullable.23.3', // conflicts with above
    
    // edm:EntityContainer attributes
    // 'Name': '#AttributeName.24.1', // conflicts with above
    'Extends': '#AttributeExtends.24.2',
    
    // edm:EntitySet attributes
    // 'Name': '#AttributeName.25.1', // conflicts with above
    'EntityType': '#AttributeEntityType.25.2',
    'IncludeInServiceDocument': '#AttributeIncludeInServiceDocument.25.3',
    
    // edm:Singleton attributes
    // 'Name': '#AttributeName.26.1', // conflicts with above
    // 'Type': '#AttributeType.26.2', // conflicts with above
    
    // Other common attribute mappings
    'Path': '#AttributePath.13.4', // Common path attribute
    'EntitySet': '#AttributeEntitySet',
    'Function': '#AttributeFunction.14.4.4',
    'BaseTerm': '#AttributeBaseTerm.14.1.1',
    'AppliesTo': '#AttributeAppliesTo.14.1.2',
    'Term': '#AttributeTerm.14.2'
};

let updateCount = 0;

function updateRefs(obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            obj.forEach(updateRefs);
        } else {
            // Update element refs
            if (obj.name && obj.ref && elementRefMap[obj.name]) {
                const oldRef = obj.ref;
                const newRef = elementRefMap[obj.name];
                if (oldRef !== newRef) {
                    obj.ref = newRef;
                    updateCount++;
                    console.log(`Updated element ${obj.name}: ${oldRef} → ${newRef}`);
                }
            }
            
            // Update attribute refs
            if (obj.attributes && Array.isArray(obj.attributes)) {
                obj.attributes.forEach(attr => {
                    if (attr.name && attr.ref && attributeRefMap[attr.name]) {
                        const oldRef = attr.ref;
                        const newRef = attributeRefMap[attr.name];
                        if (oldRef !== newRef) {
                            attr.ref = newRef;
                            updateCount++;
                            console.log(`Updated attribute ${attr.name}: ${oldRef} → ${newRef}`);
                        }
                    }
                });
            }
            
            // Recursively process all object properties
            Object.values(obj).forEach(updateRefs);
        }
    }
}

console.log('Starting comprehensive ref update...');
updateRefs(data);

// Write the updated data back to the file
fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4));
console.log(`\nCompleted! Updated ${updateCount} references total.`);
