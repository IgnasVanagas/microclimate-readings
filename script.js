document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                const csvData = parseCSV(text);
                updateCurrentValues(csvData);
                localStorage.setItem('csvData', text); // Store CSV data in localStorage
            };
            reader.readAsText(file, 'ISO-8859-1');
        }
    });

    function parseCSV(text) {
        const rows = text.trim().split('\n').map(row => row.split(';'));
        const headers = rows.shift();
        return rows.map(row => Object.fromEntries(row.map((val, i) => [headers[i].trim(), val.trim()])));
    }

    function updateCurrentValues(data) {
        const latestData = data[data.length - 1];
        const co2 = latestData['CO2 ppm'] || 'N/A';
        const temperature = latestData['Temperature Â°C'] || 'N/A';
        const humidity = latestData['RH %'] || 'N/A';
        
        // Update text values
        document.getElementById('current-co2').innerText = co2;
        document.getElementById('current-temperature').innerText = temperature;
        document.getElementById('current-humidity').innerText = humidity;
        
        // Update input range values
        document.getElementById('co2').value = co2;
        document.getElementById('temperature').value = temperature;
        document.getElementById('humidity').value = humidity;
        
        // Update value labels
        document.getElementById('co2-value').innerText = co2;
        document.getElementById('temperature-value').innerText = temperature;
        document.getElementById('humidity-value').innerText = humidity;
    }
});