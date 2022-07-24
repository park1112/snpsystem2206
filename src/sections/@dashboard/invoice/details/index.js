import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency, fNumber } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails({ invoice }) {
  const theme = useTheme();

  console.log(invoice);

  if (!invoice) {
    return null;
  }

  const {
    items,
    taxes,
    status,
    dueDate,
    discount,
    invoiceTo,
    createDate,
    totalPrice,
    priceTotal,
    invoiceFrom,
    invoiceNumber,
    subTotalPrice,
    service,
    totalCount,
    carriage,
  } = invoice;

  return (
    <>
      <InvoiceToolbar invoice={invoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="logo"
              src="https://firebasestorage.googleapis.com/v0/b/snpcompany-a1d73.appspot.com/o/snp_logo_full.png?alt=media&token=9283b6e2-42f0-40e1-be02-b494104d5f78"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (status === '입고준비중' && 'success') ||
                  (status === '정산대기' && 'warning') ||
                  (status === '정산완료' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>

              <Typography variant="h6">{invoiceNumber}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              출고지
            </Typography>
            <Typography variant="body2">{invoiceFrom.name}</Typography>
            <Typography variant="body2">{invoiceFrom.address}</Typography>
            <Typography variant="body2">Phone: {invoiceFrom.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              도착지
            </Typography>
            <Typography variant="body2">{invoiceTo.name}</Typography>
            <Typography variant="body2">{invoiceTo.address}</Typography>
            <Typography variant="body2">Phone: {invoiceTo.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              출고날짜
            </Typography>
            <Typography variant="body2">{fDate(createDate)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              결제 예정일
            </Typography>
            <Typography variant="body2">{fDate(dueDate)}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">내용</TableCell>
                  <TableCell align="right">부자제명</TableCell>
                  <TableCell align="right">부자제 수량</TableCell>
                  <TableCell align="right">제품 수량</TableCell>
                  <TableCell align="right">합계 수량 </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.service}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{fNumber(row.price)}</TableCell>
                    <TableCell align="right">{fNumber(row.price * row.quantity)}</TableCell>
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>운송비</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fNumber(carriage)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>로스</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography sx={{ color: 'error.main' }}>{discount && fNumber(-discount)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>할인금액</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{discount && fNumber(discount)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>총합계수량 </Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{totalCount && fNumber(totalCount)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">총 결제금액</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{fNumber(priceTotal)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">메모 : </Typography>
            <Typography variant="body2">
              에스엔피를 이용해 주셔서 감사합니다. 항상 좋은 제품으로 보답하겠습니다!
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">(주)농업회사법인 에스엔피 </Typography>
            <Typography variant="body2">대표 손승완</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
