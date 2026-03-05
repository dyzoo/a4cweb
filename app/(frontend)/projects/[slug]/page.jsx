// app/(frontend)/projects/[slug]/page.jsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Target, 
  Award,
  Clock,
  Heart,
  BookOpen,
  Coffee,
  Bus,
  TrendingUp,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  Download,
  DollarSign,
  GraduationCap,
  Laptop,
  Sparkles,
  Users2,
  LineChart,
  HandshakeIcon
} from 'lucide-react';

// Project data based on PDF
const projectData = {
  'A4C-Edumisha-project': {
    id: 1,
    title: 'EDUMISHA Tech Empowerment Initiative 2026',
    subtitle: 'Bridging the Digital Divide Through Education',
    category: 'Digital Education',
    status: 'Active',
    heroImage: '/EdTech.jpg',
    summary: {
      title: 'Project Synopsis',
      content: 'The EDUMISHA Project, led by Aid 4 Children Tanzania, equips 150 underprivileged children aged 12-17 with essential digital and emerging technology skills through a structured 30-day intensive program covering computer applications, graphic design, web development basics, and Artificial Intelligence literacy. Each participant is assigned a laptop for use during training, with ownership transferred upon successful completion to support continued learning. To ensure equal access, the project provides daily meals and transportation throughout the program. Mentorship, career guidance, and structured alumni monitoring strengthen long-term impact, fostering a digitally skilled and self-reliant generation ready to contribute to Tanzania\'s growing technology-driven economy.',
      beneficiaries: 150,
      ageRange: '12-17 years',
      duration: '30 Days',
      location: 'Dar es Salaam, Tanzania',
      budget: 'USD 76,000'
    },
    about: {
      organization: {
        name: 'AID 4 CHILDREN TANZANIA',
        registration: 'OONGO/R/7343',
        established: 2022,
        registered: 2024,
        vision: 'To create a Tanzania where every child, regardless of their circumstances, has the opportunity to grow, learn, flourish and thrive in a safe and supportive environment.',
        mission: 'To empower and uplift children in difficult environments by providing education, healthcare, and social support. We strive to offer essential resources, advocacy, and a strong support network to help every child achieve their dreams and build a brighter future.',
        contact: {
          address: 'P.O BOX 10100 - DAR ES SALAAM, TANZANIA',
          phone: '+255 (0) 766 400 009',
          email: 'info@aid4children.org',
          website: 'www.aid4children.org'
        }
      }
    },
    background: {
      title: 'Background & Justification',
      founderStory: 'The founders of Aid 4 Children Tanzania (A4C), including a professional graphic designer who personally overcame similar challenges, understand the transformative power of technology. Having struggled to learn digital skills through self-teaching due to financial constraints, the founder recognized the importance of structured, hands-on exposure to technology education. This experience inspired the creation of the EDUMISHA Project.',
      content: 'Many Tanzanian children and teenagers face financial and social barriers that hinder their access to quality education, especially in technology-related fields. Despite the growing reliance on digital skills in today\'s economy, many young people remain disconnected from opportunities due to limited access to computers, the internet, and structured training programs.',
      challenge: 'The lack of access to digital tools and education severely limits the potential of Tanzanian youth, contributing to unemployment, economic hardship, and missed career opportunities. Many talented young people are unable to explore careers in graphic design, web development, Artificial Intelligence, and other technology-related fields simply because they lack foundational training and resources.'
    },
    objectives: [
      'Provide practical digital and Artificial Intelligence literacy training to 150 underprivileged children aged 12-17 through a structured 30-day intensive program',
      'Bridge the digital divide by assigning and transferring ownership of laptops to participants upon successful program completion',
      'Eliminate access barriers by providing daily meals and transportation support to ensure full and equitable participation',
      'Enhance employability and innovation capacity by integrating mentorship, career guidance, and soft skills development',
      'Establish a structured monitoring and alumni tracking system to measure long-term impact, support continued learning, and facilitate internship or digital income opportunities',
      'Promote digital inclusion and economic self-reliance among vulnerable youth in Tanzania'
    ],
    targetGroup: {
      description: 'Children and teenagers from disadvantaged backgrounds with an interest in technology but limited access to resources.',
      criteria: [
        'Children and teenagers (ages 12-17) from disadvantaged backgrounds',
        'Students with an interest in technology but limited access to resources',
        'Young learners who demonstrate enthusiasm and commitment to learning digital skills'
      ]
    },
    curriculum: [
      'Computer Basics & Office Applications',
      'Graphic Design (Photoshop, Illustrator, CorelDRAW, Canva)',
      'Introduction to Coding and Web Development',
      'Artificial Intelligence Literacy and Emerging Technologies'
    ],
    timeline: {
      phase1: {
        title: 'Planning and Outreach',
        duration: 'Months 1-2',
        activities: [
          'Identifying and recruiting participants from different districts in Dar es Salaam',
          'Partnering with schools, orphanages, and community centers to reach more children',
          'Setting up training centers and acquiring necessary equipment'
        ]
      },
      phase2: {
        title: 'Training Implementation',
        duration: 'Months 3-4',
        description: 'Delivering structured courses in computer applications, graphic design, web development, and AI literacy'
      },
      phase3: {
        title: 'Evaluation and Laptop Distribution',
        duration: 'Month 5',
        details: 'All training participants will be assigned individual laptops at the beginning of the program. These devices will be used throughout the training period to ensure hands-on, practical learning. Upon successful completion of the program and fulfillment of attendance and performance requirements, ownership of the same assigned laptop will be formally transferred to the participant. Each participant (and their guardian) will sign a laptop usage agreement outlining proper use, care responsibilities, and commitment to continued learning.',
        benefits: [
          'Continuous hands-on learning',
          'Personal responsibility and care for the device',
          'Cost efficiency',
          'Immediate continuation of learning after graduation'
        ]
      },
      phase4: {
        title: 'Monitoring, Evaluation and Alumni Development',
        duration: '24-month follow-up',
        description: 'Graduates will be monitored for up to 24 months after program completion through biannual alumni surveys, mentorship check-ins, tracking of continued education enrollment, freelancing or digital income generation activities, and internship and employment placement updates.',
        tracking: [
          'Digital database registration with demographic information, baseline skill levels, and laptop serial numbers',
          'Attendance tracking and continuous practical assessments',
          'Trainer performance reports and behavioral observations',
          'Biannual alumni surveys and mentorship check-ins',
          'Tracking of continued education and employment',
          'Freelancing and digital income generation monitoring'
        ],
        alumniNetwork: 'An EDUMISHA Alumni Network will be established to foster peer learning, collaboration, and mentorship. Graduates will have access to advanced refresher workshops, internship referrals, industry networking opportunities, peer-to-peer knowledge sharing, and ongoing career guidance.'
      }
    },
    supportServices: {
      meals: 'Daily meals and refreshments throughout the 30-day program to ensure attendance, safeguarding, and concentration',
      transportation: 'Transportation support to and from training sessions to ensure safe, reliable travel and maximize attendance',
      mentorship: 'Mentorship, career guidance, and soft skills development integrated throughout the program'
    },
    budget: {
      total: 76000,
      currency: 'USD',
      summary: 'The total estimated budget for the EDUMISHA Project is USD 76,000, structured to ensure high-quality training delivery, equitable access to digital resources, and measurable long-term impact.',
      breakdown: [
        { category: 'Laptops', amount: 33000, justification: 'Purchase of laptops for 150 students. Ensures continued learning, project sustainability, and digital access beyond training' },
        { category: 'Training Materials & Software', amount: 6500, justification: 'Software licenses, learning materials. Supports structured, hands-on practical digital training' },
        { category: 'Trainer Fees', amount: 12000, justification: 'Professional trainers and mentors. Ensures high-quality instruction and industry-aligned guidance' },
        { category: 'Operational Costs', amount: 5500, justification: 'Venue, electricity, internet. Required for effective training delivery and stable learning environment' },
        { category: 'Marketing & Outreach', amount: 2500, justification: 'Awareness campaigns, recruitment. Ensures inclusive access and broad community participation' },
        { category: 'Student T-Shirts', amount: 900, justification: 'Branded T-shirts for 150 students. Promotes identity, visibility, team spirit, and program branding' },
        { category: 'Meals for Students', amount: 6300, justification: 'Lunch & refreshments (30 days). Attendance, safeguarding & concentration' },
        { category: 'Transportation Support', amount: 4950, justification: 'Transportation for 150 students to and from training sessions. Ensures safe, reliable travel, maximizes attendance, and reduces logistical barriers' },
        { category: 'Monitoring & Alumni Tracking', amount: 2500, justification: 'Database, follow-ups & reporting. Long-term impact measurement' },
        { category: 'Contingency', amount: 1850, justification: 'Transport, logistics, emergency costs. Covers movement, coordination, and unforeseen operational needs' }
      ],
      costPerBeneficiary: 507,
      note: 'The cost per direct beneficiary represents a strategic investment in digital skills development, employability, and long-term socio-economic empowerment.'
    },
    expectedOutcomes: [
      'At least 150 children and teenagers trained annually in practical tech skills',
      'Participants equipped with practical tech skills for employment and entrepreneurship',
      'Increased access to technology and digital resources through laptop ownership',
      'Improved employability and innovation capacity among vulnerable youth',
      'A growing network of skilled young professionals in Tanzania\'s digital economy',
      'Measurable long-term impact through structured alumni tracking system'
    ],
    sustainability: [
      'Establishing partnerships with tech companies, NGOs, and government agencies',
      'Seeking funding and support from international organizations',
      'Encouraging alumni to give back through mentorship and peer training',
      'Exploring income-generating activities such as selling digital services created by students'
    ],
    partnerships: {
      description: 'To successfully implement this project, we seek partnerships and funding from tech companies, educational institutions, NGOs, government bodies, and corporate sponsors that align with our mission.',
      opportunities: [
        'Offering financial contributions to sustain and expand project initiatives',
        'Providing mentorship and educational content',
        'Donating laptops and learning materials',
        'Supporting outreach and awareness campaigns',
        'Funding training programs and equipment acquisition'
      ]
    },
    impact: {
      shortTerm: '150 youth equipped with digital skills and laptops',
      longTerm: 'Sustainable empowerment pathway through alumni network and continued support',
      measurement: 'Data collected through monitoring system used to produce annual impact reports, improve program design, strengthen donor reporting, inform expansion to other regions, and attract additional strategic partnerships'
    }
  }
};

export default async function ProjectPage({ params }) {
  // Await the params in Next.js 15+
  const { slug } = await params;
  const project = projectData[slug];
  
  if (!project) {
    notFound();
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] w-full">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex gap-3 mb-4">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                {project.category}
              </span>
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                {project.status}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center py-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">{project.summary.beneficiaries}</span>
                  <span className="text-gray-600 text-sm ml-1">Beneficiaries</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">{project.summary.duration}</span>
                  <span className="text-gray-600 text-sm ml-1">Program</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">{project.summary.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">{formatCurrency(project.budget.total)}</span>
                  <span className="text-gray-600 text-sm ml-1">Budget</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4" />
              Download Project Brief
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Synopsis */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                Project Synopsis
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {project.summary.content}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.summary.beneficiaries}</div>
                  <div className="text-sm text-gray-600">Beneficiaries</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{project.summary.ageRange}</div>
                  <div className="text-sm text-gray-600">Age Range</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{project.summary.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{project.summary.budget}</div>
                  <div className="text-sm text-gray-600">Total Budget</div>
                </div>
              </div>
            </section>

            {/* Background */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                Background & Justification
              </h2>
              
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 italic">
                  "{project.background.founderStory}"
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {project.background.content}
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-amber-800 mb-2">The Challenge</h3>
                <p className="text-amber-700">
                  {project.background.challenge}
                </p>
              </div>
            </section>

            {/* Objectives */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                Project Objectives
              </h2>
              <div className="grid gap-4">
                {project.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                Training Curriculum
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.curriculum.map((course, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Laptop className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Module {index + 1}</h3>
                    </div>
                    <p className="text-gray-700">{course}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                Project Timeline
              </h2>
              
              <div className="space-y-8">
                {Object.entries(project.timeline).map(([key, phase], index) => (
                  <div key={key} className="relative pl-8 pb-8 border-l-2 border-blue-200 last:border-0 last:pb-0">
                    <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow" />
                    <div className="mb-2">
                      <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-2">
                        Phase {index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-blue-600 font-semibold text-lg mb-3">{phase.duration}</p>
                    </div>
                    
                    {phase.activities && (
                      <ul className="space-y-3 mb-4">
                        {phase.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {phase.description && (
                      <p className="text-gray-700 mb-4">{phase.description}</p>
                    )}
                    
                    {phase.details && (
                      <div className="bg-gray-50 rounded-xl p-5 mb-4">
                        <p className="text-gray-700">{phase.details}</p>
                      </div>
                    )}
                    
                    {phase.benefits && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {phase.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {phase.tracking && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Tracking & Monitoring:</h4>
                        <ul className="space-y-2">
                          {phase.tracking.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {phase.alumniNetwork && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                        <p className="text-purple-800">{phase.alumniNetwork}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Support Services */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                Support Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-center">
                  <div className="p-3 bg-orange-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Daily Meals</h3>
                  <p className="text-sm text-gray-600">{project.supportServices.meals}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
                  <div className="p-3 bg-blue-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Bus className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Transportation</h3>
                  <p className="text-sm text-gray-600">{project.supportServices.transportation}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
                  <div className="p-3 bg-green-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Users2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Mentorship</h3>
                  <p className="text-sm text-gray-600">{project.supportServices.mentorship}</p>
                </div>
              </div>
            </section>

            {/* Expected Outcomes */}
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-teal-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                Expected Outcomes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.expectedOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Organization Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold">About the Organization</h3>
              </div>
              
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                {project.about.organization.name}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4 p-4 bg-gray-50 rounded-xl">
                <p><span className="font-semibold">Registration:</span> {project.about.organization.registration}</p>
                <p><span className="font-semibold">Established:</span> {project.about.organization.established}</p>
                <p><span className="font-semibold">Registered:</span> {project.about.organization.registered}</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h5 className="font-semibold text-blue-800 mb-2">Our Vision</h5>
                  <p className="text-sm text-blue-700">{project.about.organization.vision}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <h5 className="font-semibold text-green-800 mb-2">Our Mission</h5>
                  <p className="text-sm text-green-700">{project.about.organization.mission}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h5 className="font-semibold text-gray-900 mb-3">Contact Information</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{project.about.organization.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{project.about.organization.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{project.about.organization.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-blue-600">{project.about.organization.contact.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Group */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                Target Group
              </h3>
              <p className="text-gray-700 mb-4">{project.targetGroup.description}</p>
              <ul className="space-y-3">
                {project.targetGroup.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                Budget Overview
              </h3>
              <p className="text-sm text-gray-600 mb-4">{project.budget.summary}</p>
              <div className="text-4xl font-bold text-emerald-600 mb-6">
                {formatCurrency(project.budget.total)}
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {project.budget.breakdown.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(item.amount)}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.justification}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-800">
                  <span className="font-bold">Cost per beneficiary:</span> {formatCurrency(project.budget.costPerBeneficiary)}
                </p>
                <p className="text-xs text-emerald-600 mt-1">{project.budget.note}</p>
              </div>
            </div>

            {/* Sustainability */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <LineChart className="w-5 h-5 text-cyan-600" />
                </div>
                Sustainability
              </h3>
              <ul className="space-y-3">
                {project.sustainability.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-cyan-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-600" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnership Opportunities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <HandshakeIcon className="w-5 h-5 text-indigo-600" />
                </div>
                Partner With Us
              </h3>
              <p className="text-sm text-gray-600 mb-4">{project.partnerships.description}</p>
              <ul className="space-y-3 mb-6">
                {project.partnerships.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    {opportunity}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
                Become a Partner
              </button>
            </div>

            {/* Impact Measurement */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
                Impact Measurement
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">Short-term Impact</h4>
                  <p className="text-sm text-green-700">{project.impact.shortTerm}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">Long-term Impact</h4>
                  <p className="text-sm text-blue-700">{project.impact.longTerm}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">Measurement Approach</h4>
                  <p className="text-sm text-purple-700">{project.impact.measurement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Support the EDUMISHA Project</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join us in empowering 150 underprivileged youth with life-changing digital skills. 
            Your support can bridge the digital divide and create lasting impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
              Make a Donation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}