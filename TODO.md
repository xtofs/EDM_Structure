# TODO - OData EDM Structure Project

## ✅ enum only - COMPLETED

`edm:OnDelete` has an attribute Action. it is a basic attribute that is essentially an enum.

**DONE**: Fixed the rendering issue:
- Removed the non-existent "enum" subcategory from the OnDelete Action attribute
- Updated the generator to detect when there are symbols but no subcategory
- Now renders as `Basic (Cascade, None, SetNull, SetDefault)` instead of the awkward `Basic (enum or Cascade, None, SetNull, SetDefault)`
- The renderer now handles enum-like attributes gracefully without requiring an explicit "enum" subcategory

## ✅ missing permitted parent/child elements - COMPLETED
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

## ✅ inconsistencies in regards to `description` and `subcategory` - COMPLETED
**DONE**: Fixed missing subcategories for basic attributes:
- Fixed `edmx:Reference.Uri` - added `"subcategory": "uri"`
- Fixed `edm:Member.Value` - added `"subcategory": "integer"`  
- Fixed `edm:Term.DefaultValue` - added `"subcategory": "primitive-value"`
- Fixed `edmx:Edmx.Version` - added `"subcategory": "string"`

All basic attributes now have proper subcategories that match the defined subcategories in the attributeCategories section.