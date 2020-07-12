# 简介

这是一个用于nodejs用户注册、登录和授权（token）后台练习

stup
1. 安装express 第五版本 npm i express@next----产生的包都在node_moduls文件夹中
1. 初始化项目npm init---这样才会有pakege.json文件来管理包
1. 检查restclient插件是否存在，用来模拟请求的，类似postman，使用后缀名叫做.http文件来操作
1. 额外安装npm install -g nodemon来完成实时启动和修改项目，不然使用node开启的服务修改文件后是要重新启动服务哦

## 接下来是部署

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. mongodb 数据库安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置Nginx反向代理

### 其他的一些记录
1. 创建文件夹，mkdir
1. 后台启动文件位置 cd / 根目录文件夹下的 /var/data/blog/ server、admin等文件夹
1. 安装PM2，npm i -g pm2， 启动服务 进入server端的 文件夹下，用命令 pm2 start server.js（这个是服务入口文件名，也可以叫做其他名字例如index.js) 或者 pm2 start server.js --name（区别名称，因为pm进程有名字，使自定义的name可以启动多个服务）
1. pm2 list 查看当前的服务列表 pm2 logs index 查看服务详情，可以在里面执行Ctrl+c退出
1. curl + http：地址可以请求一个服务
1. 配置Nginx反向代理（正向代理，通过某个服务器软件去方位别人网站叫正向，让别人访问就是反向）
反向代理最好使用vscode插件实现，安装remote ssh插件
或者使用filezzlip、xftps

> 查看nginx -t 查看nginx安装位置
> 
> 启动 sudo systemctl start nginx.service
> 重启自启动 sudo systemctl enable nginx.service
> 或者到达配置文件的位置/etc/nginx 中重载nginx配置文件 service nginx reload 
> 或者 nginx -s reload
> 
> 开机自启动 systemctl enable nginx.service
> 停止开机自启动 systemctl disable nginx.service
> 
> 查看服务列表 systemctl list-units --type=service
> 
> 启动失败 ln -s /usr/local/lib/libpcre.so.1/lib
> 
> 开放80端口 firewall-cmd --zone=public --add-port=80/tcp --permanent
> 停止防火墙 systemctl stop firewalld.service
> 启动防火墙 systemctl start firewalld.service
> 
> 日志地址 /var/log/nginx/


### pm2启动项目
> [学习地址](https://www.bilibili.com/video/BV18t411L7Lg?p=9)

1. 找个位置将文件用git下载到服务器上，然后install
1. npm i -g pm2 安装pm2
1. pm2 start index.js --name(别名 可选：可自定义名字，当多个node服务时就需要别名) 启动node服务入口文件 
> pm2其他命令 
> pm2 list 展示pm2目前启动的应用
> pm2 logs index(进程名字) 查看指定运行的进程

### docker的ci&cd（持续集成&持续部署）Jenkins
>jenkins安装方式
>使用war包安装
>linux使用rpm命令安装 --推荐
>docker方式安装

所以我们使用linux安装、
#### java环境安装---因为Jenkins是java编写，所以需要安装java环境
1. 查看jdk版本 yum -y list java*
1. 选择一个版本安装 yum install -y java-1.8.0-openjdk-devel.x86_64
1. 检查是否安装成功java -version 查看是否输出对应的版本号

#### 开始安装Jenkins
> [学习地址](https://www.jianshu.com/p/2fc8340de073)、[视频地址](https://www.bilibili.com/video/BV1dE41147bX?p=2)
1. 首先需要jenkins的rpm安装包
可以去[官网下载](https://links.jianshu.com/go?to=http%3A%2F%2Fpkg.jenkins-ci.org%2Fredhat-stable%2F)（非常慢），也可以使用下面的github仓库，我上传了一个2020年2月28日的修改版，应该是比较新的了，[地址在这里](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fxicunyang%2Fjenkins-2.204.3-1)。

1. 上传该rpm包到服务器，这里以本机是mac系统电脑，服务器是linux为例：
```scp 本地目录  远程登录服务器用户名@远程服务器ip地址:/下载文件的目录 // 但也可以直接使用xftp上传，拖拽到对应的文件夹内即可```
1. 上传成功后，进入该上传目标文件夹，执行以下命令： ```$ rpm -ivh jenkins-XXXXX.noarch.rpm```
1. 按实际情况，判断是否需要jenkins的默认使用端口(8080)，如果需要请执行(我改成了8888)：```$ vi /etc/sysconfig/jenkins ```
找到JENKINS_PORT键，修改对应的值即可。
1. 启动/关闭/重启jenkins（这是三种命令的合在一起写的，执行的时候判断需要哪个，就执行哪个）```$ service jenkins start/stop/restart```
#### 访问jenkins浏览器页面 http://118.25.xxx.xxx:8888
