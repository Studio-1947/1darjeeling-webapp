export interface Produce {
  id: string;
  name: string;
  months: number[]; // 1-12, peak season
  blurb: string;
}

export const produce: Produce[] = [
  {
    id: "orange",
    name: "Darjeeling mandarin orange",
    months: [11, 12, 1],
    blurb:
      "Grown on the lower slopes around Sittong and Mirik, smaller and looser-skinned than the oranges most people know — and noticeably sweeter.",
  },
  {
    id: "first-flush-tea",
    name: "First flush tea",
    months: [3, 4],
    blurb:
      "The first plucking after winter dormancy, light and floral. Tea estates around town sell it before it ever reaches an export auction.",
  },
  {
    id: "strawberry",
    name: "Strawberries",
    months: [4, 5, 6],
    blurb:
      "Small terraced farms around Lebong and Takdah grow them without much fanfare — look for roadside sellers rather than shops.",
  },
  {
    id: "second-flush-tea",
    name: "Second flush (muscatel) tea",
    months: [5, 6],
    blurb:
      "The flush prized most by tea drinkers worldwide, with a natural wine-like note locals call muscatel — caused by a tiny leaf-eating insect, not the leaf itself.",
  },
  {
    id: "cardamom",
    name: "Large cardamom (alaichi)",
    months: [9, 10, 11],
    blurb:
      "Grown in the shade of forest canopy rather than open fields, this is one of the hills' biggest cash crops, dried slowly over wood fires before sale.",
  },
  {
    id: "plum-peach",
    name: "Plums & peaches",
    months: [6, 7],
    blurb:
      "Backyard trees more than orchards — most of what you'll find is sold by the handful at local markets, not exported anywhere.",
  },
  {
    id: "tree-tomato",
    name: "Tree tomato (rukh tamatar)",
    months: [10, 11, 12],
    blurb:
      "A tart, deep-red Himalayan fruit related to the tomato, usually turned into a sharp pickle or chutney rather than eaten raw.",
  },
];

export const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
