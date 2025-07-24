# Action and Function Elements

Action and function definition elements

## `edm:Action`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Action)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* |

## `edm:Function`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Function)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* |
| **IsComposable** | Basic | boolean |

## `edm:ReturnType`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ReturnType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |

## `edm:Parameter`

[📖 View in Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Parameter)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **Type** | Reference | qualified type name or collection [📖 Standard](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type) |
| **Nullable** | Basic | boolean |