# vue2-app


基于Vue2 + elementUI + express + MongoDB 搭建的后台管理系统；具有服务端查询数据，注册，登录，权限验证等功能；

### 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + element-ui + express + mongoose

### start

```bash
// 拉取项目
git clone git@github.com:islikai/vue2-app.git
```

1. 数据库
 - 如果采用本地MongoDB需先开启数据库


2. 运行服务项目
 - 进入server项目
 - 修改server项目下config文件MongoDB数据库地址
```bash
mongoURI: 你的数据库地址,  // 例如mongoURI: "mongodb://127.0.0.1:27017/blog_db",

// 运行项目
npm i
npm run server
```


3. 开启前端项目
    - 进入app项目
```bash
npm i
npm run server
```

4. 打开localhost:8080/login地址注册登录查看页面



