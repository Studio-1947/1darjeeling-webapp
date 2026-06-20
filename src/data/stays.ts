export interface Stay {
  id: string;
  name: string;
  type: "Homestay" | "Heritage hotel" | "Tea estate stay" | "Budget";
  area: string;
  priceRange: string;
  blurb: string;
}

// Sample listings — built as a template. Swap these for real partner
// properties when 1darjeeling goes live with verified hosts.
export const stays: Stay[] = [
  {
    id: "ridgeline-homestay",
    name: "Ridgeline Homestay",
    type: "Homestay",
    area: "Near Chowrasta",
    priceRange: "₹1,200–1,800 / night",
    blurb:
      "Three rooms in a family home with a south-facing balcony that catches Kanchenjunga on clear mornings. Meals are cooked with the household, not for a menu.",
  },
  {
    id: "windamere",
    name: "Heritage on Observatory Hill",
    type: "Heritage hotel",
    area: "Observatory Hill",
    priceRange: "₹6,000–9,500 / night",
    blurb:
      "A colonial-era planters' bungalow turned hotel, with fireplace rooms, four-o'clock tea service, and furniture older than most of the town's roads.",
  },
  {
    id: "tea-garden-bungalow",
    name: "Tea Garden Bungalow",
    type: "Tea estate stay",
    area: "Working garden, 20 min from town",
    priceRange: "₹3,500–5,000 / night",
    blurb:
      "A former manager's bungalow on an active tea estate. Wake up to the plucking shift starting in the rows below your window.",
  },
  {
    id: "lebong-nest",
    name: "Lebong Nest",
    type: "Homestay",
    area: "Lebong",
    priceRange: "₹1,000–1,500 / night",
    blurb:
      "A quieter alternative to town-centre stays, ten minutes from the Lebong race course — reputedly the smallest and highest natural racecourse in the world.",
  },
  {
    id: "mall-road-budget",
    name: "Mall Road Lodge",
    type: "Budget",
    area: "Mall Road",
    priceRange: "₹600–900 / night",
    blurb:
      "No-frills rooms two minutes' walk from Chowrasta. Hot water by the bucket in shoulder season, geysers in peak winter.",
  },
  {
    id: "singalila-farmstay",
    name: "Singalila Farmstay",
    type: "Homestay",
    area: "Manebhanjan, trek base",
    priceRange: "₹900–1,400 / night",
    blurb:
      "The last proper bed before the Sandakphu trail. Packed breakfasts for an early start, and the kind of hosts who'll redo your day's itinerary over dinner if the weather turns.",
  },
];
