import { FiLayout } from 'react-icons/fi';

export default {
  type: 'document',
  name: 'frontpage',
  title: 'Frontpage',
  i18n: true,
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'lang.en',
    },
    prepare({ title }) {
      return {
        title: title,
        media: FiLayout,
      };
    },
  },
};
