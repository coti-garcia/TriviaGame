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
            let allAnswers = incorrectAns; //Array 4
        
        // DOM Manipulation
        const qContainer = $("<div class='card'>");
        const qTitle = $('<div class="card-header">');
        const qAnswerContainer = $('<ul class="list-group list-group-flush">')
        
        
        $("#start-game").html("<button id='begin'>Start Game</button>");
        
        //Clock
        let count = 00;
        function countDown(){
            if(count > 0){
                count--;
                $("#seconds").html(count);
                setTimeout(countDown, 1000);
            }else{
                $("#message-display").append("<h3>You lost. Try another one!</h3")
                setTimeout(emptyContent, 4000);
                qIndex++;
                setTimeout(nextQuestion,4001);
                console.log(qIndex);
            }
        }
        
        // Add Start Button to DOM
       

        $("#begin").click(function(){
            nextQuestion();
        })
        
        
        function emptyContent(){
            $(".question-container").empty();
            $("#message-display").empty();
            $(qAnswerContainer).empty();
        }

        function displayGameContainers(){
            qContainer.append(qTitle,qAnswerContainer);
            $(".question-container").html(qContainer);
        }    
        
        function textGame(){
            textTitle = response.results[qIndex].question;
            textCorrectAns = response.results[qIndex].correct_answer;
            incorrectAns = response.results[qIndex].incorrect_answers; //Array 3
            incorrectAns.push(textCorrectAns);
            incorrectAns.sort();
            allAnswers = incorrectAns; //Array 4
            console.log(textCorrectAns);       
            qTitle.html(textTitle)
            for(var i=0; i<allAnswers.length ; i++){
                    var ansOption = $(`<li class="list-group-item"><button class="btn-ans" value="${allAnswers[i]}">${allAnswers[i]}</button></li>`);
                    $(qAnswerContainer).append(ansOption);
                    //$(qAnswerContainer).append(qAnswer);
            }
        }
            
       
        function nextQuestion(){
            count = 20;
            $("#seconds").html(count);
            $("#start-game").empty();
            displayGameContainers();
            textGame();
            setTimeout(countDown, 1000);
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



        



        

    }); // Close THEN.

}); //Close line