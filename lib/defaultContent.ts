/**
 * Central, editable content for the public website.
 * Everything here can be changed from the admin panel (Site Content).
 * This module is intentionally free of server-only imports so it can be
 * shared by both server components and the client-side ContentProvider.
 */

export type NavLink = { label: string; href: string };
export type Stat = { value: string; label: string };
export type HeroSlide = { image: string; alt: string };

export type MissionCard = {
  icon: string;
  title: string;
  description: string;
  items: string[];
};

export type StoryContent = {
  eyebrow: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  childName: string;
  childMeta: string;
  short: string;
  full: string;
  image: string;
  trustNote: string;
  readMore: string;
  readLess: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};

export type CauseItem = {
  title: string;
  description: string;
  image: string;
  href: string;
  badge: string;
  featured: boolean;
  icon: string;
};

export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  details: string;
  image: string;
};

export type FounderItem = {
  name: string;
  designation: string;
  image: string;
  email: string;
  bio: string;
};

export type VolunteerItem = { icon: string; title: string; text: string };

export type TestimonialItem = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export type PartnerItem = { name: string; logo: string; url: string };

export type InfoItem = { icon: string; title: string; details: string[] };

export type CauseChoice = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type SiteContent = {
  site: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    phoneAlt: string;
    address: string;
    logo: string;
  };
  nav: {
    links: NavLink[];
    volunteerLabel: string;
    donateLabel: string;
  };
  announcement: {
    enabled: boolean;
    label: string;
    text: string;
    linkLabel: string;
    linkHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    slides: HeroSlide[];
    primaryCta: NavLink;
    secondaryCta: NavLink;
    brochureLabel: string;
    typedWords: string[];
    stats: Stat[];
  };
  mission: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: MissionCard[];
  };
  story: StoryContent;
  causes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CauseItem[];
    viewAllLabel: string;
    viewAllHref: string;
  };
  events: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: EventItem[];
  };
  founders: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FounderItem[];
  };
  volunteer: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    items: VolunteerItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  partners: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: PartnerItem[];
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    storyTitle: string;
    storyParagraphs: string[];
    image: string;
    missionVision: { icon: string; title: string; description: string }[];
    impactTitle: string;
    impactSubtitle: string;
    impact: {
      title: string;
      description: string;
      image: string;
      achievements: string[];
    }[];
    ctaTitle: string;
    ctaText: string;
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    infoText: string;
    items: InfoItem[];
    mapEmbedUrl: string;
    formTitle: string;
    successMessage: string;
  };
  donate: {
    title: string;
    subtitle: string;
    presetAmounts: number[];
    causes: CauseChoice[];
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  footer: {
    about: string;
    newsletterTitle: string;
    newsletterText: string;
    quickLinksTitle: string;
    connectTitle: string;
    links: NavLink[];
    rights: string;
  };
  seo: { title: string; description: string };
};

export const defaultContent: SiteContent = {
  site: {
    name: "Aid 4 Children Tanzania",
    shortName: "A4C Tanzania",
    tagline: "Hope, education and dignity for every child",
    description:
      "A Tanzanian non-profit empowering children in difficult circumstances through education, healthcare and community support.",
    email: "info@aid4childrentz.org",
    phone: "+255 769 999 902",
    phoneAlt: "+255 766 400 006",
    address: "Dar es Salaam, Tanzania",
    logo: "/A4C_Logo.svg",
  },
  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    volunteerLabel: "Become a Volunteer",
    donateLabel: "Donate",
  },
  announcement: {
    enabled: true,
    label: "Latest update",
    text: "School supplies needed for the upcoming academic year — your support can make a difference.",
    linkLabel: "Support this drive",
    linkHref: "/donate",
  },
  hero: {
    eyebrow: "A Tanzanian child-focused foundation",
    title: "Every child deserves a chance to learn, heal and dream",
    subtitle:
      "Aid 4 Children Tanzania works alongside communities to give vulnerable children access to quality education, healthcare and a safer, brighter future.",
    slides: [
      { image: "/bg1.jpg", alt: "Children learning together" },
      { image: "/bg22.jpg", alt: "Community outreach in Tanzania" },
      { image: "/bg3.jpg", alt: "Children smiling at school" },
    ],
    primaryCta: { label: "Support Our Work", href: "/donate" },
    secondaryCta: { label: "Explore Projects", href: "/projects" },
    brochureLabel: "Download Our Brochure",
    typedWords: ["Aid", "Hope", "Future"],
    stats: [
      { value: "150+", label: "Children supported" },
      { value: "12", label: "Communities engaged" },
      { value: "3", label: "Flagship programmes" },
      { value: "100%", label: "Community driven" },
    ],
  },
  mission: {
    eyebrow: "Who we are",
    title: "A clear direction, a shared purpose",
    subtitle:
      "Our work is guided by a simple conviction: when a child is given the right support, an entire community moves forward.",
    cards: [
      {
        icon: "Compass",
        title: "Our Mission",
        description:
          "To empower and uplift children in difficult environments by providing education, healthcare and social support — offering the resources, advocacy and network every child needs to build a brighter future.",
        items: [],
      },
      {
        icon: "Eye",
        title: "Our Vision",
        description:
          "A Tanzania where every child, regardless of their circumstances, has the opportunity to grow, learn and thrive in a safe and supportive environment.",
        items: [],
      },
      {
        icon: "Target",
        title: "Our Objectives",
        description: "",
        items: [
          "Promote access to quality education for disadvantaged children",
          "Advocate for improved healthcare services for children",
          "Raise awareness on social and emotional well-being",
          "Empower communities to support children's development",
        ],
      },
    ],
  },
  story: {
    eyebrow: "A story of change",
    badge: "Real story",
    title: "Meet",
    highlight: "Aarav",
    subtitle: "One child's journey from an impossible dream to unstoppable determination",
    childName: "Aarav's Story",
    childMeta: "8 years old • Future doctor",
    short:
      "Aarav, a bright 8-year-old from a remote village, dreams of becoming a doctor. But without access to proper education and books, his future hangs in the balance…",
    full: `Aarav, a bright 8-year-old from a remote village, dreams of becoming a doctor. Every day, he walks five kilometres to a makeshift school with torn textbooks and broken chalkboards.

His father works as a daily wage labourer, earning barely enough to feed a family of five. Aarav's medical dream seemed impossible until our education programme reached his village.

Today, Aarav has proper textbooks, a digital learning tablet and access to online classes. His teacher says, "He's the most curious student I've ever taught." In just one year his grades improved by 75%, and he now teaches younger children after school.

"When I grow up," Aarav says, "I'll build a hospital right here in my village so no one has to walk for days to see a doctor."`,
    image: "/kidstory.jpg",
    trustNote: "100% of designated donations go directly to children's education.",
    readMore: "Read Full Story",
    readLess: "Show Less",
    ctaTitle: "Moved by Aarav's story?",
    ctaText:
      "Your support can help more children like Aarav access education, hope and a brighter future.",
    ctaLabel: "Donate Now",
  },
  causes: {
    eyebrow: "Our programmes",
    title: "Projects & touching stories",
    subtitle:
      "Join us in supporting these critical initiatives that change lives every day.",
    items: [
      {
        title: "Edumisha",
        description:
          "Providing school supplies, scholarships and digital skills to underprivileged children.",
        image: "/Edumisha_img.jpg",
        href: "/projects",
        badge: "Education",
        featured: false,
        icon: "GraduationCap",
      },
      {
        title: "FooDonation",
        description:
          "Building wells and water purification systems in drought-affected communities.",
        image: "/FooDonation.jpg",
        href: "/projects",
        badge: "Food & Water",
        featured: false,
        icon: "Droplets",
      },
      {
        title: "A4C Afya Programme",
        description:
          "Creating safe spaces, health outreach and rehabilitation support for children.",
        image: "/A4CAfya.jpg",
        href: "/projects",
        badge: "Featured story",
        featured: true,
        icon: "HeartPulse",
      },
    ],
    viewAllLabel: "View All Projects",
    viewAllHref: "/projects",
  },
  events: {
    eyebrow: "A4C updates",
    title: "Stories of progress, impact and change",
    subtitle: "Follow our latest activities across Tanzania.",
    items: [
      {
        title: "A4C Edumisha",
        date: "15 October 2025",
        time: "12:00 PM",
        location: "Maji Matitu Primary School",
        description:
          "A day of inspiration and giving at our signature education outreach event.",
        details:
          "The event features keynote speakers, student performances, a fundraising auction and a community dinner. Dress code: smart casual.",
        image: "/event11.jpeg",
      },
      {
        title: "Nane Nane 2025",
        date: "5 November 2025",
        time: "9:00 AM – 3:00 PM",
        location: "Various locations",
        description:
          "Help us collect non-perishable food items for families in need this season.",
        details:
          "Volunteers will be assigned to collection points across the city. Transport and refreshments will be provided.",
        image: "/nanenane.jpg",
      },
      {
        title: "Education Summit",
        date: "20 December 2025",
        time: "10:00 AM – 4:00 PM",
        location: "Convention Centre, Dar es Salaam",
        description: "Experts discuss innovative solutions to educational inequality.",
        details:
          "Panels include educators, policymakers and NGO leaders, followed by an open community forum.",
        image: "/event11.jpeg",
      },
    ],
  },
  founders: {
    eyebrow: "Leadership",
    title: "Meet the founders",
    subtitle: "The visionary duo behind our mission.",
    items: [
      {
        name: "Gideon Felix",
        designation: "Founder & Director",
        image: "/GIDDYA4C.jpg",
        email: "gideonfelixy@aid4children.org",
        bio: "Leads the organisation's strategy, partnerships and programme delivery across Tanzania.",
      },
      {
        name: "Idrissa Abdallah",
        designation: "Founder & Associate Director",
        image: "/IDDY_SAMPLE.jpg",
        email: "director@aid4children.org",
        bio: "Oversees community engagement, field operations and volunteer development.",
      },
    ],
  },
  volunteer: {
    eyebrow: "Get involved",
    title: "Become a volunteer",
    description:
      "Your time and skills can change lives. Join a team of dedicated volunteers making a difference in communities across Tanzania.",
    ctaLabel: "Join Our Team",
    ctaHref: "/become-volunteer",
    items: [
      {
        icon: "MapPin",
        title: "Local opportunities",
        text: "Support food drives, tutoring and outreach in your own community.",
      },
      {
        icon: "Globe2",
        title: "Field missions",
        text: "Travel with us to deliver aid in underserved regions.",
      },
      {
        icon: "Laptop",
        title: "Virtual volunteering",
        text: "Contribute remotely with your professional skills.",
      },
      {
        icon: "Building2",
        title: "Corporate programmes",
        text: "Engage your workplace in meaningful team volunteering.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Voices",
    title: "Stories of impact",
    subtitle: "Hear from the people whose lives have been touched by our work.",
    items: [
      {
        name: "Georville Marcus",
        role: "Donor since 2024",
        content:
          "Seeing the impact of my donations through regular updates keeps me motivated to give more. This organisation truly makes every shilling count.",
        avatar: "/Smiley.jpg",
      },
      {
        name: "Hassan Mohamed",
        role: "Volunteer",
        content:
          "Volunteering here has been life-changing. The transparency and dedication of the team is unmatched.",
        avatar: "/Smiley.jpg",
      },
      {
        name: "Mama Jackson",
        role: "Beneficiary",
        content:
          "Hakika mnafanya kazi nzuri sana kwenye jamii. Tunashukuru kwa mnavyojitoa kwa ajili ya watoto wetu — Mungu azidi kuwainua.",
        avatar: "/Smiley.jpg",
      },
    ],
  },
  partners: {
    eyebrow: "Our partners",
    title: "Trusted by organisations that share our vision",
    subtitle:
      "Together with these organisations we are creating lasting change for children in Tanzania.",
    items: [
      {
        name: "Alnoor Foundation",
        logo: "/Alnoor.png",
        url: "https://www.unicef.org",
      },
      {
        name: "Government of Tanzania",
        logo: "/Coat Of Arm.png",
        url: "https://www.tanzania.go.tz/",
      },
      {
        name: "Africa Relief and Community Development",
        logo: "/ARCD.png",
        url: "https://africarelief.org/",
      },
      { name: "Naprint", logo: "/Naprint.png", url: "" },
      {
        name: "Save the Children Tanzania",
        logo: "/savethechildren.png",
        url: "https://www.savethechildren.net/tanzania",
      },
      { name: "Little Gidy", logo: "/LG logo.png", url: "" },
    ],
  },
  about: {
    heroTitle: "About our organisation",
    heroSubtitle:
      "Committed to transforming lives through education, health and community development.",
    storyTitle: "Our story",
    storyParagraphs: [
      "Aid 4 Children Tanzania was founded in 2024 by two friends who shared a simple yet powerful belief: every child deserves the chance to learn, grow and dream, no matter where they are born.",
      "The idea took shape during a visit to a remote village, where they met Asha, a young girl who walked several miles barefoot each day just to borrow old books from a nearby school. Despite the challenges, her determination to learn never faded.",
      "That encounter changed everything. Inspired by Asha's courage and resilience, they decided to turn compassion into action, and Aid 4 Children Tanzania was born.",
      "Since then the organisation has worked to reach more children like Asha by creating opportunities for education, access to essential resources and a foundation for a brighter future.",
      "Every project, every book and every smile shared is guided by that same belief: when we give a child a chance, we give a community hope.",
    ],
    image: "/EDUMISHA Maji matitu.jpg",
    missionVision: [
      {
        icon: "ShieldCheck",
        title: "Our Mission",
        description:
          "To empower underprivileged children in Tanzania through quality education, healthcare and community development programmes that create sustainable change.",
      },
      {
        icon: "Eye",
        title: "Our Vision",
        description:
          "A Tanzania where every child has access to education, healthcare and opportunities to reach their full potential, regardless of their background.",
      },
    ],
    impactTitle: "Our impact initiatives",
    impactSubtitle:
      "Exploring the comprehensive programmes that create lasting change in communities.",
    impact: [
      {
        title: "Educational empowerment",
        description:
          "Transforming learning environments into vibrant spaces where children discover the joy of education through interactive programmes and modern teaching methods.",
        image: "/EDUMISHA Maji matitu.jpg",
        achievements: [
          "Modern classroom facilities established",
          "Interactive learning programmes implemented",
          "Educational resources distributed",
        ],
      },
      {
        title: "Literacy development",
        description:
          "Establishing comprehensive reading programmes and library resources that foster literacy and inspire a lifelong passion for learning.",
        image: "/IDDY_SAMPLE.jpg",
        achievements: [
          "Reading clubs established",
          "Library resources provided",
          "Literacy programmes launched",
        ],
      },
      {
        title: "Health & wellness",
        description:
          "Implementing healthcare initiatives and nutritional support programmes so that children's physical well-being supports their educational journey.",
        image: "/IDDY_SAMPLE.jpg",
        achievements: [
          "Regular health assessments conducted",
          "Nutritional support programmes",
          "Hygiene education implemented",
        ],
      },
      {
        title: "Community engagement",
        description:
          "Building sustainable community partnerships that empower local villages to champion their children's development.",
        image: "/IDDY_SAMPLE.jpg",
        achievements: [
          "Parent education workshops conducted",
          "Community centres established",
          "Local partnership networks developed",
        ],
      },
    ],
    ctaTitle: "Join our mission",
    ctaText:
      "Whether you want to volunteer, donate or partner with us, there are many ways to create meaningful impact in children's lives.",
  },
  contact: {
    title: "Get in touch",
    subtitle:
      "We would love to hear from you. Whether you want to volunteer, donate or learn more about our mission, our team is ready to help.",
    infoTitle: "Contact information",
    infoText:
      "Reach out through any of the channels below. We are here to answer your questions about our work with children in Tanzania.",
    items: [
      {
        icon: "MapPin",
        title: "Visit us",
        details: ["Dar es Salaam", "Tanzania"],
      },
      {
        icon: "Phone",
        title: "Call us",
        details: ["+255 769 999 902", "+255 766 400 006"],
      },
      {
        icon: "Mail",
        title: "Email us",
        details: ["info@aid4childrentz.org", "support@aid4childrentz.org"],
      },
      {
        icon: "Clock",
        title: "Working hours",
        details: ["Monday – Friday: 8:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM"],
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63570.04350813209!2d39.20816545!3d-6.823461949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b0f6b6f3dc9%3A0x65c8718391f54a9d!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    formTitle: "Send us a message",
    successMessage:
      "Thank you for your message. Our team will get back to you within two business days.",
  },
  donate: {
    title: "Make a difference today",
    subtitle:
      "Your donation helps us provide education, healthcare and hope to children and communities across Tanzania.",
    presetAmounts: [5000, 10000, 20000, 50000, 100000],
    causes: [
      {
        id: "education",
        name: "Education",
        description: "Support children's education",
        icon: "BookOpen",
      },
      {
        id: "healthcare",
        name: "Healthcare",
        description: "Provide medical assistance",
        icon: "HeartPulse",
      },
      {
        id: "community",
        name: "Community",
        description: "Community development",
        icon: "Users",
      },
      {
        id: "general",
        name: "General Fund",
        description: "Where most needed",
        icon: "Heart",
      },
    ],
  },
  projectsPage: {
    eyebrow: "Our work",
    title: "Projects that transform lives",
    subtitle:
      "Sustainable, community-led development projects across Tanzania.",
  },
  footer: {
    about:
      "Aid 4 Children Tanzania is a child-focused non-profit creating opportunities for vulnerable children through education, healthcare and community support.",
    newsletterTitle: "Stay updated",
    newsletterText:
      "Receive occasional updates on our programmes and the children whose lives you help change.",
    quickLinksTitle: "Quick links",
    connectTitle: "Connect with us",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/become-volunteer" },
      { label: "Contact", href: "/contact" },
    ],
    rights: "All rights reserved.",
  },
  seo: {
    title: "Aid 4 Children Tanzania | Hope, education and dignity for every child",
    description:
      "Aid 4 Children Tanzania empowers vulnerable children through education, healthcare, clean water and community-led development.",
  },
};
