export interface Tip {
  id: string;
  label: string;
  heading: string;
  body: string;
  photo: string;
}

export const tips: Tip[] = [
  {
    id: "season",
    label: "Best time",
    heading: "Mar–May & Oct–mid Dec",
    body:
      "These windows give the clearest mountain views. Spring brings rhododendrons into bloom; autumn skies after the monsoon are usually the sharpest of the year.",
    photo: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "monsoon",
    label: "Avoid",
    heading: "Jun–Sep, if you can",
    body:
      "Heavy monsoon rain brings landslide risk to several hill roads and can fog out the views you came for. Trips still happen, but build in flexibility.",
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "altitude",
    label: "Altitude",
    heading: "2,050 m / 6,700 ft",
    body:
      "Not high enough for altitude sickness, but evenings turn cold even in summer. Pack layers regardless of the season.",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "toy-train",
    label: "Toy train",
    heading: "Book ahead",
    body:
      "Joy rides between Darjeeling and Ghoom sell out fast in peak season. Reserve through IRCTC or the DHR booking counter before you plan your day around it.",
    photo: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "permits",
    label: "Permits",
    heading: "Check before you cross into Sikkim",
    body:
      "Routes toward Gangtok and parts of the eastern hills cross into Sikkim, where entry rules can differ for Indian and foreign nationals. Confirm current requirements before you go, not at the checkpoint.",
    photo: "https://images.unsplash.com/photo-1590076247563-7183ef996a40?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "connectivity",
    label: "Connectivity",
    heading: "Patchy beyond town",
    body:
      "Mobile signal thins out fast on the trek routes and some of the longer drives. Download offline maps and let your homestay know your day's plan.",
    photo: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tea-shopping",
    label: "Buying tea",
    heading: "Ask for the flush, not just the brand",
    body:
      "First flush, second flush, and autumnal teas taste genuinely different. Buying direct from an estate outlet or a long-running local shop usually beats anything sold as a generic souvenir blend.",
    photo: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "etiquette",
    label: "At the monasteries",
    heading: "Shoes off, ask before photographing",
    body:
      "Dress modestly, remove footwear where indicated, and ask before photographing monks or ceremonies in progress — most are welcoming if you ask first.",
    photo: "https://images.unsplash.com/photo-1590076247563-7183ef996a40?auto=format&fit=crop&w=600&q=80",
  },
];
