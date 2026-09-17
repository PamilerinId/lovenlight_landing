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

export type PersonPhoto = Photo & { person?: Person };

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
  partner: `mailto:${org.email}`,
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
  strong?: boolean;
};

export const programmes = {
  eyebrow: "What we do",
  heading: "Six ways we turn compassion into action.",
  items: [
    { n: "01", title: "Food Security", icon: "bowl" },
    { n: "02", title: "Education", icon: "book" },
    { n: "03", title: "Youth Empowerment", icon: "sprout" },
    { n: "04", title: "Women Development", icon: "person" },
    { n: "05", title: "Community Development", icon: "buildings" },
    { n: "06", title: "CSR Execution for Partners", icon: "briefcase", strong: true },
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
  volunteer: {
    label: "Volunteer With Us",
    heading: "Be the reason someone believes tomorrow can be better.",
    body: "Your time, skills, and passion can create lasting change. Whether you're a student, young professional, creative, entrepreneur, or simply someone who wants to make a difference, there's a place for you at Love & Light Foundation. Join our community of volunteers and help us deliver outreaches, empower communities, organize impactful events, and bring hope to those who need it most.",
    cta: "Become a Volunteer",
  },
  /**
   * Photo mosaic beside the Volunteer panel. Tiles with a `person` carry a
   * caption naming them; this doubles as the site's leadership presence.
   */
  gallery: [
    {
      src: "/images/volunteer-school-hall.jpg",
      alt: "A Love & Light Foundation volunteer addressing rows of secondary school students in a school hall",
    },
    {
      src: "/images/volunteer-pulpit.jpg",
      alt: `${leadership.founder.name}, ${leadership.founder.role} of Love & Light Foundation, speaking into a microphone in a foundation T-shirt`,
      person: leadership.founder,
    },
    {
      src: "/images/volunteer-rebirth.jpg",
      alt: "A guest speaker addressing seated attendees at Rebirth, a Love and Light experience",
    },
    {
      src: "/images/volunteer-outdoor.jpg",
      alt: `${leadership.grandPatron.name}, ${leadership.grandPatron.role} of Love & Light Foundation, speaking with a microphone at an outdoor gathering`,
      person: leadership.grandPatron,
    },
  ] satisfies ReadonlyArray<PersonPhoto>,
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
} as const;

export const partner = {
  heading: "Partner with us",
  body: "Corporates, foundations and institutions: we plan and deliver CSR programmes that create measurable change in communities.",
  cta: "Start a partnership",
} as const;

export const footer = {
  body: org.description,
  contactLabel: "Contact",
  followLabel: `Follow ${org.handle}`,
  copyright: `© 2026 ${org.legalName}. All rights reserved.`,
} as const;
