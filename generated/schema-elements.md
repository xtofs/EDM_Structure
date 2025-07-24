# Schema Elements

Core schema definition elements

## `edm:Schema`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Schema)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Namespace** | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. |
| **Alias** | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. |

## `edm:Annotations`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Annotations)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Target** | Path (Absolute Path) | target path expression *Context: can reference any model element* |
| **Qualifier** | Basic (simple identifier) |  |