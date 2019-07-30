$(document).ready(function(){
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){ 
        let wins = 0;
        let looses = 0;
        let unanswered = 0;
        // QUESTION API INFORMATION
        let qIndex = 8;
            let textTitle = response.results[qIndex].question;
            let textCorrectAns = response.results[qIndex].correct_answer;
            let incorrectAns = response.results[qIndex].incorrect_answers; //Array 3 
            let allAnswers = incorrectAns; //Array 4
        
        // DOM Manipulation
        const qContainer = $("<div class='card'>");
        const qTitle = $('<div class="card-header">');
        const qAnswerContainer = $('<ul class="list-group list-group-flush">')
        
        // Add Start Button to DOM
        $("#start-game").html("<button id='start'>Start Game</button>");
        

       

        //Clock
        let count = 00;

        function countDown(){
            if(count > 0){
                count--;
                $("#seconds").html(count);
                timeoutID = setTimeout(countDown, 1000);
            }else if(count === 0){
                $("#message-display").append("<h3>Out of time!</h3");
                $("#message-display").append(`<p>The correct answer was: <strong>${textCorrectAns}</strong></p>`);
                unanswered++;
                console.log("unanswered: " + unanswered)
                nextQuestion();
            }
            
        }
        

        $("#start").click(function(){
            console.log(qIndex);
            newQuestion();
        })
        
        
        function emptyContent(){
            $(".question-container").empty();
            $("#message-display").empty();
            $(qAnswerContainer).empty();
        }

        // Step 1
        function displayGameContainers(){
            qContainer.append(qTitle,qAnswerContainer);
            $(".question-container").html(qContainer);
        }    

        // Step 2
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
            
        // Step 3 (step 1 + step 2 + Start clock)
        function newQuestion(){
            count = 10;
            $("#seconds").html(count);
            $("#start-game").empty();
            displayGameContainers();
            textGame();
            setTimeout(countDown, 1000);
        }   
        

        //Step 4 Next question after 4 seconds
        function nextQuestion(){
            qIndex++;
            if( qIndex < 10){
                setTimeout(emptyContent, 4000);
                setTimeout(newQuestion,4001);
                console.log(qIndex);
            }else{
                clearTimeout(timeoutID);
                $("#game").empty();
                $("#game").html("end");
            }
        }



        // Event Listener Win/Loose
        
            $(document).on("click", ".btn-ans", function(){
                clearTimeout(timeoutID);
                console.log("clicked!");
                let value = $(this).attr("value");
                if( value == textCorrectAns ){
                    $("#message-display").append("<h3>You Won!</h3");
                    wins++;
                    console.log("Looses: " + wins)
                    nextQuestion();
                }else{
                    $("#message-display").append("<h3>You lost.</h3");
                    $("#message-display").append(`<p>The correct answer was: <strong>${textCorrectAns}</strong></p>`);
                    looses++;
                    console.log("Looses: " + looses)
                    nextQuestion();
                }
            });


    }); // Close THEN.

}); //Close line