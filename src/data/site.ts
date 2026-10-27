export const SHOW_RATES = false; // TODO(owner): enable only after all fares are confirmed.

export const site = {
  name: "Sriram Travels",
  descriptor: "Travels & Towing Services",
  location: "Gooty, Andhra Pradesh",
  // TODO(owner): confirm business details before publishing.
  phoneDisplay: "+91 99493 79737",
  phone: "919949379737",
  whatsapp: "919949379737",
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

// Editorial reference photography is used until owner-supplied fleet photos are available.\nexport const fleet: Vehicle[] = [
  {
    number: "01",
    name: "Toyota Etios",
    className: "SEDAN",
    description: "A practical choice for comfortable everyday and outstation journeys.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Local & outstation",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "02",
    name: "Toyota Innova",
    className: "FAMILY MPV",
    description: "Extra room for family travel and longer road journeys.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Family & outstation",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "03",
    name: "Force Urbania",
    className: "GROUP TRAVEL",
    description: "A spacious group-travel option for shared journeys.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Group journeys",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "04",
    name: "Force Traveller",
    className: "GROUP TRAVEL",
    description: "Practical space for larger families and group outings.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Tours & group trips",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "05",
    name: "Maruti Suzuki Ertiga",
    className: "FAMILY MUV",
    description: "A versatile option for family plans and everyday travel.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Family & local",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=88",
  },
  {
    number: "06",
    name: "Force Traveller",
    className: "LARGE GROUP TRAVEL",
    description: "More space for larger groups travelling together.",
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Tours & group trips",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=88",
  },
];

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "Towing & recovery enquiries", copy: "Contact us to discuss recovery needs. Availability and coverage must be confirmed." },
];
