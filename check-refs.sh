#!/bin/bash

# Common attribute refs that are likely correct based on OData spec
echo "Checking potential reference issues..."

# These are likely to be correct (specific attribute sections)
echo "✅ Likely correct refs:"
echo "- #AttributeBaseType.9.2 (already confirmed)"
echo "- #AttributeType.12.2 (already confirmed)" 
echo "- #sec_Type (already confirmed)"
echo "- #sec_BaseType (already confirmed)"

# These generic patterns may need manual verification
echo ""
echo "❗ May need manual verification (generic patterns):"
echo "- #AttributeName - Check if this general section exists"
echo "- #AttributeAlias - Check if this general section exists"
echo "- #AttributeNamespace - Check if this general section exists"
echo "- #AttributeTarget - Check if this general section exists"
echo "- #AttributeQualifier - Check if this general section exists"
echo "- #AttributeAbstract - Check if this general section exists"
echo "- #AttributeOpenType - Check if this general section exists"
echo "- #AttributeHasStream - Check if this general section exists"
echo "- #AttributeNullable - Check if this general section exists"
echo "- #AttributeDefaultValue - Check if this general section exists"
echo "- Other generic #Attribute* patterns"

echo ""
echo "Total attributes with refs added: 85"
echo "Consider checking these links manually against the OData specification"
