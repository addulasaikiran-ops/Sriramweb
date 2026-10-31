export const SHOW_RATES = false; // TODO(owner): enable only after all fares are confirmed.

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
    seats: "Seating to be confirmed",
    ratePerKm: 0,
    features: [],
    use: "Local & outstation",
    image: "https://cdn-s3.autocarindia.com/legacy/cdni/Galleries/20160920123111_DSP_9248.jpg?q=85&w=1200",
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
    image: "https://stimg.cardekho.com/images/car-images/930x620/Toyota/Innova-Crysta/9612/1780562886859/Platinum-White-Pearl_898c89.jpg?impolicy=resize&imwidth=1200",
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
    image: "https://forceurbania.co.in/wp-content/uploads/2022/12/STYLING-2.jpg",
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
    image: "https://buscdn.cardekho.com/in/force/traveller-3700/force-traveller-3700.jpg",
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
    image: "https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20220415113510_Ertiga_FL.jpg?q=85&w=1200",
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
    image: "https://www.trucksbuses.com/uploads/43492_7d10764c11ff4ec2b1465a5e2243bc743700a.jpg",
  },
];

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "Towing & recovery enquiries", copy: "Contact us to discuss recovery needs. Availability and coverage must be confirmed." },
];
