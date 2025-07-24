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


# vulnerability
At some point I saw a note from npm that there is a package that is deprecated or vulnarable.
Can you check and see if there is a vulnarability in the dependencies?

## basic attributeCategory
the attributeCategory `basic` lists the three types of mixed numeric/symbolic basic attribute types.
But it doesn't list the simpler ones like `simple identifier`, `boolean`, `positive interger`, `integer`, etc.

## missing "ref"s
Please add more `ref` properties to the elements and attributes in the JSON structure. by finding the html section in the baseUrl

## missing permitted parent/child elements
Each model element can appear only in a specific context in a CSDL file, i.e. as child of a specific parent element.
This information is missing in the JSON structure. It should be added to each element to indicate where it can be used within the CSDL hierarchy.
Please add a `permittedChildren` property to each element that lists the parent elements where it can be used. And in the generator calculate the permited parents and show both lists in the generated markdown.

