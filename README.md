## 1. 背景
该项目为一个学习型的案例，适合初中级前端工程师；项目已经部署在阿里云上，已经比较完整了，本地下载代码和安装好对应的环境，运行即可以获得线上的效果。
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

#### 3.2 安装依赖

```bash
npm install
```

#### 3.3 本地开发启动应用

```bash
sudo npm run dev // sudo只是mac下的权限命令，其他系统并不需要
```

#### 3.4 发布模式启动应用

- 首先在本地或者ci构建好jsbundle文件

```bash
sudo npm run build 
```
- 启动数据库

```bash
mysql.server start
```

- 然后,启动应用

```bash
npm start 
```
