export const SHOW_RATES = false; // TODO(owner): enable only after all fares are confirmed.

export const site = {
  name: "Sriram Travels",
  descriptor: "Travels & Towing Services",
  location: "Gooty, Andhra Pradesh",
  // TODO(owner): confirm business details before publishing.
  phoneDisplay: "+91 99493 79737",
  phone: "919949379737",
  whatsapp: "919949379737",
  // Replace these clearly marked values with verified business details before publishing.
  operatingHours: "[OPERATING_HOURS]",
  towingCoverage: "[TOWING_COVERAGE]",
  towingResponseTime: "[TOWING_RESPONSE_TIME]",
};

export type Vehicle = {
  number: string;
  name: string;
  className: string;
  description: string;
  seats: string;
  ratePerKm: number;
  features: string[];
  use: string;
  image: string;
};

// Model-specific external reference photos for layout preview. Replace with owner-supplied fleet photos before relying on exact vehicle condition/variant.
export const fleet: Vehicle[] = [
  {
    number: "01",
    name: "Toyota Etios",
    className: "SEDAN",
    description: "A practical choice for comfortable everyday and outstation journeys.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Local & outstation",
    image: "/fleet/etios-placeholder.svg",
  },
  {
    number: "02",
    name: "Toyota Innova",
    className: "FAMILY MPV",
    description: "Extra room for family travel and longer road journeys.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Family & outstation",
    image: "/fleet/innova-placeholder.svg",
  },
  {
    number: "03",
    name: "Force Urbania",
    className: "GROUP TRAVEL",
    description: "A spacious group-travel option for shared journeys.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Group journeys",
    image: "/fleet/urbania-placeholder.svg",
  },
  {
    number: "04",
    name: "Force Traveller",
    className: "GROUP TRAVEL",
    description: "Practical space for larger families and group outings.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Tours & group trips",
    image: "/fleet/traveller-12-seat-placeholder.svg",
  },
  {
    number: "05",
    name: "Maruti Suzuki Ertiga",
    className: "FAMILY MUV",
    description: "A versatile option for family plans and everyday travel.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Family & local",
    image: "/fleet/ertiga-placeholder.svg",
  },
  {
    number: "06",
    name: "Force Traveller",
    className: "LARGE GROUP TRAVEL",
    description: "More space for larger groups travelling together.",
    seats: "Seating details available on enquiry",
    ratePerKm: 0,
    features: [],
    use: "Tours & group trips",
    image: "/fleet/traveller-large-placeholder.svg",
  },
];

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "Towing & recovery enquiries", copy: "Message us with your location to ask about recovery availability and coverage." },
];
