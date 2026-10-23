export const site = {
  name: "Sriram Travels",
  descriptor: "Travels & Towing Services",
  location: "Gooty, Andhra Pradesh",
  // Confirm these details before publishing.
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

export const fleet: Vehicle[] = [
  {
    number: "01",
    name: "Toyota Etios",
    className: "SEDAN",
    description: "A practical choice for comfortable everyday and outstation journeys.",
    seats: "4+ seats",
    ratePerKm: 14,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Local & outstation",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    name: "Toyota Innova",
    className: "FAMILY MPV",
    description: "Extra room for family travel and longer road journeys.",
    seats: "7+ seats",
    ratePerKm: 20,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Family & outstation",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    name: "Force Urbania",
    className: "PREMIUM GROUP TRAVEL",
    description: "A spacious group-travel option for shared journeys.",
    seats: "10+ seats",
    ratePerKm: 41,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Group journeys",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    name: "Force Traveller",
    className: "12+ SEATER",
    description: "Practical space for larger families and group outings.",
    seats: "12+ seats",
    ratePerKm: 25,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Tours & group trips",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    name: "Maruti Suzuki Ertiga",
    className: "FAMILY MUV",
    description: "A versatile option for family plans and everyday travel.",
    seats: "Confirm seating",
    ratePerKm: 18,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Family & local",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "06",
    name: "Force Traveller",
    className: "17+ SEATER",
    description: "More space for larger groups travelling together.",
    seats: "17+ seats",
    ratePerKm: 30,
    features: ["Air conditioning", "Insurance", "Leather interior"],
    use: "Tours & group trips",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=85",
  },
];

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "24/7 towing support", copy: "When a vehicle cannot continue, contact our team for recovery assistance." },
];
