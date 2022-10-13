import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import general from './documents/general';
import page from './documents/routes/page';
import frontpage from './documents/routes/frontpage';
import overviewPage from './documents/routes/overviewPage';
import post from './documents/routes/post';
import portableText from './objects/portableText';
import seo from './objects/seo';
import mainImage from './objects/mainImage';
import socialLink from './objects/socialLink';
import media from './objects/media';
import simplePortableText from './objects/simplePortableText';
import legal from './documents/routes/legal';
import category from './documents/category';

const documents = [
  general,
  frontpage,
  overviewPage,
  page,
  post,
  legal,
  category,
];

const objects = [
  simplePortableText,
  portableText,
  seo,
  mainImage,
  socialLink,
  media,
];

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
});
