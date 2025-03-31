const defaultSchemaConfig = {
  timestamps: true,
  versionKey: "__v",
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
};

export default defaultSchemaConfig;
