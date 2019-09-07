$(document).ready(function () {

    //--- Variables --//
    let targetNumber = 0; //declaring target number variable
    let scoreNumber = 0 // declaring score variable
    let wins = 0; // declaring wins variable
    let losses = 0; // declaring losses variable
    let thisCrystalNumber = 0; //// declaring crystals numbers variable

    //-- Functions --//


    //generat random number function
    let generateNumber = () => targetNumber = Math.floor(Math.random() * (120 - 19 + 1)) + 19; //should be 19-120 inclusive this way

    //popup window function
    let popUp = () => {
        //on and hover close button on popup
        $(".btn_close").mouseenter(function () {
            $(this).attr("src", "assets/images/close-button-hover.jpg");
        });
        $(".btn_close").mouseleave(function () {
            $(this).attr("src", "assets/images/close-button.jpg");
        });

        //displaying popup window after user wins or lose
        $("#popup").css("display", "block");
        //setting the center alignment for popup
        var popMargTop = ($("#popup").height() + 24) / 2;
        var popMargLeft = ($("#popup").width() + 24) / 2;
        $("#popup").css({
            "margin-top": -popMargTop,
            "margin-left": -popMargLeft
        });

        // add the overlay mask to body
        $("body").append("<div id=\"mask\"></div>");
        $("#mask").fadeIn(300);
        // when clicking on the button close or the mask layer the popup closed
        $("a.close, #mask").on("click", function () {
            $("#mask , .popup").fadeOut(300, function () {
                $("#mask").remove();
            });
            return false;
        });
    }

    //start game function
    let startGame = () => {
        generateNumber(); //invoking generate number function
        $("#target_number").html(targetNumber); //showing target niumber in the box
        createImages();  //invoking create images function
        userClicks();  //invoking user clicks function
    }

    //restart function
    let restartGame = () => {
        scoreNumber = 0; //setting score to 0
        $(".generatedImages").remove(); // removing old images and respective numbers
        startGame(); //invoking start game function
        $("#target_number").html(targetNumber); //showing a new target number
        $("#score").html(scoreNumber); //showing new score
        //keeping my wins and lose values trough the game
        $("#wins").html(wins);
        $("#losses").html(losses);

    }

    //create images function
    let createImages = () => {
        //so i decided to create 4 images using for loop 
        for (let i = 0; i < 4; i++) {
            //generating random number for each crystal
            thisCrystalNumber = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
            //creating <div> i am going to put my image in
            let imgDiv = $("<div>");
            //adding class to divs, especially the 'generatedImages' class which i will use to remove images after user win or lose 
            imgDiv.addClass("col-3 generatedImages");
            //creating images
            let crystalImage = $("<img>");
            //adding class to images
            crystalImage.addClass("crystal img-fluid crystal-image-" + i);
            //setting link to imagea
            crystalImage.attr("src", "assets/images/crystal-" + i + ".png");
            //binding generated number to the image
            crystalImage.attr("data-value", thisCrystalNumber);
            //appending newly created divs to existing div 
            $("#images").append(imgDiv);
            //appending images to newly created divs
            imgDiv.append(crystalImage);
            //change images of crystals on mouse over
            $(".crystal-image-" + i).mouseenter(function () {
                $(this).attr("src", "assets/images/crystal-" + i + "-hover.png");
            });
            $(".crystal-image-" + i).mouseleave(function () {
                $(this).attr("src", "assets/images/crystal-" + i + ".png");
            });
        }
    }

    //clicks on crystals function
    let userClicks = () => {
        $(".crystal").on("click", function () {
            let dataValue = $(this).attr('data-value'); //getting crystal value
            console.log("Crystal value " + dataValue);
            dataValue = parseInt(dataValue); //parsing value to integer
            scoreNumber += dataValue; // adding clicked crystal value to total score
            $("#score").html(scoreNumber); //showing my score to the user
            //if user wins
            if (scoreNumber === targetNumber) {
                $(".message").html("You won!"); //message you won
                popUp(); // show popup
                wins++; // incrementing wins
                restartGame(); // reseting the game
            }
            //if user loses
            else if (scoreNumber >= targetNumber) {
                $(".message").html("You Lose!"); // message you lose
                popUp(); // show popup
                losses++; // incrementing losses
                restartGame(); // reseting the game
            }
        });


    }


    //start the game!
    startGame();

})