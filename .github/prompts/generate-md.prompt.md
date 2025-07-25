---
mode: agent
---
THe file OData_edm_structure.md has detaild description of the OData EDM structure. It includes information about the Entity Data Model (EDM) used in OData, which is essential for understanding how data is structured and accessed in OData services. The document covers various aspects of the EDM, including entity types, complex types, entity sets, and relationships between entities.
It lists all EDM model elements, their properties, and explains the role these properties play:
    - basic properties that "just" hold data
    - reference properties that model relationships between model elements
    - path properties that model a sequence of model elements as a special form of relationships between model elements

This document is crucial for developers and architects working with OData services, as it provides a comprehensive overview of how to define and manipulate data structures within the OData framework. Understanding the EDM is key to effectively utilizing OData's capabilities for data access and manipulation.

It contains a manually authorer semi-structured markdown document for the structure descibed above.

I want to 
a) transform this document into a machine-readable format (probably JSON
b) generate typescript scripts that can transform that machine-readable format into a readable, consistent, markdown document easy to read and understand.


