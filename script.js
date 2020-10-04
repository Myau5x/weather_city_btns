let APIKey = '5a50fdd6105c320cc22546ab9a405fcf';
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=" + APIKey;
$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response) ;    
      
    })