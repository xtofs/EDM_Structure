# [`edm:NavigationProperty`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_NavigationProperty)

*Part of: Entity Model Elements*

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type)** | Reference (Absolute Reference) | qualified entity type name or collection thereof |
| **Nullable** | Basic | boolean |
| **Partner** | Path (Relative Path) | path to partner navigation property *Context: relative to the target entity type specified in Type attribute* |
| **ContainsTarget** | Basic | boolean |