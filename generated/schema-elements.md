# Schema Elements

Core schema definition elements

## [`edm:Schema`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmSchema.7)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Namespace](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeNamespace.5.1)** | Basic (simple identifier) | A simple identifier used to uniquely identify the element within its containing scope. |
| **[Alias](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeAlias.5.2)** | Basic (simple identifier) | The alias of a schema MAY be used instead of the namespaceto identify model elements of that schema. |

## [`edm:Annotations`](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#ElementedmAnnotations.8)

| Attribute | Type | Description |
|-----------|------|-------------|
| **[Target](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeTarget.8.1)** | Path (Absolute Path) | target path expression *Context: can reference any model element* |
| **[Qualifier](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.02/csd01/odata-csdl-xml-v4.02-csd01.html#AttributeQualifier.6.2)** | Basic (simple identifier) |  |