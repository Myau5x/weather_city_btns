let curEl = $("#current");
let futureEl = $("#future")

let APIKey = '5a50fdd6105c320cc22546ab9a405fcf';
let queryURL_cur = "https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=" + APIKey;

//seattle coor -122.33, lat: 47.61
let queryURL_fut = "https://api.openweathermap.org/data/2.5/onecall?lat=47.61&lon=-122.33&exclude=minutely,alerts,hourly&units=imperial&appid="+APIKey;


//// check how answer to unknown  --- 404
let queryURL_wr = "https://api.openweathermap.org/data/2.5/weather?q=vrbrvr&units=imperial&appid=" + APIKey;
$.ajax({
    url: queryURL_wr,
    method: "GET"
    }).done(function(response) {
      
      console.log(response)}
       
    ).fail(function(error){console.log(error)});
    
function get_weather(city){
  query_city = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+APIKey;
  $.ajax({
    url: query_city,
    method: "GET"
  }).done(function(response) {
      
    console.log(response);
    $("#city-name").text(response.name);
    lat = response.coord.lat;
    lon = response.coord.lon;
    let query = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,alerts,hourly&units=imperial&appid="+APIKey;
    $.ajax({
      url: query,
      method: "GET"
    }).done(function(response){
      console.log("future and uv info")
      console.log(response);
      $("#current").empty()
      let temp = $("<p>");
      let humi = $("<p>");
      let wind = $("<p>");
      let uvi = $("<p>");
      temp.text("Temperature: "+response.current.temp);
      humi.text("Humidity: "+response.current.humidity);
      wind.text("Wind speed: "+response.current.wind_speed);
      uvi.text("UV index: "+response.current.uvi);
      $("#current").append(temp,humi,wind,uvi);
      ///future
      let fEl = $("#future")
      fEl.empty();
      for(i =1;i<6;i++){
        let colEl = $("<div>");
        colEl.addClass("col col-2 mr-3");
        let day = response.daily[i]
        let tempF = $("<p>");
        let humiF = $("<p>");
        let iconF = $("<img>");
        iconF.attr("src","http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png" );
        tempF.text("Temp: "+day.temp.day);
        humiF.text("Humidity: "+day.humidity)
        colEl.append(iconF, tempF, humiF);
        fEl.append(colEl);


      }
    });
  }
     
  ).fail(function(response){console.log(response)});
}
  

$('#search').on("click",function(){
  console.log('button search clicked');
  let city = $("#city").val().trim();
  get_weather(city);

  //add button to get weather
});
  /*
  ```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

Click on search
Trying to call city api (if not return not such city)
parse langitude and lattitude
call api for 6 days
make button 

  */