export const find = async (models, query, limit, skip) => {
  try {
    if (!models) {
      throw new Error(`Model name required!`);
    }
    return await models.find(query).skip(skip).limit(limit);
  } catch (error) {
    throw error;
  }
};
