document.addEventListener('DOMContentLoaded', function () {
    const co2Slider = document.getElementById('co2');
    const temperatureSlider = document.getElementById('temperature');
    const humiditySlider = document.getElementById('humidity');

    const co2Value = document.getElementById('co2-value');
    const temperatureValue = document.getElementById('temperature-value');
    const humidityValue = document.getElementById('humidity-value');

    const currentCo2 = document.getElementById('current-co2');
    const currentTemperature = document.getElementById('current-temperature');
    const currentHumidity = document.getElementById('current-humidity');

    const statusText = document.getElementById('status-text');

    // Fetch data from CSV
    fetch('data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log("CSV data fetched successfully.");
            const csvData = parseCSV(text);
            console.log("Parsed CSV data:", csvData);
            const recentData = getMostRecentData(csvData);
            console.log("Most recent data:", recentData);

            if (recentData) {
                const co2 = parseFloat(recentData["CO2 ppm"]);
                const temperature = parseFloat(recentData["Temperature Ā°C"]);
                const humidity = parseFloat(recentData["RH %"]);

                co2Slider.value = co2;
                temperatureSlider.value = temperature;
                humiditySlider.value = humidity;

                co2Value.textContent = co2;
                temperatureValue.textContent = temperature;
                humidityValue.textContent = humidity;

                currentCo2.textContent = co2;
                currentTemperature.textContent = temperature;
                currentHumidity.textContent = humidity;

                updateStatusText(co2, temperature, humidity);
            } else {
                console.error("No valid data found in the CSV.");
            }
        })
        .catch(error => console.error('Error fetching CSV data:', error));

    function parseCSV(text) {
        console.log("Raw CSV text:", text);
        const rows = text.trim().split('\n').map(row => row.split('\t'));
        const headers = rows.shift();
        console.log("CSV Headers:", headers);
        return rows.map(row => Object.fromEntries(row.map((val, i) => [headers[i].trim(), val.trim()])));
    }

    function getMostRecentData(data) {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i]["Temperature Ā°C"] && data[i]["RH %"] && data[i]["CO2 ppm"] !== "N/A") {
                return data[i];
            }
        }
        return null;
    }

    function updateStatusText(co2, temperature, humidity) {
        let statusMessages = [];

        if (co2 > 1000) {
            statusMessages.push('Jūsų darbo mikroklimatas turi per didelį co2 kiekį');
        }
        if (temperature > 24) {
            statusMessages.push('Jūsų darbo mikroklimatas yra per šiltas');
        }
        if (temperature < 20) {
            statusMessages.push('Jūsų darbo mikroklimatas per vėsus');
        }
        if (humidity > 60) {
            statusMessages.push('Jūsų darbo mikroklimatas per drėgnas');
        }
        if (humidity < 40) {
            statusMessages.push('Jūsų darbo mikroklimatas per sausas');
        }
        if (statusMessages.length === 0) {
            statusMessages.push('Jūsų darbo mikroklimatas yra optimalus');
        }

        statusText.textContent = statusMessages.join(' ir ');
    }
});
