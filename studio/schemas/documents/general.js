export default {
  type: 'document',
  name: 'general',
  title: 'General',
  fields: [
    {
      title: 'Default SEO',
      name: 'defaultSeo',
      type: 'object',
      fields: [
        {
          title: 'Site Title',
          name: 'siteTitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Description',
          name: 'description',
          type: 'text',
          description: 'Important for SEO. This will appear in search engines below the title.',
          validation: (Rule) => Rule.max(155).warning('Should be under 155 characters').required(),
        },
        {
          title: 'Preview Image',
          name: 'previewImage',
          type: 'image',
          description: '1200x630 recommended (will be auto resized).',
        },
        {
          title: 'Favicon',
          name: 'favicon',
          type: 'image',
        },
      ],
      options: { collapsible: true, collapsed: false },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'General',
      };
    },
  },
};
