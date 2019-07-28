$(document).ready(function(){
    
    
    
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){
        let qIndex = 0;
        const textTitle = response.results[qIndex].question;
        const textCorrectAns = response.results[qIndex].correct_answer;
        const incorrectAns = response.results[qIndex].incorrect_answers; //Array 3
        incorrectAns.push(textCorrectAns);
        const allAnswers = incorrectAns;

        // DOM Manipulation
        function game(){
            const qContainer = $("<div class='card'>");
            const qTitle = $('<div class="card-header">');
            const qAnswerContainer = $('<ul class="list-group list-group-flush">')
            const qAnswer = $('<li class="list-group-item">')
            qContainer.append(qTitle,qAnswerContainer);
            $(".question-container").html(qContainer);
            qTitle.html(textTitle)
                // loop to add answers to the DOM:
                // ASK TO JACOB:  Why all the buttons are in one <li>??
            for(var i=0; i<allAnswers.length ; i++){
                    var ansOption = $(`<button class="btn-ans" value="${allAnswers[i]}">${allAnswers[i]}</li>`);
                    $(qAnswer).append(ansOption);
                    $(qAnswerContainer).append(qAnswer);
            }
        }
        game();
        
        function newGame(){
            $(".question-container").empty()
            qIndex ++;
            game();
            console.log(qIndex);
        }   
        
        // Event Listener Win/Loose
        $(".btn-ans").click(function(){
            let value = $(this).attr("value");
            if ( value == textCorrectAns){
                console.log("win!")
                $("#message-display").append("<h3>You Won!</h3");
                $("#message-display").append('<button id="next">next</button>');
                $("#next").click(function(){
                    newGame();
                })

            }else{
                console.log("loose!")
                $("#message-display").append("<h3>You lost. Try another one!</h3");
                $("#message-display").append('<button id="next">next</button>');
                $("#next").click(function(){
                    newGame();
                })
            }
        });


       



        //Clock
        let count = 30;
        $("#seconds").html(count);
        function countDown(){
            count--;
            $("#seconds").html(count);
        }
        setTimeout(countDown, 1000);


        

    });

}); //Close line