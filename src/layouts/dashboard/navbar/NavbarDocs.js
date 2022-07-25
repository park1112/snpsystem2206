// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          안녕하세요, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          무엇을 도와드릴까요 ?
          <br /> 불편 사항을 알려주세요.
        </Typography>
      </div>

      {/* <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained"> */}
      <Button target="_blank" rel="noopener" variant="contained">
        상담원
      </Button>
    </Stack>
  );
}
