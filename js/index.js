
async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a75f13ee2583478ab09174215252406&q=${a}&days=3`); //with my personal api key
    if (t.ok && 400 != t.status) {
        let a = await t.json();
        displayCurrent(a.location, a.current),
            displayAnother(a.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", a => {
    search(a.target.value)
})

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [" January", " February", " March", " April", " May", " June", " July", " August", " September", " October", " November", " December"];

function displayCurrent(a, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let n = `<div class="today forecast text-white">\n    
        <div class="forecast-header d-flex justify-content-between"  id="today">\n    
          <div class="day">${days[e.getDay()]}</div>\n    
          <div class="date">${e.getDate() + monthNames[e.getMonth()]}</div>\n    
        </div> \x3c!-- .forecast-header --\x3e\n    
        <div class="forecast-content text-center" id="current">\n 
        <div class="location">${a.name}</div>\n    
        <div class="degree">\n        
        <div class="num">${t.temp_c}<sup>o</sup>C</div>\n      \n        
        <div class="forecast-icon">\n            <img src="https:${t.condition.icon}" alt="" width=90>\n        
        </div>\t\n    \n    </div>\n    <div class="custom">${t.condition.text}</div>\n    
        <span><img src="imgs/icon-umberella@2x.png" alt="umberella">20%</span> <span><img src="imgs/icon-wind@2x.png" alt="wind">18km/h</span> <span><img src="imgs/icon-compass@2x.png" alt="compass">East</span>\n    
        </div>\n</div>`;
        document.getElementById("forecast").innerHTML = n
    }
}

function displayAnother(a) {
    let box = "";
    for (let e = 1; e < a.length; e++)
        box += `\t<div class="forecast text-white text-center">\n        
    <div class="forecast-header ">\n            
    <div class="day text-white">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>\n        
    </div> \x3c!-- .forecast-header --\x3e\n        
    <div class="forecast-content py-3">\n            
    <div class="forecast-icon">\n                
    <img src="https:${a[e].day.condition.icon}" alt="" width=48>\n            
    </div>\n            
    <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>\n            
    <small>${a[e].day.mintemp_c}<sup>o</sup></small>\n            
    <div class="custom">${a[e].day.condition.text}</div>\n        
    </div>\n        </div>`;
    document.getElementById("forecast").innerHTML += box
}

search("Giza");