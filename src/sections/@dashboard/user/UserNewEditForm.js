import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock

// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ---------------------------------------------------------------------- 파이어베이스

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';

// ---------------------------------------------------------------------- 파이어베이스

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const { push } = useRouter();

  // -------------------------- 파이어베이스
  const [loading, setLoading] = useState(false);

  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [data, setData] = useState([]);

  const citiesRef = collection(DB, 'category');

  const q = query(citiesRef, where('division', '==', 'client'));

  // useEffect(
  //   () =>
  //     onSnapshot(q, (snapshot) => {
  //       snapshot.docs.forEach((doc, i) => {
  //         setData(doc.data());
  //       });
  //       // setPosts(snapshot.docs);
  //     }),
  //   [DB]
  // );

  // console.log(data);
  // -------------------------- 파이어베이스

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('이름은 필수 항목입니다.'),
    // email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('휴대폰 번호는 필수 항목입니다.'),
    companyNumber: Yup.string().required('사업자 &주민등록번호는 필수 항목입니다.'),
    // bank: Yup.string().required('은행명은 필수 항목입니다.'),
    // bankNumber: Yup.string().required('계좌번호는 필수 항목입니다.'),
    // address: Yup.string().required('State is required'),
    division: Yup.string().required('거래처 구분은 필수 항목입니다.'),
    // bankUserName: Yup.string().required('Role Number is required'),

    // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      companyNumber: currentUser?.companyNumber || '',
      bank: currentUser?.bank || '',
      bankNumber: currentUser?.bankNumber || '',
      address: currentUser?.address || '',
      division: currentUser?.division || '',
      bankUserName: currentUser?.bankUserName || '',
      avatarUrl: currentUser?.avatarUrl || '',
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
      // company: currentUser?.company || '',
      // role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const newUserData = {
    ...values,
  };

  console.log(newUserData);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    // 여기 추가 !!
    // 먼저 채팅방을 만들고 그다음 추가한다!! 아이디를 가져올수 있음!
    // const citiesRef = collection(DB, 'calendar');
    // const q = query(citiesRef, where('participants', 'array-contains', user ?.id || data.uid));
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
    //   if (doc.data().name) {
    //     chatRef.current = chatRef.current + 1;
    //   }
    // });
    // console.log(chatRef);

    // 채팅방이 없으면 생성해준다 .
    // if (chatRef.current == 0) {
    if (isEdit) {
      const newCityRef = doc(DB, 'client', currentUser.id);
      const userlist = {
        name: newUserData.name,
        phone: newUserData.phone,
        companyNumber: newUserData.companyNumber,
        bank: newUserData.bank,
        bankNumber: newUserData.bankNumber,
        address: newUserData.address,
        division: newUserData.division,
        bankUserName: newUserData.bankUserName,
        avatarUrl:
          'https://firebasestorage.googleapis.com/v0/b/snpcompany-a1d73.appspot.com/o/logo360x360.png?alt=media&token=6ce45667-d2ce-47e8-b864-2e7e6c0a447c',
        id: newCityRef.id,
        updateTime: new Date(),
      };
      await updateDoc(newCityRef, userlist);
      enqueueSnackbar('이벤트 업데이트 성공!');
    } else {
      const newCityRef = doc(collection(DB, 'client'));
      // console.log(newCityRef.id);
      const userlist = {
        name: newUserData.name,
        phone: newUserData.phone,
        companyNumber: newUserData.companyNumber,
        bank: newUserData.bank,
        bankNumber: newUserData.bankNumber,
        address: newUserData.address,
        division: newUserData.division,
        bankUserName: newUserData.bankUserName,
        avatarUrl:
          'https://firebasestorage.googleapis.com/v0/b/snpcompany-a1d73.appspot.com/o/logo360x360.png?alt=media&token=6ce45667-d2ce-47e8-b864-2e7e6c0a447c',
        id: newCityRef.id,

        creatTime: new Date(),
        updateTime: new Date(),
      };
      await setDoc(newCityRef, userlist);
      enqueueSnackbar('유저 추가 성공!!');
    }

    // }
    //여기 추가 !!

    // // 파이어베스 포스트에 추가 한다 !
    // await addDoc(collection(DB, 'chatroom'), {
    //   who: [user?.id, data.uid],
    //   name: '',
    //   timestamp: serverTimestamp(),
    // });

    setLoading(false);
    reset();
    push(PATH_DASHBOARD.user.list);
    // push(PATH_DASHBOARD.calendar);

    // 바꿔야 될것 유저의 아이디를 가지고 있는 대화상대 로 바로 가기
  };

  // const onSubmit = async () => {
  //   setLoading(true);
  //   console.log('클릭!!');
  //   try {
  //     // 파이어베이스 추가

  //     // const newCityRef = doc(collection(DB, 'client'));
  //     // console.log(newUserData);
  //     // const list = {
  //     //   name: newUserData.name,
  //     //   phone: newUserData.phone,
  //     //   companyNumber: newUserData.companyNumber,
  //     //   bank: newUserData.bank,
  //     //   bankNumber: newUserData.bankNumber,
  //     //   address: newUserData.address,

  //     //   timestamp: serverTimestamp(),
  //     // };
  //     // await setDoc(newCityRef, list);

  //     // 파이어베이스 추가 !!
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
  //     push(PATH_DASHBOARD.user.list);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const division = [
    { code: 'AD', label: '유통시장', phone: '376' },
    { code: 'AF', label: '운전기사', phone: '377' },
    { code: 'AA', label: '작업팀', phone: '375' },
    { code: 'AE', label: '개인', phone: '372' },
  ];

  // ---------------------------- 등록

  // ---------------------------- 등록

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    사용가능 *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    기본 사진 사용
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    체크하시면 기본사진으로 프로필 사진이 등록됩니다.
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelect name="division" label="거래처 구분" placeholder="개인">
                <option value="" />
                {division.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="name" label="거래처 이름" />
              <RHFTextField name="phone" label="전화번호" />
              <RHFTextField name="companyNumber" label="사업자등록번호&주민등록번호" />
              <RHFTextField name="bank" label="은행" />
              <RHFTextField name="bankNumber" label="계좌번호" />
              <RHFTextField name="bankUserName" label="담당자이름 & 예금주" />
              <RHFTextField name="address" label="주소" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading && isSubmitting}>
                {!isEdit ? '생성' : '수정완료'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
