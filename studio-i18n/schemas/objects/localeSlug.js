import { supportedLanguages } from '../languages';

export default {
  name: 'localeSlug',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    description:
      'Is a unique part at the end of the URL, e.g. mywebsite.com/my-page',
    options: {
      source: 'title.en',
      maxLength: 200,
      slugify: (input) =>
        input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
    },
    validation: (Rule) => Rule.required(),
  })),
};
