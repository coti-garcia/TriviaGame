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
        console.log(textTitle);
        console.log("incorrect:" + incorrectAns);
        console.log("correct:" + textCorrectAns);

        // DOM Manipulation
        const qContainer = $("<div class='card'>");
        const qTitle = $('<div class="card-header">');
        const qAnswerContainer = $('<ul class="list-group list-group-flush">')
        const qAnswer = $('<li class="list-group-item">')

        qContainer.append(qTitle,qAnswerContainer);
        $(".question-container").html(qContainer);

        // loop to add the 3 incorrect answers:
        for(var i=0; i<incorrectAns.length ; i++){
                var ansOption = $(`<li class="list-group-item">${incorrectAns[i]}</li>`);
                $(qAnswerContainer).append(ansOption);
        }
              
        qTitle.text(textTitle)
        qAnswer.text(textCorrectAns);
        qAnswerContainer.append(qAnswer);
        
        
    });

}); //Close line