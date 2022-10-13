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
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'productWithVariant' }],
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
