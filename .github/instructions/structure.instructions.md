---
applyTo: '**/*.json'
---

The following instructions should be follow for changes to the the `odata-edm-structure.json` file:
- elements should be ordered in topological order using the `Children` property first and then alphabetically by `name` property.
- the properties of an element should be consistently ordered: "name", "description", "ref", "children", "attributes.
- the properties of an attribute should be consistently: "name", "category", "subcategory", "targets" (if category is reference), "description", "ref", 
