import type { ResearchItem } from "./lib/research";
import type { Publication } from "./lib/publications";

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
];

// Full publication list, from Google Scholar plus the OHBM 2025 abstract. DOIs and
// free PDF links were checked against Crossref and Unpaywall (October 2026). `pdf` is
// only set for legal free copies; `preprint` marks an arXiv copy of a paywalled paper.
const publications: Publication[] = [
  {
    title: "Novel optode sensor development for functional near infrared spectroscopy systems and its use in dark, coarse, and curly hair",
    authors: "A. Duong, S. Roy, E. Meinert-Spyker, J. Cao, J. Kwasa, J. M. Kainerstorfer, P. Grover, S. Wood",
    venue: "Clinical and Translational Neurophotonics 2026",
    details: "Proc. SPIE 13834, 138340H",
    year: 2026,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1117/12.3079336",
    },
    bibtex: "@inproceedings{Duong_2026, title={Novel optode sensor development for functional near infrared spectroscopy systems and its use in dark, coarse, and curly hair}, url={http://dx.doi.org/10.1117/12.3079336}, DOI={10.1117/12.3079336}, booktitle={Clinical and Translational Neurophotonics 2026}, publisher={SPIE}, author={Duong, Alexis and Roy, Shidhartho and Meinert-Spyker, Elizabeth and Cao, Jiaming and Kwasa, Jasmine and Kainerstorfer, Jana M. and Grover, Pulkit and Wood, Sossena}, editor={Kainerstorfer, Jana M. and Buckley, Erin M. and Srinivasan, Vivek J.}, year={2026}, month=Mar, pages={19} }",
  },
  {
    title: "Altered Sensory-Pain Transitions in Sickle Cell Disease Reflect Central Sensitization",
    authors: "S. Roy, J. Disu, N. Mossazghi, L. Abdelmohsen, S. Wood",
    venue: "Journal of Sickle Cell Disease",
    details: "3(Supplement_1), yoag020.057",
    year: 2026,
    type: "Abstract",
    materials: {
      doi: "https://doi.org/10.1093/jscdis/yoag020.057",
    },
    bibtex: "@article{Roy_2026, title={Altered Sensory-Pain Transitions in Sickle Cell Disease Reflect Central Sensitization}, volume={3}, ISSN={3029-0473}, url={http://dx.doi.org/10.1093/jscdis/yoag020.057}, DOI={10.1093/jscdis/yoag020.057}, number={Supplement_1}, journal={Journal of Sickle Cell Disease}, publisher={Oxford University Press (OUP)}, author={Roy, Shidhartho and Disu, Joel and Mossazghi, Nahom and Abdelmohsen, Lara and Wood, Sossena}, year={2026}, month=June }",
  },
  {
    title: "Altered Detection-Pain Transition Profiles and Cortical Signatures of Sensitization in Sickle Cell Disease",
    authors: "S. Roy, J. Disu, N. Mossazghi, L. Abdelmohsen, E. Meinert-Spyker, S. Wood",
    venue: "The Journal of Pain",
    details: "41, 106022",
    year: 2026,
    type: "Abstract",
    materials: {
      doi: "https://doi.org/10.1016/j.jpain.2025.106022",
    },
    bibtex: "@article{Roy_2026, title={Altered Detection-Pain Transition Profiles and Cortical Signatures of Sensitization in Sickle Cell Disease}, volume={41}, ISSN={1526-5900}, url={http://dx.doi.org/10.1016/j.jpain.2025.106022}, DOI={10.1016/j.jpain.2025.106022}, journal={The Journal of Pain}, publisher={Elsevier BV}, author={Roy, Shidhartho and Disu, Joel and Mossazghi, Nahom and Abdelmohsen, Lara and Meinert-Spyker, Elizabeth and Wood, Sossena}, year={2026}, month=Mar, pages={106022} }",
  },
  {
    title: "Increased synchronization in cognitive flexibility tasks in Sickle Cell Disease: A Feasibility Study",
    authors: "N. Mossazghi, S. Roy, J. Disu, L. Abdelmohsen, E. Meinert-Spyker, S. Wood",
    venue: "Organization for Human Brain Mapping (OHBM) Annual Meeting",
    details: "Brisbane, Australia, June 2025",
    year: 2025,
    type: "Abstract",
  },
  {
    title: "Exploring the impact and influence of melanin on frequency-domain near-infrared spectroscopy measurements",
    authors: "S. Roy, J. Wu, J. Cao, J. Disu, S. Bharadwaj, E. Meinert-Spyker, P. Grover, J. M. Kainerstorfer, S. Wood",
    venue: "Journal of Biomedical Optics",
    details: "29(S3), S33310",
    year: 2024,
    type: "Journal",
    award: "JBO 2024 Top Paper",
    materials: {
      pdf: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11423252/pdf/JBO-029-S33310.pdf",
      doi: "https://doi.org/10.1117/1.JBO.29.S3.S33310",
    },
    bibtex: "@article{Roy_2024, title={Exploring the impact and influence of melanin on frequency-domain near-infrared spectroscopy measurements}, volume={29}, ISSN={1560-2281}, url={http://dx.doi.org/10.1117/1.JBO.29.S3.S33310}, DOI={10.1117/1.jbo.29.s3.s33310}, number={S3}, journal={Journal of Biomedical Optics}, publisher={SPIE-Intl Soc Optical Eng}, author={Roy, Shidhartho and Wu, Jingyi and Cao, Jiaming and Disu, Joel and Bharadwaj, Sharadhi and Meinert-Spyker, Elizabeth and Grover, Pulkit and Kainerstorfer, Jana M. and Wood, Sossena}, year={2024}, month=Sept, pages={1–13} }",
  },
  {
    title: "The potential of using a hemodynamic signal as a biomarker of cognitive load in sickle cell disease",
    authors: "S. Roy, N. Mossazghi, E. Bulger, J. Lin, C. Saber, B. Shinn-Cunningham, J. M. Kainerstorfer, J. Z. Xu, S. Wood",
    venue: "fNIRS 2024 Biennial Meeting (Birmingham, UK)",
    details: "Blitz presentation Su-088-768, September 2024",
    year: 2024,
    type: "Abstract",
    materials: {
      pdf: "https://fnirs.org/wp-content/uploads/2024/fNIRS2024BiennialMeeting/blitz/Su-088-768-Roy-Shidhartho.pdf",
    },
  },
  {
    title: "Assessing the Impact of Cognitive Load on Resting State Tissue Oxygen Saturation in Adult Patients with Sickle Cell Disease",
    authors: "L. Abdelmohsen, N. Mossazghi, S. Roy, J. D. K. Disu, E. Meinert-Spyker, C. Saber, J. Xu, S. Wood",
    venue: "Blood",
    details: "144(Supplement 1), 3879",
    year: 2024,
    type: "Abstract",
    materials: {
      doi: "https://doi.org/10.1182/blood-2024-208977",
    },
    bibtex: "@article{Abdelmohsen_2024, title={Assessing the Impact of Cognitive Load on Resting State Tissue Oxygen Saturation in Adult Patients with Sickle Cell Disease}, volume={144}, ISSN={1528-0020}, url={http://dx.doi.org/10.1182/blood-2024-208977}, DOI={10.1182/blood-2024-208977}, number={Supplement 1}, journal={Blood}, publisher={American Society of Hematology}, author={Abdelmohsen, Lara and Mossazghi, Nahom and Roy, Shidhartho and Disu, Joel Dzidzorvi Kwame and Meinert-Spyker, Elizabeth and Saber, Christine and Xu, Julia and Wood, Sossena}, year={2024}, month=Nov, pages={3879–3879} }",
  },
  {
    title: "EEG based stress analysis using rhythm specific spectral feature for video game play",
    authors: "S. Roy, M. Islam, M. S. U. Yusuf, N. Jahan",
    venue: "Computers in Biology and Medicine",
    details: "148, 105849",
    year: 2022,
    type: "Journal",
    materials: {
      preprint: "https://arxiv.org/pdf/2109.13200",
      doi: "https://doi.org/10.1016/j.compbiomed.2022.105849",
    },
    bibtex: "@article{Roy_2022, title={EEG based stress analysis using rhythm specific spectral feature for video game play}, volume={148}, ISSN={0010-4825}, url={http://dx.doi.org/10.1016/j.compbiomed.2022.105849}, DOI={10.1016/j.compbiomed.2022.105849}, journal={Computers in Biology and Medicine}, publisher={Elsevier BV}, author={Roy, Shidhartho and Islam, Monira and Yusuf, Md. Salah Uddin and Jahan, Nushrat}, year={2022}, month=Sept, pages={105849} }",
  },
  {
    title: "Challenges of deep learning methods for COVID-19 detection using public datasets",
    authors: "M. K. Hasan, M. A. Alam, L. Dahal, S. Roy, S. R. Wahid, M. T. E. Elahi, R. Martí, B. Khanal",
    venue: "Informatics in Medicine Unlocked",
    details: "30, 100945",
    year: 2022,
    type: "Journal",
    materials: {
      pdf: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9005223/pdf/main.pdf",
      doi: "https://doi.org/10.1016/j.imu.2022.100945",
    },
    bibtex: "@article{Hasan_2022, title={Challenges of deep learning methods for COVID-19 detection using public datasets}, volume={30}, ISSN={2352-9148}, url={http://dx.doi.org/10.1016/j.imu.2022.100945}, DOI={10.1016/j.imu.2022.100945}, journal={Informatics in Medicine Unlocked}, publisher={Elsevier BV}, author={Hasan, Md. Kamrul and Alam, Md. Ashraful and Dahal, Lavsen and Roy, Shidhartho and Wahid, Sifat Redwan and Elahi, Md. Toufick E. and Martí, Robert and Khanal, Bishesh}, year={2022}, pages={100945} }",
  },
  {
    title: "Metrics and enhancement strategies for grid resilience and reliability during natural disasters",
    authors: "E. Hossain, S. Roy, N. Mohammad, N. Nawar, D. R. Dipta",
    venue: "Applied Energy",
    details: "290, 116709",
    year: 2021,
    type: "Journal",
    materials: {
      doi: "https://doi.org/10.1016/j.apenergy.2021.116709",
    },
    bibtex: "@article{Hossain_2021, title={Metrics and enhancement strategies for grid resilience and reliability during natural disasters}, volume={290}, ISSN={0306-2619}, url={http://dx.doi.org/10.1016/j.apenergy.2021.116709}, DOI={10.1016/j.apenergy.2021.116709}, journal={Applied Energy}, publisher={Elsevier BV}, author={Hossain, Eklas and Roy, Shidhartho and Mohammad, Naeem and Nawar, Nafiu and Dipta, Debopriya Roy}, year={2021}, month=May, pages={116709} }",
  },
  {
    title: "Missing value imputation affects the performance of machine learning: A review and analysis of the literature (2010–2021)",
    authors: "M. K. Hasan, M. A. Alam, S. Roy, A. Dutta, M. T. Jawad, S. Das",
    venue: "Informatics in Medicine Unlocked",
    details: "27, 100799",
    year: 2021,
    type: "Journal",
    materials: {
      doi: "https://doi.org/10.1016/j.imu.2021.100799",
    },
    bibtex: "@article{Hasan_2021, title={Missing value imputation affects the performance of machine learning: A review and analysis of the literature (2010–2021)}, volume={27}, ISSN={2352-9148}, url={http://dx.doi.org/10.1016/j.imu.2021.100799}, DOI={10.1016/j.imu.2021.100799}, journal={Informatics in Medicine Unlocked}, publisher={Elsevier BV}, author={Hasan, Md. Kamrul and Alam, Md. Ashraful and Roy, Shidhartho and Dutta, Aishwariya and Jawad, Md. Tasnim and Das, Sunanda}, year={2021}, pages={100799} }",
  },
  {
    title: "Solar Energy in the United States: Development, Challenges and Future Prospects",
    authors: "S. Tabassum, T. Rahman, A. U. Islam, S. Rahman, D. R. Dipta, S. Roy, N. Mohammad, N. Nawar, E. Hossain",
    venue: "Energies",
    details: "14(23), 8142",
    year: 2021,
    type: "Journal",
    materials: {
      pdf: "https://www.mdpi.com/1996-1073/14/23/8142/pdf",
      doi: "https://doi.org/10.3390/en14238142",
    },
    bibtex: "@article{Tabassum_2021, title={Solar Energy in the United States: Development, Challenges and Future Prospects}, volume={14}, ISSN={1996-1073}, url={http://dx.doi.org/10.3390/en14238142}, DOI={10.3390/en14238142}, number={23}, journal={Energies}, publisher={MDPI AG}, author={Tabassum, Sanzana and Rahman, Tanvin and Islam, Ashraf Ul and Rahman, Sumayya and Dipta, Debopriya Roy and Roy, Shidhartho and Mohammad, Naeem and Nawar, Nafiu and Hossain, Eklas}, year={2021}, month=Dec, pages={8142} }",
  },
  {
    title: "DRNet: Segmentation and localization of optic disc and Fovea from diabetic retinopathy image",
    authors: "M. K. Hasan, M. A. Alam, M. T. E. Elahi, S. Roy, R. Martí",
    venue: "Artificial Intelligence in Medicine",
    details: "111, 102001",
    year: 2021,
    type: "Journal",
    materials: {
      doi: "https://doi.org/10.1016/j.artmed.2020.102001",
    },
    bibtex: "@article{Hasan_2021, title={DRNet: Segmentation and localization of optic disc and Fovea from diabetic retinopathy image}, volume={111}, ISSN={0933-3657}, url={http://dx.doi.org/10.1016/j.artmed.2020.102001}, DOI={10.1016/j.artmed.2020.102001}, journal={Artificial Intelligence in Medicine}, publisher={Elsevier BV}, author={Hasan, Md. Kamrul and Alam, Md. Ashraful and Elahi, Md. Toufick E and Roy, Shidhartho and Martí, Robert}, year={2021}, month=Jan, pages={102001} }",
  },
  {
    title: "Dermo-DOCTOR: A framework for concurrent skin lesion detection and recognition using a deep convolutional neural network with end-to-end dual encoders",
    authors: "M. K. Hasan, S. Roy, C. Mondal, M. A. Alam, M. T. E Elahi, A. Dutta, S. T. Uddin Raju, M. T. Jawad, M. Ahmad",
    venue: "Biomedical Signal Processing and Control",
    details: "68, 102661",
    year: 2021,
    type: "Journal",
    materials: {
      preprint: "https://arxiv.org/pdf/2102.01824",
      doi: "https://doi.org/10.1016/j.bspc.2021.102661",
    },
    bibtex: "@article{Hasan_2021, title={Dermo-DOCTOR: A framework for concurrent skin lesion detection and recognition using a deep convolutional neural network with end-to-end dual encoders}, volume={68}, ISSN={1746-8094}, url={http://dx.doi.org/10.1016/j.bspc.2021.102661}, DOI={10.1016/j.bspc.2021.102661}, journal={Biomedical Signal Processing and Control}, publisher={Elsevier BV}, author={Hasan, Md. Kamrul and Roy, Shidhartho and Mondal, Chayan and Alam, Md. Ashraful and E Elahi, Md. Toufick and Dutta, Aishwariya and Uddin Raju, S.M. Taslim and Jawad, Md. Tasnim and Ahmad, Mohiuddin}, year={2021}, month=July, pages={102661} }",
  },
  {
    title: "Multi-Class Probabilistic Atlas-Based Whole Heart Segmentation Method in Cardiac CT and MRI",
    authors: "T. K. Ghosh, M. K. Hasan, S. Roy, M. A. Alam, E. Hossain, M. Ahmad",
    venue: "IEEE Access",
    details: "9, 66948–66964",
    year: 2021,
    type: "Journal",
    materials: {
      pdf: "https://ieeexplore.ieee.org/ielx7/6287639/9312710/09420761.pdf",
      doi: "https://doi.org/10.1109/ACCESS.2021.3077006",
    },
    bibtex: "@article{Ghosh_2021, title={Multi-Class Probabilistic Atlas-Based Whole Heart Segmentation Method in Cardiac CT and MRI}, volume={9}, ISSN={2169-3536}, url={http://dx.doi.org/10.1109/ACCESS.2021.3077006}, DOI={10.1109/access.2021.3077006}, journal={IEEE Access}, publisher={Institute of Electrical and Electronics Engineers (IEEE)}, author={Ghosh, Tarun Kanti and Hasan, Md. Kamrul and Roy, Shidhartho and Alam, Md. Ashraful and Hossain, Eklas and Ahmad, Mohiuddin}, year={2021}, pages={66948–66964} }",
  },
  {
    title: "Frequency Impact Analysis with Music-Evoked Stimulated Potentials on Human Brain",
    authors: "S. Roy, M. Islam, M. S. U. Yusuf, T. I. Rohan",
    venue: "Innovations in Electronics and Communication Engineering (Springer)",
    details: "pp. 505–513 (Lecture Notes in Networks and Systems)",
    year: 2020,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1007/978-981-15-3172-9_49",
    },
    bibtex: "@inbook{Roy_2020, title={Frequency Impact Analysis with Music-Evoked Stimulated Potentials on Human Brain}, ISBN={9789811531729}, ISSN={2367-3389}, url={http://dx.doi.org/10.1007/978-981-15-3172-9_49}, DOI={10.1007/978-981-15-3172-9_49}, booktitle={Innovations in Electronics and Communication Engineering}, publisher={Springer Singapore}, author={Roy, Shidhartho and Islam, Monira and Yusuf, Md. Salah Uddin and Rohan, Tanbin Islam}, year={2020}, pages={505–513} }",
  },
  {
    title: "Efficient Approach to Detect Epileptic Seizure using Machine Learning Models for Modern Healthcare System",
    authors: "T. I. Rohan, M. S. U. Yusuf, M. Islam, S. Roy",
    venue: "2020 IEEE Region 10 Symposium (TENSYMP)",
    details: "pp. 1783–1786",
    year: 2020,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1109/tensymp50017.2020.9230731",
    },
    bibtex: "@inproceedings{Rohan_2020, title={Efficient Approach to Detect Epileptic Seizure using Machine Learning Models for Modern Healthcare System}, url={http://dx.doi.org/10.1109/tensymp50017.2020.9230731}, DOI={10.1109/tensymp50017.2020.9230731}, booktitle={2020 IEEE Region 10 Symposium (TENSYMP)}, publisher={IEEE}, author={Rohan, Tanbin Islam and Yusuf, Md. Salah Uddin and Islam, Monira and Roy, Shidhartho}, year={2020}, pages={1783–1786} }",
  },
  {
    title: "Automatic Mass Classification in Breast Using Transfer Learning of Deep Convolutional Neural Network and Support Vector Machine",
    authors: "M. K. Hasan, T. A. Aleef, S. Roy",
    venue: "2020 IEEE Region 10 Symposium (TENSYMP)",
    details: "pp. 110–113",
    year: 2020,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1109/tensymp50017.2020.9230708",
    },
    bibtex: "@inproceedings{Hasan_2020, title={Automatic Mass Classification in Breast Using Transfer Learning of Deep Convolutional Neural Network and Support Vector Machine}, url={http://dx.doi.org/10.1109/tensymp50017.2020.9230708}, DOI={10.1109/tensymp50017.2020.9230708}, booktitle={2020 IEEE Region 10 Symposium (TENSYMP)}, publisher={IEEE}, author={Hasan, Md. Kamrul and Aleef, Tajwar Abrar and Roy, Shidhartho}, year={2020}, pages={110–113} }",
  },
  {
    title: "CVR-Net: A deep convolutional neural network for coronavirus recognition from chest radiography images",
    authors: "M. K. Hasan, M. A. Alam, M. T. E. Elahi, S. Roy, S. R. Wahid",
    venue: "arXiv preprint",
    details: "arXiv:2007.11993",
    year: 2020,
    type: "Preprint",
    materials: {
      pdf: "https://arxiv.org/pdf/2007.11993",
      doi: "https://doi.org/10.48550/arXiv.2007.11993",
    },
    bibtex: "@misc{Hasan_2020_CVRNet,\n  title={CVR-Net: A deep convolutional neural network for coronavirus recognition from chest radiography images},\n  author={Hasan, Md. Kamrul and Alam, Md. Ashraful and Elahi, Md. Toufick E. and Roy, Shidhartho and Wahid, Sifat Redwan},\n  year={2020},\n  eprint={2007.11993},\n  archivePrefix={arXiv},\n  doi={10.48550/arXiv.2007.11993}\n}",
  },
  {
    title: "Age based Mood Swing Analysis and Brain Mapping for Music Genre",
    authors: "S. Roy, M. S. U. Yusuf, M. Islam, T. I. Rohan",
    venue: "2019 5th International Conference on Advances in Electrical Engineering (ICAEE)",
    details: "pp. 165–170",
    year: 2019,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1109/icaee48663.2019.8975671",
    },
    bibtex: "@inproceedings{Roy_2019, title={Age based Mood Swing Analysis and Brain Mapping for Music Genre}, url={http://dx.doi.org/10.1109/icaee48663.2019.8975671}, DOI={10.1109/icaee48663.2019.8975671}, booktitle={2019 5th International Conference on Advances in Electrical Engineering (ICAEE)}, publisher={IEEE}, author={Roy, Shidhartho and Yusuf, Md. Salah Uddin and Islam, Monira and Rohan, Tanbin Islam}, year={2019}, month=Sept, pages={165–170} }",
  },
  {
    title: "Efficient two stage approach to detect face liveness: Motion based and Deep learning based",
    authors: "M. M. Hasan, M. S. U. Yusuf, T. I. Rohan, S. Roy",
    venue: "2019 4th International Conference on Electrical Information and Communication Technology (EICT)",
    details: "pp. 1–6",
    year: 2019,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1109/eict48899.2019.9068813",
    },
    bibtex: "@inproceedings{Hasan_2019, title={Efficient two stage approach to detect face liveness : Motion based and Deep learning based}, url={http://dx.doi.org/10.1109/eict48899.2019.9068813}, DOI={10.1109/eict48899.2019.9068813}, booktitle={2019 4th International Conference on Electrical Information and Communication Technology (EICT)}, publisher={IEEE}, author={Hasan, Md. Mehedi and Yusuf, Md. Salah Uddin and Rohan, Tanbin Islam and Roy, Shidhartho}, year={2019}, month=Dec, pages={1–6} }",
  },
  {
    title: "Stress Identification during Sustained Mental Task and Brain Relaxation Modeling with β/α Band Power Ratio",
    authors: "M. S. U. Yusuf, M. Islam, S. Roy",
    venue: "2019 4th International Conference on Electrical Information and Communication Technology (EICT)",
    details: "pp. 1–5",
    year: 2019,
    type: "Conference",
    materials: {
      doi: "https://doi.org/10.1109/eict48899.2019.9068748",
    },
    bibtex: "@inproceedings{Yusuf_2019, title={Stress Identification during Sustained Mental Task and Brain Relaxation Modeling with $\\beta/\\alpha$ Band Power Ratio}, url={http://dx.doi.org/10.1109/eict48899.2019.9068748}, DOI={10.1109/eict48899.2019.9068748}, booktitle={2019 4th International Conference on Electrical Information and Communication Technology (EICT)}, publisher={IEEE}, author={Yusuf, Md. Salah Uddin and Islam, Monira and Roy, Shidhartho}, year={2019}, month=Dec, pages={1–5} }",
  },
];

export const siteConfig = {
  name: "Shidhartho Roy",
  title: "PhD Student in Biomedical Engineering, Carnegie Mellon University",
  subtitle: "PhD Student, Biomedical Engineering · Carnegie Mellon University",
  description:
    "PhD student at Carnegie Mellon building virtual reality systems and translational biomedical devices that bring pain research from the lab into daily life.",
  // Bolded wherever it appears in a research citation's author list.
  authorName: "S. Roy",
  portrait: "/images/blog/potrait_card.jpeg",
  // Square 280 px and 560 px copies of the portrait for the sidebar <img srcset>;
  // the full-size `portrait` is kept for JSON-LD.
  portraitSizes: ["/images/portrait-280.jpg", "/images/portrait-560.jpg"],
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
    '**Shidhartho "Sid" Roy** is a Ph.D. student in [Biomedical Engineering](https://www.cmu.edu/bme/) at [Carnegie Mellon University](https://www.cmu.edu/), advised by [Prof. Sossena Wood](https://www.cmu.edu/bme/woodneurolab/) in the Wood Neuro Research Group. He also collaborates with the [Augmented Perception Lab](https://augmented-perception.org/) in CMU\'s Human-Computer Interaction Institute.',
    "His research aims to make pain measurable outside the clinic, so people with chronic conditions can be assessed where they live, not only at occasional visits. To this end, he builds ==translational biomedical devices== and ==virtual reality based systems== that bring laboratory pain testing into daily life, centered on ==sickle cell disease==. This work carries EEG and autonomic biomarkers from the lab into a ==self-administered, VR-guided pain test==, then into everyday monitoring with a phone diary and smartwatch. Both lines of work ask whether markers found in the lab hold up in real life. His studies of how the brain and body respond to surprise, in VR and while driving, test this in everyday tasks, toward ==neurophysiological markers drawn from daily activity==.",
    "His work has appeared in the Journal of Biomedical Optics, The Journal of Pain, Computers in Biology and Medicine, Artificial Intelligence in Medicine, IEEE Access, and SPIE proceedings, with abstracts at SfN, BMES, OHBM, and ASH. His first-author paper on melanin bias in near-infrared spectroscopy was named a Journal of Biomedical Optics 2024 Top Paper, and he has received the CMU BME Research Excellence and Mentorship Awards. Across his M.S. and Ph.D., his research has been supported by the Bradford and Diane Smith Fellowship in Engineering, the Mastercard Foundation, and the Pennsylvania Infrastructure Technology Alliance (PITA), as well as sponsored research from the BMW Research Group and Meta Reality Labs. He earned an M.S. in Biomedical Engineering from CMU and a B.Sc. in Electrical and Electronic Engineering from KUET.",
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
  publications,
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
