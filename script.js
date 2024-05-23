document.addEventListener('DOMContentLoaded', function () {
    const co2Slider = document.getElementById('co2');
    const temperatureSlider = document.getElementById('temperature');
    const humiditySlider = document.getElementById('humidity');

    const co2Value = document.getElementById('co2-value');
    const temperatureValue = document.getElementById('temperature-value');
    const humidityValue = document.getElementById('humidity-value');

    co2Value.textContent = co2Slider.value;
    temperatureValue.textContent = temperatureSlider.value;
    humidityValue.textContent = humiditySlider.value;

    // If you want to make sliders interactive, uncomment the following code
    // co2Slider.addEventListener('input', function () {
    //     co2Value.textContent = co2Slider.value;
    // });

    // temperatureSlider.addEventListener('input', function () {
    //     temperatureValue.textContent = temperatureSlider.value;
    // });

    // humiditySlider.addEventListener('input', function () {
    //     humidityValue.textContent = humiditySlider.value;
    // });
});
