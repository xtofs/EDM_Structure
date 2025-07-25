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

#### [`edm:Schema`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7)

Permitted Children: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype), [edm:EnumType](#edmenumtype), [edm:TypeDefinition](#edmtypedefinition), [edm:Action](#edmaction), [edm:Function](#edmfunction), [edm:EntityContainer](#edmentitycontainer), [edm:Term](#edmterm), [edm:Annotations](#edmannotations)

Permitted Parents: None

| Attribute | Type | Description |
|-----------|------|-------------|
| **Namespace** | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. |
| **Alias** | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. |

#### [`edm:Annotations`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Target** | Path (Absolute Path) | target path expression *Context: can reference any model element* |
| **Qualifier** | Basic (simple identifier) | Optional qualifier to distinguish multiple instances |

### Entity Model Elements

Core entity and type definition elements

#### [`edm:EntityType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityType.9)

Permitted Children: [edm:Annotation](#edmannotation), [edm:Key](#edmkey), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. |
| **BaseType** | Reference (Absolute Reference) | qualified name of an edm:EntityType |
| **Abstract** | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly |
| **OpenType** | Basic (boolean) | Whether the type allows additional properties not explicitly declared |
| **HasStream** | Basic (boolean) | Whether the entity type supports media resources |

#### [`edm:Key`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmKey.10)

Permitted Children: [edm:PropertyRef](#edmpropertyref)

Permitted Parents: [edm:EntityType](#edmentitytype)

*No attributes*

#### [`edm:PropertyRef`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmPropertyRef.11)

Permitted Children: None

Permitted Parents: [edm:Key](#edmkey)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Path (Relative Path) | path to structural property *Context: relative to the containing entity type* |
| **Alias** | Basic (simple identifier) | Alternative name that can be used to reference the property |

#### [`edm:Property`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmProperty.12)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **Type** | Reference | qualified type name or collection of that |
| **Nullable** | Basic (boolean) | Whether the property can have null values |
| **DefaultValue** | Basic (primitive value) | the model's value of the attribute when the attribute is not present in CSDL |
| **Scale** | Basic (non negative integer or `floating`, `variable`) | specifies the maximum number of digits allowed to the right of the decimal point. |

#### [`edm:NavigationProperty`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationProperty.13)

Permitted Children: [edm:OnDelete](#edmondelete), [edm:ReferentialConstraint](#edmreferentialconstraint), [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EntityType](#edmentitytype), [edm:ComplexType](#edmcomplextype)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **Type** | Reference (Absolute Reference) | qualified entity type name or collection of that |
| **Nullable** | Basic (boolean) | Whether the property can have null values |
| **Partner** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **ContainsTarget** | Basic (boolean) | Whether the navigation property contains its target entities |

#### [`edm:ReferentialConstraint`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReferentialConstraint.14)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:NavigationProperty](#edmnavigationproperty)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Property** | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* |
| **ReferencedProperty** | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* |

#### [`edm:OnDelete`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmOnDelete.15)

Permitted Children: None

Permitted Parents: [edm:NavigationProperty](#edmnavigationproperty)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Action** | Basic (`Cascade`, `None`, `SetNull`, `SetDefault`) | action the service will take on related entities when the entity is deleted. |

#### [`edm:ComplexType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmComplexType.16)

Permitted Children: [edm:Annotation](#edmannotation), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **BaseType** | Reference (Absolute Reference) | qualified name of a edm:ComplexType |
| **Abstract** | Basic (boolean) | Whether the type is abstract and cannot be instantiated directly |
| **OpenType** | Basic (boolean) | Whether the type allows additional properties not explicitly declared |

#### [`edm:EnumType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEnumType.17)

Permitted Children: [edm:Annotation](#edmannotation), [edm:Member](#edmmember)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **UnderlyingType** | Reference | qualified name of and integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* |
| **IsFlags** | Basic (boolean) | Whether the enumeration supports bitwise operations |

#### [`edm:Member`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmMember.18)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:EnumType](#edmenumtype)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **Value** | Basic (integer) | integer value |

#### [`edm:TypeDefinition`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTypeDefinition.19)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **UnderlyingType** | Reference | qualified name of primitive type *Constraints: cannot be another type definition* |

### Action and Function Elements

Action and function definition elements

#### [`edm:Action`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAction.20)

Permitted Children: [edm:Annotation](#edmannotation), [edm:Parameter](#edmparameter), [edm:ReturnType](#edmreturntype)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic (boolean) | Whether the action/function is bound to a specific entity type |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* |

#### [`edm:Function`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunction.21)

Permitted Children: [edm:Annotation](#edmannotation), [edm:Parameter](#edmparameter), [edm:ReturnType](#edmreturntype)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic (boolean) | Whether the action/function is bound to a specific entity type |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* |
| **IsComposable** | Basic (boolean) | Whether the function can be used in composition with other functions |

#### [`edm:ReturnType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmReturnType.22)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Action](#edmaction), [edm:Function](#edmfunction)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified type name or collection |
| **Nullable** | Basic (boolean) | Whether the property can have null values |

#### [`edm:Parameter`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmParameter.23)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Action](#edmaction), [edm:Function](#edmfunction)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The name identifier of the element |
| **Type** | Reference | qualified type name or collection |
| **Nullable** | Basic (boolean) | Whether the property can have null values |

### Entity Container Elements

Entity container and related elements

#### [`edm:EntityContainer`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntityContainer.24)

Permitted Children: [edm:ActionImport](#edmactionimport), [edm:Annotation](#edmannotation), [edm:EntitySet](#edmentityset), [edm:FunctionImport](#edmfunctionimport), [edm:Singleton](#edmsingleton)

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Extends** | Reference (Absolute Reference) | qualified entity container name |

#### [`edm:EntitySet`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmEntitySet.25)

Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **EntityType** | Reference (Absolute Reference) | qualified entity type name |
| **IncludeInServiceDocument** | Basic (boolean) | Whether to include this element in the service document |

#### [`edm:Singleton`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSingleton.26)

Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference (Absolute Reference) | qualified entity type name |
| **Nullable** | Basic (boolean) | Whether the property can have null values |

#### [`edm:NavigationPropertyBinding`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmNavigationPropertyBinding.27)

Permitted Children: None

Permitted Parents: None

| Attribute | Type | Description |
|-----------|------|-------------|
| **Path** | Path (Relative Path) | navigation property path expression *Context: relative to the containing entity set's entity type* |
| **Target** | Path (Relative Path) | target path to entity set/singleton *Context: relative to the containing entity container* |

#### [`edm:ActionImport`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmActionImport.28)

Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Action** | Reference (Absolute Reference) | qualified unbound action name |
| **EntitySet** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |

#### [`edm:FunctionImport`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmFunctionImport.29)

Permitted Children: None

Permitted Parents: [edm:EntityContainer](#edmentitycontainer)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Function** | Reference (Absolute Reference) | qualified unbound function name |
| **EntitySet** | Reference (Relative Reference) | entity set name or target path *Context: relative to the containing entity container* |
| **IncludeInServiceDocument** | Basic (boolean) | Whether to include this element in the service document |

### Vocabulary and Annotation Elements

Vocabulary terms and annotation elements

#### [`edm:Term`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmTerm.30)

Permitted Children: None

Permitted Parents: [edm:Schema](#edmschema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection |
| **Nullable** | Basic (boolean) | Whether the property can have null values |
| **DefaultValue** | Basic (primitive value) | primitive value |
| **BaseTerm** | Reference | qualified term name |
| **AppliesTo** | Basic (`Action`, `ActionImport`, `Annotation`, `Apply`, `Cast`, `Collection`, `ComplexType`, `EntityContainer`, `EntitySet`, `EntityType`, `EnumType`, `Function`, `FunctionImport`, `If`, `Include`, `IsOf`, `LabeledElement`, `Member`, `NavigationProperty`, `Null`, `OnDelete`, `Parameter`, `Property`, `PropertyValue`, `Record`, `Reference`, `ReferentialConstraint`, `ReturnType`, `Schema`, `Singleton`, `Term`, `TypeDefinition`, `UrlRef`) | specifies a list of model elements to which the term MAY be applied to. |

#### [`edm:Annotation`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotation.31)

Permitted Children: [edm:Annotation](#edmannotation)

Permitted Parents: [edm:Annotations](#edmannotations), [edm:EntityType](#edmentitytype), [edm:Property](#edmproperty), [edm:NavigationProperty](#edmnavigationproperty), [edm:ReferentialConstraint](#edmreferentialconstraint), [edm:ComplexType](#edmcomplextype), [edm:EnumType](#edmenumtype), [edm:Member](#edmmember), [edm:TypeDefinition](#edmtypedefinition), [edm:Action](#edmaction), [edm:Function](#edmfunction), [edm:ReturnType](#edmreturntype), [edm:Parameter](#edmparameter), [edm:EntityContainer](#edmentitycontainer), [edm:Annotation](#edmannotation)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Term** | Reference | qualified term name |
| **Qualifier** | Basic (simple identifier) | Optional qualifier to distinguish multiple instances |

### Core EDMX Elements

Core EDMX wrapper elements

#### [`edmx:Edmx`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxEdmx.2)

Permitted Children: [edmx:DataServices](#edmxdataservices), [edmx:Reference](#edmxreference)

Permitted Parents: None

| Attribute | Type | Description |
|-----------|------|-------------|
| **Version** | Basic (string) | version number string |

#### [`edmx:DataServices`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxDataServices.3)

Permitted Children: None

Permitted Parents: [edmx:Edmx](#edmxedmx)

*No attributes*

#### [`edmx:Reference`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxReference.4)

Permitted Children: [edmx:Include](#edmxinclude), [edmx:IncludeAnnotations](#edmxincludeannotations)

Permitted Parents: [edmx:Edmx](#edmxedmx)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Uri** | Basic (uri) | URI string |

#### [`edmx:Include`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxInclude.5)

Permitted Children: None

Permitted Parents: [edmx:Reference](#edmxreference)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Namespace** | Reference | namespace reference |
| **Alias** | Basic (simple identifier) | The value that can be used in qualified names instead of the namespace. |

#### [`edmx:IncludeAnnotations`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmxIncludeAnnotations.6)

Permitted Children: None

Permitted Parents: [edmx:Reference](#edmxreference)

| Attribute | Type | Description |
|-----------|------|-------------|
| **TermNamespace** | Reference | namespace reference |
| **Qualifier** | Basic (simple identifier) | Optional qualifier to distinguish multiple instances |
| **TargetNamespace** | Reference | namespace reference |