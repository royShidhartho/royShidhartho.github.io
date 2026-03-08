export const siteConfig = {
  name: "Shidhartho Roy",
  title: "PhD Student in Biomedical Engineering",
  description:
    "Portfolio website of Shidhartho Roy, PhD student at Carnegie Mellon University working on EEG, near-infrared spectroscopy, pain biomarkers, and extended reality.",
  accentColor: "#1d4ed8",
  social: {
    email: "shidharr@andrew.cmu.edu",
    linkedin: "https://www.linkedin.com/in/shidhartho/",
    researchgate: "https://www.researchgate.net/profile/Shidhartho-Roy?ev=hdr_xprf",
    scholar: "https://scholar.google.com/citations?user=ExMye5IAAAAJ&hl=en",
    github: "https://github.com/royShidhartho",
  },
  aboutMe:
    "I am a PhD student in Biomedical Engineering at Carnegie Mellon University. My research focuses on neuroimaging and physiological biomarkers of pain dysregulation, with emphasis on electroencephalography, near-infrared spectroscopy, and multimodal experimental design. I am currently working on pain-related neural and hemodynamic responses in sickle cell disease, including the development of extended reality paradigms for more realistic cognitive and sensory assessment. More broadly, I am interested in rigorous computational methods for biomedical signal analysis, equitable sensing technologies, and translational neuroengineering.",
  skills: [
    "Python",
    "R",
    "C",
    "C#",
    "C++",
    "Java",
    "MATLAB",
    "GitHub",
    "TensorFlow",
    "Keras",
    "Scikit-learn",
    "NLTK",
    "Unity",
    "Arduino",
    "Simulink",
    "Monte Carlo simulations",
    "3D printing",
    "Laser cutting",
    "EEG",
    "fMRI",
    "NIRS",
    "FD-NIRS",
    "Biomedical signal processing",
    "Machine learning",
  ],
  projects: [
    {
      name: "EEG Biomarkers of Pain Dysregulation in Sickle Cell Disease",
      description:
        "PhD research on electroencephalography-based biomarkers of pain dysregulation in sickle cell disease, with a focus on neural responses to pain and cognitive-sensory processing in clinically relevant settings.",
      link: "",
      skills: ["EEG", "Python", "Biomedical signal processing", "Pain research"],
    },
    {
      name: "Extended Reality Pain Paradigm for Neurophysiology",
      description:
        "Designing an extended reality-based EEG protocol with immersive and haptically synchronized pain stimulation to study chronic pain in more realistic and behaviorally relevant conditions.",
      link: "",
      skills: ["EEG", "Unity", "XR", "Experimental design"],
    },
    {
      name: "Melanin-Induced Bias in Frequency-Domain Near-Infrared Spectroscopy",
      description:
        "Designed and conducted a human-subject study quantifying the effect of melanin on signal quality and oxygenation estimates in frequency-domain near-infrared spectroscopy, providing evidence relevant to equitable optical device design.",
      link: "",
      skills: ["FD-NIRS", "Python", "Statistical analysis", "Biomedical optics"],
    },
    {
      name: "Cognitive Load Biomarkers in Sickle Cell Disease",
      description:
        "Investigated cognitive load-induced hemodynamic changes in adults with sickle cell disease using frequency-domain near-infrared spectroscopy during Digit Symbol Substitution Task performance.",
      link: "",
      skills: ["FD-NIRS", "Cognitive neuroscience", "Signal analysis", "Clinical research"],
    },
    {
      name: "Optode Sensor Development for Dark, Coarse, and Curly Hair",
      description:
        "Contributed to the development of an optode holder and sensor approach to improve near-infrared spectroscopy measurements in participants with dark, coarse, and curly hair.",
      link: "",
      skills: ["Biomedical device design", "NIRS", "3D printing", "Prototyping"],
    },
  ],
  publications: [
    {
      title:
        "Exploring the impact and influence of melanin on frequency-domain near-infrared spectroscopy measurements",
      authors:
        "S. Roy, J. Wu, J. Cao, J. Disu, S. Bharadwaj, E. Meinert-Spyker, P. Grover, J. M. Kainerstorfer, and S. Wood",
      venue: "Journal of Biomedical Optics",
      year: "2024",
      abstract:
        "This study quantifies how melanin affects frequency-domain near-infrared spectroscopy measurements. It shows that melanin can reduce signal quality and influence oxygenation-related estimates, with strong wavelength-dependent effects relevant to equitable optical sensing.",
      link: "https://doi.org/10.1117/1.JBO.29.S3.S33310",
    },
    {
      title:
        "EEG based stress analysis using rhythm specific spectral feature for video game play",
      authors:
        "S. Roy, M. Islam, M. S. U. Yusuf, and N. Jahan",
      venue: "Computers in Biology and Medicine",
      year: "2022",
      abstract:
        "This paper presents an end-to-end electroencephalography-based stress analysis framework for video gameplay. It uses the beta-to-alpha ratio as a stress marker and examines how gameplay type, user characteristics, and post-game relaxation relate to stress responses.",
      link: "https://doi.org/10.1016/j.compbiomed.2022.105849",
    },
    {
      title:
        "Metrics and enhancement strategies for grid resilience and reliability during natural disasters",
      authors:
        "E. Hossain, S. Roy, N. Mohammad, N. Nawar, and D. R. Dipta",
      venue: "Applied Energy",
      year: "2021",
      abstract:
        "This review examines how grid resilience and reliability are currently measured and argues that commonly used reliability indices are insufficient for natural-disaster resilience. It synthesizes resilience metrics and strategies for improving electric power systems under extreme events.",
      link: "https://doi.org/10.1016/j.apenergy.2021.116709",
    },
    {
      title:
        "Dermo-DOCTOR: A framework for concurrent skin lesion detection and recognition using a deep convolutional neural network with end-to-end dual encoders",
      authors:
        "M. K. Hasan, S. Roy, C. Mondal, M. A. Alam, M. T. E. Elahi, A. Dutta, S. M. T. U. Raju, M. T. Jawad, and M. Ahmad",
      venue: "Biomedical Signal Processing and Control",
      year: "2021",
      abstract:
        "This work proposes an end-to-end dual-encoder convolutional neural network for simultaneous skin lesion detection and recognition. Feature fusion and joint decoding improve segmentation and classification performance on the ISIC benchmark datasets.",
      link: "https://doi.org/10.1016/j.bspc.2021.102661",
    },
    {
      title:
        "Multi-class probabilistic atlas-based whole heart segmentation method in cardiac CT and MRI",
      authors:
        "T. K. Ghosh, M. K. Hasan, S. Roy, M. A. Alam, E. Hossain, and M. Ahmad",
      venue: "IEEE Access",
      year: "2021",
      abstract:
        "This paper develops a robust whole-heart segmentation pipeline for computed tomography and magnetic resonance imaging using a probabilistic atlas framework. The approach is aimed at accurate segmentation of cardiac substructures for downstream clinical analysis.",
      link: "https://doi.org/10.1109/ACCESS.2021.3066767",
    },
    {
      title:
        "DRNet: Segmentation and localization of optic disc and Fovea from diabetic retinopathy image",
      authors:
        "M. K. Hasan, M. A. Alam, M. T. E. Elahi, S. Roy, and R. Martí",
      venue: "Artificial Intelligence in Medicine",
      year: "2021",
      abstract:
        "This study introduces DRNet, an encoder-decoder network for optic disc segmentation and optic disc and fovea localization in retinal images. A residual skip connection is used to recover spatial information lost during pooling and improve detection accuracy.",
      link: "https://doi.org/10.1016/j.artmed.2020.102001",
    },
    {
      title:
        "Challenges of deep learning methods for COVID-19 detection using public datasets",
      authors:
        "M. K. Hasan, M. A. Alam, L. Dahal, S. Roy, S. R. Wahid, M. T. E. Elahi, R. Martí, and B. Khanal",
      venue: "Informatics in Medicine Unlocked",
      year: "2022",
      abstract:
        "This paper evaluates reported deep learning performance for COVID-19 detection from public imaging datasets and argues that many strong results are inflated by dataset bias and weak external validation. It emphasizes the need for independent test sets and stronger evaluation design.",
      link: "https://doi.org/10.1016/j.imu.2022.100945",
    },
  ],
  experience: [
    {
      company: "Carnegie Mellon University",
      title: "PhD Student, Biomedical Engineering",
      dateRange: "Aug 2024 - Present",
      bullets: [
        "Conducting PhD research on EEG-based biomarkers of pain dysregulation in sickle cell disease.",
        "Comparing thermal pain-evoked neural responses between sickle cell disease patients and healthy controls using EEG and NIRS-based methods.",
        "Designing an extended reality-based EEG protocol with immersive and haptically synchronized pain stimulation.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Research Associate, Electrical and Computer Engineering",
      dateRange: "Aug 2023 - Aug 2024",
      bullets: [
        "Investigated cognitive load-induced hemodynamic changes in sickle cell disease using frequency-domain near-infrared spectroscopy.",
        "Studied neurovascular responses during Digit Symbol Substitution Task performance.",
        "Generated evidence relevant to cognitive workload-aware interface design for clinical populations.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Graduate Research Assistant, Biomedical Engineering",
      dateRange: "Jan 2022 - Aug 2023",
      bullets: [
        "Characterized the relationship between melanin concentration and near-infrared spectroscopy signals across human participants.",
        "Showed reduced arterial oxygen saturation estimates and reduced signal-to-noise ratio in participants with higher melanin index.",
        "Conceptualized a novel optode holder design to improve measurement quality in participants with curly hair.",
      ],
    },
    {
      company: "Khulna University of Engineering and Technology",
      title: "Researcher, Artificial Intelligence in Medical Image Computing Lab",
      dateRange: "Mar 2020 - Dec 2021",
      bullets: [
        "Worked on medical image segmentation and localization using convolutional neural networks.",
        "Designed residual and skip-connection based methods to recover local information from shallower layers.",
        "Applied these methods to heart segmentation in computed tomography and magnetic resonance imaging data.",
      ],
    },
  ],
  education: [
    {
      school: "Carnegie Mellon University",
      degree: "PhD in Biomedical Engineering",
      dateRange: "Aug 2024 - Present",
      achievements: [
        "Research focus: EEG-based biomarkers of pain dysregulation in sickle cell disease.",
        "Integrating extended reality paradigms to study cognitive and sensory processing in real-world contexts.",
        "Recipient of the BME Mentorship Award.",
      ],
    },
    {
      school: "Carnegie Mellon University",
      degree: "Master of Science in Biomedical Engineering - Research",
      dateRange: "Completed Aug 2023",
      achievements: [
        "GPA: 3.69/4.0",
        "Relevant coursework: machine learning, convex optimization, biostatistics, and mathematical foundations for machine learning.",
        "Recipient of the BME Research Excellence Award.",
      ],
    },
    {
      school: "Khulna University of Engineering and Technology",
      degree: "Bachelor of Science in Electrical and Electronic Engineering",
      dateRange: "Completed Mar 2020",
      achievements: [
        "GPA: 3.64/4.0",
        "Research and leadership involvement through IEEE KUET SB, EEE Makers Hub, and EEE Association.",
        "Received multiple national and international project and case competition awards.",
      ],
    },
  ],
};