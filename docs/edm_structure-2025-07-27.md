# OData EDM model structure

## Overview

This document lists all EDM model elements, their attributes and relationships. It [categorizes the attributes](#attribute-categories) in different types (basic, reference, ..) and describes their semantics in detail . It is based on the OASIS OData CSDL XML Representation Version 4.02 specification, and adds the details about allowed values, symbolic references and constraints for elements and attributes.

## EDM Model Elements

## edm:Action Element

Actions are service-defined operations that may have observable side effects and may return a single instance or a collection of instances of any type. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAction.20" target="_blank" rel="noopener noreferrer">edm:Action ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element), [edm:Parameter](#edmparameter-element), [edm:ReturnType](#edmreturntype-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The action’s name. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2" target="_blank" rel="noopener noreferrer">IsBound ↗</a> |
| EntitySetPath | Path (Relative Path) | entity set path expression<br/>*Context: relative to the action's parameters when bound* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3" target="_blank" rel="noopener noreferrer">EntitySetPath ↗</a> |

## edm:ActionImport Element

Action imports allow exposing actions from an entity container. Each action import must specify the action it imports and the EntitySet or Singleton that exposes it. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmActionImport.28" target="_blank" rel="noopener noreferrer">edm:ActionImport ↗</a>


 Parent Elements: [edm:EntityContainer](#edmentitycontainer-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The ActionImport's name. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.28.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Action | Reference (Absolute Reference) | qualified unbound action name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.28.2" target="_blank" rel="noopener noreferrer">Action ↗</a> |
| EntitySet | Reference (Relative Reference) | entity set name or target path<br/>*Context: relative to the containing entity container* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySet.28.3" target="_blank" rel="noopener noreferrer">EntitySet ↗</a> |

## edm:Annotation Element

An annotation applies a term to a model element and defines how to calculate a value for the term application. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotation.31" target="_blank" rel="noopener noreferrer">edm:Annotation ↗</a>


 Parent Elements: [edm:Annotations](#edmannotations-element), [edm:EntityType](#edmentitytype-element), [edm:Property](#edmproperty-element), [edm:NavigationProperty](#edmnavigationproperty-element), [edm:ReferentialConstraint](#edmreferentialconstraint-element), [edm:ComplexType](#edmcomplextype-element), [edm:EnumType](#edmenumtype-element), [edm:Member](#edmmember-element), [edm:TypeDefinition](#edmtypedefinition-element), [edm:Action](#edmaction-element), [edm:Function](#edmfunction-element), [edm:ReturnType](#edmreturntype-element), [edm:Parameter](#edmparameter-element), [edm:EntityContainer](#edmentitycontainer-element), [edm:EntitySet](#edmentityset-element), [edm:Singleton](#edmsingleton-element), [edm:NavigationPropertyBinding](#edmnavigationpropertybinding-element), [edm:ActionImport](#edmactionimport-element), [edm:FunctionImport](#edmfunctionimport-element), [edm:Term](#edmterm-element), [edm:Annotation](#edmannotation-element), [edmx:Include](#edmxinclude-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Term | Reference | qualified term name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTerm.31.1" target="_blank" rel="noopener noreferrer">Term ↗</a> |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Qualifier" target="_blank" rel="noopener noreferrer">Qualifier ↗</a> |

## edm:Annotations Element

Used to apply a group of annotations to a single model element. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8" target="_blank" rel="noopener noreferrer">edm:Annotations ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Target | Path (Absolute Path) | target path expression<br/>*Context: can reference any model element* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1" target="_blank" rel="noopener noreferrer">Target ↗</a> |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2" target="_blank" rel="noopener noreferrer">Qualifier ↗</a> |

## edm:ComplexType Element

Complex types are keyless nominal structured types. The lack of a key means that instances of complex types cannot be referenced, created, updated or deleted independently of an entity type. Complex types allow entity models to group properties into common structures. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmComplexType.16" target="_blank" rel="noopener noreferrer">edm:ComplexType ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element), [edm:Property](#edmproperty-element), [edm:NavigationProperty](#edmnavigationproperty-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| BaseType | Reference (Absolute Reference) | qualified name of a edm:ComplexType | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2" target="_blank" rel="noopener noreferrer">BaseType ↗</a> |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3" target="_blank" rel="noopener noreferrer">Abstract ↗</a> |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4" target="_blank" rel="noopener noreferrer">OpenType ↗</a> |

## edm:EntityContainer Element

Entity containers define the entity sets, singletons, function and action imports exposed by the service. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityContainer.24" target="_blank" rel="noopener noreferrer">edm:EntityContainer ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:ActionImport](#edmactionimport-element), [edm:Annotation](#edmannotation-element), [edm:EntitySet](#edmentityset-element), [edm:FunctionImport](#edmfunctionimport-element), [edm:Singleton](#edmsingleton-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The EntityContainer's name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Extends | Reference (Absolute Reference) | qualified entity container name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeExtends.24.2" target="_blank" rel="noopener noreferrer">Extends ↗</a> |

## edm:EntitySet Element

Entity sets are top-level collection-valued resources. An entity set is identified by its name and must specify a type that must be an entity type in scope. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntitySet.25" target="_blank" rel="noopener noreferrer">edm:EntitySet ↗</a>


 Parent Elements: [edm:EntityContainer](#edmentitycontainer-element)

 Child Elements: [edm:NavigationPropertyBinding](#edmnavigationpropertybinding-element), [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The value of Name is the entity set’s name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| EntityType | Reference (Absolute Reference) | qualified entity type name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntityType.25.2" target="_blank" rel="noopener noreferrer">EntityType ↗</a> |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3" target="_blank" rel="noopener noreferrer">IncludeInServiceDocument ↗</a> |

## edm:EntityType Element

An entity type is the template for an entity: any uniquely identifiable record. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityType.9" target="_blank" rel="noopener noreferrer">edm:EntityType ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element), [edm:Key](#edmkey-element), [edm:Property](#edmproperty-element), [edm:NavigationProperty](#edmnavigationproperty-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| BaseType | Reference (Absolute Reference) | qualified name of an edm:EntityType | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2" target="_blank" rel="noopener noreferrer">BaseType ↗</a> |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3" target="_blank" rel="noopener noreferrer">Abstract ↗</a> |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4" target="_blank" rel="noopener noreferrer">OpenType ↗</a> |
| HasStream | Basic (boolean) | Whether the entity type supports media resources | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeHasStream.9.5" target="_blank" rel="noopener noreferrer">HasStream ↗</a> |

## edm:EnumType Element

Enumeration types are nominal types that represent a non-empty series of related values. Enumeration types expose these related values as members of the enumeration. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEnumType.17" target="_blank" rel="noopener noreferrer">edm:EnumType ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element), [edm:Member](#edmmember-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The enumeration type’s name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| UnderlyingType | Reference | qualified name of and integer type<br/>*Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2" target="_blank" rel="noopener noreferrer">UnderlyingType ↗</a> |
| IsFlags | Basic (boolean) | Whether the enumeration supports bitwise operations | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsFlags.17.3" target="_blank" rel="noopener noreferrer">IsFlags ↗</a> |

## edm:Function Element

Function overloads allow functions to be defined with multiple different parameter sets. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunction.21" target="_blank" rel="noopener noreferrer">edm:Function ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element), [edm:Parameter](#edmparameter-element), [edm:ReturnType](#edmreturntype-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The function's name. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2" target="_blank" rel="noopener noreferrer">IsBound ↗</a> |
| EntitySetPath | Path (Relative Path) | entity set path expression<br/>*Context: relative to the function's parameters when bound* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3" target="_blank" rel="noopener noreferrer">EntitySetPath ↗</a> |
| IsComposable | Basic (boolean) | Whether the function can be used in composition with other functions | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsComposable.21.4" target="_blank" rel="noopener noreferrer">IsComposable ↗</a> |

## edm:FunctionImport Element

Function imports allow exposing functions from an entity container. All unbound overloads of the imported function can be invoked from the entity container. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunctionImport.29" target="_blank" rel="noopener noreferrer">edm:FunctionImport ↗</a>


 Parent Elements: [edm:EntityContainer](#edmentitycontainer-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The function import’s name. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.29.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Function | Reference (Absolute Reference) | qualified unbound function name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeFunction.29.2" target="_blank" rel="noopener noreferrer">Function ↗</a> |
| EntitySet | Reference (Relative Reference) | entity set name or target path<br/>*Context: relative to the containing entity container* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.29.4" target="_blank" rel="noopener noreferrer">EntitySet ↗</a> |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3" target="_blank" rel="noopener noreferrer">IncludeInServiceDocument ↗</a> |

## edm:Key Element

An entity is uniquely identified within an entity set by its key. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmKey.10" target="_blank" rel="noopener noreferrer">edm:Key ↗</a>


 Parent Elements: [edm:EntityType](#edmentitytype-element)

 Child Elements: [edm:PropertyRef](#edmpropertyref-element)


*No attributes*

## edm:Member Element

Enumeration type values consist of discrete members. Each member is identified by its name and must specify an associated numeric value. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmMember.18" target="_blank" rel="noopener noreferrer">edm:Member ↗</a>


 Parent Elements: [edm:EnumType](#edmenumtype-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Value | Basic (integer) | integer value | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2" target="_blank" rel="noopener noreferrer">Value ↗</a> |

## edm:NavigationProperty Element

A navigation property allows navigation to related entities. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationProperty.13" target="_blank" rel="noopener noreferrer">edm:NavigationProperty ↗</a>


 Parent Elements: [edm:EntityType](#edmentitytype-element), [edm:ComplexType](#edmcomplextype-element)

 Child Elements: [edm:OnDelete](#edmondelete-element), [edm:ReferentialConstraint](#edmreferentialconstraint-element), [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Type | Reference (Absolute Reference) | qualified entity type name or collection of that | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |
| Partner | Path (Relative Path) | path to partner navigation property<br/>*Context: relative to the target entity type specified in Type attribute* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePartner.13.4" target="_blank" rel="noopener noreferrer">Partner ↗</a> |
| ContainsTarget | Basic (boolean) | Whether the navigation property contains its target entities | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeContainsTarget.13.5" target="_blank" rel="noopener noreferrer">ContainsTarget ↗</a> |

## edm:NavigationPropertyBinding Element

Navigation property bindings associate a navigation property with a target entity set or singleton, allowing navigation between entity sets. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationPropertyBinding.27" target="_blank" rel="noopener noreferrer">edm:NavigationPropertyBinding ↗</a>


 Parent Elements: [edm:EntitySet](#edmentityset-element), [edm:Singleton](#edmsingleton-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Path | Path (Relative Path) | navigation property path expression<br/>*Context: relative to the containing entity set's entity type* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePath.27.1" target="_blank" rel="noopener noreferrer">Path ↗</a> |
| Target | Path (Relative Path) | target path to entity set/singleton<br/>*Context: relative to the containing entity container* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.27.2" target="_blank" rel="noopener noreferrer">Target ↗</a> |

## edm:OnDelete Element

The action the service will take on related entities when the entity on which the navigation property is defined is deleted. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmOnDelete.15" target="_blank" rel="noopener noreferrer">edm:OnDelete ↗</a>


 Parent Elements: [edm:NavigationProperty](#edmnavigationproperty-element)

  No Child Elements


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Action | Basic (`Cascade`, `None`, `SetNull`, `SetDefault`) | action the service will take on related entities when the entity is deleted. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.15.1" target="_blank" rel="noopener noreferrer">Action ↗</a> |

## edm:Parameter Element

An action or function overload may specify parameters. Each parameter must have a name that is a simple identifier and must specify a type. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmParameter.23" target="_blank" rel="noopener noreferrer">edm:Parameter ↗</a>


 Parent Elements: [edm:Action](#edmaction-element), [edm:Function](#edmfunction-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Type | Reference | qualified type name or collection | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |

## edm:Property Element

A structural property is a property of a structured type <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmProperty.12" target="_blank" rel="noopener noreferrer">edm:Property ↗</a>


 Parent Elements: [edm:EntityType](#edmentitytype-element), [edm:ComplexType](#edmcomplextype-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Type | Reference | qualified type name or collection of that | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |
| DefaultValue | Basic (primitive value) | the model's value of the attribute when the attribute is not present in CSDL | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4" target="_blank" rel="noopener noreferrer">DefaultValue ↗</a> |
| Scale | Basic (non negative integer or `floating`, `variable`) | specifies the maximum number of digits allowed to the right of the decimal point. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4" target="_blank" rel="noopener noreferrer">Scale ↗</a> |

## edm:PropertyRef Element

An entity type’s key refers to the set of properties whose values uniquely identify an instance of the entity type within an entity set. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyRef.11" target="_blank" rel="noopener noreferrer">edm:PropertyRef ↗</a>


 Parent Elements: [edm:Key](#edmkey-element)

  No Child Elements


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Path (Relative Path) | path to structural property<br/>*Context: relative to the containing entity type* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Alias | Basic (simple identifier) | Alternative name that can be used to reference the property | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2" target="_blank" rel="noopener noreferrer">Alias ↗</a> |

## edm:ReferentialConstraint Element

Entity containers define the entity sets, singletons, function and action imports exposed by the service. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReferentialConstraint.14" target="_blank" rel="noopener noreferrer">edm:ReferentialConstraint ↗</a>


 Parent Elements: [edm:NavigationProperty](#edmnavigationproperty-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Property | Path (Relative Path) | path to dependent property<br/>*Context: relative to the containing navigation property's source entity type* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeProperty.14.1" target="_blank" rel="noopener noreferrer">Property ↗</a> |
| ReferencedProperty | Path (Relative Path) | path to principal property<br/>*Context: relative to the containing navigation property's target entity type* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeReferencedProperty.14.2" target="_blank" rel="noopener noreferrer">ReferencedProperty ↗</a> |

## edm:ReturnType Element

The return type of an action or function overload may be any type in scope, or a collection of any type in scope. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReturnType.22" target="_blank" rel="noopener noreferrer">edm:ReturnType ↗</a>


 Parent Elements: [edm:Action](#edmaction-element), [edm:Function](#edmfunction-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Type | Reference | qualified type name or collection | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |

## edm:Schema Element

One or more schemas describe the entity model exposed by an OData service. The schema acts as a namespace for elements of the entity model such as entity types, complex types, enumerations and terms. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7" target="_blank" rel="noopener noreferrer">edm:Schema ↗</a>


 Parent Elements: [edmx:DataServices](#edmxdataservices-element)

 Child Elements: [edm:EntityType](#edmentitytype-element), [edm:ComplexType](#edmcomplextype-element), [edm:EnumType](#edmenumtype-element), [edm:TypeDefinition](#edmtypedefinition-element), [edm:Action](#edmaction-element), [edm:Function](#edmfunction-element), [edm:EntityContainer](#edmentitycontainer-element), [edm:Term](#edmterm-element), [edm:Annotations](#edmannotations-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Namespace | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1" target="_blank" rel="noopener noreferrer">Namespace ↗</a> |
| Alias | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2" target="_blank" rel="noopener noreferrer">Alias ↗</a> |

## edm:Singleton Element

Singletons are top-level single-valued resources. A singleton is identified by its name and must specify a type that must be an entity type in scope. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSingleton.26" target="_blank" rel="noopener noreferrer">edm:Singleton ↗</a>


 Parent Elements: [edm:EntityContainer](#edmentitycontainer-element)

 Child Elements: [edm:NavigationPropertyBinding](#edmnavigationpropertybinding-element), [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The value of Name is the singleton's name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Type | Reference (Absolute Reference) | qualified entity type name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |

## edm:Term Element

A term allows annotating a model element or OData resource representation with additional data. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTerm.30" target="_blank" rel="noopener noreferrer">edm:Term ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The term’s name. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.30.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| Type | Reference | qualified type name or collection | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.30.2" target="_blank" rel="noopener noreferrer">Type ↗</a> |
| Nullable | Basic (boolean) | Whether the property can have null values | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.30.3" target="_blank" rel="noopener noreferrer">Nullable ↗</a> |
| DefaultValue | Basic (primitive value) | primitive value | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.30.4" target="_blank" rel="noopener noreferrer">DefaultValue ↗</a> |
| BaseTerm | Reference | qualified term name | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseTerm.30.5" target="_blank" rel="noopener noreferrer">BaseTerm ↗</a> |
| AppliesTo | Basic (`Action`, `ActionImport`, `Annotation`, `Apply`, `Cast`, `Collection`, `ComplexType`, `EntityContainer`, `EntitySet`, `EntityType`, `EnumType`, `Function`, `FunctionImport`, `If`, `Include`, `IsOf`, `LabeledElement`, `Member`, `NavigationProperty`, `Null`, `OnDelete`, `Parameter`, `Property`, `PropertyValue`, `Record`, `Reference`, `ReferentialConstraint`, `ReturnType`, `Schema`, `Singleton`, `Term`, `TypeDefinition`, `UrlRef`) | specifies a list of model elements to which the term MAY be applied to. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Applicability" target="_blank" rel="noopener noreferrer">AppliesTo ↗</a> |

## edm:TypeDefinition Element

A type definition defines a specialization of one of the primitive types. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTypeDefinition.19" target="_blank" rel="noopener noreferrer">edm:TypeDefinition ↗</a>


 Parent Elements: [edm:Schema](#edmschema-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Name | Basic (simple identifier) | The name identifier of the element | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1" target="_blank" rel="noopener noreferrer">Name ↗</a> |
| UnderlyingType | Reference | qualified name of primitive type<br/>*Constraints: cannot be another type definition* | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2" target="_blank" rel="noopener noreferrer">UnderlyingType ↗</a> |

## edmx:DataServices Element

The edmx:DataServices contains one or more edm:Schema elements. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxDataServices.3" target="_blank" rel="noopener noreferrer">edmx:DataServices ↗</a>


 Parent Elements: [edmx:Edmx](#edmxedmx-element)

 Child Elements: [edm:Schema](#edmschema-element)


*No attributes*

## edmx:Edmx Element

The root element of a CSDL XML document. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxEdmx.2" target="_blank" rel="noopener noreferrer">edmx:Edmx ↗</a>



 Child Elements: [edmx:DataServices](#edmxdataservices-element), [edmx:Reference](#edmxreference-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Version | Basic (string) | version number string | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeVersion.2.1" target="_blank" rel="noopener noreferrer">Version ↗</a> |

## edmx:Include Element

Specifies a schema to include from the referenced CSDL document. <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxInclude.5" target="_blank" rel="noopener noreferrer">edmx:Include ↗</a>


 Parent Elements: [edmx:Reference](#edmxreference-element)

 Child Elements: [edm:Annotation](#edmannotation-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Namespace | Reference | namespace reference | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1" target="_blank" rel="noopener noreferrer">Namespace ↗</a> |
| Alias | Basic (simple identifier) | The value that can be used in qualified names instead of the namespace. | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2" target="_blank" rel="noopener noreferrer">Alias ↗</a> |

## edmx:IncludeAnnotations Element

Specifies the annotations to include from the referenced CSDL document. Add <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxIncludeAnnotations.6" target="_blank" rel="noopener noreferrer">edmx:IncludeAnnotations ↗</a>


 Parent Elements: [edmx:Reference](#edmxreference-element)

  No Child Elements


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| TermNamespace | Reference | namespace reference | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTermNamespace.6.1" target="_blank" rel="noopener noreferrer">TermNamespace ↗</a> |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2" target="_blank" rel="noopener noreferrer">Qualifier ↗</a> |
| TargetNamespace | Reference | namespace reference | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTargetNamespace.6.3" target="_blank" rel="noopener noreferrer">TargetNamespace ↗</a> |

## edmx:Reference Element

specifies external CSDL documents <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxReference.4" target="_blank" rel="noopener noreferrer">edmx:Reference ↗</a>


 Parent Elements: [edmx:Edmx](#edmxedmx-element)

 Child Elements: [edmx:Include](#edmxinclude-element), [edmx:IncludeAnnotations](#edmxincludeannotations-element)


 Attributes

| Name | Type | Description | docs |
|------|------|-------------|------|
| Uri | Basic (uri) | URI string | <a href="https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUri.4.1" target="_blank" rel="noopener noreferrer">Uri ↗</a> |

## Attribute Categories

### Basic Attributes

Basic Attribute are primitive like strings, booleans, numbers, ... that are just data, associated with the model element ( )

- **boolean**: truth value:  true of false

- **simple-identifier**: Simple name identifier following XML naming rules

- **integer**: Whole number value

- **positive-integer**: Integer value greater than zero

- **non-negative-integer**: Integer value greater than or equal to zero

- **uri**: Uniform Resource Identifier

- **primitive-value**: any primitive value (string, number, boolean, etc.)

### Path Attributes

Path expressions in form of a sequence of model element names. Represented in XML/JSON as a string of element names with delimiters

- **Absolute Path**: Paths that are naming connected elements by starting from the root of the model

- **Relative Path**: Paths that are resolved relative to a specific element context

### Reference Attributes

Reference Attributes are symbolic references to model elements. They are epresented in CSDL XML/JSON as qualified names, type names, target paths, etc.

- **Absolute Reference**: symbolic references that reference elements anywhere in the model

- **Relative Reference**: symbolic references that reference elements relative to a specific ancestor (or related) context element

## Document Source

This document was generated from an JSON file. The source content is provided below for reference.

<pre><code class="language-json">{
  "metadata": {
    "title": "OData EDM model structure",
    "description": "This document lists all EDM model elements, their attributes and relationships. It [categorizes the attributes](#attribute-categories) in different types (basic, reference, ..) and describes their semantics in detail . It is based on the OASIS OData CSDL XML Representation Version 4.02 specification, and adds the details about allowed values, symbolic references and constraints for elements and attributes.",
    "baseUrl": "https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html",
    "source": "odata-edm-structure.json",
    "sourceUrl": "https://github.com/xtofs/EDM_Structure/blob/953bf6fea5979ef0c4824aac2493c2e4c8ede60e/data/odata-edm-structure.json",
    "version": "4.02"
  },
  "elements": [
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The action’s name."
        },
        {
          "category": "basic",
          "description": "Whether the action/function is bound to a specific entity type",
          "name": "IsBound",
          "ref": "#AttributeIsBound.21.2",
          "subcategory": "boolean"
        },
        {
          "category": "path",
          "context": "relative to the action's parameters when bound",
          "description": "entity set path expression",
          "name": "EntitySetPath",
          "ref": "#AttributeEntitySetPath.21.3",
          "subcategory": "Relative Path"
        }
      ],
      "name": "edm:Action",
      "children": [
        "edm:Annotation",
        "edm:Parameter",
        "edm:ReturnType"
      ],
      "ref": "#ElementedmAction.20",
      "description": "Actions are service-defined operations that may have observable side effects and may return a single instance or a collection of instances of any type."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.28.1",
          "subcategory": "simple-identifier",
          "description": "The ActionImport's name."
        },
        {
          "category": "reference",
          "description": "qualified unbound action name",
          "name": "Action",
          "ref": "#AttributeAction.28.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "reference",
          "context": "relative to the containing entity container",
          "description": "entity set name or target path",
          "name": "EntitySet",
          "ref": "#AttributeEntitySet.28.3",
          "subcategory": "Relative Reference"
        }
      ],
      "name": "edm:ActionImport",
      "ref": "#ElementedmActionImport.28",
      "description": "Action imports allow exposing actions from an entity container. Each action import must specify the action it imports and the EntitySet or Singleton that exposes it.",
      "children": [
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "reference",
          "description": "qualified term name",
          "name": "Term",
          "ref": "#AttributeTerm.31.1"
        },
        {
          "category": "basic",
          "description": "Optional qualifier to distinguish multiple instances",
          "name": "Qualifier",
          "ref": "#Qualifier",
          "subcategory": "simple-identifier"
        }
      ],
      "name": "edm:Annotation",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmAnnotation.31",
      "description": "An annotation applies a term to a model element and defines how to calculate a value for the term application."
    },
    {
      "attributes": [
        {
          "category": "path",
          "context": "can reference any model element",
          "description": "target path expression",
          "name": "Target",
          "ref": "#AttributeTarget.8.1",
          "subcategory": "Absolute Path"
        },
        {
          "category": "basic",
          "description": "Optional qualifier to distinguish multiple instances",
          "name": "Qualifier",
          "ref": "#AttributeQualifier.6.2",
          "subcategory": "simple-identifier"
        }
      ],
      "name": "edm:Annotations",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmAnnotations.8",
      "description": "Used to apply a group of annotations to a single model element."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "qualified name of a edm:ComplexType",
          "name": "BaseType",
          "ref": "#AttributeBaseType.9.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "basic",
          "description": "Whether the type is abstract and cannot be instantiated directly",
          "name": "Abstract",
          "ref": "#AttributeAbstract.9.3",
          "subcategory": "boolean"
        },
        {
          "category": "basic",
          "description": "Whether the type allows additional properties not explicitly declared",
          "name": "OpenType",
          "ref": "#AttributeOpenType.9.4",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:ComplexType",
      "children": [
        "edm:Annotation",
        "edm:Property",
        "edm:NavigationProperty"
      ],
      "ref": "#ElementedmComplexType.16",
      "description": "Complex types are keyless nominal structured types. The lack of a key means that instances of complex types cannot be referenced, created, updated or deleted independently of an entity type. Complex types allow entity models to group properties into common structures."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The EntityContainer's name"
        },
        {
          "category": "reference",
          "description": "qualified entity container name",
          "name": "Extends",
          "ref": "#AttributeExtends.24.2",
          "subcategory": "Absolute Reference"
        }
      ],
      "name": "edm:EntityContainer",
      "children": [
        "edm:ActionImport",
        "edm:Annotation",
        "edm:EntitySet",
        "edm:FunctionImport",
        "edm:Singleton"
      ],
      "ref": "#ElementedmEntityContainer.24",
      "description": "Entity containers define the entity sets, singletons, function and action imports exposed by the service."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The value of Name is the entity set’s name"
        },
        {
          "category": "reference",
          "description": "qualified entity type name",
          "name": "EntityType",
          "ref": "#AttributeEntityType.25.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "basic",
          "description": "Whether to include this element in the service document",
          "name": "IncludeInServiceDocument",
          "ref": "#AttributeIncludeInServiceDocument.25.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:EntitySet",
      "ref": "#ElementedmEntitySet.25",
      "description": "Entity sets are top-level collection-valued resources. An entity set is identified by its name and must specify a type that must be an entity type in scope.",
      "children": [
        "edm:NavigationPropertyBinding",
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The entity type’s name that MUST be unique within its schema.",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "qualified name of an edm:EntityType",
          "name": "BaseType",
          "ref": "#AttributeBaseType.9.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "basic",
          "description": "Whether the type is abstract and cannot be instantiated directly",
          "name": "Abstract",
          "ref": "#AttributeAbstract.9.3",
          "subcategory": "boolean"
        },
        {
          "category": "basic",
          "description": "Whether the type allows additional properties not explicitly declared",
          "name": "OpenType",
          "ref": "#AttributeOpenType.9.4",
          "subcategory": "boolean"
        },
        {
          "category": "basic",
          "description": "Whether the entity type supports media resources",
          "name": "HasStream",
          "ref": "#AttributeHasStream.9.5",
          "subcategory": "boolean"
        }
      ],
      "description": "An entity type is the template for an entity: any uniquely identifiable record.",
      "name": "edm:EntityType",
      "children": [
        "edm:Annotation",
        "edm:Key",
        "edm:Property",
        "edm:NavigationProperty"
      ],
      "ref": "#ElementedmEntityType.9"
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The enumeration type’s name"
        },
        {
          "category": "reference",
          "constraints": "restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64",
          "description": "qualified name of and integer type",
          "name": "UnderlyingType",
          "ref": "#AttributeUnderlyingType.17.2"
        },
        {
          "category": "basic",
          "description": "Whether the enumeration supports bitwise operations",
          "name": "IsFlags",
          "ref": "#AttributeIsFlags.17.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:EnumType",
      "children": [
        "edm:Annotation",
        "edm:Member"
      ],
      "ref": "#ElementedmEnumType.17",
      "description": "Enumeration types are nominal types that represent a non-empty series of related values. Enumeration types expose these related values as members of the enumeration."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The function's name."
        },
        {
          "category": "basic",
          "description": "Whether the action/function is bound to a specific entity type",
          "name": "IsBound",
          "ref": "#AttributeIsBound.21.2",
          "subcategory": "boolean"
        },
        {
          "category": "path",
          "context": "relative to the function's parameters when bound",
          "description": "entity set path expression",
          "name": "EntitySetPath",
          "ref": "#AttributeEntitySetPath.21.3",
          "subcategory": "Relative Path"
        },
        {
          "category": "basic",
          "description": "Whether the function can be used in composition with other functions",
          "name": "IsComposable",
          "ref": "#AttributeIsComposable.21.4",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:Function",
      "children": [
        "edm:Annotation",
        "edm:Parameter",
        "edm:ReturnType"
      ],
      "ref": "#ElementedmFunction.21",
      "description": "Function overloads allow functions to be defined with multiple different parameter sets."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.29.1",
          "subcategory": "simple-identifier",
          "description": "The function import’s name."
        },
        {
          "category": "reference",
          "description": "qualified unbound function name",
          "name": "Function",
          "ref": "#AttributeFunction.29.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "reference",
          "context": "relative to the containing entity container",
          "description": "entity set name or target path",
          "name": "EntitySet",
          "ref": "#AttributeIncludeInServiceDocument.29.4",
          "subcategory": "Relative Reference"
        },
        {
          "category": "basic",
          "description": "Whether to include this element in the service document",
          "name": "IncludeInServiceDocument",
          "ref": "#AttributeIncludeInServiceDocument.25.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:FunctionImport",
      "ref": "#ElementedmFunctionImport.29",
      "description": "Function imports allow exposing functions from an entity container. All unbound overloads of the imported function can be invoked from the entity container.",
      "children": [
        "edm:Annotation"
      ]
    },
    {
      "attributes": [],
      "name": "edm:Key",
      "children": [
        "edm:PropertyRef"
      ],
      "ref": "#ElementedmKey.10",
      "description": "An entity is uniquely identified within an entity set by its key."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "basic",
          "description": "integer value",
          "name": "Value",
          "ref": "#AttributeValue.18.2",
          "subcategory": "integer"
        }
      ],
      "name": "edm:Member",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmMember.18",
      "description": "Enumeration type values consist of discrete members. Each member is identified by its name and must specify an associated numeric value."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "qualified entity type name or collection of that",
          "name": "Type",
          "ref": "#AttributeType.12.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.12.3",
          "subcategory": "boolean"
        },
        {
          "category": "path",
          "context": "relative to the target entity type specified in Type attribute",
          "description": "path to partner navigation property",
          "name": "Partner",
          "ref": "#AttributePartner.13.4",
          "subcategory": "Relative Path"
        },
        {
          "category": "basic",
          "description": "Whether the navigation property contains its target entities",
          "name": "ContainsTarget",
          "ref": "#AttributeContainsTarget.13.5",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:NavigationProperty",
      "children": [
        "edm:OnDelete",
        "edm:ReferentialConstraint",
        "edm:Annotation"
      ],
      "ref": "#ElementedmNavigationProperty.13",
      "description": "A navigation property allows navigation to related entities."
    },
    {
      "attributes": [
        {
          "category": "path",
          "context": "relative to the containing entity set's entity type",
          "description": "navigation property path expression",
          "name": "Path",
          "ref": "#AttributePath.27.1",
          "subcategory": "Relative Path"
        },
        {
          "category": "path",
          "context": "relative to the containing entity container",
          "description": "target path to entity set/singleton",
          "name": "Target",
          "ref": "#AttributeTarget.27.2",
          "subcategory": "Relative Path"
        }
      ],
      "name": "edm:NavigationPropertyBinding",
      "ref": "#ElementedmNavigationPropertyBinding.27",
      "description": "Navigation property bindings associate a navigation property with a target entity set or singleton, allowing navigation between entity sets.",
      "children": [
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "action the service will take on related entities when the entity is deleted.",
          "name": "Action",
          "ref": "#AttributeAction.15.1",
          "symbols": [
            "Cascade",
            "None",
            "SetNull",
            "SetDefault"
          ]
        }
      ],
      "name": "edm:OnDelete",
      "children": [],
      "ref": "#ElementedmOnDelete.15",
      "description": "The action the service will take on related entities when the entity on which the navigation property is defined is deleted."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "qualified type name or collection",
          "name": "Type",
          "ref": "#AttributeType.12.2"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.12.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:Parameter",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmParameter.23",
      "description": "An action or function overload may specify parameters. Each parameter must have a name that is a simple identifier and must specify a type."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "qualified type name or collection of that",
          "name": "Type",
          "ref": "#AttributeType.12.2"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.12.3",
          "subcategory": "boolean"
        },
        {
          "category": "basic",
          "description": "the model's value of the attribute when the attribute is not present in CSDL",
          "name": "DefaultValue",
          "ref": "#AttributeDefaultValue.12.4",
          "subcategory": "primitive-value"
        },
        {
          "category": "basic",
          "description": "specifies the maximum number of digits allowed to the right of the decimal point.",
          "name": "Scale",
          "ref": "#AttributeDefaultValue.12.4",
          "subcategory": "non-negative-integer",
          "symbols": [
            "floating",
            "variable"
          ]
        }
      ],
      "description": "A structural property is a property of a structured type",
      "name": "edm:Property",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmProperty.12"
    },
    {
      "attributes": [
        {
          "category": "path",
          "context": "relative to the containing entity type",
          "description": "path to structural property",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "Relative Path"
        },
        {
          "category": "basic",
          "description": "Alternative name that can be used to reference the property",
          "name": "Alias",
          "ref": "#AttributeAlias.5.2",
          "subcategory": "simple-identifier"
        }
      ],
      "name": "edm:PropertyRef",
      "children": [],
      "ref": "#ElementedmPropertyRef.11",
      "description": "An entity type’s key refers to the set of properties whose values uniquely identify an instance of the entity type within an entity set."
    },
    {
      "attributes": [
        {
          "category": "path",
          "context": "relative to the containing navigation property's source entity type",
          "description": "path to dependent property",
          "name": "Property",
          "ref": "#AttributeProperty.14.1",
          "subcategory": "Relative Path"
        },
        {
          "category": "path",
          "context": "relative to the containing navigation property's target entity type",
          "description": "path to principal property",
          "name": "ReferencedProperty",
          "ref": "#AttributeReferencedProperty.14.2",
          "subcategory": "Relative Path"
        }
      ],
      "description": "Entity containers define the entity sets, singletons, function and action imports exposed by the service.",
      "name": "edm:ReferentialConstraint",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmReferentialConstraint.14"
    },
    {
      "attributes": [
        {
          "category": "reference",
          "description": "qualified type name or collection",
          "name": "Type",
          "ref": "#AttributeType.12.2"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.12.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:ReturnType",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmReturnType.22",
      "description": "The return type of an action or function overload may be any type in scope, or a collection of any type in scope."
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "A simple identifier used to uniquely identify the element within its containing scope.",
          "name": "Namespace",
          "ref": "#AttributeNamespace.5.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "basic",
          "description": "The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema.",
          "name": "Alias",
          "ref": "#AttributeAlias.5.2",
          "subcategory": "simple-identifier"
        }
      ],
      "description": "One or more schemas describe the entity model exposed by an OData service. The schema acts as a namespace for elements of the entity model such as entity types, complex types, enumerations and terms.",
      "name": "edm:Schema",
      "children": [
        "edm:EntityType",
        "edm:ComplexType",
        "edm:EnumType",
        "edm:TypeDefinition",
        "edm:Action",
        "edm:Function",
        "edm:EntityContainer",
        "edm:Term",
        "edm:Annotations"
      ],
      "ref": "#ElementedmSchema.7"
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier",
          "description": "The value of Name is the singleton's name"
        },
        {
          "category": "reference",
          "description": "qualified entity type name",
          "name": "Type",
          "ref": "#AttributeType.12.2",
          "subcategory": "Absolute Reference"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.12.3",
          "subcategory": "boolean"
        }
      ],
      "name": "edm:Singleton",
      "ref": "#ElementedmSingleton.26",
      "description": "Singletons are top-level single-valued resources. A singleton is identified by its name and must specify a type that must be an entity type in scope.",
      "children": [
        "edm:NavigationPropertyBinding",
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "basic",
          "name": "Name",
          "ref": "#AttributeName.30.1",
          "subcategory": "simple-identifier",
          "description": "The term’s name."
        },
        {
          "category": "reference",
          "description": "qualified type name or collection",
          "name": "Type",
          "ref": "#AttributeType.30.2"
        },
        {
          "category": "basic",
          "description": "Whether the property can have null values",
          "name": "Nullable",
          "ref": "#AttributeNullable.30.3",
          "subcategory": "boolean"
        },
        {
          "category": "basic",
          "description": "primitive value",
          "name": "DefaultValue",
          "ref": "#AttributeDefaultValue.30.4",
          "subcategory": "primitive-value"
        },
        {
          "category": "reference",
          "description": "qualified term name",
          "name": "BaseTerm",
          "ref": "#AttributeBaseTerm.30.5"
        },
        {
          "category": "basic",
          "description": "specifies a list of model elements to which the term MAY be applied to.",
          "name": "AppliesTo",
          "ref": "#Applicability",
          "symbols": [
            "Action",
            "ActionImport",
            "Annotation",
            "Apply",
            "Cast",
            "Collection",
            "ComplexType",
            "EntityContainer",
            "EntitySet",
            "EntityType",
            "EnumType",
            "Function",
            "FunctionImport",
            "If",
            "Include",
            "IsOf",
            "LabeledElement",
            "Member",
            "NavigationProperty",
            "Null",
            "OnDelete",
            "Parameter",
            "Property",
            "PropertyValue",
            "Record",
            "Reference",
            "ReferentialConstraint",
            "ReturnType",
            "Schema",
            "Singleton",
            "Term",
            "TypeDefinition",
            "UrlRef"
          ]
        }
      ],
      "name": "edm:Term",
      "ref": "#ElementedmTerm.30",
      "description": "A term allows annotating a model element or OData resource representation with additional data.",
      "children": [
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "The name identifier of the element",
          "name": "Name",
          "ref": "#AttributeName.9.1",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "constraints": "cannot be another type definition",
          "description": "qualified name of primitive type",
          "name": "UnderlyingType",
          "ref": "#AttributeUnderlyingType.17.2"
        }
      ],
      "name": "edm:TypeDefinition",
      "children": [
        "edm:Annotation"
      ],
      "ref": "#ElementedmTypeDefinition.19",
      "description": "A type definition defines a specialization of one of the primitive types."
    },
    {
      "attributes": [],
      "name": "edmx:DataServices",
      "ref": "#ElementedmxDataServices.3",
      "description": "The edmx:DataServices contains one or more edm:Schema elements.",
      "children": [
        "edm:Schema"
      ]
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "version number string",
          "name": "Version",
          "ref": "#AttributeVersion.2.1",
          "subcategory": "string"
        }
      ],
      "name": "edmx:Edmx",
      "children": [
        "edmx:DataServices",
        "edmx:Reference"
      ],
      "ref": "#ElementedmxEdmx.2",
      "description": "The root element of a CSDL XML document."
    },
    {
      "attributes": [
        {
          "category": "reference",
          "description": "namespace reference",
          "name": "Namespace",
          "ref": "#AttributeNamespace.5.1"
        },
        {
          "category": "basic",
          "description": "The value that can be used in qualified names instead of the namespace.",
          "name": "Alias",
          "ref": "#AttributeAlias.5.2",
          "subcategory": "simple-identifier"
        }
      ],
      "name": "edmx:Include",
      "ref": "#ElementedmxInclude.5",
      "description": "Specifies a schema to include from the referenced CSDL document.",
      "children": [
        "edm:Annotation"
      ]
    },
    {
      "attributes": [
        {
          "category": "reference",
          "description": "namespace reference",
          "name": "TermNamespace",
          "ref": "#AttributeTermNamespace.6.1"
        },
        {
          "category": "basic",
          "description": "Optional qualifier to distinguish multiple instances",
          "name": "Qualifier",
          "ref": "#AttributeQualifier.6.2",
          "subcategory": "simple-identifier"
        },
        {
          "category": "reference",
          "description": "namespace reference",
          "name": "TargetNamespace",
          "ref": "#AttributeTargetNamespace.6.3"
        }
      ],
      "name": "edmx:IncludeAnnotations",
      "ref": "#ElementedmxIncludeAnnotations.6",
      "children": [],
      "description": "Specifies the annotations to include from the referenced CSDL document. Add"
    },
    {
      "attributes": [
        {
          "category": "basic",
          "description": "URI string",
          "name": "Uri",
          "ref": "#AttributeUri.4.1",
          "subcategory": "uri"
        }
      ],
      "description": "specifies external CSDL documents",
      "name": "edmx:Reference",
      "children": [
        "edmx:Include",
        "edmx:IncludeAnnotations"
      ],
      "ref": "#ElementedmxReference.4"
    }
  ],
  "attributeCategories": {
    "basic": {
      "description": "Basic Attribute are primitive like strings, booleans, numbers, ... that are just data, associated with the model element ( )",
      "name": "Basic Attributes",
      "subcategories": [
        {
          "description": "truth value:  true of false",
          "name": "boolean"
        },
        {
          "description": "Simple name identifier following XML naming rules",
          "name": "simple-identifier"
        },
        {
          "description": "Whole number value",
          "name": "integer"
        },
        {
          "description": "Integer value greater than zero",
          "name": "positive-integer"
        },
        {
          "description": "Integer value greater than or equal to zero",
          "name": "non-negative-integer"
        },
        {
          "description": "Uniform Resource Identifier",
          "name": "uri"
        },
        {
          "description": "any primitive value (string, number, boolean, etc.)",
          "name": "primitive-value"
        }
      ]
    },
    "path": {
      "description": "Path expressions in form of a sequence of model element names. Represented in XML/JSON as a string of element names with delimiters",
      "name": "Path Attributes",
      "subcategories": [
        {
          "description": "Paths that are naming connected elements by starting from the root of the model",
          "name": "Absolute Path"
        },
        {
          "description": "Paths that are resolved relative to a specific element context",
          "name": "Relative Path"
        }
      ]
    },
    "reference": {
      "description": "Reference Attributes are symbolic references to model elements. They are epresented in CSDL XML/JSON as qualified names, type names, target paths, etc.",
      "name": "Reference Attributes",
      "subcategories": [
        {
          "description": "symbolic references that reference elements anywhere in the model",
          "name": "Absolute Reference"
        },
        {
          "description": "symbolic references that reference elements relative to a specific ancestor (or related) context element",
          "name": "Relative Reference"
        }
      ]
    }
  }
}</code></pre>