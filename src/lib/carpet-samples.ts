export type CarpetFamily =
  | "Cream & Beige"
  | "Tan & Brown"
  | "Grey & Silver"
  | "Charcoal & Black"
  | "Accent Colours";

export interface CarpetSample {
  code: string; // display name e.g. "CS1"
  slug: string; // filename-safe e.g. "CS1"
  family: CarpetFamily;
  imageSrc: string;
}

// Ordered list of colour families (drives the filter tabs + section order).
export const carpetFamilies: CarpetFamily[] = [
  "Cream & Beige",
  "Tan & Brown",
  "Grey & Silver",
  "Charcoal & Black",
  "Accent Colours",
];

// Each sample assigned to a colour family. Families were grouped from each
// photo's dominant colour — adjust any code below if it belongs elsewhere.
const SAMPLES: Record<CarpetFamily, string[]> = {
  "Cream & Beige": [
    "CS1", "CS4", "CS5", "CS6", "CS7", "CS10", "CS40",
    "CS48", "CS52", "CS59", "CS66", "CS67", "CS109",
  ],
  "Tan & Brown": [
    "CS2", "CS8", "CS14", "CS20", "CS21", "CS33", "CS39",
    "CS42", "CS43", "CS44", "CS46", "CS50", "CSNB", "CSNBe",
  ],
  "Grey & Silver": [
    "CS11", "CS12", "CS28", "CS37", "CS41", "CS51", "CS55",
    "CS56", "CS57", "CS58", "CS58(Qmark)", "CS63", "CS64",
    "CS101", "CS104", "CS105", "CS106",
  ],
  "Charcoal & Black": [
    "CS9", "CS17", "CS19", "CS24", "CS26", "CS29", "CS32",
    "CS32G", "CS34", "CS36", "CS49", "CS53", "CS100", "CS102",
    "CS107", "CSG", "CSNBG", "CSBrown",
  ],
  "Accent Colours": ["CS25"],
};

export const carpetSamples: CarpetSample[] = carpetFamilies.flatMap((family) =>
  SAMPLES[family].map((code) => {
    const slug = code.replace(/[^a-zA-Z0-9]/g, "");
    return {
      code,
      slug,
      family,
      imageSrc: `/images/carpet-samples/${slug}.png`,
    };
  })
);
