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

// ----------------------------------------------------------------------

export default function AnalyticsNewsUpdate() {
  const API_URL =
    'https://newsapi.org/v2/everything?q=%EC%96%91%ED%8C%8C&from=2022-06-25&sortBy=publishedAt&apiKey=9c899f3de43047b3871b22aef10a393a';

  // const API_news = useRef([]);
  const [API_news, setAPI_news] = useState();

  const getData = async () => {
    axios.get(API_URL).then((res) => {
      setAPI_news(res.data.articles);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card>
      <CardHeader title="양파 최신 뉴스" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {API_news?.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          모두 보기
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
    publishedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    urlToImage: PropTypes.string,
    url: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { urlToImage, title, description, publishedAt, url } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image alt={title} src={urlToImage} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit" href={url}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(publishedAt)}
      </Typography>
    </Stack>
  );
}
