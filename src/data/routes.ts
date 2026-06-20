export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  road: string;
  note: string;
}

export const routes: Route[] = [
  {
    id: "njp-darjeeling",
    from: "NJP / Bagdogra",
    to: "Darjeeling",
    distance: "~70–90 km",
    duration: "3–4 hrs",
    road: "Via Rohini or Kurseong",
    note: "The standard arrival route from the plains. The Rohini road is usually smoother; the Kurseong road passes more tea gardens.",
  },
  {
    id: "darjeeling-mirik",
    from: "Darjeeling",
    to: "Mirik",
    distance: "~50 km",
    duration: "~2 hrs",
    road: "Via Sukhiapokhri & Orange Valley",
    note: "Drops through orange-growing country — worth timing for harvest season if you can.",
  },
  {
    id: "darjeeling-kalimpong",
    from: "Darjeeling",
    to: "Kalimpong",
    distance: "~50 km",
    duration: "~2.5 hrs",
    road: "Via the Teesta valley",
    note: "Descends to the river before climbing back up — a proper change of scenery from Darjeeling's ridgeline.",
  },
  {
    id: "darjeeling-gangtok",
    from: "Darjeeling",
    to: "Gangtok",
    distance: "~95 km",
    duration: "~4 hrs",
    road: "Via Teesta Bazar",
    note: "Crosses into Sikkim — carry photo ID for the checkpoint, and check current permit rules if you're a foreign national.",
  },
  {
    id: "darjeeling-manebhanjan",
    from: "Darjeeling",
    to: "Manebhanjan",
    distance: "~26 km",
    duration: "~1.5 hrs",
    road: "Via Ghoom & Sukhiapokhri",
    note: "The jumping-off point for the Singalila Ridge and Sandakphu trek.",
  },
  {
    id: "town-sightseeing",
    from: "Darjeeling town",
    to: "Tiger Hill / Batasia / Ghoom loop",
    distance: "~25 km round trip",
    duration: "~3 hrs",
    road: "Local hill roads",
    note: "The classic dawn sightseeing circuit, usually shared by 4–6 people in one jeep.",
  },
];

export interface DriverNote {
  heading: string;
  body: string;
}

export const driverNotes: DriverNote[] = [
  {
    heading: "Shared jeeps vs. private hire",
    body:
      "Shared Land Rovers and Boleros run fixed routes for a per-seat fare and leave once full. Private hire costs more but lets you set the pace — worth it for sunrise runs or photo stops.",
  },
  {
    heading: "Fix the fare before you board",
    body:
      "Agree on the price up front, especially for private hire and anything off the standard routes. Drivers who work the same stand every day are usually the most reliable on pricing.",
  },
  {
    heading: "Hill roads, hill timing",
    body:
      "Mornings are clearest and safest. Monsoon months (June–September) bring landslide risk on several of these roads — check conditions locally before committing to a route.",
  },
];
