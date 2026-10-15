import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-biology",
  unit: 1,
  title: "Lessons on Life",
  titleBn: "জীবন পাঠ",
  summary: "After this unit you can explain what biology is and sort its branches into physical and applied, place organisms in Whittaker's five kingdoms, and rank and name an organism correctly using binomial nomenclature.",
  concepts: [
    {
      id: "bd-ssc-biology-1-1",
      title: "Biology and its physical and applied branches",
      hook: "Biology is the science of life. Some of its branches build the theory, and others put that theory to work.",
      steps: [
        { label: "Name it", text: "The word biology comes from two Greek words. 'Bios' means life and 'logos' means knowledge. So biology is the science of life and the characteristics of organisms." },
        { label: "Beyond two", text: "For a long time biology had two branches, botany for plants and zoology for animals. But bacteria and fungi are neither, so biology now has many branches." },
        { label: "Physical side", text: "Physical biology gives more importance to theory. Morphology studies form and structure, taxonomy studies classification, physiology studies body processes, and ecology studies organisms and their environment." },
        { label: "Applied side", text: "Applied biology gives more importance to use. Fisheries manages fish, entomology studies insects and their control, agriculture grows crops, and medical science treats disease." },
      ],
      analogy: "Think of a mobile phone. The engineers who study how signals travel are doing the theory. The technician in a Dhaka market who repairs your phone is using it. Physical biology explains life, and applied biology uses that knowledge on fish farms, in fields and in hospitals.",
      story: [
        "Rafi's uncle is a fisheries officer in Chandpur, where the Padma meets the Meghna. During a school holiday, Rafi went with him on a boat to visit a hilsa sanctuary. 'So you are a biologist?' Rafi asked. His uncle smiled. 'An applied one.'",
        "As the boat moved, he explained. Scientists first studied how hilsa breed, what they eat and how river water affects them. That is theory, the physical side of biology. His job uses that knowledge to stop fishing in the breeding season, so the hilsa stock can recover.",
        "Back home, Rafi opened his biology book and found both lists. Ecology and physiology were on one side. Fisheries was on the other. In the margin he wrote a note: one side asks how life works, the other asks how to use that knowledge.",
      ],
      deepRead: [
        "Biology is the branch of science that deals with life and the characteristics of organisms. The word comes from the Greek 'bios', meaning life, and 'logos', meaning knowledge. Living things are made of non-living matter, so biology needs physics and chemistry. Yet life shows new properties that its parts do not have, just as water behaves nothing like the hydrogen and oxygen it is made from. That is why biology is a science of its own.",
        "Biology was long split into botany and zoology. Today it has many branches, grouped into two divisions. In physical biology, theoretical study gets more importance. Its branches include morphology (form and structure), taxonomy (classification), physiology (activities such as respiration and photosynthesis), histology (tissues), embryology (development of the embryo), cytology (cells), genetics (genes and heredity), evolution, ecology, endocrinology (hormones) and biogeography (distribution of organisms).",
        "In applied biology, practical use gets more importance. The textbook lists fisheries, biostatistics, parasitology, palaeontology (fossils), entomology (insects), microbiology, agriculture, medical science, genetic engineering, biochemistry, environmental science, marine biology, forestry, biotechnology, pharmacy, wildlife and bioinformatics. Worked example: where does controlling the Aedes mosquitoes that spread dengue in Dhaka belong? Insects are studied in entomology, and controlling them is a practical use, so it is an applied branch.",
      ],
      example: {
        question: "Tanvir studies how jute plants make their food by photosynthesis. Which branch of biology is he working in?",
        options: ["Physiology", "Morphology", "Palaeontology"],
        answer: 0,
        why: "Physiology deals with the biochemical activities of organisms, such as respiration and photosynthesis.",
      },
      keyPoints: [
        "Biology is the science of life, from the Greek words bios, meaning life, and logos, meaning knowledge.",
        "Physical biology focuses on theory, with branches such as morphology, taxonomy, physiology, genetics and ecology.",
        "Applied biology focuses on practical use, with branches such as fisheries, entomology, agriculture, medical science and biotechnology.",
      ],
      misconception: {
        belief: "Biology has only two branches, botany for plants and zoology for animals.",
        correction: "That old split leaves out bacteria, fungi and viruses, which are neither plants nor animals. It also cannot handle questions about all organisms at once, such as heredity. So biology is now divided into many branches, grouped as physical and applied.",
      },
      quiz: [
        {
          question: "Which branch of biology studies the geographical distribution of organisms on earth?",
          options: ["Ecology", "Biogeography", "Morphology", "Taxonomy"],
          answer: 1,
          why: "Biogeography studies where organisms are found on earth and how that distribution came about.",
        },
        {
          question: "Mitu's cousin works on controlling the insects that damage rice fields in Rangpur. What kind of branch is this?",
          options: ["Physical, because insects are animals", "Applied, because it uses knowledge for a practical aim", "Physical, because it is about classification"],
          answer: 1,
          why: "This is entomology used for pest control, and the textbook places entomology among the applied branches.",
        },
        {
          question: "Which branch deals with endocrine glands and the hormones they secrete?",
          options: ["Embryology", "Histology", "Endocrinology"],
          answer: 2,
          why: "Endocrinology is the study of endocrine glands and their hormones.",
        },
      ],
      pairs: [
        { term: "Morphology", match: "Form and structure of organisms" },
        { term: "Physiology", match: "Activities such as respiration, excretion and photosynthesis" },
        { term: "Histology", match: "Microscopic structure and function of tissues" },
        { term: "Palaeontology", match: "Prehistoric life forms and fossils" },
        { term: "Fisheries", match: "Harvesting, management and conservation of fish" },
      ],
      order: {
        prompt: "Put the story of how biology was organised in order.",
        items: [
          "Early people in Greece, Egypt, India and China practise biology for farming and medicine",
          "Biology is split into two branches, botany and zoology",
          "Bacteria and fungi are found to be neither plants nor animals",
          "Biology is divided into many branches, grouped as physical and applied",
        ],
      },
      blitz: [
        { statement: "Taxonomy, the study of classification, is a branch of physical biology.", truth: true, why: "The textbook lists taxonomy among the theory-based physical branches." },
        { statement: "Cytology studies tissues, while histology studies individual cells.", truth: false, why: "It is the other way round: cytology studies cells and histology studies tissues." },
        { statement: "Genetic engineering and biotechnology are both applied branches of biology.", truth: true, why: "Both use biological knowledge for practical purposes, so they are applied." },
        { statement: "Living things are made of non-living matter, so physics and chemistry can explain everything about life.", truth: false, why: "Life shows new properties its parts lack, just as water differs from hydrogen and oxygen." },
      ],
      blanks: [
        { sentence: "In the word biology, 'logos' means ___.", options: ["knowledge", "life", "living"], answer: 0 },
        { sentence: "The branch that studies the relationship between organisms and their environment is ___.", options: ["evolution", "ecology", "embryology"], answer: 1 },
      ],
      sayPrompt: "Tell a friend the difference between physical and applied biology, with two branches of each.",
      glossary: [
        { term: "Biology", bn: "জীববিজ্ঞান" },
        { term: "Physical biology", bn: "ভৌত জীববিজ্ঞান" },
        { term: "Applied biology", bn: "ফলিত জীববিজ্ঞান" },
        { term: "Morphology", bn: "অঙ্গসংস্থান" },
        { term: "Physiology", bn: "শারীরবিদ্যা" },
        { term: "Ecology", bn: "বাস্তুবিদ্যা" },
        { term: "Entomology", bn: "কীটতত্ত্ব" },
        { term: "Fisheries", bn: "মৎস্যবিজ্ঞান" },
      ],
    },
    {
      id: "bd-ssc-biology-1-2",
      title: "Classification and the five kingdoms",
      hook: "About 4 lakh plant species and 13 lakh animal species have been named so far. Without a system to group them, nobody could learn them.",
      steps: [
        { label: "Why group", text: "New species are added almost every day. Classification puts organisms into groups and subgroups, so this huge living world can be known accurately, quickly and easily." },
        { label: "Two kingdoms", text: "The Swedish naturalist Carolus Linnaeus divided the living world into two kingdoms, plants and animals. This system was used until the middle of the twentieth century." },
        { label: "Five kingdoms", text: "In 1969 R. H. Whittaker proposed five kingdoms: Monera, Protista, Fungi, Plantae and Animalia. He used features such as cell type, number of cells and mode of nutrition." },
        { label: "Two super kingdoms", text: "In 1974 Margulis placed the five kingdoms under two super kingdoms. Prokaryota holds Monera, whose cells have no nuclear membrane. Eukaryota holds the other four kingdoms." },
      ],
      analogy: "A kacha bazar in Khulna keeps fish in one row, vegetables in another and spices in a third. You walk straight to the right row instead of searching every stall. Kingdoms work like those rows, so a biologist meeting a new organism knows where to look.",
      story: [
        "Nusrat's biology teacher in Sylhet gave each group a task. They had to sort everything they found around the school pond into Whittaker's five kingdoms. Nusrat's group listed a shapla, a frog, a mushroom on a rotting log, an Amoeba and green threads of blue-green algae.",
        "The shapla went to Plantae and the frog to Animalia. The mushroom had no green colour and fed on the dead log, so it went to Fungi. Under the microscope the Amoeba showed a clear nucleus in a single cell, so it went to Protista.",
        "'The green threads make their own food,' said Tanvir. 'They must be plants.' Their teacher opened the textbook. Blue-green algae have no nuclear membrane, so their cells are prokaryotic. They belong in Monera, with bacteria. Colour alone could not decide the kingdom.",
      ],
      deepRead: [
        "Classification means arranging organisms into groups and subgroups. The branch of biology that does this is taxonomy. Its aims are to know the groups of organisms, to record information systematically, to present it concisely, to identify organisms and to conserve useful ones. Carolus Linnaeus (1707-1778) founded the full system of classification and naming, and he divided the living world into plants and animals.",
        "In 1969 R. H. Whittaker proposed five kingdoms, and in 1974 Margulis placed them under two super kingdoms. Super kingdom Prokaryota contains Monera. These are unicellular, filamentous or colonial, with chromatin material but no nuclear membrane, nucleolus, plastids or mitochondria, though ribosomes are present. They divide by binary fission. Examples are bacteria and blue-green algae. Super kingdom Eukaryota contains four kingdoms. Protista have a well-structured nucleus and form no embryo, like Amoeba, Paramecium and diatoms. Fungi have a chitin cell wall and no chloroplast, absorb their food and reproduce by haploid spores, like yeast, Penicillium and mushrooms. Plantae are mainly photosynthetic, with advanced tissue systems and embryos. Animalia are multicellular heterotrophs with no cell wall or plastids.",
        "Worked example: a yeast cell has a true nucleus, no chloroplast and absorbs its food. The nucleus rules out Monera, and absorption without chloroplasts points to Fungi. In 2004 Thomas Cavalier-Smith split Protista and renamed Monera as Bacteria, making six kingdoms.",
      ],
      example: {
        question: "A single-celled organism from a pond has no nuclear membrane, and its cell divides by binary fission. Which kingdom does it belong to?",
        options: ["Monera", "Protista", "Fungi"],
        answer: 0,
        why: "No nuclear membrane means a prokaryotic cell, and Monera is the only prokaryotic kingdom.",
      },
      keyPoints: [
        "Classification groups organisms so that the vast living world can be known accurately, quickly and easily.",
        "In 1969 Whittaker proposed five kingdoms: Monera, Protista, Fungi, Plantae and Animalia.",
        "Monera are prokaryotic, with no nuclear membrane, while the other four kingdoms are eukaryotic.",
      ],
      misconception: {
        belief: "Mushrooms grow out of the ground like plants, so they belong to kingdom Plantae.",
        correction: "Mushrooms have no chloroplast and cannot make food by photosynthesis. They absorb food from dead or living matter, have a cell wall made of chitin and reproduce by haploid spores. These features place them in kingdom Fungi.",
      },
      quiz: [
        {
          question: "Who proposed the five-kingdom classification in 1969?",
          options: ["Carolus Linnaeus", "R. H. Whittaker", "Margulis", "Thomas Cavalier-Smith"],
          answer: 1,
          why: "Whittaker proposed five kingdoms in 1969; Linnaeus had used only two.",
        },
        {
          question: "Which feature places blue-green algae in kingdom Monera rather than Plantae?",
          options: ["They live in water", "They are green in colour", "Their cells have no nuclear membrane"],
          answer: 2,
          why: "Monera are prokaryotic, and blue-green algae lack a nuclear membrane even though some make food.",
        },
        {
          question: "Members of which kingdom have no cell wall or plastids and depend on other organisms for food?",
          options: ["Animalia", "Fungi", "Protista"],
          answer: 0,
          why: "Animals have no cell walls or plastids, so they are heterotrophs that ingest and digest food.",
        },
      ],
      pairs: [
        { term: "Monera", match: "Prokaryotic, no nuclear membrane, such as bacteria" },
        { term: "Protista", match: "Eukaryotic with no embryo, such as Amoeba" },
        { term: "Fungi", match: "Chitin cell wall and absorbs food, such as Penicillium" },
        { term: "Plantae", match: "Photosynthetic and forms embryos, such as the jackfruit tree" },
        { term: "Animalia", match: "Multicellular heterotrophs, such as the Royal Bengal Tiger" },
      ],
      order: {
        prompt: "Put these steps in the history of classifying the living world in order.",
        items: [
          "Linnaeus divides the living world into two kingdoms, plants and animals",
          "Whittaker proposes five kingdoms in 1969",
          "Margulis places the five kingdoms under two super kingdoms in 1974",
          "Cavalier-Smith splits Protista and renames Monera, giving six kingdoms in 2004",
        ],
      },
      blitz: [
        { statement: "The cell wall of fungi is made of chitin.", truth: true, why: "The textbook lists a chitin cell wall as a feature of kingdom Fungi." },
        { statement: "Members of kingdom Monera have a nucleus surrounded by a nuclear membrane.", truth: false, why: "Monera have chromatin material but no nuclear membrane or nucleolus." },
        { statement: "Members of kingdom Protista do not develop an embryo.", truth: true, why: "No embryo is formed in Protista; embryos appear in Plantae and Animalia." },
        { statement: "Carolus Linnaeus divided the living world into five kingdoms.", truth: false, why: "Linnaeus used two kingdoms; Whittaker proposed five in 1969." },
      ],
      blanks: [
        { sentence: "Kingdom Monera belongs to the super kingdom ___.", options: ["Eukaryota", "Prokaryota", "Animalia"], answer: 1 },
        { sentence: "Members of kingdom Fungi take in their food by ___.", options: ["absorption", "photosynthesis", "ingestion"], answer: 0 },
      ],
      sayPrompt: "Explain to a friend why blue-green algae go in Monera and mushrooms go in Fungi, not in Plantae.",
      glossary: [
        { term: "Classification", bn: "শ্রেণিবিন্যাস" },
        { term: "Taxonomy", bn: "শ্রেণিবিন্যাসবিদ্যা" },
        { term: "Kingdom", bn: "রাজ্য" },
        { term: "Prokaryotic cell", bn: "আদিকোষ" },
        { term: "Eukaryotic cell", bn: "প্রকৃতকোষ" },
        { term: "Monera", bn: "মনেরা" },
        { term: "Protista", bn: "প্রোটিস্টা" },
        { term: "Fungi", bn: "ফানজাই" },
      ],
    },
    {
      id: "bd-ssc-biology-1-3",
      title: "Taxonomic ranks and binomial nomenclature",
      hook: "Rui fish has different names in different languages, but scientists everywhere call it Labeo rohita. Two Latin words point to exactly one species.",
      steps: [
        { label: "Seven ranks", text: "Taxonomy uses seven main ranks: kingdom, phylum or division, class, order, family, genus and species. Kingdom is the largest rank and species is the smallest." },
        { label: "Nested sets", text: "Each rank is a subset of the one above it. Going down, organisms share more characteristics but fewer organisms fit. This system is called a nested hierarchy." },
        { label: "Two names", text: "A scientific name has two parts. The first is the genus name and the second is the species name. In Solanum tuberosum, the potato, Solanum is the genus." },
        { label: "Write it right", text: "Write the name in Latin. Start the genus with a capital letter and write the species in small letters. Print it in italics, or underline each part separately by hand." },
      ],
      analogy: "A postal address narrows down step by step: country, division, district, area, road and house. Each line sits inside the one before. Taxonomic ranks narrow down the same way, from kingdom to species, and the last two lines, genus and species, make the scientific name.",
      story: [
        "Mitu was copying scientific names into her biology notebook in Khulna. In a hurry she wrote 'labeo Rohita' for rui fish and 'Oryza Sativa' for rice, with one long line under each name.",
        "Her cousin Sabbir, a zoology student, looked over her shoulder. 'The genus gets a capital letter and the species gets none,' he said. 'By hand, you underline each word separately.' She rewrote them as Labeo rohita and Oryza sativa, with a separate line under every word.",
        "Then he told her about a small frog found only in Dhaka. A young zoologist, Sazid Ali Haoladar, named it Zakerana dhaka. The genus honours Kazi Zaker Hossain, founder of the Zoology Department at Dhaka University. 'Now any scientist in the world knows exactly which frog you mean,' Sabbir said.",
      ],
      deepRead: [
        "Taxonomy arranges organisms in ranks called taxa. There are seven main ranks: kingdom, phylum (division for plants), class, order, family, genus and species. The higher the rank, the fewer the shared characteristics and the more organisms it holds. Each rank is a subset of the one above, so the system is called a nested hierarchy. Human beings are classified like this: Kingdom Animalia (multicellular heterotrophs), Phylum Chordata (notochord at some stage of life), Class Mammalia (feed young on milk, body has hair), Order Primate (grasping hands, sight more developed than smell), Family Hominidae (similar to chimpanzee and gorilla), Genus Homo (large brain, walks upright) and Species Homo sapiens.",
        "Binomial nomenclature gives every species a two-part name: genus first, then species. Linnaeus laid its foundation in 1753 in his book Species Plantarum. Plant names follow the ICBN and animal names follow the ICZN. The rules are: the name is in Latin; the genus starts with a capital letter and the species is all small letters; printed names are in italics; handwritten names have each part underlined separately; each name is unique; under the rule of priority the earliest legitimate name is accepted; and the namer's name may be added in short with the year, as in Oryza sativa L., 1753.",
        "Worked example: a student writes Mangifera Indica by hand with one line under both words. The correct form is Mangifera indica, with a separate line under each word.",
      ],
      example: {
        question: "The scientific name of the Royal Bengal Tiger is Panthera tigris. What does the word Panthera tell you?",
        options: ["Its genus", "Its species", "Its family"],
        answer: 0,
        why: "The first part of a scientific name is always the genus, and the second part is the species.",
      },
      keyPoints: [
        "The seven main ranks, from largest to smallest, are kingdom, phylum, class, order, family, genus and species.",
        "A scientific name has two parts: the genus name comes first, followed by the species name.",
        "The genus starts with a capital letter, the species is all small letters, and the printed name is italic.",
      ],
      misconception: {
        belief: "Both words of a scientific name start with a capital letter, just like a person's name.",
        correction: "Only the genus name takes a capital first letter. The species name is written entirely in small letters, as in Oryza sativa and Homo sapiens. This holds even when it comes from a place name, as in Zakerana dhaka.",
      },
      quiz: [
        {
          question: "Which taxonomic rank comes directly between class and family?",
          options: ["Genus", "Order", "Phylum"],
          answer: 1,
          why: "The ranks run kingdom, phylum, class, order, family, genus, species, so order sits between class and family.",
        },
        {
          question: "Several scientists give different names to the same organism. Under the rule of priority, which name is accepted?",
          options: ["The longest name", "The most widely used name", "The earliest legitimate name"],
          answer: 2,
          why: "The rule of priority accepts the earliest legitimate name given by the first scientist.",
        },
        {
          question: "The scientific name of hilsa is Tenualosa ilisha. What is ilisha?",
          options: ["The species name", "The genus name", "The family name"],
          answer: 0,
          why: "The second word of a scientific name is the species name.",
        },
      ],
      pairs: [
        { term: "Kingdom", match: "The largest taxonomic rank" },
        { term: "Species", match: "The smallest taxonomic rank" },
        { term: "Genus", match: "The first part of a scientific name" },
        { term: "ICZN", match: "The code that governs the scientific names of animals" },
        { term: "Rule of priority", match: "The earliest legitimate name given is the one accepted" },
      ],
      order: {
        prompt: "Put these ranks in the classification of human beings in order, from largest to smallest.",
        items: ["Class Mammalia", "Order Primate", "Family Hominidae", "Genus Homo"],
      },
      blitz: [
        { statement: "Each taxonomic rank is a subset of the rank above it.", truth: true, why: "That is why the system is called a nested hierarchy." },
        { statement: "The lower the taxonomic rank, the more organisms it contains.", truth: false, why: "Lower ranks hold fewer organisms, though those organisms share more characteristics." },
        { statement: "Linnaeus laid the foundation of binomial nomenclature in 1753 with his book Species Plantarum.", truth: true, why: "In that book he defined genus and species and began the two-part naming system." },
        { statement: "A handwritten scientific name should have one continuous line under both words.", truth: false, why: "Each part of a handwritten scientific name is underlined separately." },
      ],
      blanks: [
        { sentence: "Every scientific name is written in the ___ language.", options: ["English", "Latin", "Greek"], answer: 1 },
        { sentence: "In Homo sapiens, the word Homo is the ___ name.", options: ["genus", "species", "order"], answer: 0 },
      ],
      sayPrompt: "Explain to a friend how to write a scientific name correctly, using rui fish, Labeo rohita, as your example.",
      glossary: [
        { term: "Phylum", bn: "পর্ব" },
        { term: "Class", bn: "শ্রেণি" },
        { term: "Order", bn: "বর্গ" },
        { term: "Family", bn: "গোত্র" },
        { term: "Genus", bn: "গণ" },
        { term: "Species", bn: "প্রজাতি" },
        { term: "Binomial nomenclature", bn: "দ্বিপদ নামকরণ" },
        { term: "Nested hierarchy", bn: "নেস্টেড হায়ারার্কি" },
      ],
    },
  ],
  cq: {
    stem: "Farhan's biology teacher in Rajshahi showed the class three organisms. A was a single-celled organism from pond water with a well-structured nucleus. B was a mushroom growing on a damp log. C was a mango sapling, which Farhan labelled by hand as mangifera Indica, with one line under both words.",
    knowledge: {
      q: "What is taxonomy?",
      a: "Taxonomy is the branch of biology that deals with the classification of organisms and the principles related to it.",
    },
    comprehension: {
      q: "Why is organism A placed in kingdom Protista and not in Monera?",
      a: "Organism A has a well-structured nucleus enclosed by a nuclear membrane, so it is eukaryotic and belongs to super kingdom Eukaryota. Members of Monera are prokaryotic: they have chromatin material but no nuclear membrane or nucleolus. As a simple single-celled eukaryote that forms no embryo, A fits kingdom Protista, like Amoeba.",
    },
    application: {
      q: "Identify the mistakes in the scientific name Farhan wrote for C and write it correctly, using the rules of binomial nomenclature.",
      a: "The correct name is Mangifera indica. Farhan made three mistakes. First, the genus name must begin with a capital letter, so mangifera should be Mangifera. Second, the species name must be written entirely in small letters, so Indica should be indica. Third, a handwritten scientific name must have its two parts underlined separately, so Mangifera and indica each need their own line. In print, the name would be written in italics instead.",
    },
    higherOrder: {
      q: "Of organisms B and C, which is more advanced? Analyse with reasons.",
      a: "C, the mango plant, is more advanced than B, the mushroom. B belongs to kingdom Fungi. Its body is made of mycelium, it has no chloroplast and it cannot make its own food, so it absorbs food from the damp log. It reproduces by haploid spores and forms no embryo or advanced tissue system. C belongs to kingdom Plantae. It has chloroplasts and makes its own food by photosynthesis. It has advanced tissue systems, forms an embryo from which the diploid stage begins, and reproduces sexually by the union of structurally different gametes. Because C has a more complex body, makes its own food and forms an embryo, C is more advanced than B.",
    },
  },
} satisfies UnitContent;

export default unit;
