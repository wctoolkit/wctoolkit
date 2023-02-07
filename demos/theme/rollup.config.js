import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  workbox: false
});

export default merge(baseConfig, {
  output: {
    dir: '../dist/theme'
  },
  input: './index.html'
});

