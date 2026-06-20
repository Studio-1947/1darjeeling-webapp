export interface Attraction {
  id: string;
  name: string;
  category: string;
  distance: string;
  blurb: string;
  tip: string;
}

export const attractions: Attraction[] = [
  {
    id: "tiger-hill",
    name: "Tiger Hill",
    category: "Sunrise point",
    distance: "11 km from town",
    blurb:
      "Jeeps leave town while it's still dark to catch first light on Kanchenjunga. On a clear winter morning the view stretches as far as Everest.",
    tip: "Book your shared jeep the night before — the queue for seats starts around 4 AM.",
  },
  {
    id: "batasia-loop",
    name: "Batasia Loop",
    category: "Railway spiral",
    distance: "5 km from town, near Ghoom",
    blurb:
      "The toy train spirals over itself to lose altitude gracefully, circling a war memorial garden with Kanchenjunga as the backdrop.",
    tip: "Time it with a joy-ride departure — watching the train loop past is half the point.",
  },
  {
    id: "dhr",
    name: "Darjeeling Himalayan Railway",
    category: "UNESCO World Heritage Site",
    distance: "Runs through town",
    blurb:
      "Opened in 1881, the two-foot narrow gauge line still climbs from the plains to 2,050 m on steam and diesel locomotives little changed in a century.",
    tip: "The full NJP–Darjeeling run takes most of a day; the short Darjeeling–Ghoom joy ride is the practical choice for most visits.",
  },
  {
    id: "zoo",
    name: "Padmaja Naidu Himalayan Zoological Park",
    category: "Conservation park",
    distance: "Edge of town centre",
    blurb:
      "India's high-altitude zoo, and one of the few places on earth breeding red pandas and Siberian tigers successfully. The Himalayan Mountaineering Institute sits next door.",
    tip: "Visit both together — one ticket area, and the HMI museum has Tenzing Norgay's original expedition gear.",
  },
  {
    id: "peace-pagoda",
    name: "Japanese Peace Pagoda",
    category: "Buddhist monument",
    distance: "3 km from town",
    blurb:
      "A white-domed pagoda built in 1972 by the Nipponzan Myohoji order, with a quiet drum ceremony some mornings and views over the valley.",
    tip: "Go for the calm, not the crowds — it's the least touristy of the in-town stops.",
  },
  {
    id: "happy-valley",
    name: "Happy Valley Tea Estate",
    category: "Working tea garden",
    distance: "2 km from town",
    blurb:
      "One of the oldest gardens in the hills, planted in 1854. Walk through the factory during plucking season and watch withering, rolling, and sorting in person.",
    tip: "Visit on a weekday morning to actually see the factory running, not just the gift shop.",
  },
  {
    id: "ghoom-monastery",
    name: "Yiga Choeling Monastery",
    category: "Monastery, est. 1850",
    distance: "8 km, in Ghoom",
    blurb:
      "Home to a five-metre Maitreya Buddha statue and a community of Gelug monks. One of the oldest monasteries in the Darjeeling hills.",
    tip: "Combine with Batasia Loop — they're a five-minute drive apart.",
  },
  {
    id: "sandakphu",
    name: "Singalila Ridge & Sandakphu",
    category: "Trek",
    distance: "Trailhead at Manebhanjan, 26 km",
    blurb:
      "West Bengal's highest point, and one of the only places where four of the world's five highest peaks — Everest, Kanchenjunga, Lhotse, and Makalu — line up on one clear horizon.",
    tip: "Plan 4–5 days round trip. April brings the ridge's rhododendron forests into full bloom.",
  },
];
