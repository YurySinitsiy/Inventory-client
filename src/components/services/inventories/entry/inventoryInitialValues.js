const inventoryInitialValues = (inventory) => {
  if (!inventory) return;
  const initialValues = inventory
    ? {
        title: inventory.title || "",
        description: inventory.description || "",
        imageUrl: inventory.imageUrl || "",
        isPublic: inventory.isPublic || false,
        category: inventory.category || "",
        tags: inventory.InventoryTag
          ? inventory.InventoryTag.map((it) => it.Tag?.name)
          : [],
        customIds: Array.isArray(inventory.customIdFormat)
          ? inventory.customIdFormat
          : [],
        fields: Array.isArray(inventory.fieldConfigs)
          ? inventory.fieldConfigs
          : [],
        users: Array.isArray(inventory.users) ? inventory.users : [],
        version: inventory.version || 1,
      }
    : {
        title: "",
        description: "",
        imageUrl: "",
        isPublic: false,
        category: "",
        customIds: [],
        fields: [],
        tags: [],
        users: [],
        version: 1,
      };

  return initialValues;
};

export default inventoryInitialValues;
