var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";
// what do you think a variable in all caps means?
var imgCount=0;

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
      $(".instaimages").append("<img class=pics src='"+response.data[i].images.standard_resolution.url+"'/>");
      $(".instaimages").append(response.data[i].caption.text);
  };
popularity(response);
brevity(response);
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

      //function activeDays(response){

      //}
      // HOW DO YOU USE THE CREATED TIME KEY TO GET THE DAY OF THE WEEK AND NOT ONLT THE SPECIFIC DATE



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


// ajax url
// insert mashape api link 
// loop through captions
// for each caption assign a score

 /* $.ajax({
  method: "GET",
  url: "http://sentiment.vivekn.com/api/text/",
  dataType: "jsonp",
  success: sentiment, 
  error: function() {
  alert("there has been an error...")
 }
});


function sentiment(response){
curl -X POST --include 'https://community-sentiment.p.mashape.com/text/' \
  -H 'X-Mashape-Key: ixqpCJo9qnmshUTokmOnldxNq5Oep1NrCXTjsnlUR82ltVmWFf' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  -d 'txt= happy '
      {
        "result": {
          "confidence": " 0",
          "sentiment": "0 "
        }
      }
}
var textSentiment= "result"
  $("#textSentiment").append("The positivity rating of this caption is"+" "+textSentiment)
*/


















