// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_Item = ['양파(20kg)', '양파(15kg)', '양파(12kg)', '양파(20kg)박스', '양파(10kg)박스'];

const SERVICE_division = ['5줄', '6줄', '7줄', '8줄', '특', '대', '중'];
const SERVICE_OPTIONS = ['아주 바렛트', '합천유통 철바렛트', 'kpp 바렛트', '나무바렛트', '바라상차'];

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: '',
      price: '',
      total: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  console.log(values);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        상품 상세 목록:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              {/* <RHFTextField
                size="small"
                name={`items[${index}].title`}
                label="상품"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].description`}
                label="분류"
                InputLabelProps={{ shrink: true }}
              /> */}
              {/* 상품 */}
              <RHFSelect
                name={`items[${index}].title`}
                label="상품"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {SERVICE_Item.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
              {/* 상품 */}

              {/* 분류 */}
              <RHFSelect
                name={`items[${index}].description`}
                label="분류"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {SERVICE_division.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
              {/* 분류 */}

              {/* 부자제 */}
              <RHFSelect
                name={`items[${index}].service`}
                label="부자제"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {SERVICE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
              {/* 부자제 */}

              {/* 부자제 수량 */}
              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].quantity`}
                label="부자제 수량"
                onChange={(event) => setValue(`items[${index}].quantity`, Number(event.target.value))}
                sx={{ maxWidth: { md: 96 } }}
              />
              {/* 부자제 수량 */}

              {/* 제품 수량 */}
              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="제품 수량"
                onChange={(event) => setValue(`items[${index}].price`, Number(event.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">*</InputAdornment>,
                }}
                sx={{ maxWidth: { md: 96 } }}
              />
              {/* 제품 수량 */}
              <RHFTextField
                disabled
                size="small"
                name={`items[${index}].total`}
                label={'Total'}
                value={fNumber(values.items[index].quantity * values.items[index].price)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">:</InputAdornment>,
                }}
                sx={{ maxWidth: { md: 96 } }}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              삭제
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          상품 추가
        </Button>

        <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
          <RHFTextField
            size="small"
            label="결제금액 총합"
            name="priceTotal"
            onChange={(event) => setValue('priceTotal', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />

          <RHFTextField
            size="small"
            label="운송료"
            name="carriage"
            onChange={(event) => setValue('carriage', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
