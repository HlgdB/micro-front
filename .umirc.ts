import { defineConfig } from 'umi';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/public/',
  dynamicImport: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
