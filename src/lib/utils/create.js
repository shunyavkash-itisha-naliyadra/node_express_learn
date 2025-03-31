export const create = async (models, property) => {
  try {
    if (!models && !property) {
      throw new Error(`Model name required!`);
    }
    return await models.create(property);
  } catch (error) {
    throw error;
  }
};
