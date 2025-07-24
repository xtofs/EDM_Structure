# OASIS CSDL XML Elements and Attributes Classification

## Overview

This document lists all EDM elements and categorizes their attribute types. It is based the OASIS OData CSDL XML Representation Version 4.02 specification - Appendix B. and adds the details about values, symbolic references and constraints for attributes.

**Source**: OASIS OData CSDL XML Representation Version 4.02 specification

**Version**: 4.02

**Reference**: [Appendix B](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#TableofXMLElementsandAttributes)

## Table of Contents

- [Attribute Type Categories](#attribute-type-categories)
  - [Basic Attribute](#basic-attribute)
  - [Reference Attribute](#reference-attribute)
  - [Path Attribute](#path-attribute)
- [EDM Elements](#edm-elements)
  - [Schema Elements](#schema-elements)
  - [Entity Model Elements](#entity-model-elements)
  - [Action and Function Elements](#action-and-function-elements)
  - [Entity Container Elements](#entity-container-elements)
  - [Vocabulary and Annotation Elements](#vocabulary-and-annotation-elements)
  - [Core EDMX Elements](#core-edmx-elements)
  - [Annotation Expression Elements](#annotation-expression-elements)
- [Summary](#summary)


## Attribute Type Categories

### Basic Attribute

Simple value types (strings, booleans, numbers, identifiers)

**simple identifier**: Simple name identifier following XML naming rules

**boolean**: True or false value

**positive integer**: Integer value greater than zero

**integer**: Whole number value

**non-negative integer**: Integer value greater than or equal to zero

**string**: Text value

**URI**: Uniform Resource Identifier

**enum**: Value from a predefined set of options

**primitive value**: Basic data type value (string, number, boolean, etc.)

**MaxLength**: Positive integer or symbolic value

Symbolic values:
- `max`: shorthand for the maximum length supported by the service

**Scale**: Non-negative integer or symbolic values

Symbolic values:
- `floating`: decimal floating-point number where precision specifies significant digits (not allowed in OData 4.0 responses)
- `variable`: number of digits to the right of decimal point can vary from zero to the precision value

*Constraints*: Scale value MUST be less than or equal to Precision value

*Default*: 0 if not specified

*Note*: Services should use lower-case values; clients should accept values case-insensitively

**SRID**: Non-negative integer or symbolic value

Symbolic values:
- `variable`: allows different spatial reference systems

*Default*: 0 for Geometry types, 4326 for Geography types if not specified

### Reference Attribute

References to other model elements represented in XML/JSON as qualified names, type names, target paths, etc. . 

**Absolute Reference**: symbolic references that reference elements anywhere in the model

**Relative Reference**: symbolic references that reference elements relative to a specific ancestor (or related) context element

### Path Attribute

Path expressions in form of a sequence of model elements represented in XML/JSON as a string or element names with delimiters

**Absolute Path**: Paths that are naming elements by starting from the root of the model

**Relative Path**: Paths that are resolved relative to a specific element context

## EDM Elements

### Schema Elements

Core schema definition elements

#### [`edm:Schema`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Namespace](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1)** | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. |
| **[Alias](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2)** | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. |

#### [`edm:Annotations`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Target](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1)** | Path (Absolute Path) | target path expression *Context: can reference any model element* |
| **[Qualifier](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2)** | Basic (simple identifier) |  |

### Entity Model Elements

Core entity and type definition elements

#### [`edm:EntityType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityType.9)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. |
| **[BaseType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2)** | Reference (Absolute Reference) | qualified name of an edm:EntityType |
| **[Abstract](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3)** | Basic | boolean |
| **[OpenType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4)** | Basic | boolean |
| **[HasStream](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeHasStream.9.5)** | Basic | boolean |

#### [`edm:Key`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmKey.10)

*No attributes*

#### [`edm:PropertyRef`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyRef.11)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Path (Relative Path) | path to structural property *Context: relative to the containing entity/complex type* |
| **[Alias](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2)** | Basic (simple identifier) |  |

#### [`edm:Property`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmProperty.12)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name or collection |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |
| **[DefaultValue](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4)** | Basic | primitive value |

#### [`edm:NavigationProperty`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationProperty.13)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference (Absolute Reference) | qualified entity type name or collection thereof |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |
| **[Partner](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePartner.13.4)** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **[ContainsTarget](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeContainsTarget.13.5)** | Basic | boolean |

#### [`edm:ReferentialConstraint`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReferentialConstraint.14)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Property](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeProperty.14.1)** | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* |
| **[ReferencedProperty](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeReferencedProperty.14.2)** | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* |

#### [`edm:OnDelete`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmOnDelete.15)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Action](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.15.1)** | Basic | action enum: Cascade, None, SetNull, SetDefault |

#### [`edm:ComplexType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmComplexType.16)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[BaseType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2)** | Reference (Absolute Reference) | qualified name of a edm:ComplexType |
| **[Abstract](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAbstract.9.3)** | Basic | boolean |
| **[OpenType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeOpenType.9.4)** | Basic | boolean |

#### [`edm:EnumType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEnumType.17)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[UnderlyingType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2)** | Reference | qualified name of and integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* |
| **[IsFlags](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsFlags.17.3)** | Basic | boolean |

#### [`edm:Member`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmMember.18)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | integer value |

#### [`edm:TypeDefinition`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTypeDefinition.19)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[UnderlyingType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUnderlyingType.17.2)** | Reference | qualified name of primitive type *Constraints: cannot be another type definition* |

### Action and Function Elements

Action and function definition elements

#### [`edm:Action`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAction.20)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[IsBound](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2)** | Basic | boolean |
| **[EntitySetPath](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3)** | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* |

#### [`edm:Function`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunction.21)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[IsBound](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsBound.21.2)** | Basic | boolean |
| **[EntitySetPath](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySetPath.21.3)** | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* |
| **[IsComposable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIsComposable.21.4)** | Basic | boolean |

#### [`edm:ReturnType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReturnType.22)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name or collection |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |

#### [`edm:Parameter`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmParameter.23)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name or collection |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |

### Entity Container Elements

Entity container and related elements

#### [`edm:EntityContainer`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityContainer.24)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Extends](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeExtends.24.2)** | Reference (Absolute Reference) | qualified entity container name |

#### [`edm:EntitySet`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntitySet.25)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[EntityType](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntityType.25.2)** | Reference (Absolute Reference) | qualified entity type name |
| **[IncludeInServiceDocument](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3)** | Basic | boolean |

#### [`edm:Singleton`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSingleton.26)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference (Absolute Reference) | qualified entity type name |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |

#### [`edm:NavigationPropertyBinding`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationPropertyBinding.27)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Path](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributePath.13.4)** | Path (Relative Path) | navigation property path expression *Context: relative to the containing entity set's entity type* |
| **[Target](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1)** | Path (Relative Path) | target path to entity set/singleton *Context: relative to the containing entity container* |

#### [`edm:ActionImport`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmActionImport.28)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Action](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAction.15.1)** | Reference (Absolute Reference) | qualified unbound action name |
| **[EntitySet](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySet)** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |

#### [`edm:FunctionImport`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunctionImport.29)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Function](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeFunction.14.4.4)** | Reference (Absolute Reference) | qualified unbound function name |
| **[EntitySet](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeEntitySet)** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |
| **[IncludeInServiceDocument](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeIncludeInServiceDocument.25.3)** | Basic | boolean |

### Vocabulary and Annotation Elements

Vocabulary terms and annotation elements

#### [`edm:Term`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTerm.30)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name or collection |
| **[Nullable](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNullable.12.3)** | Basic | boolean |
| **[DefaultValue](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeDefaultValue.12.4)** | Basic | primitive value |
| **[BaseTerm](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseTerm.14.1.1)** | Reference | qualified term name |
| **[AppliesTo](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAppliesTo.14.1.2)** | Basic | whitespace-separated list of symbolic values |

#### [`edm:Annotation`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotation.31)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Term](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTerm.14.2)** | Reference | qualified term name |
| **[Qualifier](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2)** | Basic (simple identifier) |  |

### Core EDMX Elements

Core EDMX wrapper elements

#### [`edmx:Edmx`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxEdmx.2)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Version](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeVersion.2.1)** | Basic | version number string |

#### [`edmx:DataServices`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxDataServices.3)

*No attributes*

#### [`edmx:Reference`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxReference.4)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Uri](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeUri.4.1)** | Basic | URI string |

#### [`edmx:Include`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxInclude.5)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Namespace](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1)** | Reference | namespace reference |
| **[Alias](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2)** | Basic (simple identifier) |  |

#### [`edmx:IncludeAnnotations`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxIncludeAnnotations.6)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[TermNamespace](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTermNamespace.6.1)** | Reference | namespace reference |
| **[Qualifier](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2)** | Basic (simple identifier) |  |
| **[TargetNamespace](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTargetNamespace.6.3)** | Reference | namespace reference |

### Annotation Expression Elements

Elements used within annotation expressions

#### [`edm:Binary`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmBinary.32)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | binary value |

#### [`edm:Bool`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmBool.33)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | boolean literal |

#### [`edm:Date`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmDate.34)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | date value |

#### [`edm:DateTimeOffset`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmDateTimeOffset.35)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | datetime value |

#### [`edm:Decimal`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmDecimal.36)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | decimal value |

#### [`edm:Duration`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmDuration.37)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | duration value |

#### [`edm:EnumMember`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmEnumMember.38)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Reference | qualified enum member name |

#### [`edm:Float`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmFloat.39)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | floating-point value |

#### [`edm:Guid`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmGuid.40)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | GUID value |

#### [`edm:Int`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmInt.41)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | integer value |

#### [`edm:String`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmString.42)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | string value |

#### [`edm:TimeOfDay`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmTimeOfDay.43)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Basic | time value |

#### [`edm:AnnotationPath`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmAnnotationPath.44)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Path | annotation path expression |

#### [`edm:ModelElementPath`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmModelElementPath.45)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Path | model element path expression |

#### [`edm:NavigationPropertyPath`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmNavigationPropertyPath.46)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Path | navigation property path expression |

#### [`edm:PropertyPath`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmPropertyPath.47)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Path | property path expression |

#### [`edm:Path`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmPath.48)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Value](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeValue.18.2)** | Path | value path expression |

#### [`edm:And`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionsedmAnd.49)

*No attributes*

#### [`edm:Or`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Or)

*No attributes*

#### [`edm:Not`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmNot.50)

*No attributes*

#### [`edm:Eq`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionsedmEq.51)

*No attributes*

#### [`edm:Ne`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Ne)

*No attributes*

#### [`edm:Gt`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Gt)

*No attributes*

#### [`edm:Ge`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Ge)

*No attributes*

#### [`edm:Lt`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Lt)

*No attributes*

#### [`edm:Le`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Le)

*No attributes*

#### [`edm:Has`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Has)

*No attributes*

#### [`edm:In`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_In)

*No attributes*

#### [`edm:Neg`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmNeg.52)

*No attributes*

#### [`edm:Add`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionsedmAdd.53)

*No attributes*

#### [`edm:Sub`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Sub)

*No attributes*

#### [`edm:Mul`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Mul)

*No attributes*

#### [`edm:Div`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Div)

*No attributes*

#### [`edm:DivBy`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_DivBy)

*No attributes*

#### [`edm:Mod`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Mod)

*No attributes*

#### [`edm:Apply`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmApply.54)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Function](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeFunction.14.4.4)** | Reference | function name |

#### [`edm:Cast`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmCast.55)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name |

#### [`edm:Collection`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmCollection.56)

*No attributes*

#### [`edm:If`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmIf.57)

*No attributes*

#### [`edm:IsOf`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_IsOf)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified type name |

#### [`edm:LabeledElement`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmLabeledElement.59)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Name](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeName.9.1)** | Basic (simple identifier) |  |

#### [`edm:LabeledElementReference`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmLabeledElementReference.60)

*No attributes*

#### [`edm:Null`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmNull.61)

*No attributes*

#### [`edm:Record`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmRecord.62)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeType.12.2)** | Reference | qualified structured type name |

#### [`edm:PropertyValue`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyValue.63)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Property](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeProperty.14.1)** | Reference | path to a property *Context: relative path to a property of the type of the enclosing edm:Record expression* |

#### [`edm:UrlRef`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ExpressionedmUrlRef.64)

*No attributes*

## Summary

### Statistics

- **Total Element Groups**: 7
- **Total Elements**: 76
- **Elements with Attributes**: 51
- **Elements without Attributes**: 25
- **Total Attributes**: 101

### Attributes by Category

- **Basic Attributes**: 60
- **Reference Attributes**: 27
- **Path Attributes**: 14