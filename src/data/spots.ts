export type Season = 'winter' | 'spring' | 'summer' | 'fall';

export interface SpeciesGuide {
  species: string;
  /** Specific structure/bank/area within this spot to target */
  target: string;
  methods: string[];
  baits: string[];
  /** General daily pattern, before live weather/solunar adjustments */
  baseTimeNotes: string;
  seasonalNotes: Partial<Record<Season, string>>;
}

export interface CastingSpot {
  name: string;
  /** Degrees of lat/lon offset from the spot's center coordinate — approximate, not surveyed */
  latOffset: number;
  lonOffset: number;
  goodFor: string[];
  note: string;
  /** The single best cast in this spot for the headline bass bite — highlighted on the map */
  isBest?: boolean;
}

export interface FishingSpot {
  id: string;
  name: string;
  type: 'reservoir' | 'river' | 'pond';
  distanceFromCoppell: string;
  latitude: number;
  longitude: number;
  description: string;
  access: string;
  /** Bass-family species (Largemouth/White/Striped) always listed first */
  species: SpeciesGuide[];
  castingSpots: CastingSpot[];
}

export function isBassSpecies(name: string): boolean {
  return /bass/i.test(name);
}

export const SPOTS: FishingSpot[] = [
  {
    id: 'grapevine-dam-tailrace',
    name: 'Grapevine Lake Dam & Tailrace (Elm Fork)',
    type: 'river',
    distanceFromCoppell: '~5 min from north Coppell',
    latitude: 32.9857,
    longitude: -97.0561,
    description:
      'The stretch of the Elm Fork Trinity River immediately below Grapevine Dam. Current from floodgate releases pulls baitfish through and stages migratory feeders right below the spillway — one of the best striper and white bass spots in the whole metroplex when the gates are running.',
    access:
      'Fish from the bank/rocks below the dam off Fairway Dr, or wade the shoals when generation is low. Footing is uneven rock — wear shoes with grip. Stay behind any posted safety barriers when floodgates are open.',
    species: [
      {
        species: 'Striped Bass (hybrid & true striper)',
        target:
          'Current seams and eddies directly below the spillway where fast water meets slack water',
        methods: [
          'Cast slabs/spoons and swimbaits across the current, let them swing through the seam',
          'Drift live shad or shiners on a Carolina rig through the tailrace',
          'Topwater at first light when fish are schooling shad on the surface',
        ],
        baits: ['Live shad', 'Chrome/white slabs', 'Swimbaits', 'Bucktail jigs'],
        baseTimeNotes:
          'Best right after floodgates open and current is actively running — fish stage on current within hours of a release. Early morning and evening runs are most reliable.',
        seasonalNotes: {
          spring: 'Peak season — stripers and white bass push up into the tailrace to spawn, often creating a visible feeding frenzy.',
          winter: 'Still productive on generation days; fish hold deeper in the seams.',
        },
      },
      {
        species: 'White Bass',
        target: 'Same current seams as stripers, plus the rocky shoreline riprap on either bank',
        methods: [
          'Small slabs and inline spinners cast and retrieved through current',
          'Live minnows under a slip float in slower eddies',
        ],
        baits: ['Roadrunner jigs', 'Small silver spoons', 'Live minnows'],
        baseTimeNotes: 'Dawn and dusk feeding windows are most consistent; midday can still produce during an active run.',
        seasonalNotes: {
          spring: 'The white bass "run" (March–April) is the single best window of the year here.',
        },
      },
      {
        species: 'Largemouth Bass',
        target: 'Slack pockets and eddies tight against the bank, out of the main current',
        methods: ['Weightless soft plastic worked slowly along the bank', 'Small swim jig through slack water'],
        baits: ['Weightless stick worms', 'Compact swim jigs'],
        baseTimeNotes: 'A secondary target here — best in the calm pockets away from the fast water, dawn and dusk.',
        seasonalNotes: {},
      },
      {
        species: 'Blue & Channel Catfish',
        target: 'Deeper slack-water pockets and the tailrace pool downstream of the rocks',
        methods: ['Bottom-fish cut shad on a Carolina rig', 'Still-fish with punch bait or chicken liver near bottom'],
        baits: ['Cut shad', 'Chicken liver', 'Prepared punch/dip bait'],
        baseTimeNotes: 'Reliable after dark and in the last hour of daylight; also bites well on cloudy, stable-pressure days.',
        seasonalNotes: { summer: 'Night fishing is far more comfortable and often more productive in peak heat.' },
      },
    ],
    castingSpots: [
      {
        name: 'Spillway current seam',
        latOffset: -0.0009,
        lonOffset: 0.0004,
        goodFor: ['Striped Bass (hybrid & true striper)', 'White Bass'],
        note: 'Right where fast water from the gates meets slack water — the single best cast in this spot when generation is running.',
        isBest: true,
      },
      {
        name: 'East bank riprap',
        latOffset: -0.0015,
        lonOffset: 0.0022,
        goodFor: ['White Bass', 'Striped Bass (hybrid & true striper)'],
        note: 'Rock bank downstream on the east side — work spinners and slabs parallel to the rocks.',
      },
      {
        name: 'Tailrace pool',
        latOffset: -0.0032,
        lonOffset: 0.0005,
        goodFor: ['Blue & Channel Catfish'],
        note: 'Slower, deeper water further downstream — anchor and soak bait here rather than casting into the fast current.',
      },
    ],
  },
  {
    id: 'grapevine-lake-main',
    name: 'Grapevine Lake — Murrell Park / Meadowmere Park shoreline',
    type: 'reservoir',
    distanceFromCoppell: '~10 min from Coppell',
    latitude: 32.9599,
    longitude: -97.0353,
    description:
      'Rocky points, boat docks, and standing timber along the south shore of Grapevine Lake — one of the most reliable largemouth bass shorelines close to Coppell. Good bank access with parking, plus a boat ramp if you want to work the deeper points.',
    access: 'Public park access with parking, restrooms, and courtesy boat ramp at Murrell Park.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Rocky main-lake points, riprap, and dock pilings near creek channels',
        methods: [
          'Texas-rigged worm or creature bait worked slowly along rock',
          'Topwater walking bait at first and last light',
          'Crankbait deflecting off riprap on sunny midday hours',
        ],
        baits: ['Green pumpkin soft plastics', 'Shad-colored crankbaits', 'Walking topwater lures'],
        baseTimeNotes: 'Classic dawn/dusk pattern; move to deeper points and slow down during bright midday sun.',
        seasonalNotes: {
          spring: 'Bass move shallow onto flats and pockets near spawning coves — sight-fishing beds is productive.',
          summer: 'Push out to main-lake points and deeper timber; focus on the low-light hours.',
          fall: 'Follow shad into the backs of creeks as baitfish school up.',
          winter: 'Slow way down — jigs and Carolina rigs on deep rock during the warmest part of the day.',
        },
      },
      {
        species: 'Crappie',
        target: 'Standing timber and brush piles in creek arms, 8–15 ft deep',
        methods: ['Vertical jig tube/hair jigs over brush', 'Live minnow under a slip cork'],
        baits: ['1/16 oz jigs (chartreuse/white)', 'Live minnows'],
        baseTimeNotes: 'Early morning and overcast days produce the most consistent bite around timber.',
        seasonalNotes: { spring: 'Crappie stack shallow near brush and dock pilings to spawn — the best window of the year.' },
      },
      {
        species: 'Blue Catfish',
        target: 'Old creek channel and the flats adjacent to it, 15–25 ft',
        methods: ['Anchor and soak cut shad on bottom near the channel drop'],
        baits: ['Fresh cut shad', 'Cut carp'],
        baseTimeNotes: 'Good most of the day on Grapevine, but overnight and early morning bites tend to include bigger fish.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Main-lake rock point',
        latOffset: 0.0016,
        lonOffset: 0.0008,
        goodFor: ['Largemouth Bass'],
        note: 'Point extending out from the park — work it top to bottom, riprap holds bass at every depth. Best all-around bass cast at this spot.',
        isBest: true,
      },
      {
        name: 'Creek arm timber',
        latOffset: 0.0011,
        lonOffset: -0.0037,
        goodFor: ['Crappie', 'Largemouth Bass'],
        note: 'Standing timber back in the cove — vertical jig around individual trees.',
      },
      {
        name: 'Old creek channel flat',
        latOffset: 0.0031,
        lonOffset: 0.0023,
        goodFor: ['Blue Catfish'],
        note: 'Deeper water further from the bank where the old creek channel runs — best fished from a boat.',
      },
    ],
  },
  {
    id: 'elm-fork-coppell',
    name: 'Elm Fork Trinity River — Coppell / Grapevine Springs Park',
    type: 'river',
    distanceFromCoppell: '~5 min, inside Coppell city limits',
    latitude: 32.9686,
    longitude: -96.9825,
    description:
      'The river corridor running through Grapevine Springs Park and along the Coppell Nature Trail. A quieter, low-pressure option right in town with laydowns and undercut banks that hold largemouth bass — mixed sand/mud bottom with occasional deeper holes and downed timber.',
    access: 'Bank access via Grapevine Springs Park and the Coppell Nature/Bike Trail; easy walk-up spots, no boat needed.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Laydowns, undercut banks, and slack pockets out of the main current',
        methods: ['Weightless soft plastic worked slowly through cover', 'Small spinnerbait along current breaks'],
        baits: ['Weightless stick worms', 'Small spinnerbaits'],
        baseTimeNotes: 'First two hours of daylight are the most reliable window in a river system like this.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper holes on the outside of river bends and around downed timber',
        methods: ['Bottom-fish with a simple slip-sinker rig', 'Set rods and wait — catfish here respond well to smell over sight'],
        baits: ['Chicken liver', 'Nightcrawlers', 'Prepared stink bait'],
        baseTimeNotes: 'Evening into after-dark is most productive; also good on overcast days after a rain raises the river slightly.',
        seasonalNotes: { summer: 'Fish stay active after dark once daytime heat backs off.' },
      },
      {
        species: 'Longnose/Spotted Gar',
        target: 'Slow, slack pools — visible cruising near the surface on calm days',
        methods: ['Rope lure (no hooks — twisted nylon rope tangles their teeth) or cut bait on a wire leader'],
        baits: ['Cut shad on wire leader', 'Rope lure'],
        baseTimeNotes: 'Sight-fishing works best midday when sun is high and water is calm enough to spot them.',
        seasonalNotes: { summer: 'Gar are most visible and active in warm water.' },
      },
    ],
    castingSpots: [
      {
        name: 'Laydown bank',
        latOffset: 0.0009,
        lonOffset: -0.0012,
        goodFor: ['Largemouth Bass'],
        note: 'Downed trees along the bank near the nature trail — pitch soft plastics tight to the wood. Best bass water on this stretch.',
        isBest: true,
      },
      {
        name: 'River bend hole',
        latOffset: -0.0014,
        lonOffset: 0.0018,
        goodFor: ['Channel Catfish'],
        note: 'Outside of the bend where current has dug out a deeper hole — classic catfish water.',
      },
      {
        name: 'Slack pool',
        latOffset: -0.0025,
        lonOffset: -0.0008,
        goodFor: ['Longnose/Spotted Gar'],
        note: 'Calm, slow-moving pool out of the main current — good visibility for sight-casting gar.',
      },
    ],
  },
  {
    id: 'andrew-brown-pond',
    name: 'Andrew Brown Park East Pond',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.9556,
    longitude: -96.9968,
    description:
      "A stocked pond system in Andrew Brown Park East — TPWD tracks it as one official water body, and the park itself is about 118 acres, big enough that it has more than one bank access point. The main entrance/pier is off Parkway Blvd; there's also a quieter north arm reachable by the greenbelt trail from Layton Dr and Gifford Ct in the Village at Cottonwood Creek neighborhood (a real listing for a Layton Dr home backing onto it describes fishable water right off the backyard trail). Known locally for holding some big bass alongside crappie and catfish — also the easiest, most beginner- and kid-friendly fishing in town. No boat required, short casts.",
    access:
      'Open park hours, paved paths to the bank, parking on site. Texas freshwater fishing license rules still apply to anglers 17 and up — check the current TPWD Outdoor Annual for license and possession-limit details before you go.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Any visible cover — dock posts, overhanging brush, drainage inlet',
        methods: ['Small soft plastic on a light jighead', 'Beetle spin along the bank'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light produce the most and biggest bites.',
        seasonalNotes: {},
      },
      {
        species: 'Crappie',
        target: 'Deeper edges near the outlet and any submerged brush',
        methods: ['Small jig under a slip cork', 'Live minnow near cover'],
        baits: ['1/16 oz jigs', 'Live minnows'],
        baseTimeNotes: 'Morning bite is most consistent; best in the cooler months.',
        seasonalNotes: { spring: 'Crappie move shallow toward brush and structure to spawn.' },
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper pockets near the pond outlet/aerator and any drop-off from the bank',
        methods: ['Simple bottom rig with a small weight', 'Bobber rig if catfish are feeding shallow after a fresh stocking'],
        baits: ['Nightcrawlers', 'Prepared dip/punch bait', 'Hot dog chunks'],
        baseTimeNotes: 'Morning and evening are best, but this pond also fishes well midday, especially right after a stocking.',
        seasonalNotes: { winter: 'Many DFW city ponds see winter trout/catfish stockings — check current City of Coppell Parks & Recreation postings.' },
      },
      {
        species: 'Bluegill / Sunfish',
        target: 'Shallow water near reeds, dock edges, or shade — easiest fish in the pond to find',
        methods: ['Small bobber and worm', 'Tiny inline spinner for kids who want action'],
        baits: ['Redworms', 'Crickets', 'Small pieces of nightcrawler'],
        baseTimeNotes: 'Bite is steady most of the day; slightly better in morning shade.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Shaded dock edge',
        latOffset: -0.0005,
        lonOffset: -0.0004,
        goodFor: ['Largemouth Bass', 'Bluegill / Sunfish'],
        note: 'Shade plus structure — the pond\'s best-known bass spot and easiest bank spot for beginners.',
        isBest: true,
      },
      {
        name: 'Aerator / outlet pocket',
        latOffset: 0.0004,
        lonOffset: 0.0006,
        goodFor: ['Channel Catfish', 'Crappie'],
        note: 'Deepest water in the pond and the most oxygenated — reliable catfish and crappie holding spot.',
      },
      {
        name: 'North arm (Layton Dr / Gifford Ct trail access)',
        latOffset: 0.0029,
        lonOffset: 0.0023,
        goodFor: ['Largemouth Bass'],
        note: "Quieter back-trail access from the Village at Cottonwood Creek side of the park, away from the main Parkway Blvd entrance — good if you want fewer people around. Not a GPS-surveyed pin; placed from your directions and a nearby home listing describing this exact bank, not a map lookup, so treat it as approximate.",
      },
    ],
  },
  {
    id: 'wagon-wheel-pond',
    name: 'Wagon Wheel Park Pond',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.9705,
    longitude: -96.98,
    description:
      'A smaller stocked pond inside Wagon Wheel Park. Quiet, low-pressure water that fishes a lot like Andrew Brown Park East — good backup or first-fishing-trip spot, including for bass.',
    access:
      'Open park hours, short walk from parking to the bank. Texas freshwater fishing license rules still apply to anglers 17 and up — check the current TPWD Outdoor Annual for license and possession-limit details before you go.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Any visible cover — dock posts, overhanging brush, drainage structure',
        methods: ['Small soft plastic on a light jighead', 'Beetle spin along the bank'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light produce the most and biggest bites, same as any small DFW pond.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deepest visible water, typically toward the pond center or near any inlet/outlet structure',
        methods: ['Simple bottom rig with a small weight', 'Still-fish on bottom and wait'],
        baits: ['Nightcrawlers', 'Prepared dip/punch bait', 'Hot dog chunks'],
        baseTimeNotes: 'Morning and evening are best, but bites can come throughout the day.',
        seasonalNotes: { winter: 'Check current City of Coppell Parks & Recreation postings for any winter stocking.' },
      },
      {
        species: 'Bluegill / Sunfish',
        target: 'Shallow edges near any brush, reeds, or shade',
        methods: ['Small bobber and worm', 'Tiny inline spinner'],
        baits: ['Redworms', 'Crickets'],
        baseTimeNotes: 'Steady bite most of the day, best in morning shade.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Shaded bank edge',
        latOffset: -0.0003,
        lonOffset: -0.0002,
        goodFor: ['Largemouth Bass', 'Bluegill / Sunfish'],
        note: 'Best structure on this small pond — easiest, most reliable spot for a quick bass or panfish bite.',
        isBest: true,
      },
      {
        name: 'Pond center / deep pocket',
        latOffset: 0.0002,
        lonOffset: 0.0003,
        goodFor: ['Channel Catfish'],
        note: 'The deepest water available in a small pond like this — cast toward the middle and let it sit.',
      },
    ],
  },
  {
    id: 'moore-road-park',
    name: 'Moore Road Park Pond',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.964,
    longitude: -96.991,
    description:
      'A 30-acre city park at 600 N. Moore Rd, just east of Andrew Brown Park. The city rebuilt this pond in 2023 with a new boardwalk and purpose-built fish habitat on the pond floor — moss-back fish attractors, concrete culverts, and stone piles — specifically to hold largemouth bass and catfish, per Coppell\'s own project announcement. That\'s about as strong a bass endorsement as a small city pond gets.',
    access:
      'Public park, part of the Denton Creek Trail loop, parking on site. Texas freshwater fishing license rules apply to anglers 17 and up.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'The engineered fish habitat zone — moss-back attractors, culverts, and stone piles installed along the pond floor near the boardwalk',
        methods: ['Small soft plastic or jig worked slowly through the planted cover', 'Beetle spin along the boardwalk edge'],
        baits: ['4in finesse worms', 'Small jigs', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light, same as any small DFW pond — the new structure should hold fish all day though.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper water and culvert structure away from the boardwalk',
        methods: ['Simple bottom rig with a small weight'],
        baits: ['Nightcrawlers', 'Prepared dip/punch bait'],
        baseTimeNotes: 'Morning and evening are typically best in ponds like this; species mix beyond bass wasn\'t independently confirmed for this specific pond, so treat catfish/panfish presence as a reasonable assumption rather than a confirmed stocking list.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Boardwalk fish habitat zone',
        latOffset: -0.0003,
        lonOffset: 0.0004,
        goodFor: ['Largemouth Bass'],
        note: 'Where the city installed the moss-back attractors and culverts — the built-for-bass spot on this pond. Position approximate, not GPS-surveyed.',
        isBest: true,
      },
    ],
  },
  {
    id: 'duck-pond-park',
    name: 'The Duck Pond Park',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.9465,
    longitude: -96.9855,
    description:
      'A 5-acre city park at 400 E Bethel School Rd, built around a small pond with fountains — TPWD tracks it as an official water body ("Duck Park Pond," water body code 0191) with its own stocking and record history. Fishbrain lists the same pond under the name "Duke Pond" (likely just a data-entry variant of "Duck Pond") with Largemouth Bass, Spotted Bass, and Bluegill logged.',
    access: 'Open park hours, easy walk-up bank access, small — expect a lot of ducks and families.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Any bank structure or shade around this small pond — limited cover means fish concentrate wherever it exists',
        methods: ['Small soft plastic on a light jighead', 'Beetle spin along the bank'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light in a small pond like this, before/after the crowds of ducks and families show up.',
        seasonalNotes: {},
      },
      {
        species: 'Spotted Bass',
        target: 'Same bank cover as largemouth — the two often mix in small DFW ponds',
        methods: ['Small soft plastic worked slowly', 'Small crankbait'],
        baits: ['Finesse worms', 'Small crankbaits'],
        baseTimeNotes: 'Same dawn/dusk pattern as largemouth here.',
        seasonalNotes: {},
      },
      {
        species: 'Bluegill / Sunfish',
        target: 'Shallow edges near the fountains',
        methods: ['Small bobber and worm'],
        baits: ['Redworms', 'Crickets'],
        baseTimeNotes: 'Steady most of the day.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Shaded bank near the fountains',
        latOffset: 0.0002,
        lonOffset: -0.0002,
        goodFor: ['Largemouth Bass', 'Spotted Bass'],
        note: 'Best available cover on a small, mostly open pond. Position approximate, not GPS-surveyed.',
        isBest: true,
      },
    ],
  },
  {
    id: 'cozby-library-pond',
    name: 'Cozby Library Pond',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.9553,
    longitude: -96.9838,
    description:
      "A landscaping pond beside the Cozby Library & Community Commons at 177 N Heartz Rd — the library's reading area overlooks it across grassy slopes. Fishbrain lists it (as \"Cosby Library Pond\") with Largemouth Bass, Bluegill, and Spotted Bass logged. I could not confirm whether fishing is officially permitted here — it may be primarily a landscaping/decorative feature rather than a managed fishing pond, so check for posted signage before casting.",
    access:
      "Library grounds, open during library hours. Confirm fishing is allowed on-site — this one is less certain than the dedicated city fishing ponds on this map.",
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Any bank cover or drop-off visible along the grassy slopes',
        methods: ['Small soft plastic on a light jighead'],
        baits: ['4in finesse worms'],
        baseTimeNotes: 'Early morning or evening, outside library hours foot traffic.',
        seasonalNotes: {},
      },
      {
        species: 'Spotted Bass',
        target: 'Same bank cover as largemouth',
        methods: ['Small soft plastic worked slowly'],
        baits: ['Finesse worms'],
        baseTimeNotes: 'Same dawn/dusk pattern as largemouth here.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Grassy slope bank',
        latOffset: 0.0001,
        lonOffset: 0.0001,
        goodFor: ['Largemouth Bass', 'Spotted Bass'],
        note: 'Best-guess bank access based on the pond\'s described layout — verify on site and confirm fishing is actually permitted.',
        isBest: true,
      },
    ],
  },
  {
    id: 'andrew-brown-west-pond',
    name: 'Andrew Brown Park West Pond',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.954,
    longitude: -97.0005,
    description:
      'TPWD tracks this as its own official water body (water body code 0044), separate from the East park pond — a scenic channel connects the two. Features a boardwalk overlook and the Civic Green lawn fronting the water. I could not find a specific stocked-species list distinct from the East pond in my research, so treat the species below as a reasonable assumption based on the connected East pond rather than a confirmed stocking record.',
    access: 'Open park hours, paved paths, parking on site. Texas freshwater fishing license rules apply to anglers 17 and up.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Boardwalk overlook and any bank cover along the Civic Green side',
        methods: ['Small soft plastic on a light jighead', 'Beetle spin along the bank'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light produce the most bites, same pattern as the connected East pond.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper water away from the boardwalk',
        methods: ['Simple bottom rig with a small weight'],
        baits: ['Nightcrawlers', 'Prepared dip/punch bait'],
        baseTimeNotes: 'Morning and evening typical for small pond catfish.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Boardwalk overlook',
        latOffset: -0.0002,
        lonOffset: 0.0003,
        goodFor: ['Largemouth Bass'],
        note: 'The built vantage point over the water — good visibility to spot cruising bass. Position approximate, not GPS-surveyed.',
        isBest: true,
      },
    ],
  },
  {
    id: 'lakes-of-coppell',
    name: 'Lakes of Coppell — McArthur Lake (private HOA)',
    type: 'reservoir',
    distanceFromCoppell: 'In town',
    latitude: 32.9555,
    longitude: -96.9665,
    description:
      'A ~500-surface-acre network of man-made lakes and canals that give the Lakes of Coppell neighborhood (near S MacArthur Blvd & Sandy Lake Rd) its name — spring-fed, so they stay near-full year-round. The HOA has stocked channel catfish for community fishing events (1998, and again in "McArthur" Lake in 2010). Fishbrain also logs largemouth bass, crappie, bluegill, and green sunfish here.',
    access:
      'PRIVATE — this is HOA-owned water, shoreline fishing and no-motor small boats are for residents/guests only, not the general public. Do not fish here without HOA authorization; included for completeness since it has real stocking and species data, not as an invitation to trespass.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Shoreline structure and canal edges along the common areas',
        methods: ['Small soft plastic worked along the bank', 'Small spinnerbait down the canals'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Dawn and dusk, same as any DFW community lake.',
        seasonalNotes: {},
      },
      {
        species: 'Crappie',
        target: 'Deeper canal channels and any dock structure',
        methods: ['Small jig under a slip cork'],
        baits: ['1/16 oz jigs', 'Live minnows'],
        baseTimeNotes: 'Best in cooler months, morning bite most consistent.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper open water, especially near historically-stocked McArthur Lake',
        methods: ['Bottom rig with cut bait or prepared dip bait'],
        baits: ['Cut shad', 'Prepared dip bait'],
        baseTimeNotes: 'Evening into after-dark typical.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Common-area shoreline',
        latOffset: 0.0003,
        lonOffset: -0.0003,
        goodFor: ['Largemouth Bass'],
        note: 'Typical HOA common-area bank access — exact best spot depends on which section of the lake system you have access to. Position approximate, not GPS-surveyed.',
        isBest: true,
      },
    ],
  },
  {
    id: 'north-lake',
    name: 'North Lake',
    type: 'reservoir',
    distanceFromCoppell: '~10-15 min, just SE of Coppell',
    latitude: 32.925,
    longitude: -96.978,
    description:
      'A historic lake (dam completed 1957) on the South Fork of Grapevine Creek about two miles southeast of Coppell in northwest Dallas County — originally built as a cooling reservoir for a power plant. Dallas Parks & Recreation began fertilizing and stocking it with bass in 1978. Well documented (Texas State Historical Association, Wikipedia) with a real public bank-fishing park on the south shore. A bit further out than the other spots on this map, but well worth including — treat the pin as regional-approximate, not surveyed.',
    access: 'North Lake Park on the south shore — catch-and-release bank fishing, follow posted signage for closed sections.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Shoreline structure near North Lake Park on the south shore',
        methods: ['Texas-rigged soft plastic along the bank', 'Topwater at first light'],
        baits: ['Green pumpkin soft plastics', 'Walking topwater lures'],
        baseTimeNotes: 'Classic dawn/dusk pattern.',
        seasonalNotes: {},
      },
      {
        species: 'Channel Catfish',
        target: 'Deeper water off the bank',
        methods: ['Bottom rig with cut bait'],
        baits: ['Cut shad', 'Chicken liver'],
        baseTimeNotes: 'Evening into after-dark typical.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'North Lake Park shoreline',
        latOffset: 0.0002,
        lonOffset: -0.0002,
        goodFor: ['Largemouth Bass'],
        note: 'Public bank access on the south shore — this is a regional-scale estimate, confirm the park entrance before you go.',
        isBest: true,
      },
    ],
  },
  {
    id: 'south-fork-grapevine-creek',
    name: 'South Fork Grapevine Creek',
    type: 'river',
    distanceFromCoppell: '~5-10 min, near the Carrollton border',
    latitude: 32.9498465,
    longitude: -96.9625061,
    description:
      'A stream a few miles from central Coppell near the Carrollton border, feeding into North Lake. HookandBullet.com logs redear sunfish, green sunfish, carp, catfish, and largemouth bass here. This coordinate came from a mapped GPS waypoint (not my own estimate) so it should be more reliable than the other approximate pins on this map.',
    access: 'Creek-side access varies by segment — look for public crossings/greenbelt trail access rather than crossing private property.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Deeper pools and undercut banks out of the main current',
        methods: ['Weightless soft plastic worked slowly', 'Small spinnerbait along current breaks'],
        baits: ['Weightless stick worms', 'Small spinnerbaits'],
        baseTimeNotes: 'First two hours of daylight are most reliable in a small stream like this.',
        seasonalNotes: {},
      },
      {
        species: 'Catfish',
        target: 'Deeper holes on the outside of bends',
        methods: ['Bottom-fish with a simple slip-sinker rig'],
        baits: ['Chicken liver', 'Nightcrawlers'],
        baseTimeNotes: 'Evening into after-dark typical.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Deep pool / undercut bank',
        latOffset: -0.0006,
        lonOffset: 0.0004,
        goodFor: ['Largemouth Bass'],
        note: 'Best-looking water type for bass on a small stream like this — exact spot still approximate since this is moving water that changes with rain.',
        isBest: true,
      },
    ],
  },
  {
    id: 'cottonwood-branch',
    name: 'Cottonwood Branch (Cottonwood Creek)',
    type: 'river',
    distanceFromCoppell: 'In town',
    latitude: 32.959,
    longitude: -96.996,
    description:
      'The creek itself (as opposed to the stocked park ponds it feeds) — runs along/through Andrew Brown Park and the Village at Cottonwood Creek neighborhood. Fishbrain logs Largemouth Bass, Green Sunfish, and Plains Longear Sunfish here. Moving creek water fishes differently than the adjacent stocked ponds — expect smaller, wilder fish rather than stocked trophy bass.',
    access: 'Bank access via Andrew Brown Park trails and the neighborhood greenbelt.',
    species: [
      {
        species: 'Largemouth Bass',
        target: 'Deeper pools and any laydown or undercut bank out of the current',
        methods: ['Weightless soft plastic worked slowly through cover'],
        baits: ['Weightless stick worms'],
        baseTimeNotes: 'First two hours of daylight are most reliable in a small creek like this.',
        seasonalNotes: {},
      },
      {
        species: 'Green Sunfish / Longear Sunfish',
        target: 'Shallow riffles and pool edges',
        methods: ['Small bobber and worm', 'Tiny inline spinner'],
        baits: ['Redworms', 'Small spinners'],
        baseTimeNotes: 'Steady through the day, best in morning shade.',
        seasonalNotes: {},
      },
    ],
    castingSpots: [
      {
        name: 'Creek bend pool',
        latOffset: -0.0004,
        lonOffset: 0.0003,
        goodFor: ['Largemouth Bass'],
        note: 'Best-looking bass water on this creek segment — approximate, moving water changes with rain and flow.',
        isBest: true,
      },
    ],
  },
];
