import { FiTv } from 'react-icons/fi';

export default {
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      hidden: ({ parent }) => !parent?.type || parent.type !== 'image',
    },
    {
      name: 'video',
      type: 'mux.video',
      title: 'Video',
      hidden: ({ parent }) => !parent?.type || parent.type !== 'video',
    },
  ],
  preview: {
    select: {
      title: 'image.alt',
      type: 'type',
      image: 'image.image.asset',
    },
    prepare({ title, type, image }) {
      return {
        title: type === 'image' ? title : 'Video',
        media: type === 'image' ? image : FiTv,
      };
    },
  },
};
