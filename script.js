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
        document.getElementById('current-co2').innerText = latestData['CO2 ppm'] || 'N/A';
        document.getElementById('current-temperature').innerText = latestData['Temperature Â°C'] || 'N/A';
        document.getElementById('current-humidity').innerText = latestData['RH %'] || 'N/A';
    }
});
