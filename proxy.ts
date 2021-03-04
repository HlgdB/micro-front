export default {
  dev: {
    '/micro': {
      target: 'https://wswjc.huaxindata.com.cn/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/sea': '',
      },
    },
    '/api': {
      target: 'https://wswjc.huaxindata.com.cn/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
