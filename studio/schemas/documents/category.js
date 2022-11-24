import { FiTag } from 'react-icons/fi';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'category' }),
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FiTag,
      };
    },
  },
};
