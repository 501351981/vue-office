import { babel } from '@rollup/plugin-babel';
export default {
    input: 'index.js',
    output:[
        {
            file: 'lib/index.js',
            name: 'jsPreviewDocx',
            format: 'es'
        },
        {
            file: 'lib/index.umd.js',
            name: 'jsPreviewDocx',
            format: 'umd'
        }
    ],
    plugins: [babel({ babelHelpers: 'bundled' })]
};