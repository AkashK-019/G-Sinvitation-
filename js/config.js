const WEDDING_CONFIG = {

  couple: {
    groom: {
      firstName: "Gaurav",
      fullName: "Gaurav Chandulal Kapare",
      parents: "Son of Smt. Trupti & Shri Chaudulal Pandit Kapare",
      grandparents: ""
    },
    bride: {
      firstName: "Swarda",
      fullName: "Swarda Prashant Parab",
      parents: "Daughter of Smt. Sharvari & Shri Prashant Ramchandra Parab",
      grandparents: ""
    },
    monogram: "G & S",
    title: "Gaurav & Swarda",
    invocation: "॥ श्री गणेशाय नमः ॥",
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    tagline: "We cordially invite you to celebrate our holy union & wedding festivities"
  },

  date: {
    displayDate: "Saturday, 5th December 2026",
    muhurat: "Auspicious Vivah Muhurat: 6:15 PM Godhuli Bela",
    dayNum: "5",
    monthName: "December",
    year: "2026",
    isoDateTime: "2026-12-05T20:00:00",
    timezone: "Asia/Kolkata",
    rsvpDeadline: "20 November 2026"
  },

  venue: {
    name: "D' Rajwada Resort & Banquet Hall",
    city: "Boisar, Palghar",
    hall: "Banquet Hall & Lawns",
    address: "Chillar Road, Opposite MIDC Water Filtration Plant, Village Gundale, Boisar, District Palghar, Maharashtra – 401501, India.",
    googleMapsUrl: "https://maps.app.goo.gl/kcUykWanh9s5THDq9",
    appleMapsUrl: "https://maps.app.goo.gl/kcUykWanh9s5THDq9"
  },

  itinerary: [
    {
      title: "Ganesh Sthapana & Haldi Glow",
      date: "Friday, 10th October · 11:00 AM",
      location: "Courtyard of Courtyards · The Leela Palace",
      dressCode: "Sunlit Yellows & Royal Chanderi",
      colors: ["#F5BD02", "#F48B29", "#FAF7F2", "#8A9A85"],
      desc: "Begin with sacred Vedic mantras followed by auspicious turmeric blessings, dholak beats, and cooling thandai."
    },
    {
      title: "The Royal Sangeet & Musical Soirée",
      date: "Saturday, 11th October · 7:00 PM Onwards",
      location: "The Jag Mandir Island Ballroom",
      dressCode: "Indo-Western Glitz & Regal Velvet",
      colors: ["#1F1A17", "#D4AF37", "#6B1D28", "#2C3E50"],
      desc: "Private royal boat ride to the illuminated palace island for dance performances, live sitar-fusion band, and gala banquet."
    },
    {
      title: "Baraat, Sacred Pheras & Vows",
      date: "Sunday, 12th October · 4:00 PM Onwards",
      location: "The Royal Mewar Waterfront Lawns",
      dressCode: "Traditional Royal Formal / Bandhgala & Poshak",
      colors: ["#8B1E2F", "#D4AF37", "#FAF7F2", "#ECD3A1"],
      desc: "Grand royal elephant & vintage car procession, varmala under the starlight, and 7 sacred rounds around the holy fire."
    },
    {
      title: "The Grand Reception Gala",
      date: "Sunday, 12th October · 8:30 PM Onwards",
      location: "The Maharana Grand Ballroom",
      dressCode: "Black Tie / Haute Couture Saree",
      colors: ["#1F1A17", "#D4AF37", "#9C2A2A"],
      desc: "A royal culinary banquet with 100+ master chef delicacies, champagne toast, and celebratory fireworks across the lake."
    }
  ],

  rsvp: {
    whatsappNumber: "919876543210",
    deadline: "20th September 2026"
  }
};

if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
