export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  licenseNumber: string;
  rating: number;
  experienceYears: number;
  languages: string[];
  routesOperated: string[];
  portrait: string;
  photo: string;
}

export const drivers: Driver[] = [
  {
    id: "tshering-sherpa",
    name: "Tshering Sherpa",
    vehicle: "Mahindra Bolero (4WD)",
    licenseNumber: "WB-74-XXXX",
    rating: 4.9,
    experienceYears: 12,
    languages: ["Nepali", "Hindi", "English"],
    routesOperated: ["njp-darjeeling", "town-sightseeing", "darjeeling-manebhanjan"],
    portrait: "👨🏽‍✈️",
    photo: "https://media.istockphoto.com/id/184272063/photo/portrait-of-nepali-man.jpg?s=612x612&w=0&k=20&c=2HyIh8hhNn3IESDltINFnQoc7YtCyPNh1PCM2UO5ZtY=",
  },
  {
    id: "pradhan-nepali",
    name: "Dinesh Pradhan",
    vehicle: "Tata Sumo Gold",
    licenseNumber: "WB-73-XXXX",
    rating: 4.8,
    experienceYears: 9,
    languages: ["Nepali", "Hindi"],
    routesOperated: ["njp-darjeeling", "darjeeling-kalimpong", "darjeeling-gangtok"],
    portrait: "👨🏻‍✈️",
    photo: "https://i.pinimg.com/736x/a0/b9/7a/a0b97a5961423107af7a606f8daf4185.jpg",
  },
  {
    id: "dorjee-bhutia",
    name: "Dorjee Bhutia",
    vehicle: "Vintage Land Rover Series II",
    licenseNumber: "WBM-XXXX",
    rating: 5.0,
    experienceYears: 20,
    languages: ["Nepali", "Bhutia", "Tibetan", "English"],
    routesOperated: ["darjeeling-manebhanjan", "town-sightseeing"],
    portrait: "👴🏽‍✈️",
    photo: "https://benpipe.com/pf-media/portrait-man-boudha-nepal-asia-real-people.jpg",
  },
  {
    id: "pemba-tamang",
    name: "Pemba Tamang",
    vehicle: "Toyota Innova Crysta",
    licenseNumber: "WB-76-XXXX",
    rating: 4.7,
    experienceYears: 6,
    languages: ["Nepali", "Hindi", "Bengali"],
    routesOperated: ["njp-darjeeling", "darjeeling-mirik"],
    portrait: "👦🏻‍✈️",
    photo: "https://t3.ftcdn.net/jpg/07/72/07/02/360_F_772070223_m2tqMfNW4DSpmTS0QorQvlta9Qeyc4As.jpg",
  },
];
