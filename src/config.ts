import type { ResearchItem } from "./lib/research";

const research: ResearchItem[] = [
  {
    slug: "melanin-fd-nirs",
    title: "Melanin-Induced Bias in Frequency-Domain NIRS",
    summary:
      "How melanin degrades signal quality and biases oxygenation estimates in FD-NIRS, with implications for equitable optical devices.",
    year: 2024,
    citation: {
      authors:
        "S. Roy, J. Wu, J. Cao, J. Disu, S. Bharadwaj, E. Meinert-Spyker, P. Grover, J. M. Kainerstorfer, S. Wood",
      venue: "Journal of Biomedical Optics",
      year: 2024,
    },
    award: "JBO 2024 Top Paper",
    featured: true,
    materials: {
      pdf: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11423252/pdf/JBO-029-S33310.pdf",
      doi: "https://doi.org/10.1117/1.JBO.29.S3.S33310",
    },
  },
  {
    slug: "eeg-pain-scd",
    title: "EEG Biomarkers of Pain Dysregulation in Sickle Cell Disease",
    summary:
      "EEG signatures of central sensitization in adults with SCD as thermal stimuli shift from detection to pain.",
    year: 2026,
    citation: {
      authors: "S. Roy, J. Disu, N. Mossazghi, L. Abdelmohsen, E. Meinert-Spyker, S. Wood",
      venue: "The Journal of Pain",
      year: 2026,
    },
    featured: true,
    image: "/images/blog/cca-placeholder.jpg",
    materials: { doi: "https://doi.org/10.1016/j.jpain.2025.106022" },
  },
  {
    slug: "optode-curly-hair",
    title: "Optode Sensor Development for Dark, Coarse, and Curly Hair",
    summary:
      "An optode holder and sensor design that improves NIRS signal quality for participants with dark, coarse, and curly hair.",
    year: 2026,
    citation: {
      authors:
        "A. Duong, S. Roy, E. Meinert-Spyker, J. Cao, J. Kwasa, J. M. Kainerstorfer, P. Grover, S. Wood",
      venue: "SPIE Photonics West",
      year: 2026,
    },
    featured: true,
    image: "/images/blog/optode-placeholder.jpg",
    materials: {
      doi: "https://doi.org/10.1117/12.3079336",
    },
  },
  {
    slug: "xr-pain-paradigm",
    title: "Extended Reality Pain Paradigm for Neurophysiology",
    summary:
      "An XR-based EEG protocol with immersive, haptically synchronized pain stimulation for studying chronic pain under realistic conditions.",
    year: "In progress",
  },
  {
    slug: "cognitive-load-scd",
    title: "Cognitive Load Biomarkers in Sickle Cell Disease",
    summary:
      "Cognitive load-induced hemodynamic changes in adults with SCD, measured with FD-NIRS during the Digit Symbol Substitution Task.",
    year: 2024,
    citation: {
      authors:
        "S. Roy, N. Mossazghi, E. Bulger, J. Lin, C. Saber, B. Shinn-Cunningham, J. M. Kainerstorfer, J. Z. Xu, S. Wood",
      venue: "SfNIRS",
      year: 2024,
    },
    materials: {
      pdf: "https://fnirs.org/wp-content/uploads/2024/fNIRS2024BiennialMeeting/blitz/Su-088-768-Roy-Shidhartho.pdf",
    },
  },
];

export const siteConfig = {
  name: "Shidhartho Roy",
  title: "PhD Student in Biomedical Engineering, Carnegie Mellon University",
  subtitle: "PhD Student, Biomedical Engineering · Carnegie Mellon University",
  description:
    "Academic website of Shidhartho Roy, PhD student at Carnegie Mellon University working on EEG, near-infrared spectroscopy, pain biomarkers, and extended reality.",
  // Bolded wherever it appears in a research citation's author list.
  authorName: "S. Roy",
  portrait: "/images/blog/potrait_card.jpeg",
  cv: "/files/shidhartho-roy-cv.pdf",
  social: {
    // Email intentionally omitted so the address is not exposed to scrapers.
    linkedin: "https://www.linkedin.com/in/shidhartho/",
    researchgate: "https://www.researchgate.net/profile/Shidhartho-Roy?ev=hdr_xprf",
    scholar: "https://scholar.google.com/citations?user=ExMye5IAAAAJ&hl=en",
    github: "https://github.com/royShidhartho",
  },
  // Inline marks: [label](url), ==highlight==, **bold**.
  bio: [
    "I am a Ph.D. student in [Biomedical Engineering](https://www.cmu.edu/bme/) at [Carnegie Mellon University](https://www.cmu.edu/), working in the [Wood Neuro Research Group](https://www.cmu.edu/bme/woodneurolab/).",
    "My research focuses on ==neuroimaging and physiological biomarkers of pain dysregulation==, with emphasis on electroencephalography, near-infrared spectroscopy, and multimodal experimental design. I currently study pain-related neural and hemodynamic responses in ==sickle cell disease==, including the development of ==extended reality paradigms== for more realistic cognitive and sensory assessment.",
    "More broadly, I am interested in rigorous computational methods for biomedical signal analysis, **equitable sensing technologies**, and translational neuroengineering.",
  ],
  affiliations: [
    { name: "Wood Neuro Research Group", url: "https://www.cmu.edu/bme/woodneurolab/" },
    { name: "Augmented Perception Lab", url: "https://augmented-perception.org/" },
  ],
  skills: [
    { label: "Modalities", items: ["EEG", "fMRI", "NIRS", "FD-NIRS"] },
    {
      label: "Analysis",
      items: ["Biomedical signal processing", "Machine learning", "Monte Carlo simulations"],
    },
    { label: "Programming", items: ["Python", "MATLAB", "R", "C", "C++", "C#", "Java"] },
    {
      label: "Libraries & tools",
      items: ["TensorFlow", "Keras", "Scikit-learn", "NLTK", "Unity", "Simulink", "GitHub"],
    },
    { label: "Fabrication", items: ["Arduino", "3D printing", "Laser cutting"] },
  ],
  research,
  experience: [
    {
      company: "Carnegie Mellon University",
      title: "PhD Student, Biomedical Engineering",
      dateRange: "Aug 2024 – Present",
      bullets: [
        "Conducting PhD research on EEG-based biomarkers of pain dysregulation in sickle cell disease.",
        "Comparing thermal pain-evoked neural responses between sickle cell disease patients and healthy controls using EEG and NIRS-based methods.",
        "Designing an extended reality-based EEG protocol with immersive and haptically synchronized pain stimulation.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Research Associate, Electrical and Computer Engineering",
      dateRange: "Aug 2023 – Aug 2024",
      bullets: [
        "Investigated cognitive load-induced hemodynamic changes in sickle cell disease using frequency-domain near-infrared spectroscopy.",
        "Studied neurovascular responses during Digit Symbol Substitution Task performance.",
        "Generated evidence relevant to cognitive workload-aware interface design for clinical populations.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Graduate Research Assistant, Biomedical Engineering",
      dateRange: "Jan 2022 – Aug 2023",
      bullets: [
        "Characterized the relationship between melanin concentration and near-infrared spectroscopy signals across human participants.",
        "Showed reduced arterial oxygen saturation estimates and reduced signal-to-noise ratio in participants with higher melanin index.",
        "Conceptualized a novel optode holder design to improve measurement quality in participants with curly hair.",
      ],
    },
    {
      company: "Khulna University of Engineering and Technology",
      title: "Researcher, Artificial Intelligence in Medical Image Computing Lab",
      dateRange: "Mar 2020 – Dec 2021",
      bullets: [
        "Worked on medical image segmentation and localization using convolutional neural networks.",
        "Designed residual and skip-connection based methods to recover local information from shallower layers.",
        "Applied these methods to heart segmentation in computed tomography and magnetic resonance imaging data.",
      ],
    },
  ],
  education: [
    {
      degree: "Ph.D., Biomedical Engineering",
      school: "Carnegie Mellon University",
      dateRange: "2024 – Present",
      note: "Research focus: EEG-based biomarkers of pain dysregulation in sickle cell disease",
      awards: ["BME Mentorship Award"],
    },
    {
      degree: "M.S., Biomedical Engineering (Research)",
      school: "Carnegie Mellon University",
      dateRange: "2023",
      note: "GPA 3.69/4.0",
      awards: ["BME Research Excellence Award"],
    },
    {
      degree: "B.Sc., Electrical and Electronic Engineering",
      school: "Khulna University of Engineering and Technology",
      dateRange: "2020",
      note: "GPA 3.64/4.0",
    },
  ] as { degree: string; school: string; dateRange: string; note?: string; awards?: string[] }[],
};
