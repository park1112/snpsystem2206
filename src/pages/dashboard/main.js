import PropTypes from 'prop-types';
// @mui
import { Grid, Container, Typography, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';

import useAuth from '../../hooks/useAuth';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';
import { BankingContacts, BankingExpensesCategories } from '../../sections/@dashboard/general/banking';

// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const displayName = user?.displayName;

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          반가워요, 환영합니다. {!displayName ? '...' : displayName}님!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="매출금액" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="매입금액" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="이익금액"
              total={1723315}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="거래처수" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingExpensesCategories />
              <AnalyticsWebsiteVisits />
              <AnalyticsConversionRates />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <AnalyticsCurrentVisits />
              <AnalyticsOrderTimeline />
              <BankingContacts />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
