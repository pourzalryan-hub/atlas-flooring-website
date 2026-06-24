export interface CarpetSample {
  code: string;       // display name e.g. "CS1"
  slug: string;       // filename-safe e.g. "CS1"
  imageSrc: string;
}

const SAMPLE_CODES = [
  "CS1", "CS2", "CS4", "CS5",
  "CS6", "CS7", "CS8", "CS9",
  "CS10", "CS11", "CS12", "CS14",
  "CS17", "CS19", "CS20", "CS21",
  "CS24", "CS25", "CS26", "CS28",
  "CS29", "CS32", "CS32G", "CS33",
  "CS34", "CS36", "CS37", "CS39",
  "CS40", "CS41", "CS42", "CS43",
  "CS44", "CS46", "CS48", "CS49",
  "CS50", "CS51", "CS52", "CS53",
  "CS55", "CS56", "CS57", "CS58",
  "CS58(Qmark)", "CS59", "CS63", "CS64",
  "CS66", "CS67", "CS100", "CS101",
  "CS102", "CS104", "CS105", "CS106",
  "CS107", "CS109", "CSBrown", "CSG",
  "CSNB", "CSNBe", "CSNBG",
];

export const carpetSamples: CarpetSample[] = SAMPLE_CODES.map((code) => {
  // slug: strip parens/spaces for filenames
  const slug = code.replace(/[^a-zA-Z0-9]/g, "");
  return {
    code,
    slug,
    imageSrc: `/images/carpet-samples/${slug}.jpg`,
  };
});
