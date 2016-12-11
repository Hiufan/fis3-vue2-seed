# fis3-vue2-seed
Using [fis3](http://fis.baidu.com/) to build vue(2.0) application.

>  这个项目尚未完善，还无法正常运行。

# 安装yarn
[yarn —— Nodejs包新管理工具](https://segmentfault.com/a/1190000007189426)

# fis3插件
*   fis3-hook-commonjs
*   fis3-hook-sys_node_modules
*   fis3-hook-relative
*   fis3-postpackager-loader
*   fis-parser-babel-5.x
*   fis3-preprocessor-autoprefixer

## 项目结构
```
fis3-vue2-seed
|---- assets #静态资源
      |---- script #非工程模块js脚本
      |---- style  #非工程模块样式表
      |---- image  #非工程模块图片
|---- libs #第三方非工程化资源
|---- store #vuex相关代码
|---- router #vue的路由层
|---- components #工程模块
|---- filters #自定义过滤器
|---- directives #自定义指令集
|---- views #视图层
|---- fis.conf #fis3的配置文件
|---- package.json #依赖
|---- main.es #入口文件 
```
