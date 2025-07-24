# Entity Model Elements

Core entity and type definition elements

## `edm:EntityType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EntityType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) | The entity type’s name that MUST be unique within its schema. |
| **BaseType** | Reference (Absolute Reference) | qualified name of an edm:EntityType [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeBaseType.9.2) |
| **Abstract** | Basic | boolean |
| **OpenType** | Basic | boolean |
| **HasStream** | Basic | boolean |

## `edm:Key`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Key)

*No attributes*

## `edm:PropertyRef`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_PropertyRef)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Path (Relative Path) | path to structural property *Context: relative to the containing entity/complex type* |
| **Alias** | Basic (simple identifier) |  |

## `edm:Property`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Property)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **DefaultValue** | Basic | primitive value |

## `edm:NavigationProperty`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationProperty)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference (Absolute Reference) | qualified entity type name or collection thereof [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **Partner** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **ContainsTarget** | Basic | boolean |

## `edm:ReferentialConstraint`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ReferentialConstraint)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Property** | Path (Relative Path) | path to dependent property *Context: relative to the containing navigation property's source entity type* |
| **ReferencedProperty** | Path (Relative Path) | path to principal property *Context: relative to the containing navigation property's target entity type* |

## `edm:OnDelete`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_OnDelete)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Action** | Basic | action enum: Cascade, None, SetNull, SetDefault |

## `edm:ComplexType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ComplexType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **BaseType** | Reference (Absolute Reference) | qualified name of a edm:ComplexType [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_BaseType) |
| **Abstract** | Basic | boolean |
| **OpenType** | Basic | boolean |

## `edm:EnumType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_EnumType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **UnderlyingType** | Reference | qualified name of integer type *Constraints: restricted to: Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, or Edm.Int64* |
| **IsFlags** | Basic | boolean |

## `edm:Member`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Member)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Value** | Basic | integer value |

## `edm:TypeDefinition`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_TypeDefinition)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **UnderlyingType** | Reference | qualified name of primitive type *Constraints: cannot be another type definition* |