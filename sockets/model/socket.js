module.exports = function(io){

	io.on('connection',function(socket){
		console.log('链接成功！');

		socket.on('join',(name,img,id) => {
			//console.log(socket);
			socket.user = {name:name,img:img,id:id,tip:false}; 
			// socket.id = id;

			let users = Object.values(io.sockets.sockets).map(item => item.user).filter(item => item);
			console.log('users',users);

			socket.broadcast.emit('welcome',name,users);
			socket.emit('myself',name,users);
		});
		//接收信息广播
		socket.on('message',data => {
			//广播
			// let users = Object.values(io.sockets.sockets).map(item => item.user).filter(item => item);
			socket.broadcast.emit('sendMsg',data);
			// io.emit('sendMsg',data);
		})
		//一对一消息
		socket.on('msg',data => {
			//console.log(data.tid);
			let users = Object.values(io.sockets.sockets).filter(item => item);
			//给对方发送
			users.forEach(item => {
				if(item.user.id == data.tid){
					item.emit('sMsg',data);
				}
			})
			//广播
			// socket.to(data.tid).emit('sMsg',data);
		})

		//用户离开
		socket.on('disconnect',function(){
			let list = Object.values(io.sockets.sockets).map(item => item.user).filter(item => item);

				console.log(list);
				// console.log(io.sockets)
				//广播有用户退出
				socket.broadcast.emit('quit',list,socket.user);
			
		})
	})
}