// @mui
import { Box, Card, Stack, Button, Avatar, Tooltip, Typography, CardHeader, IconButton } from '@mui/material';

// components
import Iconify from '../../../../components/Iconify';

// --------------------------------------------------------------------

import {
  addDoc,
  getFirestore,
  onSnapshot,
  collection,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  where,
  getDoc,
  getDocs,
} from '@firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../../config';
import useAuth from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// --------------------------------------------------------------------

//피드 추가 !!

export default function BankingContacts() {
  const { user } = useAuth(); //유저 정보 가져옴

  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [posts, setPosts] = useState([]);

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const chatRef = useRef(0);

  useEffect(
    () =>
      onSnapshot(query(collection(DB, 'users')), (snapshot) => {
        setPosts(snapshot.docs);
        console.log(snapshot.docs);
      }),
    [DB]
  );

  //채팅방 생성

  const sendPost = async (data) => {
    if (loading) return;
    setLoading(true);

    // 여기 추가 !!
    // 먼저 채팅방을 만들고 그다음 추가한다!! 아이디를 가져올수 있음!

    const citiesRef = collection(DB, 'chatroom');
    const q = query(citiesRef, where('participants', 'array-contains', user?.id || data.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      if (doc.data().name) {
        chatRef.current = chatRef.current + 1;
      }
    });
    console.log(chatRef);

    if (chatRef.current == 0) {
      const newCityRef = doc(collection(DB, 'chatroom'));
      console.log(newCityRef.id);
      const list = {
        participants: [user?.id, data.uid],
        name: newCityRef.id,
        timestamp: serverTimestamp(),
        typy: 'ONE_TO_ONE',
        unreadCount: 0,
      };
      await setDoc(newCityRef, list);
    }
    //여기 추가 !!

    // // 파이어베스 포스트에 추가 한다 !
    // await addDoc(collection(DB, 'chatroom'), {
    //   who: [user?.id, data.uid],
    //   name: '',
    //   timestamp: serverTimestamp(),
    // });

    setLoading(false);
    // router.push('/dashboard/chat');

    // 바꿔야 될것 유저의 아이디를 가지고 있는 대화상대 로 바로 가기
    push(PATH_DASHBOARD.chat.view('/'));
    // push(PATH_DASHBOARD.chat.view(user?.displayName));

    // await updateDoc(doc(DB, 'chatroom', docRef.id));
  };

  return (
    <Card>
      <CardHeader
        title="회원정보"
        subheader="버튼을 누르면 대화창이 열립니다"
        action={
          <Tooltip title="Add Contact">
            <IconButton color="primary" size="large">
              <Iconify icon={'eva:plus-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {posts.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.avatar} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.data().displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.data().email}
              </Typography>
            </Box>

            <Tooltip title="대화하기">
              <IconButton size="small" onClick={() => sendPost(contact.data())}>
                <Iconify icon={'eva:flash-fill'} width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}

        <Button variant="outlined" size="large" color="inherit">
          View All
        </Button>
      </Stack>
    </Card>
  );
}
