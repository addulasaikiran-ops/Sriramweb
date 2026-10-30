export type Vehicle = {
  number: string;
  name: string;
  className: string;
  description: string;
  seats: string;
  ac: string;
  luggageCapacity: string;
  driverIncluded: boolean;
  ratePerKm: number;
  use: string;
  image: string;
};

// Replace bracketed values with verified vehicle specifications before publishing.
// Keep the two Force Traveller entries distinct by filling in their individual seat counts.
export const fleet: Vehicle[] = [
  {
    number: "01",
    name: "Toyota Etios",
    className: "SEDAN",
    description: "A practical choice for everyday and outstation journeys.",
    seats: "[ETIOS_SEAT_COUNT]",
    ac: "[ETIOS_AC_STATUS]",
    luggageCapacity: "[ETIOS_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Local & outstation",
    image: "/fleet/etios-placeholder.svg",
  },
  {
    number: "02",
    name: "Toyota Innova",
    className: "FAMILY MPV",
    description: "Extra room for family travel and longer road journeys.",
    seats: "[INNOVA_SEAT_COUNT]",
    ac: "[INNOVA_AC_STATUS]",
    luggageCapacity: "[INNOVA_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Family & outstation",
    image: "/fleet/innova-placeholder.svg",
  },
  {
    number: "03",
    name: "Force Urbania",
    className: "GROUP TRAVEL",
    description: "A spacious group-travel option for shared journeys.",
    seats: "[URBANIA_SEAT_COUNT]",
    ac: "[URBANIA_AC_STATUS]",
    luggageCapacity: "[URBANIA_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Group journeys",
    image: "/fleet/urbania-placeholder.svg",
  },
  {
    number: "04",
    name: "Force Traveller ([TRAVELLER_1_SEAT_COUNT]-seater)",
    className: "GROUP TRAVEL",
    description: "Practical space for families and group outings.",
    seats: "[TRAVELLER_1_SEAT_COUNT]",
    ac: "[TRAVELLER_1_AC_STATUS]",
    luggageCapacity: "[TRAVELLER_1_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Tours & group trips",
    image: "/fleet/traveller-12-seat-placeholder.svg",
  },
  {
    number: "05",
    name: "Maruti Suzuki Ertiga",
    className: "FAMILY MUV",
    description: "A versatile option for family plans and everyday travel.",
    seats: "[ERTIGA_SEAT_COUNT]",
    ac: "[ERTIGA_AC_STATUS]",
    luggageCapacity: "[ERTIGA_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Family & local",
    image: "/fleet/ertiga-placeholder.svg",
  },
  {
    number: "06",
    name: "Force Traveller ([TRAVELLER_2_SEAT_COUNT]-seater)",
    className: "LARGE GROUP TRAVEL",
    description: "A larger-group option for tours and shared journeys.",
    seats: "[TRAVELLER_2_SEAT_COUNT]",
    ac: "[TRAVELLER_2_AC_STATUS]",
    luggageCapacity: "[TRAVELLER_2_LUGGAGE_CAPACITY]",
    driverIncluded: true,
    ratePerKm: 0,
    use: "Tours & group trips",
    image: "/fleet/traveller-large-placeholder.svg",
  },
];
