import { paramCase } from 'change-case';
import { useEffect, useRef, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../sections/@dashboard/user/list';
import { collection, getFirestore, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = ['all', 'active', 'banned'];
const STATUS_OPTIONS = ['all'];

const ROLE_OPTIONS = ['all', '유통시장', '작업팀', '법인', '개인상회', '온라인'];

const TABLE_HEAD = [
  { id: 'name', label: '이름', align: 'left' },
  { id: 'division', label: '구분', align: 'left' },
  { id: 'phone', label: '전화번호', align: 'left' },
  { id: 'companyNumber', label: '사업자번호', align: 'left' },
  { id: 'bank', label: '은행명', align: 'center' },
  { id: 'bankNumber', label: '계좌번호', align: 'left' },
  { id: 'bankUserName', label: '예금주', align: 'left' },
  { id: 'address', label: '주소', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  // 거래처 목록 및 거래처 필드 목록 가져옴
  const { enqueueSnackbar } = useSnackbar();
  const firebaseApp = initializeApp(FIREBASE_API);

  const DB = getFirestore(firebaseApp);

  const [post, setPosts] = useState([]);
  const data = useRef([]);
  const userData = useRef([]);

  // 거래처 필드 목록 불러오기
  useEffect(
    () =>
      onSnapshot(query(collection(DB, 'inandout')), (snapshot) => {
        // messagesDBlist();
        // setPosts(snapshot.where('name', '==', '박 현재').get());

        data.current = [];
        snapshot.docs.forEach((doc, i) => {
          if (doc.data()) {
            data.current[i] = doc.data();
          }
        });
        setPosts([...data.current]);
      }),
    [DB]
  );
  // console.log(post);

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

        setTableData([...userData.current]);
      }),
    [DB]
  );
  // console.log(userList);

  // 거래처 목록 및 거래처 필드 목록 가져옴
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    try {
      await deleteDoc(doc(DB, 'client', id));
      setSelected([]);
      enqueueSnackbar('유저 삭제 성공!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.user.edit(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title="거래처: 목록">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="거래처 목록"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: '거래처', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.user.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                거래처 추가
              </Button>
            </NextLink>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {/* 거래처 탭바 수정해야됨  */}
            {STATUS_OPTIONS
              ? STATUS_OPTIONS.map((tab) => <Tab disableRipple key={tab} label={tab} value={tab} />)
              : null}
          </Tabs>

          <Divider />

          {/* 검색부분 */}
          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="작게 보기"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
