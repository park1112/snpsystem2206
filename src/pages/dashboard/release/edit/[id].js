// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// _mock_
import { _invoices } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../../sections/@dashboard/release/new-edit-form';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../../config';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

ReleaseEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ReleaseEdit() {
  // 송장 목록 불러오기
  // 거래처 목록 및 거래처 필드 목록 가져옴
  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [post, setPosts] = useState([]);
  const userData = useRef([]);

  // 거래처 목록 불러오기
  useEffect(
    () =>
      onSnapshot(query(collection(DB, 'release')), (snapshot) => {
        // messagesDBlist();
        // setPosts(snapshot.where('name', '==', '박 현재').get());

        userData.current = [];
        snapshot.docs.forEach((doc, i) => {
          if (doc.data()) {
            userData.current[i] = doc.data();
            const st = doc.data().createDate.seconds * 1000;
            const du = doc.data().dueDate.seconds * 1000;

            userData.current[i].createDate = new Date(st);
            userData.current[i].dueDate = new Date(du);
          }
        });

        setPosts([...userData.current]);
      }),
    [DB]
  );

  const { themeStretch } = useSettings();

  // const { query } = useRouter();

  // const { name } = query;
  const current = decodeURI(window.location.href);
  const search = current.split('edit/')[1];

  // console.log('파라미터 : ', search);
  // console.log(post);

  const currentInvoice = post.find((user) => user.id + '/' === search);

  // console.log('파인더 : ', currentInvoice);

  // 송장 목록 불러오기

  // const { query } = useRouter();

  // const { id } = query;

  // const invoice = _invoices.find((invoice) => invoice.id === id);
  //   const { themeStretch } = useSettings();

  //   const { query } = useRouter();

  //   const { id } = query;

  //   const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="출고 송장: 수정">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="출고송장 수정"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: '출고', href: PATH_DASHBOARD.release.list },
            { name: currentInvoice?.invoiceNumber || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </Page>
  );
}
