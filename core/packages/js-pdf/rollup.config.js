import { babel } from '@rollup/plugin-babel';
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
    plugins: [babel({ babelHelpers: 'bundled' })]
};