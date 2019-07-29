$(document).ready(function(){
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){ 
        // QUESTION API INFORMATION
        let qIndex = 0;
            let textTitle = response.results[qIndex].question;
            let textCorrectAns = response.results[qIndex].correct_answer;
            let incorrectAns = response.results[qIndex].incorrect_answers; //Array 3
                  incorrectAns.push(textCorrectAns);
                  incorrectAns.sort();
            let allAnswers = incorrectAns; //Array 4
        
        console.log(textCorrectAns);       
        // DOM Manipulation
        const qContainer = $("<div class='card'>");
        const qTitle = $('<div class="card-header">');
        const qAnswerContainer = $('<ul class="list-group list-group-flush">')
        
        function displayGameContainers(){
            qContainer.append(qTitle,qAnswerContainer);
            $(".question-container").html(qContainer);
        }    
        
        function textGame(){
            textTitle = response.results[qIndex].question;
            textCorrectAns = response.results[qIndex].correct_answer;
            incorrectAns = response.results[qIndex].incorrect_answers; //Array 3
            // incorrectAns.push(textCorrectAns);
            // incorrectAns.sort();
            allAnswers = incorrectAns; //Array 4
            qTitle.html(textTitle)
            for(var i=0; i<allAnswers.length ; i++){
                    var ansOption = $(`<li class="list-group-item"><button class="btn-ans" value="${allAnswers[i]}">${allAnswers[i]}</button></li>`);
                    $(qAnswerContainer).append(ansOption);
                    //$(qAnswerContainer).append(qAnswer);
            }
        }
            
        displayGameContainers();
        textGame(0);
        
        function nextQuestion(){
            $(".question-container").empty()
            qIndex ++;
            textGame();
            displayGameContainers();
            console.log(qIndex);
        }   
        
        // Event Listener Win/Loose
        $(".btn-ans").click(function(){
            let value = $(this).attr("value");
            // condition -------------true ----------------------------------------------false
            value == textCorrectAns ? $("#message-display").append("<h3>You Won!</h3") : $("#message-display").append("<h3>You lost. Try another one!</h3");
            count = 0;
            setTimeout(countDown(), 3000);
        });


        // Clock
        // let count = 30;
        // $("#seconds").html(count);
        // function countDown(){
        //     count--;
        //     $("#seconds").html(count);
        // }
        // setTimeout(countDown, 1000);



        let count = 10;
        function countDown(){
            let timer = $("#seconds");
            if(count > 0){
                count--;
                timer.html(count);
                setTimeout(countDown, 1000);
            }else{
                nextQuestion();
            }
        }
        countDown();



        

    }); // Close THEN.

}); //Close line