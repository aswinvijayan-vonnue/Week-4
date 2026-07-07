# Code Environment setup
 ## 1. Install Required VS Code Extensions
 Open VS Code and install the following extensions:

  **ESLint**

  Extension ID:
  ```
  dbaeumer.vscode-eslint

  ```

**Prettier - Code Formatter**

Extension ID:
```
esbenp.prettier-vscode

```

After installation,restart VS Code

## 2.Configure VS Code Settings
Create the following file in your project:

```.vscode/settings.json```

Add the following configuration:

```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## 3.Configure ESLint

Create the following file in the project root:
```
.eslintrc.json
```

Add the following configuration

```
{
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "semi": [
      "error",
      "always"
    ]
  }
}
```

## 4.Configure Prettier

Create the following file in the project root:

```
.prettierrc.json
```

Add the following configuration:

```
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

## 5.Install Project Dependencies

Run the following command from the project root:

```
npm install -D eslint prettier
```
