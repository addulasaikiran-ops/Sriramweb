export type Vehicle = {
  number: string;
  name: string;
  className: string;
  description: string;
  seats: string;
  ac: string;
  luggage: string;
  driverIncluded: boolean;
  ratePerKm: number | null;
  features: string[];
  use: string;
  image: string;
};

// Replace every bracketed value with verified details before publishing.
export const fleet: Vehicle[] = [
  { number: "01", name: "Toyota Etios", className: "SEDAN", description: "A practical choice for comfortable everyday and outstation journeys.", seats: "[ETIOS_SEAT_COUNT]", ac: "[ETIOS_AC_STATUS]", luggage: "[ETIOS_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Local & outstation", image: "/fleet/etios.svg" },
  { number: "02", name: "Toyota Innova", className: "FAMILY MPV", description: "Extra room for family travel and longer road journeys.", seats: "[INNOVA_SEAT_COUNT]", ac: "[INNOVA_AC_STATUS]", luggage: "[INNOVA_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Family & outstation", image: "/fleet/innova.svg" },
  { number: "03", name: "Force Urbania", className: "GROUP TRAVEL", description: "A spacious group-travel option for shared journeys.", seats: "[URBANIA_SEAT_COUNT]", ac: "[URBANIA_AC_STATUS]", luggage: "[URBANIA_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Group journeys", image: "/fleet/urbania.svg" },
  { number: "04", name: "Force Traveller — 12-seat", className: "GROUP TRAVEL · 12 SEATS", description: "A group-travel configuration for smaller groups.", seats: "12 seats — verify vehicle configuration", ac: "[TRAVELLER_12_AC_STATUS]", luggage: "[TRAVELLER_12_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Tours & group trips", image: "/fleet/traveller-12.svg" },
  { number: "05", name: "Maruti Suzuki Ertiga", className: "FAMILY MUV", description: "A versatile option for family plans and everyday travel.", seats: "[ERTIGA_SEAT_COUNT]", ac: "[ERTIGA_AC_STATUS]", luggage: "[ERTIGA_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Family & local", image: "/fleet/ertiga.svg" },
  { number: "06", name: "Force Traveller — 17-seat", className: "LARGE GROUP TRAVEL · 17 SEATS", description: "A higher-capacity group-travel configuration.", seats: "17 seats — verify vehicle configuration", ac: "[TRAVELLER_17_AC_STATUS]", luggage: "[TRAVELLER_17_LUGGAGE_CAPACITY]", driverIncluded: true, ratePerKm: null, features: [], use: "Tours & group trips", image: "/fleet/traveller-17.svg" },
];
