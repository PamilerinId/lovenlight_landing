/**
 * Single source of truth for every word, number and link on the site.
 * Consumed by the page sections, metadata, JSON-LD, the Open Graph image and
 * /llms.txt, so copy can never drift between them.
 *
 * Copy is transcribed verbatim from design/HANDOFF.md and the client brief.
 * Do not paraphrase. Missing content stays a labelled placeholder.
 */

export type Photo = { src: string; alt: string };

/** A named person shown in a photo; rendered as a caption on the tile. */
export type Person = { name: string; role: string };

/**
 * A portrait in "Our people". `name` may be a group rather than an individual
 * ("Patrons & Matrons"), in which case `role` is null because the name already
 * carries it.
 */
export type PersonCard = {
  name: string;
  role: string | null;
  photo: Photo;
  /** Group shots take two columns; a portrait crop would cut people out. */
  wide?: boolean;
};

export const leadership = {
  founder: {
    name: "Oluninyo Ademola-Idowu Esq",
    role: "Founder / Executive Director",
  },
  grandPatron: {
    name: "Mr Yanju Adegbite",
    role: "Grand Patron",
  },
} as const satisfies Record<string, Person>;

export const org = {
  legalName: "The Love and Light Community and Humanitarian Foundation",
  name: "Love & Light Foundation",
  alternateNames: ["Love & Light Foundation", "Love and Light Foundation"],
  tagline: "Changing lives. Creating possibilities.",
  description:
    "The Love and Light Community and Humanitarian Foundation is a Nigerian nonprofit improving lives through humanitarian assistance, education and community empowerment.",
  email: "Loveandlightfoundation1@gmail.com",
  tel: "+2348086904663",
  telDisplay: "0808 690 4663",
  handle: "@loveandlightngo",
  countries: ["Nigeria", "Tanzania"],
} as const;

export const links = {
  friend: "https://forms.gle/JpWV2ySyA9g27Hc68",
  volunteer: "https://forms.gle/1QqAi7k2k63Jhjpv6",
  // INTERIM: the client has not supplied a partnership link or a giving link.
  // Both open an email so the buttons still work. Replace `donate` with a
  // hosted payment link (Paystack, Flutterwave) — no backend is needed — and
  // `partner` with a form or page when they decide.
  partner: `mailto:${org.email}?subject=Partnership%20enquiry`,
  donate: `mailto:${org.email}?subject=Donation`,
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/loveandlightngo" },
    { name: "TikTok", href: "https://www.tiktok.com/@loveandlightngo" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/loveandlightngo/" },
    { name: "YouTube", href: "https://youtube.com/@loveandlightngo" },
  ],
} as const;

export const nav = {
  items: [
    { label: "About", href: "#about" },
    { label: "Programmes", href: "#programmes" },
    { label: "Events", href: "#events" },
    { label: "News & Stories", href: "#news" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Get involved", href: "#involved" },
} as const;

export const hero = {
  eyebrow: "Nigeria · Tanzania",
  title: "Changing lives. Creating possibilities.",
  body: "Love & Light Foundation is a nonprofit organization committed to improving lives through humanitarian assistance, quality education, youth and community empowerment, strategic partnerships and sustainable interventions that preserve dignity and create opportunity.",
  ctas: {
    friend: "Become a Friend",
    volunteer: "Become a Volunteer",
    partner: "Partner with us →",
  },
  // Generated from design/assets/photos by `npm run assets`.
  photo: {
    src: "/images/hero-james-sunmi.jpg",
    alt: "James and Sunmi, two Love & Light Foundation volunteers, smiling and pointing at the foundation logo on their T-shirts",
  } as Photo | null,
  photoPlaceholder: "[PHOTO: James & Sunmi]",
  chips: [
    { value: "5,000+", label: "families reached" },
    { value: "80+", label: "volunteers" },
  ],
} as const;

export const impact = {
  heading: "Our Impact in Numbers",
  items: [
    { value: "5,000+", label: "Families Reached" },
    { value: "1,500+", label: "Conference Attendees" },
    { value: "500+", label: "Young People Empowered" },
    { value: "2", label: "Countries Reached (Nigeria & Tanzania)" },
    { value: "80+", label: "Volunteers" },
    { value: "12+", label: "Community Projects" },
  ],
} as const;

export const story = {
  eyebrow: "Our story",
  heading:
    "We believe where you're born should never determine how far you can go.",
  paragraphs: [
    "Every day, millions of people are held back not by a lack of potential, but by a lack of opportunity. A child goes to bed hungry instead of learning. A young person with brilliant ideas never gets the chance to develop them. A woman with dreams of financial independence lacks the support to begin. We believe that can change.",
    "Love & Light Foundation exists to turn compassion into action by providing food where there is hunger, creating opportunities where there are barriers, and empowering individuals and communities to build a better future. Because lasting change doesn't happen through charity alone. It happens when people are given the opportunity to thrive.",
  ],
  closing:
    "Together, we're changing lives, creating opportunities, and building hope.",
  /**
   * Portraits at the foot of "Our story". Deliberately placed here rather than
   * beside the Friends of Love & Light panel, so the patrons never appear to
   * be the ones asking for money.
   */
  peopleHeading: "Our people",
  people: [
    {
      name: leadership.founder.name,
      role: leadership.founder.role,
      photo: {
        src: "/images/people-founder.jpg",
        alt: `${leadership.founder.name}, ${leadership.founder.role} of Love & Light Foundation, speaking into a microphone in a foundation T-shirt`,
      },
    },
    {
      name: leadership.grandPatron.name,
      role: leadership.grandPatron.role,
      photo: {
        src: "/images/people-grand-patron.jpg",
        alt: `${leadership.grandPatron.name}, ${leadership.grandPatron.role} of Love & Light Foundation, speaking with a microphone at an outdoor gathering`,
      },
    },
    {
      name: "Patrons & Matrons",
      role: null,
      wide: true,
      photo: {
        src: "/images/people-patrons.jpg",
        alt: "The patrons and matrons of Love & Light Foundation photographed together at Rebirth, a Love and Light experience",
      },
    },
    {
      name: "Our volunteers",
      role: null,
      wide: true,
      photo: {
        src: "/images/people-volunteers.jpg",
        alt: "A Love & Light Foundation volunteer receiving a certificate of recognition",
      },
    },
  ] satisfies ReadonlyArray<PersonCard>,
} as const;

/**
 * The four UN Sustainable Development Goals the foundation works towards.
 * `href` points at the official UN SDG knowledge platform page for the goal.
 */
export const sdgs = [
  {
    id: 1,
    title: "No Poverty",
    src: "/sdg/sdg-1.webp",
    href: "https://sdgs.un.org/goals/goal1",
  },
  {
    id: 2,
    title: "Zero Hunger",
    src: "/sdg/sdg-2.webp",
    href: "https://sdgs.un.org/goals/goal2",
  },
  {
    id: 4,
    title: "Quality Education",
    src: "/sdg/sdg-4.webp",
    href: "https://sdgs.un.org/goals/goal4",
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    src: "/sdg/sdg-17.webp",
    href: "https://sdgs.un.org/goals/goal17",
  },
] as const;

export type ProgrammeIconName =
  | "bowl"
  | "book"
  | "sprout"
  | "person"
  | "buildings"
  | "briefcase";

export type Programme = {
  n: string;
  title: string;
  icon: ProgrammeIconName;
  /**
   * One or two lines describing the programme. `null` until the client
   * supplies copy — only CSR Execution has been written so far — and the card
   * shows a labelled placeholder in its place.
   */
  blurb: string | null;
  photo: Photo | null;
  strong?: boolean;
};

export const programmes = {
  eyebrow: "What we do",
  heading: "Six ways we turn compassion into action.",
  items: [
    {
      n: "01",
      title: "Food Security",
      icon: "bowl",
      blurb: null,
      // Shares the Events photograph: this is the only food photography
      // supplied. A second one would remove the repeat.
      photo: {
        src: "/images/event-food-outreach.jpg",
        alt: "Women carrying bags of food staples received at a Love & Light Foundation community outreach",
      },
    },
    {
      n: "02",
      title: "Education",
      icon: "book",
      blurb: null,
      photo: {
        src: "/images/programme-education.jpg",
        alt: "A school pupil in uniform speaking into a microphone at a school outreach",
      },
    },
    {
      n: "03",
      title: "Youth Empowerment",
      icon: "sprout",
      blurb: null,
      photo: {
        src: "/images/programme-youth.jpg",
        alt: "A Love & Light Foundation volunteer addressing rows of secondary school students in a school hall",
      },
    },
    {
      n: "04",
      title: "Women Development",
      icon: "person",
      blurb: null,
      photo: {
        src: "/images/programme-women.jpg",
        alt: "Three women wearing project manager passes in front of a Sustainable Development Goals banner at a ladies conference",
      },
    },
    {
      n: "05",
      title: "Community Development",
      icon: "buildings",
      blurb: null,
      photo: {
        src: "/images/programme-community.jpg",
        alt: "The Love & Light Foundation team and community members gathered outside a diocesan hall in Ibadan",
      },
    },
    {
      n: "06",
      title: "CSR Execution for Partners",
      icon: "briefcase",
      blurb:
        "We help you execute your CSR projects for your company, landmark event, birthday or anniversaries",
      photo: {
        src: "/images/programme-csr.jpg",
        alt: "Attendees filling a hall at a conference session",
      },
      strong: true,
    },
  ] satisfies ReadonlyArray<Programme>,
} as const;

export type EventItem = {
  date: string;
  /** ISO 8601 (may be partial, e.g. "2026-12") for <time dateTime>; null when unknown. */
  dateTime: string | null;
  title: string;
  photo: Photo | null;
  placeholder: string;
};

export const events = {
  eyebrow: "Events",
  heading: "Current opportunities to create impact.",
  items: [
    {
      date: "December 2026",
      dateTime: "2026-12",
      title: "Food Outreach 2026",
      photo: {
        src: "/images/event-food-outreach.jpg",
        alt: "Women carrying bags of food staples received at a Love & Light Foundation community outreach",
      },
      placeholder: "[PHOTO: Food Outreach]",
    },
    {
      date: "2027",
      dateTime: "2027",
      title: "Global Skills for Youth 2027",
      photo: {
        src: "/images/event-global-skills.jpg",
        alt: "Secondary school students in uniform cheering during a Love & Light Foundation school outreach",
      },
      placeholder: "[PHOTO: Global Skills for Youth]",
    },
    {
      date: "[DATE]",
      dateTime: null,
      title: "Legacy Project: School Renovation",
      photo: null,
      placeholder: "[PHOTO: School Renovation]",
    },
  ] satisfies ReadonlyArray<EventItem>,
} as const;

export const involved = {
  eyebrow: "Get involved",
  /**
   * Panels in the priority order the client set: Friends first, then
   * Partnership, then Volunteer. Partnership copy lives in `partner`
   * below, which the closing band also used before it was merged here.
   */

  friends: {
    label: "Friends of Love & Light",
    badge: "From ₦2,000 / month",
    heading: "Change a life every month.",
    body: "Friends of Love & Light is our monthly giving community, a family of compassionate people committed to creating lasting impact through consistent generosity. With a commitment of ₦2,000 or more each month, you help provide meals, expand access to education, empower young people with life-changing skills, and support community development projects throughout the year.",
    perks: [
      "Exclusive impact updates",
      "Transparent reports on your giving",
      "Invitations to special projects and annual gatherings",
      "The joy of knowing you're changing lives consistently",
    ],
    closing:
      "Because lasting impact isn't built by one person, it is built by people who choose to show up, month after month.",
    cta: "Become a Friend",
  },
  volunteer: {
    label: "Volunteer With Us",
    heading: "Be the reason someone believes tomorrow can be better.",
    body: "Your time, skills, and passion can create lasting change. Whether you're a student, young professional, creative, entrepreneur, or simply someone who wants to make a difference, there's a place for you at Love & Light Foundation. Join our community of volunteers and help us deliver outreaches, empower communities, organize impactful events, and bring hope to those who need it most.",
    cta: "Become a Volunteer",
  },
} as const;

export const partner = {
  heading: "Partner with us",
  body: "Corporates, foundations and institutions: we plan and deliver CSR programmes that create measurable change in communities.",
  cta: "Start a partnership",
} as const;

/**
 * News & Stories. The client is sending two reviews from past projects; until
 * they arrive each slot renders a labelled placeholder, the same convention the
 * handoff uses for missing photos and dates.
 */
export type Review = {
  quote: string;
  name: string;
  project: string;
};

/** Empty until the client sends the two reviews; typed so the section compiles. */
const reviews: ReadonlyArray<Review> = [];

export const news = {
  eyebrow: "News & stories",
  heading: "What people say about the work.",
  reviews,
  placeholders: ["[REVIEW 1: quote, name, project]", "[REVIEW 2: quote, name, project]"],
} as const;

export const footer = {
  body: org.description,
  contactLabel: "Contact",
  followLabel: `Follow ${org.handle}`,
  copyright: `© 2026 ${org.legalName}. All rights reserved.`,
} as const;
