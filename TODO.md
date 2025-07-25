# TODO - OData EDM Structure Project


## enum only

`edm:OnDelete` has an attribute Action. it is a basic attribute that is essentially an enum.
at the moment it is rendered as `Basic (enum or Cascade, None, SetNull, SetDefault)`

two problems with that
- we currently have no basic attribute subcategory called enum
- the way this is rendered is awkward since it only allows symbols it should render as `Basic (Cascade, None, SetNull, SetDefault)`

we can either introduce an enum subcategory or the render just detects it that there are symbols but no subcategory and renders it accordingly



## missing permitted parent/child elements
Each model element can appear only in a specific context in a CSDL file, i.e. as child of a few specific parent elements.
The document at input-docs\parent_child_relationships.csv contains a flat list of parent/child relationships.
This information is missing in the JSON structure. It should be added to each element as a `permittedChildren` property, to indicate where it can be used within the CSDL hierarchy.
The permitted parents can be calculated from the `permittedChildren` since we have a complete list of elements. It is essentially a pivot/group by (in C#.LINQ: `from e in elements from c in e.Children group e.ElementName by c nto g select new { Element = g.Key, Parents = g.AsEnumerable() }; )))

In the generator we should add one line each for permitted children and permitted parents.
One line each between the #### header and the table each with a comma separated list of names of these elements with an intra-document link. 
Something like:
```
Parents : [edm:Schema](#schema)
Children: [edm:Member](#Member), [edm:Annotation](#Annotation) 
``` 

## still some inconsistencies in regards to `description` and `subcategory`
for example ```
  "name": "edmx:Reference",
                    "attributes": [
                        {
                            "name": "Uri",
                            "category": "basic",
                            "description": "URI string",
```
Doesn't specify the subcategory of the basic attribute with name "Uri".
SHould be "URI" as defined in the Json
```
 {
    "name": "URI",
    "description": "Uniform Resource Identifier"
},
```