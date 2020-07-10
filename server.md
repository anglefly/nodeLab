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

查看nginx -t 查看nginx安装位置

启动 sudo systemctl start nginx.service
重启自启动 sudo systemctl enable nginx.service
或者到达配置文件的位置/etc/nginx 中重载nginx配置文件 service nginx reload 
或者 nginx -s reload

开机自启动 systemctl enable nginx.service
停止开机自启动 systemctl disable nginx.service

查看服务列表 systemctl list-units --type=service

启动失败 ln -s /usr/local/lib/libpcre.so.1/lib

开放80端口 firewall-cmd --zone=public --add-port=80/tcp --permanent
停止防火墙 systemctl stop firewalld.service
启动防火墙 systemctl start firewalld.service

日志地址 /var/log/nginx/
