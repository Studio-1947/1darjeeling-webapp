export interface RoutePlace {
  name: string;
  coords: [number, number]; // [lat, lng]
}

const DARJEELING: RoutePlace = { name: 'Darjeeling', coords: [27.0378, 88.2632] };
const NJP: RoutePlace = { name: 'NJP / Siliguri', coords: [26.6829, 88.4425] };
const MIRIK: RoutePlace = { name: 'Mirik', coords: [26.8882, 88.1888] };
const KALIMPONG: RoutePlace = { name: 'Kalimpong', coords: [27.0703, 88.4724] };
const GANGTOK: RoutePlace = { name: 'Gangtok', coords: [27.329, 88.6123] };
const MANEBHANJAN: RoutePlace = { name: 'Manebhanjan', coords: [26.9886, 88.1203] };
const GHOOM: RoutePlace = { name: 'Ghoom', coords: [27.0084, 88.2536] };
const SUKHIAPOKHRI: RoutePlace = { name: 'Sukhiapokhri', coords: [26.9926, 88.1414] };
const TIGER_HILL: RoutePlace = { name: 'Tiger Hill', coords: [26.9949, 88.2853] };
const BATASIA: RoutePlace = { name: 'Batasia Loop', coords: [27.0167, 88.2471] };

/** Ordered waypoints per route id — first is origin, last is destination. */
export const routeGeo: Record<string, RoutePlace[]> = {
  'njp-darjeeling': [NJP, DARJEELING],
  'darjeeling-mirik': [DARJEELING, SUKHIAPOKHRI, MIRIK],
  'darjeeling-kalimpong': [DARJEELING, KALIMPONG],
  'darjeeling-gangtok': [DARJEELING, GANGTOK],
  'darjeeling-manebhanjan': [DARJEELING, GHOOM, SUKHIAPOKHRI, MANEBHANJAN],
  'town-sightseeing': [DARJEELING, TIGER_HILL, BATASIA, GHOOM, DARJEELING],
};

/** All unique places, used to frame the default map view. */
export const allPlaces: RoutePlace[] = [
  DARJEELING,
  NJP,
  MIRIK,
  KALIMPONG,
  GANGTOK,
  MANEBHANJAN,
];
