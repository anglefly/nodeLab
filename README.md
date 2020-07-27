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

### git 安装、配置 ssh-key

在服务器生成sshkey，主要是为了可以拉取代码然后，而且只能拉去，避免被人提交混乱你的代码

``` 
ssh-keygen // 生成key
cat ~/.ssh/id_rsa.pub // 查看key，从ssh-rsa开始复制到尾部，配置到项目的设置中的部署公钥管理>添加公钥即可
```

### 用docker部署了nginx

```
docker重启 service docker restart

docker pull nginx:1.17.8  // 安装指定版本的nginx,版本可不写
下载完成后查看镜像
docker images|grep nginx

启动
docker run --name my-nginx -p 8088:80 -d nginx:1.16.0

--name  后面设置容器名称，这里设置的容器名为 my-nginx
-p      端口进行映射，将本地宿主机  8088 端口映射到容器内部的 80 端口
-d      设置容器在后台运行

查看成功部署图
docker ps|grep nginx

必须先停止该服务后再删除容器才能删除镜像

停止一个容器
docker stop 1a5fa469eadf // 容器id
docker kill 1a5fa469eadf // 直接杀死删除，容器不会像stop那样保存
查看并找到要删除的镜像
docker images

查看并找到要删除的容器
docker ps -a

将该容器删除 使用 rm 加 容器id
docker rm 1a5fa469eadf

删除镜像命令
docker rmi fce289e99eb9
```
这时候需要配置nginx，因为docker只是将服务打开了，但是没有在本机进行所需要的配置文件，所以需要我们手动进行部分配置文件的书写，方便后面进行各种服务的分配

下面是在用户目录（/usr）下创建的

1. mkdir -p /usr/server/nginx/www  // 创建www目录 存放你的各种项目或者html的页面

1. mkdir -p /usr/server/nginx/logs  // 创建日志目录 方便以后查看代理的各种问题和报错

1. mkdir -p /usr/server/nginx/conf  // 创建配置目录 这里用来承载你需要各种正反向代理的地方

拷贝容器内Nginx默认配置文件到本地当前目录下的conf目录，容器ID可以查看dockcr ps 命令输入

```
拷贝配置文件
docker cp 4678bb2910ba:/etc/nginx/nginx.conf ~/nginx/conf
前面是 docker虚拟机的地址和目录地址，后面是宿主机地址

映射容器目录 80:80 前一个指宿主的端口 后者是docker容器里的端口
docker run -d -p 80:80 --name nginx -v ~/server/nginx/www:/usr/share/nginx/html -v ~/server/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/server/nginx/logs:/var/log/nginx nginx:1.17.8
##查看运行容器
docker ps

```

#### 配置hosts文件

vim /etc/hosts

127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
127.0.0.1 www.yufei.cool // 新添加的
127.0.0.1 api.yufei.cool// 新添加的
127.0.0.1 vue.yufei.cool// 新添加的
127.0.0.1 react.yufei.cool// 新添加的

查看是否配置成功
 ping www.yufei.cool

#### 配置conf文件（很关键）

找到我们的文件目录下的文件 ~/server/nginx/conf/nginx.conf

### 其他的一些记录

1. 创建文件夹，mkdir
1. 后台启动文件位置 cd / 根目录文件夹下的 /var/data/blog/ server、admin 等文件夹
1. 安装 PM2，npm i -g pm2， 启动服务 进入 server 端的 文件夹下，用命令 pm2 start server.js（这个是服务入口文件名，也可以叫做其他名字例如 index.js) 或者 pm2 start server.js --name（区别名称，因为 pm 进程有名字，使自定义的 name 可以启动多个服务）
1. pm2 list 查看当前的服务列表 pm2 logs index 查看服务详情，可以在里面执行 Ctrl+c 退出
1. curl + http：地址可以请求一个服务
1. 配置 Nginx 反向代理（正向代理，通过某个服务器软件去方位别人网站叫正向，让别人访问就是反向）
   反向代理最好使用 vscode 插件实现，安装 remote ssh 插件
   或者使用 filezzlip、xftps

查看linux当前目录pwd
rm -rf ./server // 强制删除当前目录下的server文件夹

netstat -ntlp   //查看当前所有tcp端口·
netstat -ntulp |grep 80   //查看所有80端口使用情况·
netstat -an | grep 3306   //查看所有3306端口使用情况·
查看一台服务器上面哪些服务及端口
netstat  -lanp

用模拟请求测试一个服务
curl http://localhost:3000

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
> 日志地址 /var/log/nginx/

#### 防火墙 注意！开放防火墙新的端口后重启防火墙

```
1.systemctl start firewalld.service（开启防火墙）

2.systemctl stop firewalld.service（开启防火墙）

3.service firewalld restart（从启防火墙）

4.firewall-cmd --zone=public --add-port=4400-4600/udp --permanent(指定端口范围为4400-4600通过防火墙)
firewall-cmd --zone=public --add-port=4000/tcp --permanent(指定端口4000通过防火墙)

Warning: ALREADY_ENABLED: 3306:tcp（说明3306端口通过成功）

5.firewall-cmd --zone=public --remove-port=80/tcp --permanent（关闭指定端口）

6.firewall-cmd --zone=public --list-ports（查看通过的端口）

7.查看防火墙状态 ：firewall-cmd --state
```


### pm2 启动项目

> [学习地址](https://www.bilibili.com/video/BV18t411L7Lg?p=9)

1. 找个位置将文件用 git 下载到服务器上，然后 install  // 我的所有git服务在 /data/blogz
1. npm i -g pm2 安装 pm2
1. pm2 start index.js --name(别名 可选：可自定义名字，当多个 node 服务时就需要别名) 启动 node 服务入口文件
   > pm2 其他命令
   > pm2 stop/restart/delete servername 暂停某一个服务  可填写名字也可填写编号
   > pm2 list 展示 pm2 目前启动的应用
   > pm2 logs index(进程名字) 查看指定运行的进程
pm2 log server查看server进程日志
pm2 stop all 关闭所有进程

pm2 reload app_name 重新加载进程
pm2 monit 本地监控

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

我的锅：
1. 要让防火墙的80端口或者其他端口开放才能用主机地址加端口号去访问，否则无法访问
1. nginx无论是docker启动还是单独安装，配置结束后都是要重新启动，一个是重新启动容器一个是重新启动nginx服务
1. 写nginx配置的时候一定要加英文分号，否则怎么搞也显示不出来
1. 域名除了80端口其他都不行，81端口也不行