const valuesToUpdateInventory = (valuesToUpdate, version) => {
  const dataToUpdate = {
    customIdFormat: valuesToUpdate.customIds,
    version: version,
    fields: valuesToUpdate.fields.map((f) => ({
      slot: f.slot,
      title: f.title,
      description: f.description,
      type: f.type,
      visibleInTable: f.visibleInTable,
      position: f.order,
    })),
  };
  return dataToUpdate;
};

export default valuesToUpdateInventory;
