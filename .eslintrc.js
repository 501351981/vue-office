module.exports = {
    'env': {
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'semi': ['error','always'],
        'no-multi-spaces': ['error', { ignoreEOLComments: false }],
        'quotes': ['error', 'single']
    }
};
