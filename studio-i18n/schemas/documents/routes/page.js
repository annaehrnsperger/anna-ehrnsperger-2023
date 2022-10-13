import { FiSidebar } from 'react-icons/fi';

export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'localeSlug',
      title: 'Slug',
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'slug.en.current',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `/${subtitle}`,
        media: FiSidebar,
      };
    },
  },
};
