// home.js - fetch weather and display random member spotlights

// ---- Weather ----
const currentTempEl = document.querySelector('#current-temp');
const weatherIconEl = document.querySelector('#weather-icon');
const weatherDescEl = document.querySelector('#weather-desc');
const forecastEl = document.querySelector('#forecast');

// Replace YOUR_API_KEY with your OpenWeatherMap API key
const lat = -17.8292; // Harare/Mabvuku
const lon = 31.0522;
const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=YOUR_API_KEY`;

async function fetchWeather() {
    try {
        const resp = await fetch(weatherUrl);
        if (!resp.ok) throw new Error('Weather fetch failed');
        const data = await resp.json();
        displayWeather(data);
    } catch (err) {
        console.error(err);
        weatherDescEl.textContent = 'Weather data unavailable';
    }
}

function displayWeather(data) {
    if (!data || !data.current) return;
    currentTempEl.textContent = `${data.current.temp.toFixed(1)} °C`;
    const icon = data.current.weather[0].icon;
    const desc = data.current.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIconEl.setAttribute('src', iconSrc);
    weatherIconEl.setAttribute('alt', desc);
    weatherDescEl.textContent = desc;

    // 3-day forecast (tomorrow -> next 3 days)
    forecastEl.innerHTML = '';
    const days = data.daily.slice(1, 4);
    days.forEach(d => {
        const day = new Date(d.dt * 1000);
        const dayName = day.toLocaleDateString(undefined, { weekday: 'short' });
        const temp = d.temp.day.toFixed(0);
        const icon = d.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
      <strong>${dayName}</strong>
      <img src="${iconSrc}" alt="${d.weather[0].description}" width="48" height="48">
      <div>${temp} °C</div>
    `;
        forecastEl.appendChild(card);
    });
}

fetchWeather();

// ---- Member Spotlights ----
const spotlightsEl = document.querySelector('#spotlights');

async function fetchSpotlights() {
    try {
        const resp = await fetch('data/members.json');
        if (!resp.ok) throw new Error('Members fetch failed');
        const members = await resp.json();
        displaySpotlights(members);
    } catch (err) {
        console.error(err);
        spotlightsEl.textContent = 'Unable to load spotlights.';
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function membershipLevelText(level) {
    if (level === 3) return 'Gold Member';
    if (level === 2) return 'Silver Member';
    return 'Member';
}

function displaySpotlights(members) {
    if (!Array.isArray(members)) return;
    const eligible = members.filter(m => m.level >= 2);
    if (eligible.length === 0) {
        spotlightsEl.textContent = 'No premium members available';
        return;
    }

    const picks = shuffle(eligible).slice(0, Math.min(3, eligible.length));
    spotlightsEl.innerHTML = '';

    picks.forEach(m => {
        const card = document.createElement('div');
        card.className = 'card spotlight';
        card.innerHTML = `
      <h4>${m.name}</h4>
      <p>${m.address}</p>
      <p><a href="tel:${m.phone}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
      <p class="level">${membershipLevelText(m.level)}</p>
    `;
        spotlightsEl.appendChild(card);
    });
}

fetchSpotlights();

// Small helper: set year and last modified used by footer script
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified || '';
