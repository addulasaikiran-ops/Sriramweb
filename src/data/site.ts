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
  comfort: string;
  use: string;
  image: string;
};

export const fleet: Vehicle[] = [
  {
    number: "01",
    name: "Innova Crysta",
    className: "PREMIUM MPV",
    description: "Room to travel together. Comfort for every mile.",
    seats: "7–8 Seater",
    comfort: "Premium comfort",
    use: "Family & outstation",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    name: "Toyota Fortuner",
    className: "PREMIUM SUV",
    description: "Confident journeys, from city streets to open highways.",
    seats: "7 Seater",
    comfort: "Spacious cabin",
    use: "Outstation & family",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    name: "Premium Sedan",
    className: "EXECUTIVE SEDAN",
    description: "A smooth, composed ride for business and city travel.",
    seats: "4–5 Seater",
    comfort: "Refined cabin",
    use: "Business & local",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    name: "Family MUV",
    className: "FAMILY TRAVEL",
    description: "Thoughtful space for family trips and group plans.",
    seats: "6–7 Seater",
    comfort: "Flexible luggage",
    use: "Family & pilgrimage",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    name: "Comfort SUV",
    className: "ALL-ROUND SUV",
    description: "Everyday practicality with extra room to stretch out.",
    seats: "5–7 Seater",
    comfort: "Comfortable ride",
    use: "Local & outstation",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "06",
    name: "Tempo Traveller",
    className: "GROUP TRAVEL",
    description: "Bring everyone along and make the journey part of the trip.",
    seats: "Group seating",
    comfort: "Room for everyone",
    use: "Tours & group trips",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=85",
  },
];

export const services = [
  { number: "01", title: "Local & outstation", copy: "Flexible rides for daily travel, airport runs and longer journeys." },
  { number: "02", title: "Family & group trips", copy: "Comfortable vehicles for weekends, pilgrimages and special occasions." },
  { number: "03", title: "24/7 towing support", copy: "When a vehicle cannot continue, contact our team for recovery assistance." },
];
