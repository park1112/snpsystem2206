import { useEffect, useState } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { getConversations, getContacts } from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ChatSidebar, ChatWindow } from '../../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

Chat.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  // // ----------------------------------------------------------------------
  // const [posts, setPosts] = useState([]);
  // const firebaseApp = initializeApp(FIREBASE_API);
  // const { user } = useAuth(); //유저 정보 가져옴
  // const userUid = user.id;

  // console.log(userUid);

  // // const DB = getFirestore(firebaseApp);
  // const DB = getFirestore(firebaseApp);
  // const q = query(collection(DB, 'chatroom'), where('who', 'array-contains', userUid));

  // useEffect(
  //   () =>
  //     onSnapshot(q, (snapshot) => {
  //       // setPosts(snapshot.where('name', '==', '박 현재').get());
  //       snapshot.docs.forEach((doc, i) => {
  //         setPosts([...posts, doc.data()]);
  //       });
  //       // setPosts(snapshot.docs);
  //       console.log('posts');
  //       console.log(posts);
  //       console.log('posts');
  //     }),
  //   [DB]
  // );

  return (
    <Page title="메시지">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="메시지"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
