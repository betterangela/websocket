;(function () {
    const msgList = document.getElementById('list')
    const msgInput = document.getElementById('message')
    const sendBtn = document.getElementById('send')
    const ws=new WebSocket('ws://localhost:8000')

    const init=()=>{
        bindEvent()
    }
    function bindEvent(){
        sendBtn.addEventListener('click',handleSendBtn);
        ws.addEventListener('open',handleWsOpen)
        ws.addEventListener('close',handleWsClose)
        ws.addEventListener('error',handleWsError)
        ws.addEventListener('message',handleWsMessage)
    }
    function handleSendBtn(){
        if(!msgInput.value.trim()) return;
        ws.send(JSON.stringify({
            user:localStorage.getItem('username'),
            time: new Date().getTime(),
            message:msgInput.value,
        }))
        msgInput.value=''
    }
    function handleWsOpen(){
        if(!localStorage.getItem('username')){
            location.href = '/entry.html'
        }
    }
    function handleWsClose(){}
    function handleWsError(){}
    function handleWsMessage(e){
        console.log(e.data);
        const { user, time, message } = JSON.parse(e.data);
        console.log(e.data);
        msgList.appendChild(createNode(user, time, message))
    }
    function createNode(user, time, message){
        const liNode = document.createElement('li')
        liNode.innerHTML=`
            <span>${user} </span><span>${new Date(time)}</span>
            <br>    
            <span>${message}</span>       
        `
        return liNode
    }
    init()
})()