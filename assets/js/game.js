$(document).ready(function(){
    
    
    
    
    
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){
        console.log(response.results)
        let qContainer = $("<div class='card'>");
        let qTitle = $('<div class="card-header">');
        let qAnswerContainer = $('<ul class="list-group list-group-flush">')
        let qAnswer = $('<li class="list-group-item">')
        function addQuestion(){
            qAnswerContainer.append(qAnswer);
            qContainer.append(qTitle,qAnswerContainer);
            $(".question-container").html(qContainer);
        }
        addQuestion();
        qTitle.text(response.results[0].question)
    });

}); //Close line