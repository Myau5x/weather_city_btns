let curEl = $("#current");
let futureEl = $("#future")

let APIKey = '5a50fdd6105c320cc22546ab9a405fcf';
////later I save it in local storage
last_city  = "";
cities = []
function render_cities(){
  let place = $("#cities-place");
  place.empty();
  for (i =0; i< cities.length; i++){
    let row = $("<div>");
    row.addClass("row py-3 px-4 border cities");
    row.attr("data-city", cities[i]);
    row.text(cities[i].toUpperCase());
    place.append(row);   
  }
}

function get_weather(city){
  query_city = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+APIKey;
  $.ajax({
    url: query_city,
    method: "GET"
  }).done(function(response) {
      
    console.log(response);
    let dt = new Date(response.dt*1000);
    //let x = dt.toDateString();
    //console.log(x);
    $("#city-name").text(response.name+" ("+dt.toLocaleDateString()+")");
    let icon = $("<img>");
    icon.attr("src","http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png" );
    $("#city-name").append(icon);
    let lat = response.coord.lat;
    let lon = response.coord.lon;
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
        colEl.addClass("col col-2 mr-4 ml-1");
        let day = response.daily[i]
        let tempF = $("<p>");
        let humiF = $("<p>");
        let iconF = $("<img>");
        let dtF = $("<h5>");
        let fdt = new Date(day.dt*1000);
        dtF.text(fdt.toLocaleDateString());
        iconF.attr("src","http://openweathermap.org/img/wn/"+day.weather[0].icon+".png" ); ///@2x.png twice more
        tempF.text("Temp: "+day.temp.day);
        humiF.text("Humidity: "+day.humidity)
        colEl.append(dtF,iconF, tempF, humiF);
        fEl.append(colEl);


      }
    });
  }
     
  ).fail(function(response){console.log(response)});
}

function cityWeather(){
  var city_name = $(this).attr("data-city");
  get_weather(city_name);
}

$('#search').on("click",function(){
  console.log('button search clicked');
  let city = $("#city").val().trim().toLowerCase();
  get_weather(city);
  if (!cities.includes(city)){
    console.log(cities);
    cities.push(city);
  }
  render_cities();
  //add button to get weather
});

$(document).on("click", ".cities", cityWeather);
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