import { FiSidebar } from 'react-icons/fi';

export default {
  name: 'overviewPage',
  title: 'Overview Page',
  type: 'document',
  fields: [
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
    // {
    //   name: 'posts',
    //   title: 'Posts',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{ type: 'post' }],
    //     },
    //   ],
    // },
  ],
  preview: {
    prepare() {
      return {
        title: 'Overview Page',
        media: FiSidebar
      };
    },
  },
};
