import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { FiArchive, FiCircle } from 'react-icons/fi';

export default {
  type: 'document',
  name: 'project',
  title: 'Project',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    {
      name: 'archived',
      type: 'boolean',
      title: 'Archived?',
      initialValue: false,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'collaborators',
      type: 'string',
      title: 'Collaborators',
    },
    {
      name: 'year',
      type: 'string',
      title: 'Year',
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          title: 'Category',
        },
      ],
    },
    {
      name: 'preview',
      type: 'media',
      title: 'Preview',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      archived: 'archived',
      media: 'preview.image.image.asset',
    },
    prepare({ title, subtitle, archived, media }) {
      return {
        title: archived ? 'Archived' : title,
        subtitle: archived ? '' : subtitle,
        media: (archived ? FiArchive : media) || FiCircle,
      };
    },
  },
};
