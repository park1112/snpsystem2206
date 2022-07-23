// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // 새로만듬
  // ----------------------------------------------------------------------
  {
    subheader: 'SNPSYSTEM',
    items: [
      { title: 'Main', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
      { title: '일정', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      { title: '메신저', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
    ],
  },
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: '거래처 등록', path: PATH_DASHBOARD.user.new },
          { title: '거래처 목록', path: PATH_DASHBOARD.user.cards },
          { title: '거래처 수정', path: PATH_DASHBOARD.user.account },
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },

      // 출고
      {
        title: '출고',
        path: PATH_DASHBOARD.release.root,
        icon: ICONS.invoice,
        children: [
          { title: '출고 목록', path: PATH_DASHBOARD.release.list },
          { title: '출고 송장', path: PATH_DASHBOARD.release.demoView },
          { title: '출고 송장등록', path: PATH_DASHBOARD.release.new },
          { title: 'edit', path: PATH_DASHBOARD.release.demoEdit },
        ],
      },

      // INVOICE
      {
        title: '입고',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: '입고 목록', path: PATH_DASHBOARD.invoice.list },
          { title: '입고 송장', path: PATH_DASHBOARD.invoice.demoView },
          { title: '입고 송장등록', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
      // // E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },
    ],
  },
  // 입고
  // ----------------------------------------------------------------------
  // {
  //   subheader: '입고',
  //   items: [
  //     { title: '입고 내역', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '제품 입고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '톤백 제품 입고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '제품 이고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //   ],
  // },
  // // 출고
  // // ----------------------------------------------------------------------
  // {
  //   subheader: '출고',
  //   items: [
  //     { title: '출고 내역', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '출고전 생산 등록', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '생산 제품 출고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '제고 제품 출고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: '제고 제품 이고', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //   ],
  // },
  // 통계
  // ----------------------------------------------------------------------
  {
    subheader: '통계',
    items: [
      { title: '제품 판매 현황', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
      { title: '제품 생산 현황', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
      { title: '제품 제고 현황', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
    ],
  },
  // 회계
  // ----------------------------------------------------------------------
  {
    subheader: '회계',
    items: [
      { title: '판매비 정산확인', path: PATH_DASHBOARD.invoice.list, icon: ICONS.dashboard },
      { title: '구입비 정산확인', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
      { title: '생산비 정산확인', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
      { title: '기타부대비용 정산확인', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
    ],
  },

  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'Main', path: PATH_DASHBOARD.general.main, icon: ICONS.dashboard },
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default navConfig;
