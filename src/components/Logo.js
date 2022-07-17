import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from './Image';

// import logoimage from '../../public/logo/logo360x360.png';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Image
      alt="logo"
      src={
        'https://firebasestorage.googleapis.com/v0/b/snpcompany-a1d73.appspot.com/o/logo360x360.png?alt=media&token=6ce45667-d2ce-47e8-b864-2e7e6c0a447c'
      }
      sx={{ height: 40 }}
    />
    // <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
    //   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">

    //     <defs>
    //       <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
    //         <stop offset="0%" stopColor={PRIMARY_DARK} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>
    //       <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
    //         <stop offset="0%" stopColor={PRIMARY_LIGHT} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>
    //       <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
    //         <stop offset="0%" stopColor={PRIMARY_LIGHT} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>
    //     </defs>
    //   </svg>
    // </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
