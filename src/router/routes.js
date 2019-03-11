import { Trans } from '@/plugins/i18n';
import Home from '@/views/Home.vue';
import Template from '@/router/Template.vue';

function load(component) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`);
}

export default [
  {
    path: '/:lang',
    component: Template,
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: 'phenomena',
        name: 'phenomena',
        component: load('Phenomena'),
      },
      {
        path: 'impacts',
        name: 'impacts',
        component: load('Impacts'),
      },
      {
        path: 'historical-events',
        name: 'historical-events',
        component: load('HistoricalEvents'),
      },
      {
        path: '*',
        redirect: `/${Trans.currentLanguage}/`,
      },
    ],
  },
  { // Redirect user to supported lang version.
    path: '*',
    redirect() {
      return Trans.getUserSupportedLang();
    },
  },
];
