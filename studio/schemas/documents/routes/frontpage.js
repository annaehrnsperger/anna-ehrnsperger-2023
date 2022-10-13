import { FiLayout } from 'react-icons/fi';

export default {
  type: 'document',
  name: 'frontpage',
  title: 'Frontpage',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'media',
      type: 'media',
      title: 'Media',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FiLayout,
      };
    },
  },
};
