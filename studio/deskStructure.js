import S from '@sanity/desk-tool/structure-builder';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { FiCircle, FiCoffee, FiFileText, FiLayout, FiSettings, FiSidebar, FiSquare } from 'react-icons/fi';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('General').icon(FiSettings).child(S.editor().schemaType('general').documentId('general')),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        icon: FiCoffee,
      }),
      S.listItem()
        .title('Blog')
        .icon(FiCircle)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem().title('Overview Page').icon(FiSidebar).child(S.editor().schemaType('overviewPage').documentId('overviewPage')),
              orderableDocumentListDeskItem({
                type: 'post',
                title: 'Posts',
                icon: FiSquare,
              }),
            ])
        ),
      S.listItem().title('Legal').icon(FiFileText).child(S.editor().schemaType('legal').documentId('legal')),
    ]);
