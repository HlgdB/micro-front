import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/public/',
  dynamicImport: {}
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
