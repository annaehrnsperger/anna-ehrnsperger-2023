import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default {
  type: 'document',
  name: 'post',
  title: 'Post',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'post' }),
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Is a unique part at the end of the URL, e.g. mywebsite.com/my-page',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
    },

    {
      title: 'Image',
      name: 'image',
      type: 'mainImage',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'content[0].children[0].text',
      media: 'image.image.asset',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
};
