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

export interface FishingSpot {
  id: string;
  name: string;
  type: 'reservoir' | 'river' | 'pond';
  distanceFromCoppell: string;
  latitude: number;
  longitude: number;
  description: string;
  access: string;
  species: SpeciesGuide[];
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
      'The stretch of the Elm Fork Trinity River immediately below Grapevine Dam. Current from floodgate releases pulls baitfish through and stages migratory feeders right below the spillway — one of the most productive spots in the whole metroplex when the gates are running.',
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
        species: 'Blue & Channel Catfish',
        target: 'Deeper slack-water pockets and the tailrace pool downstream of the rocks',
        methods: ['Bottom-fish cut shad on a Carolina rig', 'Still-fish with punch bait or chicken liver near bottom'],
        baits: ['Cut shad', 'Chicken liver', 'Prepared punch/dip bait'],
        baseTimeNotes: 'Reliable after dark and in the last hour of daylight; also bites well on cloudy, stable-pressure days.',
        seasonalNotes: { summer: 'Night fishing is far more comfortable and often more productive in peak heat.' },
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
      'Rocky points, boat docks, and standing timber along the south shore of Grapevine Lake. Good bank access with parking, plus a boat ramp if you want to work the deeper points.',
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
  },
  {
    id: 'elm-fork-coppell',
    name: 'Elm Fork Trinity River — Coppell / Grapevine Springs Park',
    type: 'river',
    distanceFromCoppell: '~5 min, inside Coppell city limits',
    latitude: 32.9686,
    longitude: -96.9825,
    description:
      'The river corridor running through Grapevine Springs Park and along the Coppell Nature Trail. A quieter, low-pressure option right in town — mixed sand/mud bottom with occasional deeper holes and downed timber.',
    access: 'Bank access via Grapevine Springs Park and the Coppell Nature/Bike Trail; easy walk-up spots, no boat needed.',
    species: [
      {
        species: 'Channel Catfish',
        target: 'Deeper holes on the outside of river bends and around downed timber',
        methods: ['Bottom-fish with a simple slip-sinker rig', 'Set rods and wait — catfish here respond well to smell over sight'],
        baits: ['Chicken liver', 'Nightcrawlers', 'Prepared stink bait'],
        baseTimeNotes: 'Evening into after-dark is most productive; also good on overcast days after a rain raises the river slightly.',
        seasonalNotes: { summer: 'Fish stay active after dark once daytime heat backs off.' },
      },
      {
        species: 'Largemouth Bass',
        target: 'Laydowns, undercut banks, and slack pockets out of the main current',
        methods: ['Weightless soft plastic worked slowly through cover', 'Small spinnerbait along current breaks'],
        baits: ['Weightless stick worms', 'Small spinnerbaits'],
        baseTimeNotes: 'First two hours of daylight are the most reliable window in a river system like this.',
        seasonalNotes: {},
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
  },
  {
    id: 'coppell-park-ponds',
    name: 'Coppell Neighborhood Park Ponds (Andrew Brown Park East, Wagon Wheel Park)',
    type: 'pond',
    distanceFromCoppell: 'In town',
    latitude: 32.9546,
    longitude: -96.9903,
    description:
      'Small stocked community ponds inside Coppell city parks — the easiest, most beginner- and kid-friendly fishing in town. No boat required, short casts, and consistent panfish/catfish action.',
    access:
      'Open park hours, paved paths to the bank, parking on site. Texas freshwater fishing license rules still apply to anglers 17 and up — check the current TPWD Outdoor Annual for license and possession-limit details before you go.',
    species: [
      {
        species: 'Channel Catfish',
        target: 'Deeper pockets near the pond outlet/aerator and any drop-off from the bank',
        methods: ['Simple bottom rig with a small weight', 'Bobber rig if catfish are feeding shallow after a fresh stocking'],
        baits: ['Nightcrawlers', 'Prepared dip/punch bait', 'Hot dog chunks'],
        baseTimeNotes: 'Morning and evening are best, but these ponds also fish well midday, especially right after a stocking.',
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
      {
        species: 'Largemouth Bass',
        target: 'Any visible cover — dock posts, overhanging brush, drainage inlet',
        methods: ['Small soft plastic on a light jighead', 'Beetle spin along the bank'],
        baits: ['4in finesse worms', 'Small spinnerbaits'],
        baseTimeNotes: 'Early morning and last light produce the most and biggest bites.',
        seasonalNotes: {},
      },
    ],
  },
];
