# OData EDM model structure

## Overview

This document lists all EDM model elements, their attributes and relationships. It categorizes the attributes in different types (basic, reference, ..) and describes their semantic in detail. It is based on the OASIS OData CSDL XML Representation Version 4.02 specification, and adds the details about allowed values, symbolic references and constraints for elements and attributes.

**Source**: [OASIS OData CSDL XML Representation Version 4.02 specification](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#TableofXMLElementsandAttributes)

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

## EDM Model Elements

## edm:Schema

One or more schemas describe the entity model exposed by an OData service. The schema acts as a namespace for elements of the entity model such as entity types, complex types, enumerations and terms. [`edm:Schema ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Namespace | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. | [`Namespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1) |
| Alias | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

## edm:Annotations

Used to apply a group of annotations to a single model element. [`edm:Annotations ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Target | Path (Absolute Path) | target path expression *Context: can reference any model element* | [`Target ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2) |

## edm:EntityType

An entity type is the template for an entity: any uniquely identifiable record. [`edm:EntityType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityType.9)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| BaseType | Reference (Absolute Reference) | qualified name of an edm:EntityType | [`BaseType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | [`Abstract ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3) |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | [`OpenType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4) |
| HasStream | Basic (boolean) | Whether the entity type supports media resources | [`HasStream ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeHasStream.9.5) |

## edm:Key

An entity is uniquely identified within an entity set by its key. [`edm:Key ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmKey.10)

*No attributes*

## edm:PropertyRef

An entity type’s key refers to the set of properties whose values uniquely identify an instance of the entity type within an entity set. [`edm:PropertyRef ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyRef.11)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Path (Relative Path) | path to structural property *Context: relative to the containing entity type* | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Alias | Basic (simple identifier) | Alternative name that can be used to reference the property | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

## edm:Property

A structural property is a property of a structured type [`edm:Property ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmProperty.12)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference | qualified type name or collection of that | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |
| DefaultValue | Basic (primitive value) | the model's value of the attribute when the attribute is not present in CSDL | [`DefaultValue ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4) |
| Scale | Basic (non negative integer or `floating`, `variable`) | specifies the maximum number of digits allowed to the right of the decimal point. | [`Scale ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4) |

## edm:NavigationProperty

A navigation property allows navigation to related entities. [`edm:NavigationProperty ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationProperty.13)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference (Absolute Reference) | qualified entity type name or collection of that | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |
| Partner | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* | [`Partner ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePartner.13.4) |
| ContainsTarget | Basic (boolean) | Whether the navigation property contains its target entities | [`ContainsTarget ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeContainsTarget.13.5) |

## edm:ReferentialConstraint

Entity containers define the entity sets, singletons, function and action imports exposed by the service. [`edm:ReferentialConstraint ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReferentialConstraint.14)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Property | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* | [`Property ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeProperty.14.1) |
| ReferencedProperty | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* | [`ReferencedProperty ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeReferencedProperty.14.2) |

## edm:OnDelete

The action the service will take on related entities when the entity on which the navigation property is defined is deleted. [`edm:OnDelete ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmOnDelete.15)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Action | Basic (`Cascade`, `None`, `SetNull`, `SetDefault`) | action the service will take on related entities when the entity is deleted. | [`Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.15.1) |

## edm:ComplexType

Complex types are keyless nominal structured types. The lack of a key means that instances of complex types cannot be referenced, created, updated or deleted independently of an entity type. Complex types allow entity models to group properties into common structures. [`edm:ComplexType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmComplexType.16)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| BaseType | Reference (Absolute Reference) | qualified name of a edm:ComplexType | [`BaseType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| Abstract | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly | [`Abstract ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3) |
| OpenType | Basic (boolean) | Whether the type allows additional properties not explicitly declared | [`OpenType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4) |

## edm:EnumType

Enumeration types are nominal types that represent a non-empty series of related values. Enumeration types expose these related values as members of the enumeration. [`edm:EnumType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEnumType.17)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The enumeration type’s name | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| UnderlyingType | Reference | qualified name of and integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* | [`UnderlyingType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2) |
| IsFlags | Basic (boolean) | Whether the enumeration supports bitwise operations | [`IsFlags ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsFlags.17.3) |

## edm:Member

Enumeration type values consist of discrete members. Each member is identified by its name and must specify an associated numeric value. [`edm:Member ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmMember.18)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Value | Basic (integer) | integer value | [`Value ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2) |

## edm:TypeDefinition

A type definition defines a specialization of one of the primitive types. [`edm:TypeDefinition ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTypeDefinition.19)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| UnderlyingType | Reference | qualified name of primitive type *Constraints: cannot be another type definition* | [`UnderlyingType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2) |

## edm:Action

Actions are service-defined operations that may have observable side effects and may return a single instance or a collection of instances of any type. [`edm:Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAction.20)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The action’s name. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | [`IsBound ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2) |
| EntitySetPath | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* | [`EntitySetPath ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3) |

## edm:Function

Function overloads allow functions to be defined with multiple different parameter sets. [`edm:Function ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunction.21)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The function's name. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| IsBound | Basic (boolean) | Whether the action/function is bound to a specific entity type | [`IsBound ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2) |
| EntitySetPath | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* | [`EntitySetPath ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3) |
| IsComposable | Basic (boolean) | Whether the function can be used in composition with other functions | [`IsComposable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsComposable.21.4) |

## edm:ReturnType

The return type of an action or function overload may be any type in scope, or a collection of any type in scope. [`edm:ReturnType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReturnType.22)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

## edm:Parameter

An action or function overload may specify parameters. Each parameter must have a name that is a simple identifier and must specify a type. [`edm:Parameter ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmParameter.23)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The name identifier of the element | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

## edm:EntityContainer

Entity containers define the entity sets, singletons, function and action imports exposed by the service. [`edm:EntityContainer ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityContainer.24)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The EntityContainer's name | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Extends | Reference (Absolute Reference) | qualified entity container name | [`Extends ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeExtends.24.2) |

## edm:EntitySet

Entity sets are top-level collection-valued resources. An entity set is identified by its name and must specify a type that must be an entity type in scope. [`edm:EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntitySet.25)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The value of Name is the entity set’s name | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| EntityType | Reference (Absolute Reference) | qualified entity type name | [`EntityType ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntityType.25.2) |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | [`IncludeInServiceDocument ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3) |

## edm:Singleton

Singletons are top-level single-valued resources. A singleton is identified by its name and must specify a type that must be an entity type in scope. [`edm:Singleton ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSingleton.26)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The value of Name is the singleton's name | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1) |
| Type | Reference (Absolute Reference) | qualified entity type name | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3) |

## edm:NavigationPropertyBinding

Navigation property bindings associate a navigation property with a target entity set or singleton, allowing navigation between entity sets. [`edm:NavigationPropertyBinding ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationPropertyBinding.27)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Path | Path (Relative Path) | navigation property path expression *Context: relative to the containing entity set's entity type* | [`Path ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePath.27.1) |
| Target | Path (Relative Path) | target path to entity set/singleton *Context: relative to the containing entity container* | [`Target ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.27.2) |

## edm:ActionImport

Action imports allow exposing actions from an entity container. Each action import must specify the action it imports and the EntitySet or Singleton that exposes it. [`edm:ActionImport ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmActionImport.28)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The ActionImport's name. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.28.1) |
| Action | Reference (Absolute Reference) | qualified unbound action name | [`Action ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.28.2) |
| EntitySet | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* | [`EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySet.28.3) |

## edm:FunctionImport

Function imports allow exposing functions from an entity container. All unbound overloads of the imported function can be invoked from the entity container. [`edm:FunctionImport ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunctionImport.29)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The function import’s name. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.29.1) |
| Function | Reference (Absolute Reference) | qualified unbound function name | [`Function ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeFunction.29.2) |
| EntitySet | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* | [`EntitySet ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.29.4) |
| IncludeInServiceDocument | Basic (boolean) | Whether to include this element in the service document | [`IncludeInServiceDocument ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3) |

## edm:Term

A term allows annotating a model element or OData resource representation with additional data. [`edm:Term ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTerm.30)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Name | Basic (simple identifier) | The term’s name. | [`Name ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.30.1) |
| Type | Reference | qualified type name or collection | [`Type ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.30.2) |
| Nullable | Basic (boolean) | Whether the property can have null values | [`Nullable ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.30.3) |
| DefaultValue | Basic (primitive value) | primitive value | [`DefaultValue ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.30.4) |
| BaseTerm | Reference | qualified term name | [`BaseTerm ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseTerm.30.5) |
| AppliesTo | Basic (`Action`, `ActionImport`, `Annotation`, `Apply`, `Cast`, `Collection`, `ComplexType`, `EntityContainer`, `EntitySet`, `EntityType`, `EnumType`, `Function`, `FunctionImport`, `If`, `Include`, `IsOf`, `LabeledElement`, `Member`, `NavigationProperty`, `Null`, `OnDelete`, `Parameter`, `Property`, `PropertyValue`, `Record`, `Reference`, `ReferentialConstraint`, `ReturnType`, `Schema`, `Singleton`, `Term`, `TypeDefinition`, `UrlRef`) | specifies a list of model elements to which the term MAY be applied to. | [`AppliesTo ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Applicability) |

## edm:Annotation

An annotation applies a term to a model element and defines how to calculate a value for the term application. [`edm:Annotation ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotation.31)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Term | Reference | qualified term name | [`Term ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTerm.31.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#Qualifier) |

## edmx:Edmx

The root element of a CSDL XML document. [`edmx:Edmx ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxEdmx.2)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Version | Basic (string) | version number string | [`Version ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeVersion.2.1) |

## edmx:DataServices

The edmx:DataServices contains one or more edm:Schema elements. [`edmx:DataServices ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxDataServices.3)

*No attributes*

## edmx:Reference

specifies external CSDL documents [`edmx:Reference ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxReference.4)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Uri | Basic (uri) | URI string | [`Uri ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUri.4.1) |

## edmx:Include

Specifies a schema to include from the referenced CSDL document. [`edmx:Include ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxInclude.5)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| Namespace | Reference | namespace reference | [`Namespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1) |
| Alias | Basic (simple identifier) | The value that can be used in qualified names instead of the namespace. | [`Alias ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2) |

## edmx:IncludeAnnotations

Specifies the annotations to include from the referenced CSDL document. Add [`edmx:IncludeAnnotations ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxIncludeAnnotations.6)

 Attributes

| Name | Type | Description | standard |
|------|------|-------------|----------|
| TermNamespace | Reference | namespace reference | [`TermNamespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTermNamespace.6.1) |
| Qualifier | Basic (simple identifier) | Optional qualifier to distinguish multiple instances | [`Qualifier ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2) |
| TargetNamespace | Reference | namespace reference | [`TargetNamespace ↗`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTargetNamespace.6.3) |