export const general = `
  "general": *[_type == "general"][0]{
    ...,
    'siteTitle': defaultSeo.siteTitle,
    'description': defaultSeo.description,
    'previewImage': defaultSeo.previewImage.asset->url,
    'favicon': defaultSeo.favicon.asset->url
  },
`;

export const image = `
  'image': image.image.asset->url,
  'alt': image.alt,
`;