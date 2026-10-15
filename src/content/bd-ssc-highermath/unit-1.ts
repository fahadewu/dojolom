import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-highermath",
  unit: 1,
  title: "Set and Function",
  titleBn: "সেট ও ফাংশন",
  summary: "After this unit you can write the power set of a set and count its subsets, find the domain, range and inverse of a relation, and show that a function is one-one and onto before finding its inverse.",
  concepts: [
    {
      id: "bd-ssc-highermath-1-1",
      title: "Power sets and the number of subsets",
      hook: "A pitha stall with 3 toppings can serve 8 different plates, plain one included. The power set explains why, and why one more topping doubles the count.",
      steps: [
        { label: "List subsets", text: "Write every subset of A, starting with the empty set ∅ and ending with A itself. For A = {a, b}, the subsets are ∅, {a}, {b} and {a, b}." },
        { label: "Collect them", text: "The set of all subsets of A is called the power set of A, written P(A). So for A = {a, b}, P(A) = {∅, {a}, {b}, {a, b}}." },
        { label: "Count", text: "Each element is either in a subset or out of it, which gives two choices for every element. So a set with n elements has 2ⁿ subsets, and n(P(A)) = 2ⁿ." },
        { label: "Proper subsets", text: "Every subset except A itself is a proper subset of A. So a set with n elements has 2ⁿ − 1 proper subsets. For A = {1, 2, 3}, that is 7." },
      ],
      analogy: "A power set is like the switchboard in a Dhaka flat with 3 switches. Each switch is either on or off, so there are 2 × 2 × 2 = 8 patterns. All off is the empty set, and all on is the whole set.",
      story: [
        "Nusrat's mother runs a winter pitha stall near the bus stand in Rajshahi. She sells bhapa pitha with three toppings: date-palm gur, grated coconut and sesame. 'How many different plates can I write on my board?' she asked.",
        "Nusrat, who is in Class 9, wrote the toppings as a set, A = {gur, coconut, sesame}. Every plate was a subset of A. She counted one plain plate, three plates with one topping, three with two and one with all three.",
        "'That makes 8, which is 2³,' she said. 'The plain plate is the empty set, and the full plate is A itself.' Her mother wondered about adding raisins as a fourth topping. 'Then every plate comes with raisins or without them,' said Nusrat. 'So 8 doubles to 16, which is 2⁴.'",
      ],
      deepRead: [
        "The set of all subsets of a set A is called the power set of A and is written P(A). For A = {1, 2, 3}, P(A) = {∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}, so n(P(A)) = 8 = 2³. The elements of P(A) are themselves sets. So {1} ∈ P(A) and {1} ⊆ A, but the number 1 is not an element of P(A). Even the empty set has one subset, itself, so P(∅) = {∅}, which has 2⁰ = 1 element.",
        "Why 2ⁿ? To build a subset of a set with n elements, decide for each element whether it is in or out. That is n decisions with two choices each, giving 2 × 2 × ... × 2 = 2ⁿ subsets. Seen another way, adding one new element doubles the count, because every old subset appears once without the new element and once with it. So {a} has 2 subsets, {a, b} has 4 and {a, b, c} has 8. A set with 2n elements has 2²ⁿ = 4ⁿ subsets, and a set with n elements has 2ⁿ − 1 proper subsets.",
        "Power sets also behave well with intersection. A set is a subset of both A and B exactly when it is a subset of A ∩ B, so P(A ∩ B) = P(A) ∩ P(B) for all sets A and B. Union is different. For A = {1} and B = {2}, P(A ∪ B) contains {1, 2}, but P(A) ∪ P(B) = {∅, {1}, {2}} does not.",
      ],
      example: {
        question: "How many elements does the power set of A = {p, q, r, s} have?",
        options: ["8", "15", "16", "4"],
        answer: 2,
        why: "A has 4 elements, so P(A) has 2⁴ = 16 elements, counting ∅ and A itself.",
      },
      keyPoints: [
        "The power set P(A) is the set of all subsets of A, including the empty set ∅ and A itself.",
        "A set with n elements has 2ⁿ subsets, so n(P(A)) = 2ⁿ, and 2ⁿ − 1 of them are proper subsets.",
        "P(A ∩ B) = P(A) ∩ P(B) is always true, but P(A) ∪ P(B) can be smaller than P(A ∪ B).",
      ],
      misconception: {
        belief: "The power set of the empty set is also empty, because ∅ has nothing in it.",
        correction: "∅ has no elements, but it has one subset, ∅ itself. So P(∅) = {∅}, a set with exactly one element, which matches 2⁰ = 1. A box holding an empty bag is not an empty box.",
      },
      quiz: [
        {
          question: "Which of these is an element of P(A), where A = {1, 2}?",
          options: ["1", "{1}", "{3}"],
          answer: 1,
          why: "The elements of P(A) are the subsets of A, so {1} belongs to P(A), but the number 1 itself does not.",
        },
        {
          question: "A set has 5 elements. How many proper subsets does it have?",
          options: ["31", "32", "25", "10"],
          answer: 0,
          why: "It has 2⁵ = 32 subsets, and leaving out the set itself gives 32 − 1 = 31 proper subsets.",
        },
        {
          question: "If n(P(A)) = 64, how many elements does A have?",
          options: ["8", "6", "32"],
          answer: 1,
          why: "2⁶ = 64, so A has 6 elements.",
        },
      ],
      pairs: [
        { term: "Power set", match: "The set of all subsets of a given set" },
        { term: "Empty set", match: "A set with no elements, written ∅" },
        { term: "Proper subset", match: "A subset that is not equal to the whole set" },
        { term: "n(P(A))", match: "2ⁿ, when A has n elements" },
        { term: "P(∅)", match: "{∅}, a set with exactly one element" },
      ],
      order: {
        prompt: "Put the steps for writing P(A) for A = {1, 2, 3} in order.",
        items: [
          "Write the empty set ∅",
          "Write the one-element subsets {1}, {2} and {3}",
          "Write the two-element subsets {1, 2}, {1, 3} and {2, 3}",
          "Write A itself and check that there are 2³ = 8 subsets",
        ],
      },
      blitz: [
        { statement: "A set with 3 elements has 8 subsets.", truth: true, why: "2³ = 8, counting ∅ and the set itself." },
        { statement: "A set with 4 elements has 2 × 4 = 8 subsets.", truth: false, why: "Each element doubles the count, so there are 2⁴ = 16 subsets, not 2 × 4." },
        { statement: "If a set has 2n elements, it has 4ⁿ subsets.", truth: true, why: "It has 2²ⁿ subsets, and 2²ⁿ = (2²)ⁿ = 4ⁿ." },
        { statement: "For any sets A and B, P(A ∪ B) = P(A) ∪ P(B).", truth: false, why: "For A = {1} and B = {2}, {1, 2} is in P(A ∪ B) but not in P(A) ∪ P(B)." },
      ],
      blanks: [
        { sentence: "The set of all subsets of a set A is called the ___ of A.", options: ["power set", "universal set", "complement"], answer: 0 },
        { sentence: "A set with n elements has ___ subsets.", options: ["2n", "2ⁿ", "n²"], answer: 1 },
      ],
      terms: ["subset", "power set", "empty set", "2ⁿ", "in or out", "proper subset"],
      sayPrompt: "Explain to a friend why a set with 3 elements has 8 subsets, and why adding one more element doubles that number.",
      glossary: [
        { term: "Set", bn: "সেট" },
        { term: "Element", bn: "উপাদান" },
        { term: "Subset", bn: "উপসেট" },
        { term: "Proper subset", bn: "প্রকৃত উপসেট" },
        { term: "Power set", bn: "শক্তি সেট" },
        { term: "Empty set", bn: "ফাঁকা সেট" },
        { term: "Union of sets", bn: "সংযোগ সেট" },
        { term: "Intersection of sets", bn: "ছেদ সেট" },
      ],
    },
    {
      id: "bd-ssc-highermath-1-2",
      title: "Domain, range and inverse relations",
      hook: "A bus conductor's chart pairs each stop with one fare. Turn the chart around, fare to stop, and it may no longer be a function.",
      steps: [
        { label: "Pair up", text: "An ordered pair (x, y) keeps its order, so (2, 3) ≠ (3, 2). A subset S of the Cartesian product A × B is a relation from A to B." },
        { label: "Domain and range", text: "The domain, Dom S, is the set of first elements of the pairs in S. The range, Range S, is the set of second elements." },
        { label: "Swap", text: "Swapping the elements of every pair gives the inverse relation S⁻¹. So Dom S⁻¹ = Range S and Range S⁻¹ = Dom S." },
        { label: "Test", text: "A relation is a function if no two different pairs share a first element. On a graph, no line parallel to the y-axis may meet it twice." },
      ],
      analogy: "A relation is like a bus conductor's fare chart in Dhaka. Each stop has exactly one fare, so stop to fare is a function. Read it backwards and a fare of ৳20 may point to two stops, so fare to stop is not.",
      story: [
        "In a Class 9 lesson in Chattogram, Mr Hossain wrote S = {(−2, 3), (−1, 0), (0, −1), (1, 0), (2, 3)} on the board. 'Find the domain and the range,' he said.",
        "Tanvir read the first elements: Dom S = {−2, −1, 0, 1, 2}. Then he read the second elements, writing each only once: Range S = {−1, 0, 3}. Mitu checked the first elements again. No number appeared twice, so each x had just one partner. 'S is a function,' she said.",
        "Next, Mr Hossain asked them to swap every pair. S⁻¹ held both (3, −2) and (3, 2). 'Now 3 has two partners,' said Tanvir, 'so S⁻¹ is not a function.' Mr Hossain nodded. 'Every pair of S lies on y = x² − 1,' he said. 'Both 2 and −2 give 3, and that is why the swap fails.'",
      ],
      deepRead: [
        "The Cartesian product A × B is the set of all ordered pairs (x, y) with x ∈ A and y ∈ B, and a subset S of it is called a relation from A to B. The first elements of the pairs in S form the domain, Dom S, and the second elements form the range, Range S. For S = {(1, 5), (2, 10), (3, 15), (4, 20)}, Dom S = {1, 2, 3, 4} and Range S = {5, 10, 15, 20}.",
        "Interchanging the elements of every pair gives the inverse relation, S⁻¹ = {(y, x) : (x, y) ∈ S}, so Dom S⁻¹ = Range S and Range S⁻¹ = Dom S. A relation is a function when no two different ordered pairs have the same first element. For S = {(−3, 8), (−2, 3), (−1, 0), (0, −1), (1, 0), (2, 3), (3, 8)}, S is a function, but S⁻¹ is not, because (0, −1) and (0, 1) belong to it.",
        "Relations are often given by an equation. On a graph, a relation is a function when no line parallel to the y-axis meets it more than once. The line 2x − y + 5 = 0 passes this test, but the circle x² + y² = 25 fails, since x = 3 gives y = 4 and y = −4. For F(x) = √(x − 1) to be real, x − 1 ≥ 0. Thus Dom F = {x ∈ R : x ≥ 1} and Range F = {y ∈ R : y ≥ 0}.",
      ],
      example: {
        question: "S = {(1, 4), (2, 1), (3, 0), (4, 1), (5, 4)}. What is Range S?",
        options: ["{1, 2, 3, 4, 5}", "{0, 1, 4}", "{0, 1, 2, 3, 4}"],
        answer: 1,
        why: "The range is the set of second elements, 4, 1, 0, 1 and 4, and a set lists each element only once.",
      },
      keyPoints: [
        "The domain of a relation is the set of first elements of its ordered pairs, and the range is the set of second elements.",
        "The inverse relation S⁻¹ swaps every pair, so its domain is Range S and its range is Dom S.",
        "A relation is a function when no two different pairs share a first element, so no vertical line meets its graph twice.",
      ],
      misconception: {
        belief: "If S is a function, then S⁻¹ must be a function too, because it uses the same pairs.",
        correction: "S⁻¹ is a function only if no two pairs of S share a second element. S = {(−1, 0), (1, 0)} is a function, but S⁻¹ = {(0, −1), (0, 1)} pairs 0 with two different numbers, so it is not a function.",
      },
      quiz: [
        {
          question: "What is the domain of F(x) = √(x − 4)?",
          options: ["{x ∈ R : x ≥ 4}", "{x ∈ R : x > 4}", "{x ∈ R : x ≥ 0}", "All real numbers"],
          answer: 0,
          why: "√(x − 4) is real only when x − 4 ≥ 0, that is x ≥ 4, and x = 4 is allowed because √0 = 0.",
        },
        {
          question: "Which relation is not a function?",
          options: ["{(1, 2), (2, 2), (3, 2)}", "{(2, 1), (2, 2), (2, 3)}", "{(1, 1), (2, 4), (3, 9)}"],
          answer: 1,
          why: "In {(2, 1), (2, 2), (2, 3)} the first element 2 is paired with three different numbers.",
        },
        {
          question: "If S = {(1, 5), (2, 10), (3, 15)}, what is S⁻¹?",
          options: ["{(5, 1), (10, 2), (15, 3)}", "{(1, 1/5), (2, 1/10), (3, 1/15)}", "{(−1, −5), (−2, −10), (−3, −15)}"],
          answer: 0,
          why: "The inverse relation swaps the two elements of every ordered pair.",
        },
      ],
      pairs: [
        { term: "Ordered pair", match: "(x, y), where the order of x and y matters" },
        { term: "Relation from A to B", match: "A subset of the Cartesian product A × B" },
        { term: "Domain", match: "The set of first elements of the ordered pairs" },
        { term: "Range", match: "The set of second elements of the ordered pairs" },
        { term: "Inverse relation", match: "Formed by swapping the elements of every ordered pair" },
      ],
      order: {
        prompt: "Put the steps for testing whether S⁻¹ is a function in order.",
        items: [
          "Write the ordered pairs of S in roster form",
          "Swap the elements of every pair to get S⁻¹",
          "Look for two pairs of S⁻¹ with the same first element",
          "If there are none, S⁻¹ is a function; otherwise it is not",
        ],
      },
      blitz: [
        { statement: "x² + y² = 25 is not a function, because x = 3 gives two values of y.", truth: true, why: "x = 3 gives y = 4 and y = −4, so a vertical line meets the circle twice." },
        { statement: "The range of S = {(1, 4), (2, 4), (3, 4)} is {1, 2, 3}.", truth: false, why: "{1, 2, 3} is the domain; the range is the set of second elements, {4}." },
        { statement: "The domain of S⁻¹ is always equal to the range of S.", truth: true, why: "Swapping each pair turns the second elements of S into the first elements of S⁻¹." },
        { statement: "{(2, 1), (3, 1), (4, 1)} is not a function, because 1 is repeated.", truth: false, why: "A function may repeat second elements; only a first element with two different partners breaks the rule." },
      ],
      blanks: [
        { sentence: "The set of first elements of the ordered pairs of a relation is called its ___.", options: ["range", "domain", "inverse"], answer: 1 },
        { sentence: "A relation is a function when no line parallel to the ___ meets its graph at more than one point.", options: ["x-axis", "y-axis", "line y = x"], answer: 1 },
      ],
      terms: ["ordered pair", "domain", "range", "first element", "inverse relation", "function"],
      sayPrompt: "Explain to a friend how to find the domain and range of a relation, and how to tell whether its inverse is a function.",
      glossary: [
        { term: "Ordered pair", bn: "ক্রমজোড়" },
        { term: "Cartesian product", bn: "কার্তেসীয় গুণজ" },
        { term: "Relation", bn: "অন্বয়" },
        { term: "Domain", bn: "ডোমেন" },
        { term: "Range", bn: "রেঞ্জ" },
        { term: "Inverse relation", bn: "বিপরীত অন্বয়" },
        { term: "Function", bn: "ফাংশন" },
        { term: "Graph", bn: "লেখচিত্র" },
      ],
    },
    {
      id: "bd-ssc-highermath-1-3",
      title: "One-one, onto and inverse functions",
      hook: "A code that turns 5 into 17 can be undone only if no two numbers share a code and every code comes from some number.",
      steps: [
        { label: "Name the sets", text: "For f: A → B, A is the domain and B is the codomain. The range is the set of all images f(x), and it lies inside B." },
        { label: "Test one-one", text: "f is one-one if different elements always have different images. To show it, assume f(a) = f(b) and prove that a = b." },
        { label: "Test onto", text: "f is onto if every element of B is an image, so Range f = B. Take any y in B and find an x with f(x) = y." },
        { label: "Invert", text: "Only a one-one and onto function has an inverse, f⁻¹: B → A. Write y = f(x), solve for x, then write the answer as f⁻¹(x)." },
      ],
      analogy: "A one-one, onto function is like the cloakroom at a wedding hall in Dhaka. Each bag gets its own token, and every token handed out has a bag. Give back a token and you get exactly one bag, which is the inverse at work.",
      story: [
        "Before a cricket match in Cumilla, Nusrat and her cousin Rafi passed secret numbers to each other. Nusrat coded each number x as f(x) = 3x + 2. To send 5, she wrote 17.",
        "Rafi decoded it by undoing each step in reverse order. He took away 2 and then divided by 3: (17 − 2)/3 = 5. 'Your code has an inverse,' he said. 'It is f⁻¹(x) = (x − 2)/3.'",
        "Next week Nusrat tried a cleverer code, f(x) = x². She coded 3 as 9, and Rafi wrote back, 'Was it 3 or −3?' Two numbers had the same image, so this code was not one-one. It could not be undone, and Nusrat went back to 3x + 2.",
      ],
      deepRead: [
        "Let A and B be non-empty sets. If a rule f joins each element x of A with exactly one element y of B, then f is a function from A to B, written f: A → B, and y = f(x). The set of all images f(x) is the range of f, a subset of B. The function f is one-one if different elements of A have different images, that is, f(x₁) = f(x₂) implies x₁ = x₂. It is onto if every element of B is the image of some element of A, that is, Range f = B.",
        "Take f: R → R, f(x) = 5x − 4. If f(a) = f(b), then 5a − 4 = 5b − 4, so a = b and f is one-one. For any real y, x = (y + 4)/5 is real and f(x) = y + 4 − 4 = y, so f is onto. Compare g: R → R, g(x) = x². Here g(2) = g(−2) = 4, so g is not one-one, and −1 is not an image, so g is not onto.",
        "If f: A → B is one-one and onto, its inverse function f⁻¹: B → A is defined by f⁻¹(y) = x when f(x) = y. To find it, write y = f(x) and solve for x. For f(x) = 5x − 4, y = 5x − 4 gives x = (y + 4)/5, so f⁻¹(x) = (x + 4)/5. Check: f(2) = 6 and f⁻¹(6) = 10/5 = 2. Likewise, f(x) = x³ + 5 gives f⁻¹(x) = ∛(x − 5).",
      ],
      example: {
        question: "For f: R → R, f(x) = 2x − 1, what is f⁻¹(7)?",
        options: ["13", "4", "3", "1/13"],
        answer: 1,
        why: "f⁻¹(x) = (x + 1)/2, so f⁻¹(7) = 8/2 = 4, and indeed f(4) = 8 − 1 = 7.",
      },
      keyPoints: [
        "A function f is one-one if f(x₁) = f(x₂) always gives x₁ = x₂, so different elements have different images.",
        "A function f: A → B is onto if its range is the whole of B, so every element of B is an image.",
        "Only a function that is both one-one and onto has an inverse, found by writing y = f(x) and solving for x.",
      ],
      misconception: {
        belief: "f⁻¹ means 1 divided by f, so the inverse of f(x) = 2x − 1 is 1/(2x − 1).",
        correction: "f⁻¹ undoes f; it is not the reciprocal of f. Write y = 2x − 1 and solve: x = (y + 1)/2, so f⁻¹(x) = (x + 1)/2. Check with 3: f(3) = 5 and f⁻¹(5) = 3, but 1/(2 × 5 − 1) = 1/9.",
      },
      quiz: [
        {
          question: "Which function from R to R is not one-one?",
          options: ["f(x) = 3x + 4", "f(x) = x³", "f(x) = x²", "f(x) = 5 − x"],
          answer: 2,
          why: "For f(x) = x², f(2) = f(−2) = 4, so two different numbers share an image.",
        },
        {
          question: "For f: R → R, f(x) = 3x + 3, what is f⁻¹(x)?",
          options: ["(x − 3)/3", "(x + 3)/3", "1/(3x + 3)", "3x − 3"],
          answer: 0,
          why: "y = 3x + 3 gives x = (y − 3)/3, so f⁻¹(x) = (x − 3)/3.",
        },
        {
          question: "For a function f: A → B, which condition makes f onto?",
          options: ["Range f = B", "Range f = A", "f(x₁) = f(x₂) gives x₁ = x₂"],
          answer: 0,
          why: "Onto means every element of B is an image, so the range is the whole of B.",
        },
      ],
      pairs: [
        { term: "One-one function", match: "Different elements of the domain have different images" },
        { term: "Onto function", match: "Every element of the codomain is an image" },
        { term: "Inverse function", match: "Undoes f, sending each f(x) back to x" },
        { term: "Codomain", match: "The set B in f: A → B" },
        { term: "Range of f", match: "The set of all images f(x)" },
      ],
      order: {
        prompt: "Put the steps for finding the inverse of f(x) = 5x − 4 in order.",
        items: [
          "Check that f is one-one and onto, so f⁻¹ exists",
          "Write y = 5x − 4",
          "Solve for x to get x = (y + 4)/5",
          "Replace y by x to write f⁻¹(x) = (x + 4)/5",
        ],
      },
      blitz: [
        { statement: "f: R → R, f(x) = x³ is a one-one function.", truth: true, why: "If a³ = b³ for real numbers a and b, then a = b, so different numbers have different cubes." },
        { statement: "f: R → R, f(x) = x² is an onto function.", truth: false, why: "No real x gives x² = −1, so negative numbers are not images and Range f is not R." },
        { statement: "If f(x) = 5x − 4, then f(f⁻¹(x)) = x for every real x.", truth: true, why: "f(f⁻¹(x)) = 5 × (x + 4)/5 − 4 = x, because an inverse undoes f." },
        { statement: "Every function from R to R has an inverse function.", truth: false, why: "Only one-one and onto functions have inverses; f(x) = x² on R has none." },
      ],
      blanks: [
        { sentence: "A function in which different elements of the domain always have different images is called a ___ function.", options: ["one-one", "onto", "constant"], answer: 0 },
        { sentence: "If f(x) = 2x − 1, then f⁻¹(x) = ___.", options: ["1/(2x − 1)", "(x + 1)/2", "2x + 1"], answer: 1 },
      ],
      terms: ["one-one", "onto", "image", "range", "inverse", "solve for x"],
      sayPrompt: "Explain to a friend how to show that f(x) = 5x − 4 is one-one and onto, and how to find its inverse.",
      glossary: [
        { term: "Function", bn: "ফাংশন" },
        { term: "One-one function", bn: "এক-এক ফাংশন" },
        { term: "Onto function", bn: "সার্বিক ফাংশন" },
        { term: "Inverse function", bn: "বিপরীত ফাংশন" },
        { term: "Domain", bn: "ডোমেন" },
        { term: "Range", bn: "রেঞ্জ" },
        { term: "Real number", bn: "বাস্তব সংখ্যা" },
      ],
    },
  ],
  cq: {
    stem: "At a maths club in Sylhet, Mitu wrote two sets, A = {1, 2, 3} and B = {2, 3, 4}. She also wrote the relation S = {(x, y) : x ∈ A, y ∈ B, y = x + 1}. Her friend Rafi wrote the function f: R → R, f(x) = 3x − 5. He claimed that g(x) = (x + 5)/3 is the inverse of f.",
    knowledge: {
      q: "What is a power set? How many elements does P(A) have?",
      a: "The set of all subsets of a set is called its power set. Since A = {1, 2, 3} has 3 elements, P(A) has 2³ = 8 elements.",
    },
    comprehension: {
      q: "Write S in roster form, find Dom S and Range S, and explain why S is a function.",
      a: "For x = 1, 2 and 3, y = x + 1 gives 2, 3 and 4, and each of these is in B. So S = {(1, 2), (2, 3), (3, 4)}. Dom S = {1, 2, 3} and Range S = {2, 3, 4}. No two ordered pairs of S have the same first element, so each x is paired with exactly one y. Hence S is a function.",
    },
    application: {
      q: "Show that P(A ∩ B) = P(A) ∩ P(B).",
      a: "A ∩ B = {2, 3}, so P(A ∩ B) = {∅, {2}, {3}, {2, 3}}. Now P(A) = {∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}} and P(B) = {∅, {2}, {3}, {4}, {2, 3}, {2, 4}, {3, 4}, {2, 3, 4}}. The elements common to P(A) and P(B) are ∅, {2}, {3} and {2, 3}. So P(A) ∩ P(B) = {∅, {2}, {3}, {2, 3}}. Hence P(A ∩ B) = P(A) ∩ P(B).",
    },
    higherOrder: {
      q: "Show that f is one-one and onto, find f⁻¹(x), and judge whether Rafi's claim about g is correct.",
      a: "One-one: let f(a) = f(b) for real a and b. Then 3a − 5 = 3b − 5, so 3a = 3b and a = b. Hence f is one-one. Onto: take any real y and let x = (y + 5)/3, which is real. Then f(x) = 3 × (y + 5)/3 − 5 = y. So every real number is an image, Range f = R, and f is onto. Inverse: since f is one-one and onto, f⁻¹ exists. Writing y = 3x − 5 gives x = (y + 5)/3, so f⁻¹(x) = (x + 5)/3. Judgement: g(x) = (x + 5)/3 = f⁻¹(x), so Rafi's claim is correct. As a check, g(f(x)) = (3x − 5 + 5)/3 = x and f(g(x)) = (x + 5) − 5 = x. For example, f(4) = 7 and g(7) = 4.",
    },
  },
} satisfies UnitContent;

export default unit;
