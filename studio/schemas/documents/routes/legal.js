import { FiFileText } from 'react-icons/fi';

export default {
  type: 'document',
  name: 'legal',
  title: 'Legal',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'portableText',
    },

  ],
  preview: {
    prepare() {
      return {
        title: `Legal`,
        media: FiFileText,
      };
    },
  },
};
