# Action and Function Elements

Action and function definition elements

## [`edm:Action`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Action)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the action's parameters when bound* |

## [`edm:Function`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Function)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **IsBound** | Basic | boolean |
| **EntitySetPath** | Path (Relative Path) | entity set path expression *Context: relative to the function's parameters when bound* |
| **IsComposable** | Basic | boolean |

## [`edm:ReturnType`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_ReturnType)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type)** | Reference | qualified type name or collection |
| **Nullable** | Basic | boolean |

## [`edm:Parameter`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Parameter)

| Attribute | Type | Description |
|-----------|------|-------------|
| **Name** | Basic (simple identifier) |  |
| **[Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#sec_Type)** | Reference | qualified type name or collection |
| **Nullable** | Basic | boolean |