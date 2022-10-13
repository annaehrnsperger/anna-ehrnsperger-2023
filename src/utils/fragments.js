export const general = `
  "general": *[_type == "general"][0]{
    ...,
    navigation{
      pages[]->{
        ...,
        title,
        'slug': slug.current
      }
    },
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

export const product = `
  ...,
  'title': store.title,
  'slug': store.slug.current,
  'image': store.previewImageUrl,
  'price': store.priceRange.maxVariantPrice,
  'variants': store.variants[]->{
    ...,
    'id': store.id,
    'title': store.title,
    'price': store.price,
  }
`;
