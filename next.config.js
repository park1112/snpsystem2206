const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    HOST_API_KEY: 'https://minimal-assets-api.vercel.app',
    // FIREBASE AUTH
    FIREBASE_API_KEY: 'AIzaSyC0X5YmE2jIk6hxdfYY11aMd3U9Fyyr9xc',
    FIREBASE_AUTH_DOMAIN: 'snpcompany-a1d73.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'snpcompany-a1d73',
    FIREBASE_STORAGE_BUCKET: 'snpcompany-a1d73.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '889327520077',
    FIREBASE_APPID: '1:889327520077:web:2bd0fee034e9faefc08f04',
    FIREBASE_MEASUREMENT_ID: 'G-NPC9RT3BG7',
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    //
    MAPBOX: '',
  },
});
