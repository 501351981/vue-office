import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    output:[
        {
            file: 'lib/index.js',
            name: 'jsPreviewPdf',
            format: 'es'
        },
        {
            file: 'lib/index.umd.js',
            name: 'jsPreviewPdf',
            format: 'umd'
        }
    ],
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        nodeResolve(),
        commonjs(),
        terser()
    ]
};