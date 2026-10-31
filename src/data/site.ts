export const SHOW_RATES = false; // Keep false until actual rates are filled in and verified.

export const pricing = {
  perKm: "[RATE_PER_KM_BY_VEHICLE]",
  minimumDailyKm: "[MINIMUM_DAILY_KM]",
  driverBata: "[DRIVER_BATA]",
  nightHalt: "[NIGHT_HALT_CHARGE]",
  tollPolicy: "[TOLL_POLICY]",
  routes: [
    { name: "Tirupati", fare: "[GOOTY_TO_TIRUPATI_SAMPLE_FARE]" },
    { name: "Bengaluru", fare: "[GOOTY_TO_BENGALURU_SAMPLE_FARE]" },
    { name: "Hyderabad", fare: "[GOOTY_TO_HYDERABAD_SAMPLE_FARE]" },
    { name: "Mantralayam", fare: "[GOOTY_TO_MANTRALAYAM_SAMPLE_FARE]" },
    { name: "Srisailam", fare: "[GOOTY_TO_SRISAILAM_SAMPLE_FARE]" },
    { name: "Puttaparthi", fare: "[GOOTY_TO_PUTTAPARTHI_SAMPLE_FARE]" },
  ],
};

export const site = {
  name: "Sriram Travels",
  descriptor: "Travels & Towing Services",
  location: "Gooty, Andhra Pradesh",
  // Verify and complete the editable business details below before publishing.
  phoneDisplay: "+91 99493 79737",
  phone: "919949379737",
  whatsapp: "919949379737",
  // Replace these clearly marked values with verified business details before publishing.
  operatingHours: "[OPERATING_HOURS]",
  towingCoverage: "[TOWING_COVERAGE]",
  towingResponseTime: "[TOWING_RESPONSE_TIME]",
  address: "[FULL_BUSINESS_ADDRESS]",
  email: "[BUSINESS_EMAIL]",
  googleMapsEmbedUrl: "[GOOGLE_MAPS_EMBED_URL]",
  yearsInBusiness: "[YEARS_IN_BUSINESS]",
  trust: { verifiedDrivers: "[VERIFY_DRIVER_STATUS]", insurance: "[VERIFY_INSURANCE_DETAILS]", touristPermit: "[VERIFY_TOURIST_PERMIT_DETAILS]", gps: "[VERIFY_GPS_AVAILABILITY]" },
};

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "Towing & recovery enquiries", copy: "Contact us to discuss recovery needs. Availability and coverage must be confirmed." },
];
