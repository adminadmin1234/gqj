## 1. 背景
该项目为一个学习型的案例，适合初中级前端工程师；项目已经部署在阿里云上，已经毕竟完整了，本地下载代码和安装好对应的环境，运行即可以获得线上的效果。
## 2.效果
[网站首页-gqj.cn](htt://gqj.cn "悬停显示")

## 3. 使用

#### 1.1 安装cli(非必需)

```bash
npm install easywebpack-cli -g
```

^3.5.0 开始， `easywebpack-cli` 已内置 `devDependencies` 中, 无需安装。如果你需要在命令行使用 `easy` 命令, 可以单独全局安装。

#### 1.2 安装依赖

```bash
npm install
```


#### 1.3 本地开发启动应用

```bash
sudo npm run dev
```

#### 1.4 发布模式启动应用

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
