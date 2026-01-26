// home.js - fetch weather and display random member spotlights

// ---- Weather ----
const currentTempEl = document.querySelector('#current-temp');
const weatherIconEl = document.querySelector('#weather-icon');
const weatherDescEl = document.querySelector('#weather-desc');
const forecastEl = document.querySelector('#forecast');

// OpenWeatherMap API configuration
const lat = -17.8292; // Harare/Mabvuku
const lon = 31.0522;
const apiKey = 'edfee396c6b58d27c8618d4427eefab7';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        // Fetch current weather and 5-day forecast
        const currentResp = await fetch(currentWeatherUrl);
        const forecastResp = await fetch(forecastWeatherUrl);

        if (!currentResp.ok || !forecastResp.ok) {
            throw new Error(`Weather API error: ${currentResp.status} / ${forecastResp.status}`);
        }

        const currentData = await currentResp.json();
        const forecastData = await forecastResp.json();

        displayWeather(currentData, forecastData);
    } catch (err) {
        console.error('Weather fetch error:', err);
        weatherDescEl.textContent = 'Weather data unavailable';
    }
}

function displayWeather(currentData, forecastData) {
    if (!currentData || !currentData.main) return;

    // Display current weather
    const temp = Math.round(currentData.main.temp);
    const icon = currentData.weather[0].icon;
    const desc = currentData.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentTempEl.textContent = `${temp}°C`;
    weatherIconEl.setAttribute('src', iconSrc);
    weatherIconEl.setAttribute('alt', desc);
    weatherDescEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    // Display 3-day forecast
    if (!forecastData || !forecastData.list) return;

    forecastEl.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Group forecasts by day (one per day at noon)
    const dailyForecasts = {};
    forecastData.list.forEach(f => {
        const forecastDate = new Date(f.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0);
        const dayKey = forecastDate.toDateString();

        // Skip today, keep closest to noon for each day
        if (forecastDate > today) {
            if (!dailyForecasts[dayKey] || Math.abs(f.dt * 1000 - 12 * 60 * 60 * 1000) < Math.abs(dailyForecasts[dayKey].dt * 1000 - 12 * 60 * 60 * 1000)) {
                dailyForecasts[dayKey] = f;
            }
        }
    });

    // Get first 3 days
    const days = Object.values(dailyForecasts).slice(0, 3);
    days.forEach(d => {
        const day = new Date(d.dt * 1000);
        const dayName = day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const temp = Math.round(d.main.temp);
        const icon = d.weather[0].icon;
        const desc = d.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
      <strong>${dayName}</strong>
      <img src="${iconSrc}" alt="${desc}" width="40" height="40" decoding="async">
      <div>${temp}°C</div>
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

    // Filter for gold (level 3) and silver (level 2) members
    const eligible = members.filter(m => m.level >= 2);
    if (eligible.length === 0) {
        spotlightsEl.innerHTML = '<p class="error">No premium members available</p>';
        return;
    }

    // Randomly select 2-3 members
    const picks = shuffle(eligible).slice(0, Math.min(3, eligible.length));
    spotlightsEl.innerHTML = '';

    picks.forEach(m => {
        const levelText = m.level === 3 ? 'Gold Member' : m.level === 2 ? 'Silver Member' : 'Member';
        const card = document.createElement('div');
        card.className = 'card spotlight';
        card.innerHTML = `
      <h4>${m.name}</h4>
      <p>${m.address}</p>
      <p><a href="tel:${m.phone}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
      <p class="level">${levelText}</p>
    `;
        spotlightsEl.appendChild(card);
    });
}

fetchSpotlights();

// Set year and last modified for footer
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }
    if (document.getElementById('lastModified')) {
        document.getElementById('lastModified').textContent =
            new Date(document.lastModified).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
    }
});
