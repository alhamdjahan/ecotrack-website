document.getElementById('footprint-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // --- INDIA-SPECIFIC EMISSION FACTORS (in tonnes of CO2e) ---
    // Source: Varies, includes CEA, IEA, academic research for regional data.
    const EF_ELECTRICITY_INDIA = 0.00082; // tonnes CO2e per kWh for India's grid mix.
    const EF_CAR_PETROL = 0.0022; // tonnes CO2e per litre. Avg mileage ~15 km/l -> 0.000147 t/km
    const EF_FLIGHT_DOMESTIC = 0.00015; // tonnes CO2e per passenger-km. Avg speed ~800 km/h
    
    // Annual dietary footprints (tonnes CO2e per person per year) - Simplified estimates
    const EF_DIET = {
        veg: 1.5,
        'non-veg-low': 2.0,
        'non-veg-high': 3.0
    };

    // --- GET USER INPUTS ---
    const electricityKWh = parseFloat(document.getElementById('electricity').value);
    const carKms = parseFloat(document.getElementById('car-kms').value);
    const flightHours = parseFloat(document.getElementById('flight-hours').value);
    const dietType = document.getElementById('diet').value;

    // --- CALCULATE ANNUAL FOOTPRINTS ---

    // 1. Electricity Footprint
    const electricityFootprint = electricityKWh * 12 * EF_ELECTRICITY_INDIA;

    // 2. Transport Footprint
    const carFootprint = carKms * 52 * (EF_CAR_PETROL / 15); // Dividing by avg mileage (15 km/l)
    const flightFootprint = flightHours * 800 * EF_FLIGHT_DOMESTIC; // hours * speed * factor
    const totalTransportFootprint = carFootprint + flightFootprint;
    
    // 3. Diet Footprint (this is already an annual value)
    const dietFootprint = EF_DIET[dietType];

    // --- TOTAL FOOTPRINT ---
    const totalFootprint = electricityFootprint + totalTransportFootprint + dietFootprint;
    
    // --- DISPLAY RESULTS ---
    const resultContainer = document.getElementById('result-container');
    const totalFootprintElement = document.getElementById('total-footprint');

    totalFootprintElement.textContent = totalFootprint.toFixed(2);
    resultContainer.classList.remove('hidden');

    // Scroll to the result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});