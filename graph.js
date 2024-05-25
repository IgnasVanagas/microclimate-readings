document.addEventListener('DOMContentLoaded', function () {
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
            const recentData = getRecentData(csvData, 72);
            console.log("Recent data (last 72 hours):", recentData);

            const labels = recentData.map(row => moment(row["Date and time"], 'DD/MM/YYYY HH:mm:ss').toDate());
            const temperatures = recentData.map(row => parseFloat(row["Temperature Ā°C"]));
            const humidities = recentData.map(row => parseFloat(row["RH %"]));
            const co2Levels = recentData.map(row => parseFloat(row["CO2 ppm"]));

            console.log("Labels:", labels);
            console.log("Temperatures:", temperatures);
            console.log("Humidities:", humidities);
            console.log("CO2 Levels:", co2Levels);

            createChart('temperatureChart', 'Temperature (°C)', labels, temperatures, 'red');
            createChart('humidityChart', 'Humidity (%)', labels, humidities, 'blue');
            createChart('co2Chart', 'CO2 (ppm)', labels, co2Levels, 'green');
        })
        .catch(error => console.error('Error fetching CSV data:', error));

    function parseCSV(text) {
        console.log("Raw CSV text:", text);
        const rows = text.trim().split('\n').map(row => row.split('\t'));
        const headers = rows.shift();
        console.log("CSV Headers:", headers);
        return rows.map(row => Object.fromEntries(row.map((val, i) => [headers[i].trim(), val.trim()])));
    }

    function getRecentData(data, hours) {
        const latestDate = new Date(Math.max(...data.map(row => moment(row["Date and time"], 'DD/MM/YYYY HH:mm:ss').toDate())));
        const cutoff = new Date(latestDate - hours * 60 * 60 * 1000);
        console.log("Latest date:", latestDate);
        console.log("Cutoff date and time:", cutoff);

        return data.filter(row => {
            const date = moment(row["Date and time"], 'DD/MM/YYYY HH:mm:ss').toDate();
            return date >= cutoff;
        });
    }

    function createChart(canvasId, label, labels, data, borderColor) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: borderColor,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            tooltipFormat: 'DD/MM/YYYY HH:mm',
                            displayFormats: {
                                hour: 'DD/MM/YYYY HH:mm'
                            }
                        }
                    }
                }
            }
        });
    }
});
