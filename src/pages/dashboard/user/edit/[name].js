import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/user/UserNewEditForm';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../../config';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  // 거래처 목록 및 거래처 필드 목록 가져옴
  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [post, setPosts] = useState([]);
  const userData = useRef([]);

  // 거래처 목록 불러오기
  useEffect(
    () =>
      onSnapshot(query(collection(DB, 'client')), (snapshot) => {
        // messagesDBlist();
        // setPosts(snapshot.where('name', '==', '박 현재').get());

        userData.current = [];
        snapshot.docs.forEach((doc, i) => {
          if (doc.data()) {
            const st = doc.data().creatTime.seconds * 1000;
            const up = doc.data().updateTime.seconds * 1000;
            userData.current[i] = {
              name: doc.data().name,
              phone: doc.data().phone,
              companyNumber: doc.data().companyNumber,
              bank: doc.data().bank,
              bankNumber: doc.data().bankNumber,
              address: doc.data().address,
              division: doc.data().division,
              bankUserName: doc.data().bankUserName,
              id: doc.data().id,
              avatarUrl: doc.data().avatarUrl,
              creatTime: new Date(st),
              updateTime: new Date(up),
            };
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

  console.log('파라미터 : ', search);
  console.log(post);

  const currentUser = post.find((user) => user.id + '/' === search);

  console.log('파인더 : ', currentUser);

  return (
    <Page title="User: Edit user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: currentUser ? capitalCase(currentUser.name) : null },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}
