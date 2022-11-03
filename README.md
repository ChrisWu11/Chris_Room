# Chris_Room
实时通讯（私聊，群聊）Uniapp+socket.io

### 项目难点
1. 客户端不需要的数据，服务端emit不要传，会出现不报错的bug
2.socket.broadcast是对自己以外的clients广播
3.连接上时要在socket上绑定一个标识
4.根据socket.io版本看清楚io.sockets.sockets是一个Map还是普通{}
