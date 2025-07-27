# OData EDM model structure

## Overview

This document lists all EDM model elements, their attributes and relationships. It categorizes the attributes in different types (basic, reference, ..) and describes their semantic in detail. It is based on the OASIS OData CSDL XML Representation Version 4.02 specification, and adds the details about allowed values, symbolic references and constraints for elements and attributes.

**Source**: [OASIS OData CSDL XML Representation Version 4.02 specification](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#TableofXMLElementsandAttributes)

## Attribute Categories

### Reference Attributes

Reference Attributes are symbolic references to model elements. They are epresented in CSDL XML/JSON as qualified names, type names, target paths, etc.

- **Absolute Reference**: symbolic references that reference elements anywhere in the model

- **Relative Reference**: symbolic references that reference elements relative to a specific ancestor (or related) context element

### Path Attributes

Path expressions in form of a sequence of model element names. Represented in XML/JSON as a string of element names with delimiters

- **Absolute Path**: Paths that are naming connected elements by starting from the root of the model

- **Relative Path**: Paths that are resolved relative to a specific element context

### Basic Attributes

Basic Attribute are primitive like strings, booleans, numbers, ... that are just data, associated with the model element ( )

- **boolean**: True or false value

- **string**: Text value

- **simple-identifier**: Simple name identifier following XML naming rules

- **integer**: Whole number value

- **positive-integer**: Integer value greater than zero

- **non-negative-integer**: Integer value greater than or equal to zero

- **uri**: Uniform Resource Identifier

- **primitive-value**: any primitive value (string, number, boolean, etc.)

## EDM Elements

### Schema Elements

Core schema definition elements

#### edm:Schema

One or more schemas describe the entity model exposed by an OData service. The schema acts as a namespace for elements of the entity model such as entity types, complex types, enumerations and terms. [`edm:Schema ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7)


Permitted Children: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype), [edm:EnumType](#edmenumtype), [edm:TypeDefinition](#edmtypedefinition), [edm:Action](#edmaction), [edm:Function](#edmfunction), [edm:EntityContainer](#edmentitycontainer), [edm:Term](#edmterm), [edm:Annotations](#edmannotations)

Permitted Parents: None

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Namespace | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. | [`Namespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1) |
| Alias | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

#### edm:Annotations

[`edm:Annotations ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Target | Path (Absolute Path) | target path expression *Context: can reference any model element* | [`Target ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2) |

### Entity Model Elements

Core entity and type definition elements

#### edm:EntityType

An entity type is the template for an entity: any uniquely identifiable record. [`edm:EntityType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityType.9)


Permitted Children: [edm:Annotation](#edmannotation), [edm:Key](#edmkey), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| BaseType | Reference (Absolute Reference) | qualified name of an edm:EntityType | [`BaseType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | [`Abstract ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3) |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | [`OpenType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4) |
| HasStream | Basic (boolean) | Whether the entity type supports media resources | [`HasStream ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeHasStream.9.5) |

#### edm:Key

[`edm:Key ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmKey.10)


Permitted Children: [edm:PropertyRef](#edmpropertyref)

Permitted Parents: [edm:EntityType](#edmentitytype)

*No attributes*

#### edm:PropertyRef

[`edm:PropertyRef ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyRef.11)


Permitted Children: None

Permitted Parents: [edm:Key](#edmkey)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Path (Relative Path) | path to structural property *Context: relative to the containing entity type* | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Alias | Basic (simple identifier) | Alternative name that can be used to reference the property | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

#### edm:Property

A structural property is a property of a structured type [`edm:Property ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmProperty.12)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference | qualified type name or collection of that | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |
| DefaultValue | Basic (primitive value) | the model's value of the attribute when the attribute is not present in CSDL | [`DefaultValue ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4) |
| Scale | Basic (non negative integer or `floating`, `variable`) | specifies the maximum number of digits allowed to the right of the decimal point. | [`Scale ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4) |

#### edm:NavigationProperty

[`edm:NavigationProperty ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationProperty.13)


Permitted Children: [edm:OnDelete](#edmondelete), [edm:ReferentialConstraint](#edmreferentialconstraint), [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference (Absolute Reference) | qualified entity type name or collection of that | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |
| Partner | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* | [`Partner ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePartner.13.4) |
| ContainsTarget | Basic (boolean) | Whether the navigation property contains its target entities | [`ContainsTarget ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeContainsTarget.13.5) |

#### edm:ReferentialConstraint

[`edm:ReferentialConstraint ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReferentialConstraint.14)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:NavigationProperty](#edmnavigationproperty)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Property | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* | [`Property ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeProperty.14.1) |
| ReferencedProperty | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* | [`ReferencedProperty ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeReferencedProperty.14.2) |

#### edm:OnDelete

[`edm:OnDelete ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmOnDelete.15)


Permitted Children: None

Permitted Parents: [edm:NavigationProperty](#edmnavigationproperty)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Action | Basic (`Cascade`, `None`, `SetNull`, `SetDefault`) | action the service will take on related entities when the entity is deleted. | [`Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.15.1) |

#### edm:ComplexType

[`edm:ComplexType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmComplexType.16)


Permitted Children: [edm:Annotation](#edmannotation), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| BaseType | Reference (Absolute Reference) | qualified name of a edm:ComplexType | [`BaseType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | [`Abstract ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3) |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | [`OpenType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4) |

#### edm:EnumType

[`edm:EnumType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEnumType.17)


Permitted Children: [edm:Annotation](#edmannotation), [edm:Member](#edmmember)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| UnderlyingType | Reference | qualified name of and integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* | [`UnderlyingType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2) |
| IsFlags | Basic (boolean) | Whether the enumeration supports bitwise operations | [`IsFlags ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsFlags.17.3) |

#### edm:Member

[`edm:Member ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmMember.18)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EnumType](#edmenumtype)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Value | Basic (integer) | integer value | [`Value ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2) |

#### edm:TypeDefinition

[`edm:TypeDefinition ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTypeDefinition.19)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| UnderlyingType | Reference | qualified name of primitive type *Constraints: cannot be another type definition* | [`UnderlyingType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2) |

### Action and Function Elements

Action and function definition elements

#### edm:Action

[`edm:Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAction.20)


Permitted Children: [edm:Annotation](#edmannotation), [edm:Parameter](#edmparameter), [edm:ReturnType](#edmreturntype)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | [`IsBound ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2) |
| EntitySetPath | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* | [`EntitySetPath ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3) |

#### edm:Function

[`edm:Function ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunction.21)


Permitted Children: [edm:Annotation](#edmannotation), [edm:Parameter](#edmparameter), [edm:ReturnType](#edmreturntype)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | [`IsBound ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2) |
| EntitySetPath | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* | [`EntitySetPath ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3) |
| IsComposable | Basic (boolean) | Whether the function can be used in composition with other functions | [`IsComposable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsComposable.21.4) |

#### edm:ReturnType

[`edm:ReturnType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReturnType.22)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Action](#edmaction), [edm:Function](#edmfunction)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

#### edm:Parameter

[`edm:Parameter ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmParameter.23)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Action](#edmaction), [edm:Function](#edmfunction)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

### Entity Container Elements

Entity container and related elements

#### edm:EntityContainer

[`edm:EntityContainer ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityContainer.24)


Permitted Children: [edm:ActionImport](#edmactionimport), [edm:Annotation](#edmannotation), [edm:EntitySet](#edmentityset), [edm:FunctionImport](#edmfunctionimport), [edm:Singleton](#edmsingleton)

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Extends | Reference (Absolute Reference) | qualified entity container name | [`Extends ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeExtends.24.2) |

#### edm:EntitySet

[`edm:EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntitySet.25)


Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| EntityType | Reference (Absolute Reference) | qualified entity type name | [`EntityType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntityType.25.2) |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | [`IncludeInServiceDocument ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3) |

#### edm:Singleton

[`edm:Singleton ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSingleton.26)


Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference (Absolute Reference) | qualified entity type name | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

#### edm:NavigationPropertyBinding

[`edm:NavigationPropertyBinding ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationPropertyBinding.27)


Permitted Children: None

Permitted Parents: None

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Path | Path (Relative Path) | navigation property path expression *Context: relative to the containing entity set's entity type* | [`Path ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePath.27.1) |
| Target | Path (Relative Path) | target path to entity set/singleton *Context: relative to the containing entity container* | [`Target ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.27.2) |

#### edm:ActionImport

[`edm:ActionImport ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmActionImport.28)


Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.28.1) |
| Action | Reference (Absolute Reference) | qualified unbound action name | [`Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.28.2) |
| EntitySet | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* | [`EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySet.28.3) |

#### edm:FunctionImport

[`edm:FunctionImport ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunctionImport.29)


Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.29.1) |
| Function | Reference (Absolute Reference) | qualified unbound function name | [`Function ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeFunction.29.2) |
| EntitySet | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* | [`EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.29.4) |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | [`IncludeInServiceDocument ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3) |

### Vocabulary and Annotation Elements

Vocabulary terms and annotation elements

#### edm:Term

[`edm:Term ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTerm.30)


Permitted Children: None

Permitted Parents: [edm:Schema](#edmschema)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) |  | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.30.1) |
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.30.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.30.3) |
| DefaultValue | Basic (primitive value) | primitive value | [`DefaultValue ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.30.4) |
| BaseTerm | Reference | qualified term name | [`BaseTerm ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseTerm.30.5) |
| AppliesTo | Basic (`Action`, `ActionImport`, `Annotation`, `Apply`, `Cast`, `Collection`, `ComplexType`, `EntityContainer`, `EntitySet`, `EntityType`, `EnumType`, `Function`, `FunctionImport`, `If`, `Include`, `IsOf`, `LabeledElement`, `Member`, `NavigationProperty`, `Null`, `OnDelete`, `Parameter`, `Property`, `PropertyValue`, `Record`, `Reference`, `ReferentialConstraint`, `ReturnType`, `Schema`, `Singleton`, `Term`, `TypeDefinition`, `UrlRef`) | specifies a list of model elements to which the term MAY be applied to. | [`AppliesTo ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Applicability) |

#### edm:Annotation

[`edm:Annotation ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotation.31)


Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Annotations](#edmannotations), [edm:EntityType](#edmentitytype), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty), [edm:ReferentialConstraint](#edmreferentialconstraint), [edm:ComplexType](#edmcomplextype), [edm:EnumType](#edmenumtype), [edm:Member](#edmmember), [edm:TypeDefinition](#edmtypedefinition), [edm:Action](#edmaction), [edm:Function](#edmfunction), [edm:ReturnType](#edmreturntype), [edm:Parameter](#edmparameter), [edm:EntityContainer](#edmentitycontainer), [edm:Annotation](#edmannotation)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Term | Reference | qualified term name | [`Term ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTerm.31.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Qualifier) |

### Core EDMX Elements

Core EDMX wrapper elements

#### edmx:Edmx

[`edmx:Edmx ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxEdmx.2)


Permitted Children: [edmx:DataServices](#edmxdataservices), [edmx:Reference](#edmxreference)

Permitted Parents: None

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Version | Basic (string) | version number string | [`Version ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeVersion.2.1) |

#### edmx:DataServices

[`edmx:DataServices ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxDataServices.3)


Permitted Children: None

Permitted Parents: [edmx:Edmx](#edmxedmx)

*No attributes*

#### edmx:Reference

specifies external CSDL documents [`edmx:Reference ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxReference.4)


Permitted Children: [edmx:Include](#edmxinclude), [edmx:IncludeAnnotations](#edmxincludeannotations)

Permitted Parents: [edmx:Edmx](#edmxedmx)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Uri | Basic (uri) | URI string | [`Uri ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUri.4.1) |

#### edmx:Include

[`edmx:Include ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxInclude.5)


Permitted Children: None

Permitted Parents: [edmx:Reference](#edmxreference)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Namespace | Reference | namespace reference | [`Namespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1) |
| Alias | Basic (simple identifier) | The value that can be used in qualified names instead of the namespace. | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

#### edmx:IncludeAnnotations

[`edmx:IncludeAnnotations ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxIncludeAnnotations.6)


Permitted Children: None

Permitted Parents: [edmx:Reference](#edmxreference)

| Name | Type | Description | standard |
|------|------|-------------|----------|
| TermNamespace | Reference | namespace reference | [`TermNamespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTermNamespace.6.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2) |
| TargetNamespace | Reference | namespace reference | [`TargetNamespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTargetNamespace.6.3) |