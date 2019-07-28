$(document).ready(function(){
    let count = 30;
    const redirect = "time out";
    function countDown(){
        let timer = $("#seconds");
        if(count > 0){
            count--;
            timer.html(count);
            setTimeout("countDown()", 1000);
        }else{
           console.log(redirect);
        }
    }
    $("#start").click(function(){
      count = 30;
      countDown();
    })

})