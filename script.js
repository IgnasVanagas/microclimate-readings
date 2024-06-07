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
        const co2 = parseFloat(latestData['CO2 ppm']) || 'N/A';
        const temperature = parseFloat(latestData['Temperature Â°C']) || 'N/A';
        const humidity = parseFloat(latestData['RH %']) || 'N/A';
        
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

        // Calculate and update score
        const score = calculateScore(co2, temperature, humidity);
        gauge.refresh(score);
    }

    function calculateScore(co2, temperature, humidity) {
        let score = 0;
        let co2score = 0;
        let tempscore=0;
        // CO2 scoring
        if ( co2 <= 750) {
            score += 40; // Perfect score for CO2
        } else if(co2>750){
            co2score+= 40-((co2-750)/10)
            if(co2score<0)
                {
                    score+=0;
                }
                else{
                    score +=co2score
                }
        }

        // Temperature scoring
        if (temperature >= 22 && temperature <= 24) {
            score += 35; // Perfect score for temperature
        } else if (temperature < 22 ) {
            tempscore += 35-((22-temperature)*5);
            if (tempscore<0)
                {
                    score+=0;
                }
                else{
                    score+=tempscore;
                }
        } else {
            tempscore += 35-((temperature-24)*5);
            if (tempscore<0)
                {
                    score+=0;
                }
                else{
                    score+=tempscore;
                }
        }

        // Humidity scoring
        if (humidity >= 40 && humidity <= 60) {
            score += 25; // Perfect score for humidity
        } else if (humidity>60) {
            score += 25-((humidity-60)/40)*25; // Moderate score for humidity
        } else {
            score += (humidity/40)*25; // Low score for humidity
        }

        return score;
    }

    // Speedometer Initialization
    const gauge = new JustGage({
        id: 'speedometer',
        value: 50,
        min: 0,
        max: 100,
        title: 'Speedometer',
        label: 'Score',
        gaugeWidthScale: 0.6,
        counter: true,
        customSectors: {
            percents: true, // custom sectors are in percentage
            ranges: [
                { color: "#ff0000", lo: 0, hi: 10 },
                { color: "#ff4000", lo: 11, hi: 20 },
                { color: "#ff8000", lo: 21, hi: 30 },
                { color: "#ffbf00", lo: 31, hi: 40 },
                { color: "#ffff00", lo: 41, hi: 50 },
                { color: "#ffff33", lo: 51, hi: 60 },
                { color: "#ffff66", lo: 61, hi: 70 },
                { color: "#ffff99", lo: 71, hi: 80 },
                { color: "#00ff00", lo: 81, hi: 90 },
                { color: "#00ff40", lo: 91, hi: 100 }
            ]
        }
    });
});
