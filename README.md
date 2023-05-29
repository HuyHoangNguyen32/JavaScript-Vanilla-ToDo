# 🔥 JavaScript Vanilla Todo 🔥

## ☄️ Setup Project
🎉 Create project base with Vite : `yarn create vite . --template vanilla`  
🎉 Use bootstrap template  
🎉 VS Code -> `Peacock`  
🎉 Create file `.prettierrc`   
🎉 Create file README.md  
🎉 Terminal `tmux`  

## 🧪 Unit Test
🛡️ Create file `sum.js` and `sum.test.js`  
🛡️ Install jest : `yarn add --dev jest`  
🛡️ Install babel-jest `yarn add --dev babel-jest @babel/core @babel/preset-env`  
🛡️ Add `"test": "jest --coverage"` to `scripts` in file `package.json`  
🛡️ Delete `"type": "module"` in `package.json`  
🛡️ Run `yarn test`  
🛡️ Restart VS Code to auto jest tests  

## 🎯Git - GitHub
🎖️ `git config user.name "hoang"`  
🎖️ `git config user.email "javascript-vanilla-todo@gmail.com"`  
🎖️ `git checkout -b feature/test`  
🎖️ `git add .`  
🎖️ `git stash`  
🎖️ `git pull`  
🎖️ `git stash pop`  
🎖️ `git add .` -> use vs code extensions  
🎖️ `git commit -m "message"` -> use vs code extensions  
🎖️ Pull requests -> use vs code extensions  
🎖️ `git pull`  
🎖️ Delete branch : `git branch -d feature/remove-todo`  
🎖️ Checkout main branch

## 🪬GitHub Actions
💡 Create folders `.github/workflows/todo.yml`  
💡 Content of `todo.yml`
```yml
name: todo

on:
  push:
    branches:
      - main
    paths:
      - 'js/**'
      - '.github/**'

defaults:
  run:
    working-directory: js

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18.x

      - run: yarn add --dev jest
      - run: yarn add --dev babel-jest @babel/core @babel/preset-env
      - run: yarn test

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: coverage
          path: coverage/**
          retention-days: 7

```

## 💥 Task
✅ Render todo from local storage data  
✅ Change background color todo, button color, text button with status  
✅ Remove todo  
✅ Create todo  
✅ Edit todo  
✅ Search todo with keywords  
✅ Filter todo with status  
✅ When reload browser, data of todo not change (use param)  

## 🍺 How to use in Vercel
🍻 Add data in to local storage
```javascript
    const initTodoList = [
      { id: 1, title: "JavaScript", status: "pending" },
      { id: 2, title: "TypeScript", status: "completed" },
      { id: 3, title: "ReactJS", status: "pending" },
      { id: 4, title: "NextJS", status: "completed" },
    ];
  localStorage.setItem('todo_list', JSON.stringify(initTodoList));
```