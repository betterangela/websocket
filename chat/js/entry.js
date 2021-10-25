;(function () {
   const userInput = document.getElementById('userName')
   const userBtn = document.getElementById('userBtn')

    const init = ()=>{
       bindEvent()
    }
    const bindEvent = ()=>{
       userBtn.addEventListener('click', handleUserBtn)
    }
    function handleUserBtn(){
       if(userInput.value.length<6){
           alert('用户名不能小于6位')
       }
       localStorage.setItem('username',userInput.value);
       location.href = '/index.html'
    }
    init()
})()