import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useToggle from '../../../../hooks/useToggle';
// _mock
// import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';
import { useSnackbar } from 'notistack';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../../config';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  // 거래처 목록 및 거래처 필드 목록 가져옴
  const { enqueueSnackbar } = useSnackbar();
  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [User, setUser] = useState([]);
  const userData = useRef([]);

  // 거래처 필드 목록 불러오기
  // useEffect(
  //   () =>
  //     onSnapshot(query(collection(DB, 'inandout')), (snapshot) => {
  //       // messagesDBlist();
  //       // setPosts(snapshot.where('name', '==', '박 현재').get());

  //       data.current = [];
  //       snapshot.docs.forEach((doc, i) => {
  //         if (doc.data()) {
  //           data.current[i] = doc.data();
  //         }
  //       });
  //       setPosts([...data.current]);
  //     }),
  //   [DB]
  // );
  // // console.log(post);

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

        setUser([...userData.current]);
      }),
    [DB]
  );
  console.log(User);

  // 거래처 목록 및 거래처 필드 목록 가져옴

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle();

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle();

  const { invoiceFrom, invoiceTo } = values;

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            출고지:
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onOpenFrom}>
            수정
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={onCloseFrom}
            selected={(selectedId) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={User}
          />
        </Stack>

        <AddressInfo name={invoiceFrom?.name} address={invoiceFrom?.address} phone={invoiceFrom?.phone} />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            도착지:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={invoiceTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={onOpenTo}
          >
            {invoiceTo ? 'Change' : 'Add'}
          </Button>

          <InvoiceAddressListDialog
            open={openTo}
            onClose={onCloseTo}
            selected={(selectedId) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            addressOptions={User}
          />
        </Stack>

        {invoiceTo ? (
          <AddressInfo name={invoiceTo.name} address={invoiceTo.address} phone={invoiceTo.phone} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {errors.invoiceTo ? errors.invoiceTo.message : null}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

function AddressInfo({ name, address, phone }) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        주소 : {address}
      </Typography>
      <Typography variant="body2">전화번호 : {phone}</Typography>
    </>
  );
}
