import * as Yup from 'yup';

const updateInventoryValidSchema = (t) => {
  const validationSchema = Yup.object({
    fields: Yup.array().of(
      Yup.object({
        title: Yup.string()
          .trim()
          .required(t('required'))
          .test('unique-title', t('name.unique'), function (value) {
            if (!value) return true;
            const { options } = this;
            const { fields } = options.context || {};
            if (!fields) return true;

            const duplicates = fields.filter(
              (item) =>
                item.title?.trim().toLowerCase() === value.trim().toLowerCase()
            );
            return duplicates.length <= 1;
          }),
        type: Yup.string().required(t('required')),
        description: Yup.string().notRequired(),
        visibleInTable: Yup.boolean().notRequired(),
      })
    ),
    customIds: Yup.array().of(
      Yup.object({
        value: Yup.string().trim().required(t('required')),
      })
    ),
  });

  return validationSchema
};
export default updateInventoryValidSchema;
