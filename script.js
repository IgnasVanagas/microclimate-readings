document.addEventListener('DOMContentLoaded', function () {
    const co2Slider = document.getElementById('co2');
    const temperatureSlider = document.getElementById('temperature');
    const humiditySlider = document.getElementById('humidity');

    const co2Value = document.getElementById('co2-value');
    const temperatureValue = document.getElementById('temperature-value');
    const humidityValue = document.getElementById('humidity-value');

    const statusText = document.querySelector('p');

    function updateStatusText() {
        const co2 = co2Slider.value;
        const temperature = temperatureSlider.value;
        const humidity = humiditySlider.value;
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

    updateStatusText();

    co2Slider.addEventListener('input', function () {
        co2Value.textContent = co2Slider.value;
        updateStatusText();
    });

    temperatureSlider.addEventListener('input', function () {
        temperatureValue.textContent = temperatureSlider.value;
        updateStatusText();
    });

    humiditySlider.addEventListener('input', function () {
        humidityValue.textContent = humiditySlider.value;
        updateStatusText();
    });
});
