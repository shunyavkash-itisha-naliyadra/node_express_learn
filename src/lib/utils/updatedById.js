export const updatedById = async (models, id, property) => {
  try {
    if (!models && !id) {
      throw new Error(`Model name required!`);
    }
    return await models.updatedById(id, property);
  } catch (error) {
    throw error;
  }
};
