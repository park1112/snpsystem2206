import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import { useState } from 'react';

// 파이어베이스 추가
import { getFirestore, collection, doc, updateDoc, setDoc, deleteDoc } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function CalendarForm({ event, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const isCreating = Object.keys(event).length === 0;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async (data) => {
  //   try {
  //     const newEvent = {
  //       title: data.title,
  //       description: data.description,
  //       textColor: data.textColor,
  //       allDay: data.allDay,
  //       start: data.start,
  //       end: data.end,
  //     };
  //     if (event.id) {
  //       dispatch(updateEvent(event.id, newEvent));
  //       enqueueSnackbar('Update success!');
  //     } else {
  //       enqueueSnackbar('Create success!');
  //       dispatch(createEvent(newEvent));
  //     }
  //     onCancel();
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 여기에 이벤트 추가 !!

  const [loading, setLoading] = useState(false);
  const firebaseApp = initializeApp(FIREBASE_API);
  const DB = getFirestore(firebaseApp);

  console.log('dfdfdfe', event.id);
  const sendPost = async (data) => {
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
    if (event.id) {
      const newCityRef = doc(DB, 'calendar', event.id);
      const newEvent = {
        id: newCityRef.id,
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      await updateDoc(newCityRef, newEvent);
      enqueueSnackbar('이벤트 업데이트 성공!');
    } else {
      const newCityRef = doc(collection(DB, 'calendar'));
      // console.log(newCityRef.id);
      const newEvent = {
        id: newCityRef.id,
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      await setDoc(newCityRef, newEvent);
      enqueueSnackbar('이벤트 추가 성공!!');
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
    onCancel();
    reset();
    // push(PATH_DASHBOARD.calendar);

    // 바꿔야 될것 유저의 아이디를 가지고 있는 대화상대 로 바로 가기
  };

  console.log('enve', event.id);
  // 이벤트 추가 끝 !!!

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      // const newCityRef = doc(DB, 'calendar', event.id);
      await deleteDoc(doc(DB, 'calendar', event.id));
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('이벤트 삭제 성공!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(sendPost)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="제목" />

        <RHFTextField name="description" label="설명" multiline rows={4} />

        <RHFSwitch name="allDay" label="하루 종일" />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="시작일"
              inputFormat="yyyy/MM/dd hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="종료일"
              inputFormat="yyyy/MM/dd hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && '종료 날짜는 시작 날짜 이후여야 합니다.'}
                />
              )}
            />
          )}
        />

        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <ColorSinglePicker value={field.value} onChange={field.onChange} colors={COLOR_OPTIONS} />
          )}
        />
      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="이벤트 삭제">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {/* {event.id ?
          <Button variant="outlined" color="error" onClick={onCancel}>
            삭제
        </Button> : null} */}

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          취소
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          추가
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
