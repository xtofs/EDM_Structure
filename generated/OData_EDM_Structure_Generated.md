# OASIS CSDL XML Elements and Attributes Classification

## Overview

Based on the OASIS OData CSDL XML Representation Version 4.02 specification, Appendix B, this document lists all EDM elements and categorizes their attribute types.

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

#### `edm:Schema`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Schema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Namespace** | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. |
| **Alias** | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. |

#### `edm:Annotations`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Annotations)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Target** | Path (Absolute Path) | target path expression *Context: can reference any model element* |
| **Qualifier** | Basic (simple identifier) |  |

### Entity Model Elements

Core entity and type definition elements

#### `edm:EntityType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EntityType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. |
| **BaseType** | Reference (Absolute Reference) | qualified name of an edm:EntityType [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| **Abstract** | Basic | boolean |
| **OpenType** | Basic | boolean |
| **HasStream** | Basic | boolean |

#### `edm:Key`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Key)

*No attributes*

#### `edm:PropertyRef`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_PropertyRef)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Path (Relative Path) | path to structural property *Context: relative to the containing entity/complex type* |
| **Alias** | Basic (simple identifier) |  |

#### `edm:Property`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Property)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **DefaultValue** | Basic | primitive value |

#### `edm:NavigationProperty`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationProperty)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference (Absolute Reference) | qualified entity type name or collection thereof [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **Partner** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **ContainsTarget** | Basic | boolean |

#### `edm:ReferentialConstraint`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ReferentialConstraint)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Property** | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* |
| **ReferencedProperty** | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* |

#### `edm:OnDelete`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_OnDelete)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Action** | Basic | action enum: Cascade, None, SetNull, SetDefault |

#### `edm:ComplexType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ComplexType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **BaseType** | Reference (Absolute Reference) | qualified name of a edm:ComplexType [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_BaseType) |
| **Abstract** | Basic | boolean |
| **OpenType** | Basic | boolean |

#### `edm:EnumType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EnumType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **UnderlyingType** | Reference | qualified name of integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* |
| **IsFlags** | Basic | boolean |

#### `edm:Member`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Member)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Value** | Basic | integer value |

#### `edm:TypeDefinition`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_TypeDefinition)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **UnderlyingType** | Reference | qualified name of primitive type *Constraints: cannot be another type definition* |

### Action and Function Elements

Action and function definition elements

#### `edm:Action`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Action)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* |

#### `edm:Function`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Function)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* |
| **IsComposable** | Basic | boolean |

#### `edm:ReturnType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ReturnType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |

#### `edm:Parameter`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Parameter)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |

### Entity Container Elements

Entity container and related elements

#### `edm:EntityContainer`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EntityContainer)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Extends** | Reference (Absolute Reference) | qualified entity container name |

#### `edm:EntitySet`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EntitySet)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **EntityType** | Reference (Absolute Reference) | qualified entity type name |
| **IncludeInServiceDocument** | Basic | boolean |

#### `edm:Singleton`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Singleton)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference (Absolute Reference) | qualified entity type name [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |

#### `edm:NavigationPropertyBinding`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationPropertyBinding)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Path** | Path (Relative Path) | navigation property path expression *Context: relative to the containing entity set's entity type* |
| **Target** | Path (Relative Path) | target path to entity set/singleton *Context: relative to the containing entity container* |

#### `edm:ActionImport`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ActionImport)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Action** | Reference (Absolute Reference) | qualified unbound action name |
| **EntitySet** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |

#### `edm:FunctionImport`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_FunctionImport)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Function** | Reference (Absolute Reference) | qualified unbound function name |
| **EntitySet** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |
| **IncludeInServiceDocument** | Basic | boolean |

### Vocabulary and Annotation Elements

Vocabulary terms and annotation elements

#### `edm:Term`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Term)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **DefaultValue** | Basic | primitive value |
| **BaseTerm** | Reference | qualified term name |
| **AppliesTo** | Basic | whitespace-separated list of symbolic values |

#### `edm:Annotation`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Annotation)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Term** | Reference | qualified term name |
| **Qualifier** | Basic (simple identifier) |  |

### Core EDMX Elements

Core EDMX wrapper elements

#### `edmx:Edmx`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Edmx)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Version** | Basic | version number string |

#### `edmx:DataServices`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_DataServices)

*No attributes*

#### `edmx:Reference`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Reference)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Uri** | Basic | URI string |

#### `edmx:Include`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Include)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Namespace** | Reference | namespace reference |
| **Alias** | Basic (simple identifier) |  |

#### `edmx:IncludeAnnotations`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_IncludeAnnotations)

| Attribute | Type | Description |
|-----------|------|-------------|
| **TermNamespace** | Reference | namespace reference |
| **Qualifier** | Basic (simple identifier) |  |
| **TargetNamespace** | Reference | namespace reference |

### Annotation Expression Elements

Elements used within annotation expressions

#### `edm:Binary`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Binary)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | binary value |

#### `edm:Bool`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Bool)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | boolean literal |

#### `edm:Date`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Date)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | date value |

#### `edm:DateTimeOffset`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_DateTimeOffset)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | datetime value |

#### `edm:Decimal`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Decimal)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | decimal value |

#### `edm:Duration`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Duration)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | duration value |

#### `edm:EnumMember`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EnumMember)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Reference | qualified enum member name |

#### `edm:Float`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Float)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | floating-point value |

#### `edm:Guid`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Guid)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | GUID value |

#### `edm:Int`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Int)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | integer value |

#### `edm:String`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_String)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | string value |

#### `edm:TimeOfDay`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_TimeOfDay)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Basic | time value |

#### `edm:AnnotationPath`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_AnnotationPath)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Path | annotation path expression |

#### `edm:ModelElementPath`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ModelElementPath)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Path | model element path expression |

#### `edm:NavigationPropertyPath`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationPropertyPath)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Path | navigation property path expression |

#### `edm:PropertyPath`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_PropertyPath)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Path | property path expression |

#### `edm:Path`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Path)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Value** | Path | value path expression |

#### `edm:And`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_And)

*No attributes*

#### `edm:Or`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Or)

*No attributes*

#### `edm:Not`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Not)

*No attributes*

#### `edm:Eq`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Eq)

*No attributes*

#### `edm:Ne`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Ne)

*No attributes*

#### `edm:Gt`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Gt)

*No attributes*

#### `edm:Ge`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Ge)

*No attributes*

#### `edm:Lt`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Lt)

*No attributes*

#### `edm:Le`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Le)

*No attributes*

#### `edm:Has`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Has)

*No attributes*

#### `edm:In`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_In)

*No attributes*

#### `edm:Neg`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Neg)

*No attributes*

#### `edm:Add`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Add)

*No attributes*

#### `edm:Sub`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Sub)

*No attributes*

#### `edm:Mul`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Mul)

*No attributes*

#### `edm:Div`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Div)

*No attributes*

#### `edm:DivBy`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_DivBy)

*No attributes*

#### `edm:Mod`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Mod)

*No attributes*

#### `edm:Apply`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Apply)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Function** | Reference | function name |

#### `edm:Cast`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Cast)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified type name [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |

#### `edm:Collection`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Collection)

*No attributes*

#### `edm:If`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_If)

*No attributes*

#### `edm:IsOf`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_IsOf)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified type name [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |

#### `edm:LabeledElement`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_LabeledElement)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |

#### `edm:LabeledElementReference`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_LabeledElementReference)

*No attributes*

#### `edm:Null`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Null)

*No attributes*

#### `edm:Record`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Record)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified structured type name [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |

#### `edm:PropertyValue`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_PropertyValue)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Property** | Reference | path to a property *Context: relative path to a property of the type of the enclosing edm:Record expression* |

#### `edm:UrlRef`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_UrlRef)

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