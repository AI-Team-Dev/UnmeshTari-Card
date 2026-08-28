export const profile = {
  name: "Unmesh Tari",
  designation: "Director",
  company: "TechBerry Infotech",
  tagline: "Technology | Passionate Team",
  positioning:
    "Engineering technology solutions that help businesses perform, scale and evolve.",
  phone: "+919870699971",
  phoneDisplay: "+91 9870699971",
  whatsapp: "919870699971",
  whatsappMessage:
    "Hi Unmesh, it was a pleasure connecting with you at the event. I'd be glad to stay in touch and explore opportunities to connect or collaborate.",
  email: "unmeshtari@techberryinfotech.com",
  linkedin: "https://www.linkedin.com/in/unmeshtari",
  website: "https://www.techberryinfotech.com",
  address: {
    lines: [
      "Bldg. No. 1, 1st Flr, Mahajan Mills Compound,",
      "L.B.S. Marg, Vikhroli West,",
      "Mumbai, Maharashtra - 400079",
    ],
    full: "Bldg. No. 1, 1st Flr, Mahajan Mills Compound, L.B.S. Marg, Vikhroli West, Mumbai, Maharashtra - 400079",
  },
  photo: "assets/PROFILE_PHOTO.jpg",
  logo: "assets/TECHBERRY_LOGO.jpg",
  favicon: "assets/favicon.jpg",
  expertise: [
    { num: "01", label: "Enterprise Applications" },
    { num: "02", label: "AI / ML" },
    { num: "03", label: "Database Administration" },
    { num: "04", label: "Middleware" },
    { num: "05", label: "OS Server Administration" },
    { num: "06", label: "Application Development" },
    { num: "07", label: "Application Support & Performance Engineering" },
    { num: "08", label: "Cloud Migrations" },
    { num: "09", label: "SOC Services" },
    { num: "10", label: "Software Testing" },
    { num: "11", label: "Structured Networking" },
  ],
  about:
    "I lead technology at TechBerry Infotech — across cloud, AI, infrastructure, and enterprise applications. My focus is building systems that are practical, reliable, and aligned with how businesses actually operate.",
  ctaSubtitle:
    "Good conversations often lead to great opportunities.",
  companyDescription:
    "TechBerry Infotech delivers end-to-end enterprise technology services — spanning infrastructure, software development, cloud migrations, security operations, and application support. Our passionate team partners with businesses to design, build, and maintain technology environments that are secure, scalable, and built to perform.",
};

export function getWhatsAppUrl() {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`;
}

export function getTelUrl() {
  return `tel:${profile.phone}`;
}

export function getMailtoUrl() {
  return `mailto:${profile.email}`;
}

export function getVCardFilename() {
  return `${profile.name.replace(/\s+/g, "-")}.vcf`;
}
