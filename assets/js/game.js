$(document).ready(function(){
    
    
    
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){

        let qIndex = 0;
        console.log(response.results)
        // Text Variables
        const textTitle = response.results[qIndex].question;
        const textCorrectAns = response.results[qIndex].correct_answer;
        const incorrectAns = response.results[qIndex].incorrect_answers; //Array 3
        incorrectAns.push(textCorrectAns);
        const allAnswers = incorrectAns;
        
        console.log("all: " + allAnswers)
        console.log(textTitle);
        console.log("incorrect:" + incorrectAns);
        console.log("correct:" + textCorrectAns);

        // DOM Manipulation
        const qContainer = $("<div class='card'>");
        const qTitle = $('<div class="card-header">');
        const qAnswerContainer = $('<ul class="list-group list-group-flush">')

        qContainer.append(qTitle,qAnswerContainer);
        $(".question-container").html(qContainer);
        qTitle.text(textTitle)
        // loop to add answers to the DOM:
        for(var i=0; i<allAnswers.length ; i++){
                var ansOption = $(`<li class="list-group-item">${allAnswers[i]}</li>`);
                ansOption.attr("data-answer", allAnswers[i]);
                $(qAnswerContainer).append(ansOption);
        }
              
        // qAnswer.text(textCorrectAns);

        
        
    });

}); //Close line