# TODO - OData EDM Structure Project

## ✅ summary in JSON - COMPLETED
~~the JSON file has a sumamry section that doesn't belong there.
The generate scipt could calculate it and print it but  don't include it in the generated markdown, or safe it permanently in the JSON file.~~

**DONE**: Removed static summary from JSON, updated schema and types. Statistics are now calculated dynamically by the generator.


## ✅ "hasAttributes": true - COMPLETED
~~The `hasAttributes` property in the JSON structure is redundant because the presence of an `attributes` array implies that there are attributes. This property can be removed to simplify the structure.~~

**DONE**: Removed `hasAttributes` property from types, schema, parser, generator, and JSON data. Now checks `attributes.length > 0` instead.


## ✅ document links - COMPLETED
~~The links are shown as "📖 Standard"
Pleas don't use emoticons and just make the element and attribute name a link instead of extra text~~

**DONE**: Updated generator to make element and attribute names directly clickable instead of separate emoji links. Element headings like `[edm:EntityType](url)` and attribute names like `[BaseType](url)` are now direct links without emoji or extra text.


## ✅ vulnerability - COMPLETED
~~At some point I saw a note from npm that there is a package that is deprecated or vulnarable.
Can you check and see if there is a vulnarability in the dependencies?~~

**DONE**: Ran `npm audit` - found 0 vulnerabilities. All dependencies are secure. Some packages are outdated but no security issues.

## ✅ basic attributeCategory - COMPLETED  
~~the attributeCategory `basic` lists the three types of mixed numeric/symbolic basic attribute types.
But it doesn't list the simpler ones like `simple identifier`, `boolean`, `positive interger`, `integer`, etc.~~

**DONE**: Added common basic attribute subcategories: simple identifier, boolean, positive integer, integer, non-negative integer, string, URI, enum, and primitive value. Now the basic category is comprehensive.

## ✅ missing "ref"s - COMPLETED
~~Please add more `ref` properties to the elements and attributes in the JSON structure. by finding the html section in the baseUrl.
THe best links can be found in Appendix B of the standard.~~

**DONE**: Comprehensively updated all 154 references to match exact anchors from OData CSDL XML v4.02 Appendix B. Fixed critical issue where HasStream was pointing to wrong anchor (#AttributeHasStream.6.4 → #AttributeHasStream.9.5). All element and attribute refs now point to correct specification sections.

## previewing the generated doc
please add a npm script to convert the generated markdown to html for preview.
I there is an npm module, great. otherwise just assume pandoc is available.

## link validation
add a script that checks if the refs exist. I assume that sending a GET request with the # fragment is not enough since this will always return a document. We woudl need to test if the # fragment actually exists in the HTML


## missing permitted parent/child elements
Each model element can appear only in a specific context in a CSDL file, i.e. as child of a few specific parent elements.
Try to find a few, I can add the rest.
This information is missing in the JSON structure. It should be added to each element as a `permittedChildren` property, to indicate where it can be used within the CSDL hierarchy.
The permitted parents can be calculated from the `permittedChildren` since we have a complete list of elements. It is essentially a pivot/group by (in C#.LINQ: `from e in elements from c in e.Children group e.ElementName by c nto g select new { Element = g.Key, Parents = g.AsEnumerable() }; )))
In the generator we should add one line each for permitted children and permitted parents, each with a comma separated list of names of these elements.

