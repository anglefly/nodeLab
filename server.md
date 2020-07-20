# 简介

这是一个用于 nodejs 用户注册、登录和授权（token）后台练习、使用 docker 的 Jenkins 进行部署；包含 node 使用 pm2 部署，部署 nginx 反向代理，前端部署

1. 安装 express 第五版本 npm i express@next----产生的包都在 node_moduls 文件夹中
1. 初始化项目 npm init---这样才会有 pakege.json 文件来管理包
1. 检查 restclient 插件是否存在，用来模拟请求的，类似 postman，使用后缀名叫做.http 文件来操作
1. 额外安装 npm install -g nodemon 来完成实时启动和修改项目，不然使用 node 开启的服务修改文件后是要重新启动服务哦

## 接下来是部署

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. mongodb 数据库安装和配置
1. git 安装、配置 ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装 pm2 并启动项目
1. 配置 Nginx 反向代理

### 其他的一些记录

1. 创建文件夹，mkdir
1. 后台启动文件位置 cd / 根目录文件夹下的 /var/data/blog/ server、admin 等文件夹
1. 安装 PM2，npm i -g pm2， 启动服务 进入 server 端的 文件夹下，用命令 pm2 start server.js（这个是服务入口文件名，也可以叫做其他名字例如 index.js) 或者 pm2 start server.js --name（区别名称，因为 pm 进程有名字，使自定义的 name 可以启动多个服务）
1. pm2 list 查看当前的服务列表 pm2 logs index 查看服务详情，可以在里面执行 Ctrl+c 退出
1. curl + http：地址可以请求一个服务
1. 配置 Nginx 反向代理（正向代理，通过某个服务器软件去方位别人网站叫正向，让别人访问就是反向）
   反向代理最好使用 vscode 插件实现，安装 remote ssh 插件
   或者使用 filezzlip、xftps

> 查看 nginx -t 查看 nginx 安装位置
>
> 启动 sudo systemctl start nginx.service
> 重启自启动 sudo systemctl enable nginx.service
> 或者到达配置文件的位置/etc/nginx 中重载 nginx 配置文件 service nginx reload
> 或者 nginx -s reload
>
> 开机自启动 systemctl enable nginx.service
> 停止开机自启动 systemctl disable nginx.service
>
> 查看服务列表 systemctl list-units --type=service
>
> 启动失败 ln -s /usr/local/lib/libpcre.so.1/lib
>
> 开放 80 端口 firewall-cmd --zone=public --add-port=80/tcp --permanent
> 停止防火墙 systemctl stop firewalld.service
> 启动防火墙 systemctl start firewalld.service
>
> 日志地址 /var/log/nginx/

### pm2 启动项目

> [学习地址](https://www.bilibili.com/video/BV18t411L7Lg?p=9)

1. 找个位置将文件用 git 下载到服务器上，然后 install
1. npm i -g pm2 安装 pm2
1. pm2 start index.js --name(别名 可选：可自定义名字，当多个 node 服务时就需要别名) 启动 node 服务入口文件
   > pm2 其他命令
   > pm2 list 展示 pm2 目前启动的应用
   > pm2 logs index(进程名字) 查看指定运行的进程

### docker 的 ci&cd（持续集成&持续部署）Jenkins

> jenkins 安装方式
> 使用 war 包安装
> linux 使用 rpm 命令安装 --推荐
> docker 方式安装

所以我们使用 linux 安装、

#### java 环境安装---因为 Jenkins 是 java 编写，所以需要安装 java 环境

1. 查看 jdk 版本 yum -y list java\*
1. 选择一个版本安装 yum install -y java-1.8.0-openjdk-devel.x86_64
1. 检查是否安装成功 java -version 查看是否输出对应的版本号

#### 开始安装 Jenkins

> [学习地址](https://www.jianshu.com/p/2fc8340de073)、[视频地址](https://www.bilibili.com/video/BV1dE41147bX?p=2)

1. 首先需要 jenkins 的 rpm 安装包
   可以去[官网下载](https://links.jianshu.com/go?to=http%3A%2F%2Fpkg.jenkins-ci.org%2Fredhat-stable%2F)（非常慢），也可以使用下面的 github 仓库，我上传了一个 2020 年 2 月 28 日的修改版，应该是比较新的了，[地址在这里](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fxicunyang%2Fjenkins-2.204.3-1)。

1. 上传该 rpm 包到服务器，这里以本机是 mac 系统电脑，服务器是 linux 为例：
   `scp 本地目录 远程登录服务器用户名@远程服务器ip地址:/下载文件的目录 // 但也可以直接使用xftp上传，拖拽到对应的文件夹内即可`
1. 上传成功后，进入该上传目标文件夹，执行以下命令： `$ rpm -ivh jenkins-XXXXX.noarch.rpm`
1. 按实际情况，判断是否需要 jenkins 的默认使用端口(8080)，如果需要请执行(我改成了 8888)：`$ vi /etc/sysconfig/jenkins`
   找到 JENKINS_PORT 键，修改对应的值即可。
1. 启动/关闭/重启 jenkins（这是三种命令的合在一起写的，执行的时候判断需要哪个，就执行哪个）`$ service jenkins start/stop/restart`

##### 访问 jenkins 浏览器页面 http://118.25.xxx.xxx:8888
