# `edm:NavigationProperty`

*Part of: Entity Model Elements*

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationProperty)

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference (Absolute Reference) | qualified entity type name or collection thereof [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |
| **Partner** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **ContainsTarget** | Basic | boolean |