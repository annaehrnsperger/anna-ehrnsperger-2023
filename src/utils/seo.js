export const seo = (general, pageTitle = '') => {
  return {
    title: pageTitle ? `${pageTitle} • ${general.siteTitle}` : general.siteTitle,
    meta: [
      {
        hid: 'title',
        name: 'title',
        content: general.siteTitle,
      },
      {
        hid: 'description',
        name: 'description',
        content: general.description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: general.previewImage,
      },
    ],
    link: [general.favicon ? { rel: 'icon', type: 'image/png', href: general.favicon } : { rel: 'icon', href: 'data:image' }],
  };
};
