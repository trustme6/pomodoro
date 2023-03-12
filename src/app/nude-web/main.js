const rowRender = (title, value) => {
  return `<tr>
                <td>${title}</td>
                <td>${value}</td>
                </tr>
`;
};

const setLoading = (elementId) => {
  document.getElementById(elementId).innerHTML = 'LOLding...';
};

const getWeather = (url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();
  xhr.responseType = 'json';
  xhr.onload = () => {
    const isSucceed = xhr.readyState == 4 && xhr.status == 200;
    if (isSucceed) {
      onSuccess(xhr);
    } else {
      console.log(`Error: ${xhr.status}`);

      if (onError) {
        onError(xhr);
      }
    }
  };
};

const getTodayWeather = () => {
  setLoading(`weather-today`);
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';
  const onSuccess = (xhr) => {
    const { current_weather } = xhr.response;
    const table = `<table width="100%" border="1">
   ${rowRender('Index', 'Values')}
   ${rowRender('temperature', current_weather.temperature)}
   ${rowRender('windspeed', current_weather.windspeed)}
   ${rowRender('winddirection', current_weather.winddirection)}
   ${rowRender('winddirection', current_weather.winddirection)}
    ${rowRender('weathercode', current_weather.weathercode)}
    ${rowRender('time', current_weather.time)}      
           
          </table>`;

    document.getElementById('weather-today').innerHTML = table;
  };
  getWeather(url, onSuccess);
};

getTodayWeather();

const getTomorrowWeather = () => {
  setLoading(`weather-tomorrow`);

  getWeather(
    'https://api.open-meteo.com/v1/forecast?latitude=41.64&longitude=41.63&hourly=temperature_2m&start_date=2023-02-16&end_date=2023-02-16',
    (xhr) => {
      const { hourly } = xhr.response;
      const { temperature_2m, time } = hourly;
      console.log(hourly);

      const rows = temperature_2m.map((currentItem, currentIndex) => {
        return rowRender(currentItem, time[currentIndex]);
      });

      const table = `<table width="100%" border="1">
         ${rowRender('Temperature', 'Time')}
         ${rows.join(' ')}
       </table>`;

      document.getElementById('weather-tomorrow').innerHTML = table;
    },

  );
};
getTomorrowWeather();

const getSevenWeather = () => {
  setLoading(`weather-seven`);

  getWeather(
    'https://api.open-meteo.com/v1/forecast?latitude=41.64&longitude=41.63&hourly=temperature_2m&start_date=2023-02-15&end_date=2023-02-22',
    (xhr) => {
      const { hourly } = xhr.response;
      const { temperature_2m, time } = hourly;
      console.log(hourly);
      //повторяющийся кусок
      const rows = temperature_2m.map((currentItem, currentIndex) => {
        return rowRender(currentItem, time[currentIndex]);
      });

      const table = `<table width="100%" border="1">
        ${rowRender('Temperature', 'Time')}
        ${rows.join(' ')}
      </table>`;

      document.getElementById('weather-seven').innerHTML = table;
    }
  );
};

getSevenWeather();
