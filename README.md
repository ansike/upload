# 文件上传

### 普通上传 + 解析formdata内容
执行命令之后会在8084端口启动服务，打开浏览器 http://localhost:8084
```shell
node src/index.js
# 或者
yarn dev
```

 尝试点击上传文件，上传之后可以在upload目录看到

### body直接挂file上传 + 输出到 writeStream
执行以下命令，会在8085端口启动服务，打开浏览器 http://localhost:8085
```shell
node src/stream/index.js
```
点击上传文件，上传之后可以在upload目录看到file.jpeg文件，因为stream 模式没有办法拿到文件名，所以需要提前确定上传文件的类型和名称

### 普通上传 + 代理转发到其他服务

有两个服务，A服务负责前端逻辑，B服务是真正的静态服务，接受文件上传

执行以下命令，会在8086端口启动服务，打开浏览器 http://localhost:8086
在9000端口启动文件上传服务

```shell
node src/serverRedirect/index.js
node src/serverRedirect/static-server.js
```

点击上传文件，上传之后可以在upload目录看到对应文件

### node 构造 formdata 发送请求

```shell
# 先启动
node src/nodeUpload/server.js
# 后调用
node src/nodeUpload/index.js
```

调用之后会在upload目录下生成file.jpeg文件
