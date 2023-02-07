import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

/*
const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  workbox: false
});

export default merge(baseConfig, {
  outputDir: 'packages/theme/demo-build',
  input: 'packages/theme/demo/index.html'
});
*/

export function createRollupConfig(input, output) {
    const baseConfig = createSpaConfig({
        developmentMode: process.env.ROLLUP_WATCH === 'true',
        injectServiceWorker: false,
        workbox: false
    });

    return merge(baseConfig, {
        outputDir: output,
        input: input
    });
}
