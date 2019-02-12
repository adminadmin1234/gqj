## 1. 使用

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
