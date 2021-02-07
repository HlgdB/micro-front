import { defineConfig } from 'umi';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  history: { type: 'hash' },
  hash: true,
  dynamicImport: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  title: '微生物活镜检测系统',
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
