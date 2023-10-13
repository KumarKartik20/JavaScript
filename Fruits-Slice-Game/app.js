var playing = false;
var score;
var lives;
var Fruits = ['apple','banana','pear','watermelon','mango','orange','grapes','cherries','pineapple'];
var step;
var action;

$(function(){
$("#start_reset").click(function(){
    if(playing == true){
        location.reload();
    }
    else{
        $('#instructions').html('USE YOUR MOUSE TO SLICE FRUITS')
        playing = true;
        score=0;
        $("#score_val").html(score);
        $("#lives").show();
        lives = 3;
        addHearts();
        $('#game_over').hide();
        $("#start_reset").html("RESET");
        start_action();
    }
});



function addHearts(){
    $('#lives').empty();
    for(i=0;i<lives;i++){
        $('#lives').append('<img src="img/hearts.png" class="life">');
    }
}

function start_action(){
    $('#fruit1').show();
    choose();
    $('#fruit1').css({'left':Math.round(700*Math.random()), 'top':-60})
    step = 1+ Math.round(5*Math.random());
    action = setInterval(function(){
        $('#fruit1').css('top', $('#fruit1').position().top+step);
        if($('#fruit1').position().top > $('#fruit_cont').height()){
            if(lives >1){
                $('#fruit1').show();
                choose();
                $('#fruit1').css({'left':Math.round(700*Math.random()), 'top':-60})
                step = 1+ Math.round(5*Math.random());
                lives--;
                addHearts();
            }else{
                    playing = false;
                    $('#start_reset').html("START");
                    $('#game_over').show();
                    $('#game_over').html("<p>GAME OVER!! <br> YOUR SCORE IS: " + score + ".</p>");
                    $('#lives').hide();
                    stop_action();
            }

        }
    }, 10)
}

function choose(){
    $('#fruit1').attr('src', 'img/'+Fruits[Math.round(8*Math.random())]+'.png');
}
function stop_action(){
    clearInterval(action);
    $('#fruit1').hide();
}

$('#fruit1').mouseover(function(){
    score++;
    $('#score_val').html(score);
    // document.getElementById('slice_sound').play();
    $('#slice_sound')[0].play();
    clearInterval(action);
    $('#fruit1').hide('explode',500);

    setTimeout(start_action,500);
})

});

