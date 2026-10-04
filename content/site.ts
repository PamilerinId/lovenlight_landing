/**
 * Single source of truth for every word, number and link on the site.
 * Consumed by the page sections, metadata, JSON-LD, the Open Graph image and
 * /llms.txt, so copy can never drift between them.
 *
 * Copy is transcribed verbatim from design/HANDOFF.md and the client brief.
 * Do not paraphrase or invent facts. A missing photograph renders as an
 * illustrated panel (see ArtPanel), never as an empty box.
 */

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, for photos whose subjects sit off-centre. */
  position?: string;
};

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
  // Supplied by the client. `partner` is shared by Partner With Us, the CSR
  // card and Love in Action; `donate` is a hosted Paystack payment page, so
  // no payment handling lives on this site.
  partner: "https://forms.gle/4RPbnuThZHGbebxk6",
  donate: "https://paystack.shop/pay/vt_4u04sfvk",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/loveandlightngo" },
    { name: "TikTok", href: "https://www.tiktok.com/@loveandlightngo" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/loveandlightngo/" },
    { name: "YouTube", href: "https://youtube.com/@loveandlightngo" },
  ],
} as const;

/**
 * Section links are absolute ("/#about") so they work from every page, not
 * only the home page. Contact stays relative: the footer is on every page.
 */
export const nav = {
  items: [
    { label: "About", href: "/#about" },
    { label: "Programmes", href: "/#programmes" },
    { label: "Events", href: "/#events" },
    { label: "News & Stories", href: "/#news" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Get involved", href: "/get-involved" },
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
  /**
   * Behind the headline, dimmed by a scrim: three children at an outreach.
   * Decorative at that strength, so it carries no alt text.
   */
  background: { src: "/images/hero-students.jpg" },
  /** In front, on the right: the two volunteers. */
  photo: {
    src: "/images/hero-volunteers.jpg",
    alt: "James and Sunmi, two Love & Light Foundation volunteers, smiling and pointing at the foundation logo on their T-shirts",
  } as Photo | null,
  chips: [
    { value: "5,000+", label: "families reached" },
    { value: "80+", label: "volunteers" },
  ],
} as const;

export const impact = {
  eyebrow: "Chapter 02 · Our reach so far",
  heading: "Our impact in numbers.",
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
  eyebrow: "Chapter 01 · Our story",
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
 * "Our people" — its own section, placed after "What we do" at the client's
 * request. Kept well away from the Friends of Love & Light panel so the
 * patrons never appear to be the ones asking for money.
 */
export const people = {
  eyebrow: "Chapter 04 · Our people",
  // New connective heading for the story; flagged for client approval.
  heading: "The people behind the work.",
  items: [
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
      // Label wording requested by the client.
      name: "Some of our Patrons and Matrons",
      role: null,
      wide: true,
      photo: {
        src: "/images/people-patrons.jpg",
        alt: "Some of the patrons and matrons of Love & Light Foundation photographed together at Rebirth, a Love and Light experience",
      },
    },
    {
      // A general team photograph, at the client's request. The certificate
      // photograph that was here now sits beside its subject's review.
      name: "Our volunteers",
      role: null,
      wide: true,
      photo: {
        src: "/images/people-volunteers.jpg",
        alt: "Love & Light Foundation volunteers and team members gathered outside a diocesan hall in Ibadan",
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

/** A text link shown at the foot of a card. */
export type CardLink = { label: string; href: string };

export type Programme = {
  n: string;
  title: string;
  icon: ProgrammeIconName;
  /**
   * One or two lines describing the programme, as supplied by the client.
   * Only spelling, capitalisation and punctuation were corrected; the wording
   * is theirs.
   */
  blurb: string | null;
  photo: Photo | null;
  cta?: CardLink;
  strong?: boolean;
};

export const programmes = {
  eyebrow: "Chapter 03 · What we do",
  heading: "Six ways we turn compassion into action.",
  items: [
    {
      n: "01",
      title: "Food Security",
      icon: "bowl",
      blurb:
        "We have an annual Food Outreach every December and through that we have reached several families in need of immediate relief.",
      photo: {
        src: "/images/event-food-outreach.jpg",
        alt: "Women carrying bags of food staples received at a Love & Light Foundation community outreach",
      },
    },
    {
      n: "02",
      title: "Education",
      icon: "book",
      blurb:
        "Our Identity and School Outreach Tour has impacted the lives of several students across different states, including Ondo State, Oyo State, Lagos State, Ogun State etc.",
      photo: {
        src: "/images/programme-education.jpg",
        alt: "A school pupil in uniform speaking into a microphone at a school outreach",
      },
    },
    {
      n: "03",
      title: "Youth Empowerment",
      icon: "sprout",
      blurb: "We give out grants, we organize skill acquisition programmes.",
      photo: {
        src: "/images/programme-youth.jpg",
        alt: "A Love & Light Foundation volunteer addressing rows of secondary school students in a school hall",
      },
    },
    {
      n: "04",
      title: "Women Development",
      icon: "person",
      blurb:
        "Our Transcend Ladies Conference is our major impact engine for women, among many others.",
      photo: {
        src: "/images/programme-women.jpg",
        alt: "Three women wearing project manager passes in front of a Sustainable Development Goals banner at a ladies conference",
      },
    },
    {
      n: "05",
      title: "Community Development",
      icon: "buildings",
      blurb:
        "We carry out school renovation projects, monthly welfare relief for communities and community interventions.",
      photo: {
        src: "/images/programme-community.jpg",
        alt: "Love & Light Foundation volunteers gathered with members of a local community, including elders and children",
      },
    },
    {
      n: "06",
      title: "CSR Execution for Partners",
      icon: "briefcase",
      // Wording as it appeared in the client-approved checklist.
      blurb:
        "We help you execute your CSR projects for your company, landmark event, birthday, or anniversary.",
      photo: {
        src: "/images/programme-csr-transcend.jpg",
        alt: "Two men sharing a warm moment on stage at the Transcend Ladies Conference, one holding a microphone and the other receiving a gift bag",
        // Both faces sit in the left two-thirds; centre would clip one.
        position: "24% 50%",
      },
      // The client asked for this to use the same link as Partner With Us.
      cta: { label: "Partner with us →", href: links.partner },
      strong: true,
    },
  ] satisfies ReadonlyArray<Programme>,
} as const;

export type EventItem = {
  title: string;
  /** Shown above the title. null when the client has not given one. */
  date: string | null;
  /** ISO 8601 (may be partial, e.g. "2026-12") for <time dateTime>; null when unknown. */
  dateTime: string | null;
  /** A secondary line under the title, such as a list of locations. */
  detail?: string;
  blurb?: string;
  /**
   * When there is no photograph yet, the card shows an illustrated panel
   * built from this line icon instead, so it never looks empty.
   */
  photo: Photo | null;
  art?: ProgrammeIconName;
  cta?: CardLink;
};

/**
 * Past events come first, then current opportunities, in the order the
 * client asked for: the track record before the ask.
 *
 * The client listed seven past events. They are grouped into three cards
 * by type because the photographs supplied are not labelled by location or
 * year, so a card per school or per year would have to guess which picture
 * belongs where. Grouping keeps every photo accurate. All seven names are
 * still on the page.
 */
export const events = {
  past: {
    eyebrow: "Chapter 05 · Past events",
    // New connective heading for the story; flagged for client approval.
    heading: "Where we've been.",
    items: [
      {
        title: "Transcend Ladies Conference",
        date: "March 2025",
        dateTime: "2025-03",
        photo: {
          src: "/images/past-transcend.jpg",
          alt: "Speakers seated on stage during a panel session at the Transcend Ladies Conference",
        },
      },
      {
        title: "Food Outreach",
        date: "2024 & 2025",
        dateTime: null,
        photo: {
          src: "/images/past-food-outreach.jpg",
          alt: "An elderly man holding a relief bag received at a Love & Light Foundation food outreach",
        },
      },
      {
        title: "School Outreach",
        date: null,
        dateTime: null,
        detail: "Mowe, Ogun State · Akure, Ondo State · Ibadan, Oyo State · Ogudu, Lagos State",
        photo: {
          src: "/images/past-school-outreach.jpg",
          alt: "Students in green checked uniforms gathered for a Love & Light Foundation school outreach",
        },
      },
    ] satisfies ReadonlyArray<EventItem>,
  },
  current: {
    eyebrow: "Chapter 06 · What's next",
    heading: "Current opportunities to create impact.",
    items: [
      {
        title: "Food Outreach 2026",
        date: "December 2026",
        dateTime: "2026-12",
        // The client is sending the event flier for this slot. Until then the
        // card shows an illustration built from the food icon.
        photo: null,
        art: "bowl",
      },
      {
        title: "Global Skills for Youth 2027",
        date: "2027",
        dateTime: "2027",
        photo: {
          src: "/images/event-global-skills.jpg",
          alt: "Secondary school students in uniform cheering during a Love & Light Foundation school outreach",
        },
      },
      {
        title: "Legacy Project: School Renovation",
        date: "2027",
        dateTime: "2027",
        photo: null,
        art: "buildings",
      },
      {
        title: "Love in Action",
        date: "Monthly",
        dateTime: null,
        blurb: "Our monthly welfare relief project (make a random person smile).",
        photo: {
          src: "/images/event-love-in-action-cake.jpg",
          alt: "Pupils in orange and blue school uniforms cheering with their arms raised around a cake at a Love & Light Foundation outreach",
        },
        // Same link as Partner With Us, as the client asked.
        cta: { label: "Partner with us →", href: links.partner },
      },
    ] satisfies ReadonlyArray<EventItem>,
  },
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

/**
 * The home page closes on a condensed version of the ask; the full detail
 * lives on /get-involved. Headings reuse the brief ("Ways to Get Involved")
 * and the original design ("Your part in the story").
 */
export const ask = {
  eyebrow: "Chapter 08 · Your part in the story",
  heading: "Ways to get involved.",
  more: { label: "See every way to help →", href: "/get-involved" },
} as const;

export const getInvolvedPage = {
  path: "/get-involved",
  eyebrow: "Get involved",
  heading: "Your part in the story.",
  /** Meta description only; not shown on the page. Facts from the copy above. */
  description:
    "Become a Friend of Love & Light from ₦2,000 a month, partner with us on CSR programmes, or volunteer your time and skills with Love & Light Foundation in Nigeria and Tanzania.",
} as const;

export const partner = {
  heading: "Partner with us",
  body: "Corporates, foundations and institutions: we plan and deliver CSR programmes that create measurable change in communities.",
  cta: "Start a partnership",
} as const;

/**
 * News & Stories: reviews supplied by the client. Quotes are as written,
 * except "Love & light" corrected to the organisation's own capitalisation.
 */
export type Review = {
  /** One string per paragraph. */
  quote: ReadonlyArray<string>;
  name: string;
  role: string;
  photo?: Photo;
};

const reviews: ReadonlyArray<Review> = [
  {
    name: "Agness A. Mnzava",
    role: "Tanzanian Delegate, Grant and Research Lead",
    quote: [
      "My journey with Love & Light Foundation has been deeply meaningful to me. Winning the Love & Light Essay Competition gave me the confidence to see that my ideas and voice could genuinely matter. Through the Pad Bank Project, I also had the opportunity to witness how a simple initiative can bring dignity, support and hope to girls in ways that feel very real and personal.",
      "Love & Light has helped me grow not only as a young professional, but also as someone who wants to use her voice and skills to serve others. I am grateful for the people, experiences and opportunities that have reminded me that meaningful change often begins with simply caring enough to act.",
    ],
  },
  {
    name: "Toluwalade Arijeniwa",
    role: "Team Lead, Core Impact Team",
    quote: [
      "Being part of Love & Light has been a beautiful journey of service, growth, and genuine community. It has given me the opportunity to serve others, build meaningful relationships, and be part of initiatives that make a real difference. I'm grateful to be part of a community that truly lives out the values of love, compassion, and impact.",
    ],
    // The certificate in this photograph carries her name.
    photo: {
      src: "/images/review-toluwalade.jpg",
      alt: "Toluwalade Arijeniwa receiving a Love & Light Foundation certificate of recognition",
    },
  },
];

export const news = {
  eyebrow: "Chapter 07 · News & stories",
  heading: "What people say about the work.",
  reviews,
} as const;

export const footer = {
  body: org.description,
  copyright: `© 2026 ${org.legalName}. All rights reserved.`,
} as const;
