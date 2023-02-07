import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const baseConfig = createSpaConfig({
    developmentMode: process.env.ROLLUP_WATCH === 'true',
    injectServiceWorker: false,
    workbox: false
});

export default merge(baseConfig, {
    output: {
        dir: '../dist/fluent',
        sourcemap: false,
        plugins: [
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    module: true,
                    toplevel: true,
                    unsafe_arrows: true,
                    drop_console: true,
                    drop_debugger: true
                },
                output: { quote_style: 1 }
            })
        ]
    },
    input: './index.html',
    plugins: [
        minifyHTML()
    ]
});

