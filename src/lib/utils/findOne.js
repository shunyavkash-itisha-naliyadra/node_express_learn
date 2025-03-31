export const findOne = async (models, property) => {
  try {
    if (!models && !property) {
      throw new Error(`Model name required!`);
    }
    return await models.findOne(property);
  } catch (error) {
    throw error;
  }
};
