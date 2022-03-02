// $ = jQuery's way of naming its stuff.
// $( ... ) = what's inside () is the "object" we are messin with
// .ready() = method of $jQ
// .ready( ... ) = argument/parameter passed to that method
// function(){} in the method is an IIFE = Immediately Invoked F/n Expresson
$(document).ready(function(){ 
  //alert("page is ready");
  console.log("doc is ready");

let wowCount = 0;
let wowMsg;


$( "#dogeDiv" ).draggable(

  {
    containment: "#dogeHouse", 
    scroll:false,
    start: function() {   //start
      wowCount++;
      console.log("we're starting.", "this is wowCount", wowCount);

    if (wowCount <= 5){
      wowMsg = "slight wow. ";
    }
    else if(wowCount <=10){
      wowMsg = "halfwow there. ";
    }
    else{
      wowMsg = "too much wow.";
    }
  

      $("#wowOutput").text(wowMsg +"you has " + wowCount +  " wow");
    
    }//start
});


$("#dogeDiv").draggable();


  // let userGreeting = "You are enough, ";
  
  // $("button").click(function(){
  //   userGreeting = userGreeting + $("#fname").val() + "...just as you are.";
    
  //   $("#greetingOutput").text(userGreeting);
    
    
  //   //console.log($("#fname").val());


    
  // });
});