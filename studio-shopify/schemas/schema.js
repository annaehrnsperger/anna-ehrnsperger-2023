// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// // Document types
import frontpage from './documents/routes/frontpage'
import general from './documents/general'
import collection from './documents/collection'
// import colorTheme from './documents/colorTheme'
// import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'

// // Singleton document types
// import settings from './singletons/settings'

// Object types
import media from './objects/media'
import mainImage from './objects/mainImage'
import portableText from './objects/portableText'
import collectionRule from './objects/collectionRule'
import placeholderString from './objects/placeholderString'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoShopify from './objects/seo/shopify'
import shopifyCollection from './objects/shopifyCollection'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'

const documents = [
  general,
  frontpage,
  collection,
  // page,
  product,
  productVariant,
  // settings,
];

const objects = [
  mainImage,
  media,
  collectionRule,
  portableText,
  placeholderString,
  productOption,
  productWithVariant,
  proxyString,
  seoShopify,
  shopifyCollection,
  shopifyProduct,
  shopifyProductVariant,
];

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
});
