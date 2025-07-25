# TODO - OData EDM Structure Project





## grouping

The grouping of elements in the JSON file leads to really nive grouping in the markdown
But I think it shouldn't be done with actual nesting in JSON.

Why not have a 
```JSON
 "elementGroups": [
        {
            "name": "Schema Elements",
            "id" "schema-elements"
        },
        {
            "name": "Entity Model Elements",
            "id" "entity-model-elements"
        }        
        // ...
 ]

 concatenate the elements list from each group into a long list of elements 
 and move that to the top level

```
{
    "metadata": {
        // ...
    },
    "elements": {
        // ...
    }
    "attributeCategories": {
        // ...
    }
}

and every element gets a `group` property

```
{
    "name": "edm:Schema",
    "group": "schema-elements",
    "ref": "#foo",
    "description": "bla bla bla ",
    "permittedChildren": [
             // ...
    ],
    "attributes": [
             // ...
    ]
}
```
