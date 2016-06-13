var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";
// what do you think a variable in all caps means?
var imgCount=0;
var totalScore = 0;

$(document).ready(function() {
  var token = window.location.hash;
  //if (!token) {
   // window.location.replace("./login.html");
  //}
  token = token.replace("#", "?"); // Prepare for query parameter
  var mediaUrl = API_DOMAIN + RECENT_MEDIA_PATH + token;

  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: handleResponse,
    error: function() {
      alert("there has been an error...")
    }
  })
});

function handleResponse(response){
  imgCount= response.data.length;
  for (var i =0; i < response.data.length; i++) {
      $(".instaimages").append("<div class='image'> <img class=pics src='"+response.data[i].images.standard_resolution.url+"'/> </div>");
      $(".instaimages").append("<div class='text' id='img"+i+"'>" + response.data[i].caption.text + "</div>");
      feelings(response.data[i].caption.text, "img"+i); 
  };
popularity(response);
brevity(response);
activeDays(response);
}

                                //egoscore

  $.ajax({
    method: "GET",
    url: "https://api.instagram.com/v1/users/self/?access_token=547927290.b5e048f.541cd859a4c0473bbf9a05439dd7d9b8",
    dataType: "jsonp",
    success: egoScore, 
    error: function() {
      alert("there has been an error...")
    }
  });

function egoScore(response){
  var count = 0;
  for(var i =0; i < response.data.length; i++){
    if (egoScore.data[i].user_has_liked){
      count ++;
    }
  }
  var percentage = (count/imgCount)*100;
    $("#percentageCount").append("I have liked"+" "+count+"% of my own pictures")
}

                                //popularity 




function popularity(response){
  var totalLikes = 0
  for(var i =0; i < response.data.length; i++){
     totalLikes += response.data[i].likes.count;
  }
  var averageLikes = totalLikes/response.data.length;
  $("#popularityCount").append("My popularity is"+" "+averageLikes+" "+"average likes per picture")
}



                                                    //active days
  function activeDays(response){
  var days = [0, 0, 0, 0, 0, 0, 0];
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (var i = 0; i < response.data.length; i++) {
    var time = parseInt(response.data[i].created_time);
    var date = new Date(time * 1000);
    days[date.getDay()]++;
  }
  var mostActiveDay = week[(Math.max.apply(Math, days))];
  $("#activeDays").append("The most common day to post a picture is on"+" "+mostActiveDay)
}

                                                    //brevity


  function brevity(response){
    var totalCaptionlength = 0
    for (var i = 0; i<response.data.length; i++){
      totalCaptionlength += response.data[i].caption.text.length;
    }
  var averageCaption= (totalCaptionlength/response.data.length);
    $("#brevity").append("My average caption length is"+" "+averageCaption+" "+"words per image caption")
}

                                                      //visibility thirst
  $.ajax({
    method: "GET",
    url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=547927290.b5e048f.541cd859a4c0473bbf9a05439dd7d9b8",
    dataType: "jsonp",
    success: thirst, 
    error: function() {
      alert("there has been an error...")
    }
  });

  function thirst(response){
    var totalHashtags = 0
    for (var i = 0; i<response.data.length; i++){
      totalHashtags += response.data[i].tags.length;
    }

  var averageHashtag= (totalHashtags/response.data.length);
    $("#visibilityThirst").append("My average number of hashtags is"+" "+averageHashtag+"hashtags per image caption")
    }

                                                      //sentiments


  function feelings(text, id){
  $.ajax({
  method: "GET",
  url: "https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=" + text,
  headers:{"X-Mashape-Key": "PbStp7XTqcmshozwb4sA09AZRaTEp1qKVYHjsnE0LcKWj66qWd",
  "Accept": "application/json", },
  success: function(response){
    sentimentSuccess(response, id)
  },
  error: function() {
  alert("there has been an error...")
  }
});
}
var sentimentCount=0

function sentimentSuccess(data, id){
  var confidenceScore = data.score;
  var confidenceType = data.type;
  totalScore += data.score;
  sentimentCount++;
  var averageScore = (totalScore/sentimentCount);
  $("#"+id).append("<div class='results'> Sentiment: score("+confidenceScore+"), type:"+confidenceType+"</div>");
  $("#average").html("My average positivity score is: "+averageScore);
}
















