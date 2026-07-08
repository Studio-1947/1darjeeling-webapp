export interface Stay {
  id: string;
  name: string;
  type: "Homestay" | "Heritage hotel" | "Tea estate stay" | "Budget";
  area: string;
  priceRange: string;
  blurb: string;
  photo: string;
}

export const stays: Stay[] = [
  {
    id: "ridgeline-homestay",
    name: "Ridgeline Homestay",
    type: "Homestay",
    area: "Near Chowrasta",
    priceRange: "₹1,200–1,800 / night",
    blurb:
      "Three rooms in a family home with a south-facing balcony that catches Kanchenjunga on clear mornings. Meals are cooked with the household, not for a menu.",
    photo: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/411209476.jpg?k=fb5a2f1e60c0dc895bd39d521eb73b441076d0bbd03a87871583246d3d022708&o=",
  },
  {
    id: "windamere",
    name: "Heritage on Observatory Hill",
    type: "Heritage hotel",
    area: "Observatory Hill",
    priceRange: "₹6,000–9,500 / night",
    blurb:
      "A colonial-era planters' bungalow turned hotel, with fireplace rooms, four-o'clock tea service, and furniture older than most of the town's roads.",
    photo: "https://media-cdn.tripadvisor.com/media/photo-s/01/66/1d/ae/windamere-hotel.jpg",
  },
  {
    id: "tea-garden-bungalow",
    name: "Tea Garden Bungalow",
    type: "Tea estate stay",
    area: "Working garden, 20 min from town",
    priceRange: "₹3,500–5,000 / night",
    blurb:
      "A former manager's bungalow on an active tea estate. Wake up to the plucking shift starting in the rows below your window.",
    photo: "https://media-cdn.tripadvisor.com/media/photo-s/2d/96/59/00/caption.jpg",
  },
  {
    id: "lebong-nest",
    name: "Lebong Nest",
    type: "Homestay",
    area: "Lebong",
    priceRange: "₹1,000–1,500 / night",
    blurb:
      "A quieter alternative to town-centre stays, ten minutes from the Lebong race course — reputedly the smallest and highest natural racecourse in the world.",
    photo: "https://a0.muscache.com/im/pictures/8d91c1f4-6ba0-4b83-b5bc-755d4660a5c5.jpg",
  },
  {
    id: "mall-road-budget",
    name: "Mall Road Lodge",
    type: "Budget",
    area: "Mall Road",
    priceRange: "₹600–900 / night",
    blurb:
      "No-frills rooms two minutes' walk from Chowrasta. Hot water by the bucket in shoulder season, geysers in peak winter.",
    photo: "https://daahy6akrtcj2.cloudfront.net/hotelsdarjeeling.co.in/logos/central_gleneagles_heritage_resort.jpg",
  },
  {
    id: "singalila-farmstay",
    name: "Singalila Farmstay",
    type: "Homestay",
    area: "Manebhanjan, trek base",
    priceRange: "₹900–1,400 / night",
    blurb:
      "The last proper bed before the Sandakphu trail. Packed breakfasts for an early start, and the kind of hosts who'll redo your day's itinerary over dinner if the weather turns.",
    photo: "https://content.jdmagicbox.com/v2/comp/darjeeling/f7/9999px354.x354.250327160512.g5f7/catalogue/singalila-riverside-farmstay-darjeeling-home-stay-077yg0f6ae.jpg",
  },
  {
    id: "himalayan-retreat",
    name: "Himalayan Retreat",
    type: "Homestay",
    area: "Ghoom",
    priceRange: "₹1,500–2,200 / night",
    blurb: "A quiet retreat located near the Ghoom Monastery. Features traditional wooden interiors and home-cooked organic meals.",
    photo: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "elgin-heritage",
    name: "The Elgin, Darjeeling",
    type: "Heritage hotel",
    area: "HD Lama Road",
    priceRange: "₹7,500–12,000 / night",
    blurb: "A luxury heritage hotel offering old-world charm, royal hospitality, and beautiful gardens overlooking the valley.",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "happy-valley-homestay",
    name: "Happy Valley View Homestay",
    type: "Homestay",
    area: "Near Happy Valley Tea Estate",
    priceRange: "₹1,100–1,600 / night",
    blurb: "Overlooking the lush tea garden slopes, this family-run stay is perfect for tea lovers wanting to hike the trails.",
    photo: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
  },
];
