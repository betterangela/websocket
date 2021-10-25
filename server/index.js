const Ws = require('ws')
;(function () {
    const server = new Ws.Server({ port: 8000})
    const init = ()=>{
        bindEvent()
    }
    function bindEvent() {
        server.on('connection',handleConnection)
    }
    function handleConnection(ws){
        ws.on('message',handleWsMessage)
    }
    function handleWsMessage(msg){
        console.log(`ws server received message:`);
        console.log(`${msg}`);
        // 广播这条信息，也就是向每个客户端去广播
        server.clients.forEach(function (client){
            console.log('send===');
            console.log(msg);
            // c.send(`${msg}`)
            client.send(msg)
        })
    }
    init()
})()