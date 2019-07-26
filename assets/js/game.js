$(document).ready(function(){
    
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){
        console.log(response);
        
    });

}); //Close line