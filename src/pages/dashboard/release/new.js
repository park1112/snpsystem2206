// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="출고">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="출고 등록"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: '출고', href: PATH_DASHBOARD.invoice.list },
            { name: '출고 등록' },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}
