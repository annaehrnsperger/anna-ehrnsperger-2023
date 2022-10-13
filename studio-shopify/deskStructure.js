import S from '@sanity/desk-tool/structure-builder'
import { products } from './desk/products'
import { FiSettings, FiLayout } from 'react-icons/fi';

export default () => 
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('General')
        .icon(FiSettings)
        .child(S.editor().schemaType('general').documentId('general')),
      S.divider(),
      S.listItem()
        .title('Frontpage')
        .icon(FiLayout)
        .child(S.editor().schemaType('frontpage').documentId('frontpage')),
      // S.listItem()
      //   .title('Pages')
      //   .icon(FiSidebar)
      //   // .child(S.documentTypeList('page').title('Pages')),
      //   .child(S.documentTypeList('page')),
      S.listItem()
        .title('Collections')
        .schemaType('collection')
        .child(S.documentTypeList('collection')),
      products,
    ])













// import S from '@sanity/desk-tool/structure-builder';
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
// import {
//   FiCircle,
//   FiFile,
//   FiLayout,
//   FiSettings,
//   FiSidebar,
//   FiSquare,
// } from 'react-icons/fi';

// export default () =>
//   S.list()
//     .title('Content')
//     .items([
//       S.listItem()
//         .title('Blog')
//         .icon(FiCircle)
//         .child(
//           S.list()
//             .title('Blog')
//             .items([
//               S.listItem()
//                 .title('Overview Page')
//                 .icon(FiSidebar)
//                 .child(
//                   S.editor()
//                     .schemaType('overviewPage')
//                     .documentId('overviewPage')
//                 ),
//               orderableDocumentListDeskItem({
//                 type: 'post',
//                 title: 'Posts',
//                 icon: FiSquare,
//               }),
//             ])
//         ),
//       S.listItem()
//         .title('Legal')
//         .icon(FiFile)
//         .child(S.editor().schemaType('legal').documentId('legal')),
//     ]);