## 1. 背景
该项目为一个学习型的博客网站案例，毕竟每个it工程师都想有一个自己的博客嘛，适合初中级前端工程师；项目已经部署在阿里云上，已经比较完整了，本地下载代码和安装好对应的环境，运行即可以获得线上的效果。由于项目涉及到服务器端而且用了数据库作为存储工具，架构用了eggjs和easywebpack所以首次运行的步骤比较繁琐，还希望你有点耐心；仔细研读项目我相信你肯定会有进步的。
#### 1.1 技术栈
mysql、nodejs、eggjs、vue、vuex、webpack
## 2.效果
[网站首页gqj.cn](http://gqj.cn)
#### 首页效果
![](/gitImages/index.png)
![](/gitImages/index1.png)
![](/gitImages/index2.png)
#### 后台
![](/gitImages/admin.png)
![](/gitImages/admin1.png)
## 3. 使用
#### 3.1 环境要求(版本号没有强制要求)
- nodejs(v8.15.0)
- mysql(5.6)

#### 3.2 数据库引入
数据库配置文件在config/config.default.js中，数据库名称是blog,密码默认是123456
- 启动数据库(不同环境启动方式有所不同)
```bash
mysql.server start
```
- 进入数据库
```bash
mysql -u root -p
```
- 在mysql中创建blog数据库:
```bash
create database blog
```
- 导入数据库：(项目目录下已经有了数据库blog.sql文件，将它放到某个路由再导入即可)
```bash
use blog
mysql -hlocalhost -uroot -p123456 blog  <  /Users/zhenhua/Desktop/blog.sql;
```
#### 3.3 安装依赖

```bash
npm install
```

#### 3.4 本地开发启动应用

```bash
sudo npm run dev # sudo只是mac下的权限命令，其他系统并不需要
```

#### 3.5 发布模式启动应用

- 首先在本地或者ci构建好jsbundle文件(简称打包)

```bash
sudo npm run build 
```
- 启动数据库

```bash
mysql.server start
```

- 然后,启动应用(由于用了--daemon所以这个进程一旦启动就不会自动关闭，需要手动)

```bash
sudo npm start 
```
## 4. 工具文档
- [nodejs](http://nodejs.cn/api/)
- [eggjs](https://eggjs.org/zh-cn/)
- [vue](https://cn.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [easywebpack](https://www.yuque.com/easy-team/easywebpack)
- [webpack](https://www.webpackjs.com/)

## 5. 声明
- 项目用于学习，不适合商业活动
- 项目会持续更新优化
- 由于项目是在别人的开源框架上快速开发的如果有什么问题可以提issue，求别喷
- 项目已在本人的博客gqj.cn上上线了，代码是同一份，所以请不要恶意破解或破坏gqj.cn这个项目


