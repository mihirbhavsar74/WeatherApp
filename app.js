const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

})

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "8e9d60a957ea293395a7dd9b3e14ee62";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +  
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp =Math.round(weatherData.main.temp);
      const humidity=weatherData.main.humidity;
      const wind=weatherData.wind.speed;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const weatherIcon=weatherData.weather[0].main;
      
     
      //   console.log(temp);
      //   console.log(weatherDesc);
     res.write(`<!DOCTYPE html>
     <html lang="en">
     
       <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Weather App</title>
         <link rel="stylesheet" href="styles.css">
       </head>
     
       <body>
     
         <div class="card">
           <div class="search">
             <form action="/" method="post">
             <input type="text" placeholder="Enter city name" name="cityName" spellcheck="false">
             <button type="submit"><img src="images/search.png"></button>
             </form>
           </div>
           <div class="weather">
           `);

           res.write("<img src='images/"+weatherIcon+".png' class='weather-icon'>");
            res.write(`
             <h1 class="temp">${temp}°c</h1>
             <h2 class="city">${query}</h2>
             <div class="details">
               <div class="col">
                 <img src="images/humidity.png" alt="">
                 <div>
                   <p class="humidity">${humidity}%</p>
                   <p>Humidity</p>
                 </div>
               </div>
                 <div class="col">
                   <img src="images/wind.png" alt="">
                   <div>
                     <p class="wind">${wind} km/h</p>
                     <p>Wind Speed</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
     
       </body>
     
     </html>`);
    
     res.send();
    });
  });
});


app.listen(3000,function(){
  console.log("Server listening at port 3000");
})