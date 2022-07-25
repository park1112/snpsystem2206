import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState, useEffect, useRef } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock';
// components
import { FormProvider } from '../../../../components/hook-form';
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../../config';
import { collection, doc, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const totaladd = useRef(0);
  const totaladdA = useRef(0);

  const NewUserSchema = Yup.object().shape({
    // status: Yup.string().nullable().required('출고일은 필수 사항 입니다.'),
    createDate: Yup.string().nullable().required('출고일은 필수 사항 입니다.'),
    dueDate: Yup.string().nullable().required('결제 예정일은 필수 사항 입니다.'),
    invoiceTo: Yup.mixed().nullable().required('도착지는 필수 사항 입니다.'),
  });

  const defaultValues = useMemo(
    () => ({
      createDate: currentInvoice?.createDate || null,
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || '',
      status: currentInvoice?.status || 'default',
      discount: currentInvoice?.discount || '',
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      priceTotal: currentInvoice?.priceTotal || 0,
      carriage: currentInvoice?.carriage || 0,
      items: currentInvoice?.items || [{ title: '', description: '', service: '', quantity: 0, price: 0, total: 0 }],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const newInvoice = {
    ...values,
    items: values.items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    })),
  };

  // 총수량 부자제 합계 추가!!
  const additme = values.items.map((item) => totaladd.current + item.quantity * item.price);
  const servicecount = values.items.map((item) => totaladdA.current + item.quantity);
  const addreduce = (add) => add.reduce((a, b) => a + b);

  // 파이어베이스 추가 !!

  // -------------------------- 파이어베이스

  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const citiesRef = collection(DB, 'category');

  const q = query(citiesRef, where('division', '==', 'client'));

  const { enqueueSnackbar } = useSnackbar();

  console.log('ddf?????', currentInvoice);
  // 송장등록!!
  const onSubmit = async (data) => {
    if (loadingSave) return;
    setLoadingSave(true);
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

    // if (chatRef.current == 0) {
    // 있으면 수정하기 !! .
    if (currentInvoice) {
      const newCityRef = doc(DB, 'release', currentInvoice.id);
      const invoiceList = Object.assign(newInvoice, {
        updateTime: new Date(),
        totalCount: addreduce(additme),
        servicecount: addreduce(servicecount),
      });

      await updateDoc(newCityRef, invoiceList);
      enqueueSnackbar('송장 업데이트 성공!');
    } else {
      // 없으면 생성하기
      const newCityRef = doc(collection(DB, 'release'));
      // console.log(newCityRef.id);

      const invoiceList = Object.assign(newInvoice, {
        id: newCityRef.id,
        invoiceNumber: newCityRef.id,
        totalCount: addreduce(additme),
        servicecount: addreduce(servicecount),

        // totalCount: totaladd.current,
      });
      await setDoc(newCityRef, invoiceList);
      enqueueSnackbar('송장 등록 성공!!');
    }

    reset();
    setLoadingSave(true);
    push(PATH_DASHBOARD.release.list);
    // console.log(JSON.stringify(invoiceList, null, 2));
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
  //  송장등록 완료

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      push(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      push(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        {/* <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          임시 저장
        </LoadingButton> */}

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isEdit ? '출고 수정' : '출고 등록'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
