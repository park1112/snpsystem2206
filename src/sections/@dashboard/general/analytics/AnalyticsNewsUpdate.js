import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../../utils/formatTime';
// _mock_
import { _analyticPost } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { async } from '@firebase/util';

// ----------------------------------------------------------------------

export default function AnalyticsNewsUpdate() {
  const API_URL = 'https://news.google.com/news?hl=ko&gl=kr&ie=UTF-8&output=rss&q=양파';

  const getData = async () => {
    axios.get(API_URL).then((res) => {
      console.log(res.toJSONObject());
    });
  };

  useEffect(() => {
    getData();
  });

  // const [data, setData] = useState(null);
  // const onClick = async () => {
  //   try {
  //     const response = await axios.get('https://news.google.com/news?hl=ko&gl=kr&ie=UTF-8&output=rss&q=양파');
  //     setData(response);
  //     console.log(response.toJSONObject());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // console.log(data);
  return (
    <Card>
      <CardHeader title="News Update" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_analyticPost.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
