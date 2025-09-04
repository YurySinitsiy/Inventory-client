const valuesToUpdateInventory = (valuesToUpdate, version) => {
  const dataToUpdate = {
    //title: valuesToUpdate.title,
    //description: valuesToUpdate.description,
    //imageUrl: valuesToUpdate.imageUrl,
    //isPublic: valuesToUpdate.isPublic,
    customIdFormat: valuesToUpdate.customIds,
    //category: valuesToUpdate.category,
    //tags: valuesToUpdate.tags,
    version: version,
    //users: valuesToUpdate.users,
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

export default valuesToUpdateInventory
