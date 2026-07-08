/** Approximate [lat, lng] for every static item, keyed by its id (offbeat places by name). */

export const DARJEELING_CENTER: [number, number] = [27.041, 88.2663];

/** Chowk Bazaar motor stand — where most drivers pick up from. */
export const DRIVER_STAND: [number, number] = [27.0446, 88.2637];

export const placeGeo: Record<string, [number, number]> = {
  // Stays
  'ridgeline-homestay': [27.0413, 88.2668],
  'windamere': [27.0432, 88.2637],
  'tea-garden-bungalow': [27.0489, 88.2537],
  'lebong-nest': [27.0578, 88.2622],
  'mall-road-budget': [27.04, 88.267],
  'singalila-farmstay': [26.9886, 88.1203],
  'himalayan-retreat': [27.006, 88.244],
  'elgin-heritage': [27.039, 88.262],
  'happy-valley-homestay': [27.049, 88.252],

  // Cafes
  'glenarys': [27.0393, 88.2653],
  'keventers': [27.0387, 88.2646],
  'hot-stimulating-cafe': [27.048, 88.256],
  'himalayan-java': [27.0411, 88.2664],
  'nanking': [27.0372, 88.2637],
  'sonam-kitchen': [27.044, 88.261],
  'frank-ross': [27.039, 88.264],
  'gatty-cafe': [27.038, 88.260],
  'nathmulls': [27.041, 88.266],

  // Attractions / experiences
  'tiger-hill': [26.9949, 88.2853],
  'batasia-loop': [27.0167, 88.2471],
  'dhr': [27.0333, 88.2622],
  'zoo': [27.0517, 88.2537],
  'peace-pagoda': [27.0344, 88.2727],
  'happy-valley': [27.0489, 88.2537],
  'ghoom-monastery': [27.0057, 88.2438],
  'sandakphu': [26.9886, 88.1203],
  'rock-garden': [27.030, 88.232],

  // Offbeat places (keyed by name — their data has no id)
  'Tinchuley': [27.0452, 88.3608],
  'Lamahatta': [27.0489, 88.339],
  'Chatakpur': [26.999, 88.308],
  'Sittong': [26.9333, 88.3736],
  'Tabakoshi': [26.8797, 88.197],
  'Rimbik': [27.116, 88.113],
  'Lepchajagat': [27.018, 88.204],
  'Takdah': [27.039, 88.361],
  'Mirik': [26.892, 88.175],
};

export function getPlaceCoords(key: string | undefined): [number, number] {
  return (key && placeGeo[key]) || DARJEELING_CENTER;
}
