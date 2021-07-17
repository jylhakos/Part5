module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "extends": [
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'indent': 0,
        "react/prop-types": 0,
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};

// $ node ../node_modules/eslint/bin/eslint App.js