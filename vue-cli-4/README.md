## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```js
        |             | require.js  异步请求拦截处理请求前的拦截、响应拦截
        | util    --> | api.js 异步接口地址配置
        |
        |                          | state   --> 存储数据
        | store    -->| Vuex配置--> | mutations--> 处理数据
        |                          | actions  --> 异步请求
        | 
        | router   -->| 路由配置--> |路面有配置路由拦截可更具需求处理对应逻辑
  src-->|
        |components-->| 用公用的组件封装好可以放在这里
        |
        |assets    -->| 存放静态资源一般存放图片打包的时候webpack可以对应处理
        |
        |pubilck   -->| index.html 存放的位置，/也可以存放图片（data文件加下）
        |
        |views     -->| vue文件夹，代码块 
        |
        
vue.config.js --> vue的配置js
``