export const INITIAL_PROFILE = {
  name: "Fransee Azucena",
  email: "fransee.azucena@university.edu.ph",
  gpa: 1.25, // Philippine grading (1.0 - 5.0 scale where 1.0 is highest)
  gpaEquivalent: 3.85, // 4.0 scale equivalent
  course: "BS Computer Science",
  category: "STEM",
  yearLevel: "2nd Year College",
  householdIncome: 180000, // Annual income in PHP
  region: "Region III (Central Luzon)",
  isFirstGen: true,
  isIndigent: true,
  transcriptUploaded: true,
  recommendationUploaded: false,
};

export const SCHOLARSHIPS_DATA = [
  {
    id: "dost-merit-2026",
    agency: "DOST",
    agencyName: "Department of Science and Technology",
    title: "DOST Merit Scholarship Program 2026",
    type: "Government Merit",
    description: "Awarded to students with high aptitude in science and mathematics pursuing priority S&T courses.",
    tuitionCoverage: 40000,
    monthlyStipend: 7000,
    annualBookAllowance: 10000,
    slots: 40,
    deadlineDaysLeft: 30,
    deadlineDate: "2026-08-20",
    minGpaEquivalent: 3.5, // 1.75 or better
    maxIncome: 500000,
    requiredCategory: "STEM",
    requiredYearLevels: ["1st Year College", "2nd Year College"],
    requirements: [
      "Must be enrolled in a DOST priority STEM course",
      "GPA equivalent of 1.75 or higher",
      "Filipino Citizen with good moral character",
      "Pass the DOST Qualifying Examination"
    ],
    documentsNeeded: ["Official Transcript / Grades", "Certificate of Good Moral", "Income Tax Return (ITR) or Indigency"],
    applyUrl: "https://www.sei.dost.gov.ph",
    featured: true
  },
  {
    id: "private-basta-kahit-ano",
    agency: "PRIVATE",
    agencyName: "Aboitiz & Globe Foundation",
    title: "BASTA KAHIT ANO Tech Leaders Grant",
    type: "Private Corporate",
    description: "Full tuition coverage plus living allowance for resilient IT, Engineering, and Tech innovators.",
    tuitionCoverage: 45000,
    monthlyStipend: 4500,
    annualBookAllowance: 8000,
    slots: 15,
    deadlineDaysLeft: 14,
    deadlineDate: "2026-08-04",
    minGpaEquivalent: 3.2,
    maxIncome: 350000,
    requiredCategory: "STEM",
    requiredYearLevels: ["1st Year College", "2nd Year College", "3rd Year College"],
    requirements: [
      "Enrolled in Computer Science, IT, or Engineering",
      "Demonstrated financial need or first-generation college student",
      "Submission of 300-word essay on Technology & Community"
    ],
    documentsNeeded: ["Grade Slip", "Certificate of Enrollment", "Personal Statement Essay"],
    applyUrl: "https://foundation.aboitiz.com",
    featured: true
  },
  {
    id: "ched-stufaps-2026",
    agency: "CHED",
    agencyName: "Commission on Higher Education",
    title: "CHED Merit Higher Education Grant (CMSP)",
    type: "Government Merit & Need",
    description: "Financial assistance for qualified graduating high school and enrolled college students in HEIs.",
    tuitionCoverage: 30000,
    monthlyStipend: 5000,
    annualBookAllowance: 5000,
    slots: 120,
    deadlineDaysLeft: 45,
    deadlineDate: "2026-09-05",
    minGpaEquivalent: 3.3,
    maxIncome: 400000,
    requiredCategory: "ALL",
    requiredYearLevels: ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"],
    requirements: [
      "General Weighted Average (GWA) of 88% or equivalent",
      "Combined gross family income not exceeding P400,000",
      "Full-time student in CHED recognized programs"
    ],
    documentsNeeded: ["Form 137 / TOR", "Certificate of Indigency or ITR", "Barangay Clearance"],
    applyUrl: "https://ched.gov.ph/stufaps",
    featured: false
  },
  {
    id: "sm-foundation-2026",
    agency: "SM FOUNDATION",
    agencyName: "SM Foundation Inc.",
    title: "SM College Scholarship Program",
    type: "Corporate Foundation",
    description: "Provides full tuition, monthly stipend, part-time job opportunities, and post-grad employment path.",
    tuitionCoverage: 50000,
    monthlyStipend: 6000,
    annualBookAllowance: 10000,
    slots: 25,
    deadlineDaysLeft: 18,
    deadlineDate: "2026-08-08",
    minGpaEquivalent: 3.5,
    maxIncome: 250000,
    requiredCategory: "ALL",
    requiredYearLevels: ["1st Year College", "2nd Year College"],
    requirements: [
      "Public High School graduate or underprivileged background",
      "GPA of 88% and above",
      "Under ₱250,000 family annual income"
    ],
    documentsNeeded: ["ITR / Barangay Indigency", "Report Card", "ID Photo"],
    applyUrl: "https://sm-foundation.org",
    featured: false
  },
  {
    id: "megaworld-stem-2026",
    agency: "MEGAWORLD",
    agencyName: "Megaworld Foundation",
    title: "Megaworld Excellence in Technology Grant",
    type: "Private STEM",
    description: "Empowering future software engineers and data scientists with tuition sponsorship and mentorship.",
    tuitionCoverage: 60000,
    monthlyStipend: 8000,
    annualBookAllowance: 12000,
    slots: 10,
    deadlineDaysLeft: 6,
    deadlineDate: "2026-07-27",
    minGpaEquivalent: 3.6,
    maxIncome: 600000,
    requiredCategory: "STEM",
    requiredYearLevels: ["2nd Year College", "3rd Year College"],
    requirements: [
      "Minimum GPA 1.50 (3.6+ equivalent)",
      "Strong background in programming or robotics",
      "Active participation in campus tech organizations"
    ],
    documentsNeeded: ["Official Transcript", "Portfolio / GitHub Link", "Professor Recommendation"],
    applyUrl: "https://megaworldfoundation.com",
    featured: false
  },
  {
    id: "security-bank-2026",
    agency: "SECURITY BANK",
    agencyName: "Security Bank Foundation",
    title: "Build a Nation College Scholarship",
    type: "Private Need-Based",
    description: "Financial grant for promising scholars in Business, Computer Science, and Data Analytics.",
    tuitionCoverage: 35000,
    monthlyStipend: 4000,
    annualBookAllowance: 6000,
    slots: 30,
    deadlineDaysLeft: 22,
    deadlineDate: "2026-08-12",
    minGpaEquivalent: 3.0,
    maxIncome: 300000,
    requiredCategory: "ALL",
    requiredYearLevels: ["1st Year College", "2nd Year College", "3rd Year College"],
    requirements: [
      "Pass Security Bank panel interview",
      "GPA equivalent of 2.0 or better",
      "No failing grades"
    ],
    documentsNeeded: ["Grades", "Proof of Residency", "Family Background Form"],
    applyUrl: "https://securitybank.com/foundation",
    featured: false
  }
];

export const EVENTS_AND_NEWS = [
  {
    id: 1,
    tag: "Exam Schedule",
    title: "DOST-SEI Qualifying Exam venue & admit card download available",
    date: "Aug 15, 2026 • Nationwide Test Centers",
    desc: "Check your assigned test location, room assignment, and download your test permit. Bring valid school ID and #2 pencils."
  },
  {
    id: 2,
    tag: "Orientation",
    title: "CHED StuFAPs Virtual Orientation for AY 2026-2027 Applicants",
    date: "July 28, 2026 • Live on Zoom / FB Live",
    desc: "Join CHED regional directors as they walk through step-by-step document validation, billing processes, and disbursement schedules."
  },
  {
    id: 3,
    tag: "Masterclass",
    title: "Scholarship Intent Essay Workshop: How to write a winning narrative",
    date: "Aug 02, 2026 • Interactive Webinar",
    desc: "Learn how top awardees structured their personal statements and highlighted leadership impact to win full tuition grants."
  }
];
