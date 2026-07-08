export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  road: string;
  note: string;
  photo: string;
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
    photo: "https://st.indiarailinfo.com/kjfdsuiemjvcya24/0/3/8/4/4479384/0/img20191105194816290069.jpg",
  },
  {
    id: "darjeeling-mirik",
    from: "Darjeeling",
    to: "Mirik",
    distance: "~50 km",
    duration: "~2.5 hrs",
    road: "Via Sukhiapokhri & Orange Valley",
    note: "Drops through orange-growing country — worth timing for harvest season if you can.",
    photo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Mirik_lake_panorama.jpg?utm_source=en.wikivoyage.org&utm_campaign=index&utm_content=original",
  },
  {
    id: "darjeeling-kalimpong",
    from: "Darjeeling",
    to: "Kalimpong",
    distance: "~50 km",
    duration: "~2.5 hrs",
    road: "Via the Teesta valley",
    note: "Descends to the river before climbing back up — a proper change of scenery from Darjeeling's ridgeline.",
    photo: "https://nomadicweekends.com/blog/wp-content/uploads/2019/03/Kalimpong-1024x412.jpg",
  },
  {
    id: "darjeeling-gangtok",
    from: "Darjeeling",
    to: "Gangtok",
    distance: "~95 km",
    duration: "~4 hrs",
    road: "Via Teesta Bazar",
    note: "Crosses into Sikkim — carry photo ID for the checkpoint, and check current permit rules if you're a foreign national.",
    photo: "https://hillstarholidays.com/wp-content/uploads/2022/09/3rd-image.jpg",
  },
  {
    id: "darjeeling-manebhanjan",
    from: "Darjeeling",
    to: "Manebhanjan",
    distance: "~26 km",
    duration: "~1.5 hrs",
    road: "Via Ghoom & Sukhiapokhri",
    note: "The jumping-off point for the Singalila Ridge and Sandakphu trek.",
    photo: "https://i.ytimg.com/vi/Kbzb13ECO8c/maxresdefault.jpg",
  },
  {
    id: "town-sightseeing",
    from: "Darjeeling town",
    to: "Tiger Hill / Batasia / Ghoom loop",
    distance: "~25 km round trip",
    duration: "~3 hrs",
    road: "Local hill roads",
    note: "The classic dawn sightseeing circuit, usually shared by 4–6 people in one jeep.",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUz52KmrcUxc6JiuNnQ_2jcF3aslKTkyk2q5fezcKez5COLMLMgXRA-Vj&s=10",
  },
  {
    id: "darjeeling-kurseong",
    from: "Darjeeling",
    to: "Kurseong",
    distance: "~30 km",
    duration: "~1.2 hrs",
    road: "Hill Cart Road",
    note: "Follows the toy train track through misty pine forests and past the tea gardens of Kurseong.",
    photo: "https://hblimg.mmtcdn.com/content/hubble/img/tvdestinationimages/mmt/activities/m_Kurseong_tv_destination_img_3_l_667_1000.jpg",
  },
  {
    id: "darjeeling-chatakpur",
    from: "Darjeeling",
    to: "Chatakpur",
    distance: "~26 km",
    duration: "~1.5 hrs",
    road: "Via Sonada forest track",
    note: "A scenic drive passing through the deep pine woods of Senchal Wildlife Sanctuary.",
    photo: "https://i0.wp.com/www.vibrantfootsteps.com/wp-content/uploads/2022/07/From-the-watch-tower-PS-scaled.jpg?resize=1050%2C788&ssl=1",
  },
  {
    id: "darjeeling-sittong",
    from: "Darjeeling",
    to: "Sittong",
    distance: "~40 km",
    duration: "~2 hrs",
    road: "Via Peshok Road",
    note: "Scenic mountain road leading to the orange orchards of the Sittong valley.",
    photo: "https://bongtravels.in/wp-content/uploads/2024/11/ahaldhara-sittong.jpg",
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
