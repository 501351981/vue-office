import { babel } from '@rollup/plugin-babel';
export default {
    input: 'index.js',
    output:[
        {
            file: 'lib/index.js',
            name: 'jsPreviewExcel',
            format: 'es'
        },
        {
            file: 'lib/index.umd.js',
            name: 'jsPreviewExcel',
            format: 'umd'
        }
    ],
    plugins: [babel({ babelHelpers: 'bundled' })]
};