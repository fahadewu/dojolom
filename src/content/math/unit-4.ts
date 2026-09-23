import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 4,
  title: "Shapes and space",
  summary: "After this unit you can measure and name angles, find the perimeter and area of flat shapes, and work out how much a box can hold.",
  concepts: [
    {
      id: "math-4-1",
      title: "Angles: how much something turns",
      hook: "An angle isn't about how long the lines are. It measures how far one line has turned away from the other.",
      steps: [
        { label: "A turn", text: "Stand facing a wall. Turn until you face the next wall. That quarter turn is a right angle, and it measures 90 degrees." },
        { label: "Landmarks", text: "Two quarter turns make a straight line: 180 degrees. Four make a full turn: 360 degrees. Every other angle is measured against these." },
        { label: "Names", text: "Smaller than a right angle is acute, like a slice of pizza. Bigger than a right angle but less than a straight line is obtuse." },
        { label: "Size", text: "The length of the lines changes nothing. A tiny corner and a huge corner with the same opening are the same angle." },
      ],
      analogy: "A door on its hinge. Open it a crack and the angle is small. Push it to the wall and it has swung through a right angle. The door is the same size the whole time; only the turn has changed.",
      story: [
        "Amara was helping her grandad fit a new shelf in the hallway. He held the bracket against the wall and asked her to check the corner with the set square. She lined it up. The bracket leaned a little, leaving a thin gap at the top.",
        "'It's only a tiny bit off,' she said. Grandad shook his head. 'A tiny bit here is a big tilt at the far end.' He pushed the bracket until it sat snug against the set square. Ninety degrees exactly, a true right angle.",
        "Amara noticed the set square itself had three corners. One was the right angle. The other two were sharper, acute angles that met the long edge. When the shelf went up, a marble placed on it stayed perfectly still. The angle had done its job.",
      ],
      deepRead: [
        "An angle measures the amount of turn between two lines that meet at a point. The unit is the degree, and a full turn is 360 degrees. That number is ancient and has stuck because 360 divides neatly by 2, 3, 4, 5, 6, 8, 9, 10 and 12. A quarter turn is 90 degrees and is called a right angle; it is the corner of every square, book and door frame. Half a turn is 180 degrees and looks like a straight line. Angles smaller than 90 are acute, angles between 90 and 180 are obtuse, and angles between 180 and 360 are reflex.",
        "The size of an angle has nothing to do with the length of its arms. Draw two lines meeting at a point and extend both to twice their length: the opening between them is unchanged. This is why a small drawing of a triangle and a huge one on a sports field can share exactly the same three angles.",
        "The most useful angle facts are about adding up. Angles that sit together on a straight line total 180 degrees, and angles that meet all the way around a point total 360. Suppose a signpost leans so that it makes an angle of 112 degrees with the pavement on one side. The angle on the other side is 180 - 112 = 68 degrees. Inside any triangle the three angles also add to 180, so a triangle with angles of 90 and 35 has a third angle of 180 - 90 - 35 = 55 degrees.",
      ],
      example: {
        question: "Two angles sit together on a straight line. One is 125 degrees. What is the other?",
        options: ["65 degrees", "55 degrees", "235 degrees"],
        answer: 1,
        why: "Angles on a straight line add up to 180, and 180 - 125 = 55.",
      },
      keyPoints: [
        "An angle measures how much one line has turned from another, not how long the lines are.",
        "A right angle is 90 degrees, a straight line is 180 and a full turn is 360.",
        "Angles smaller than a right angle are acute, and angles between 90 and 180 are obtuse.",
      ],
      misconception: {
        belief: "This angle has longer lines, so it must be a bigger angle.",
        correction: "The length of the arms doesn't change the turn between them. Stretch both lines of a right angle to twice the length and it is still exactly 90 degrees. Look at the opening at the corner, not the lines.",
      },
      quiz: [
        {
          question: "Which of these angles is acute?",
          options: ["45 degrees", "90 degrees", "120 degrees"],
          answer: 0,
          why: "Acute means less than 90 degrees, and 45 is the only one that fits.",
        },
        {
          question: "A clock hand moves from 12 to 3. What angle has it turned through?",
          options: ["45 degrees", "180 degrees", "90 degrees"],
          answer: 2,
          why: "From 12 to 3 is a quarter of a full turn, and a quarter of 360 is 90.",
        },
        {
          question: "A triangle has angles of 60 and 70. What is the third angle?",
          options: ["40 degrees", "50 degrees", "60 degrees"],
          answer: 1,
          why: "The three angles in a triangle add to 180, and 180 - 60 - 70 = 50.",
        },
      ],
      pairs: [
        { term: "Right angle", match: "A quarter turn of exactly 90 degrees" },
        { term: "Acute angle", match: "Any angle smaller than 90 degrees" },
        { term: "Obtuse angle", match: "An angle between 90 and 180 degrees" },
        { term: "Straight line", match: "Half a turn, or 180 degrees" },
        { term: "Full turn", match: "All the way round, 360 degrees" },
      ],
      order: {
        prompt: "Put the steps in order to find the missing angle in a triangle with angles 48 and 67.",
        items: [
          "Remember that the angles in a triangle add to 180",
          "Add the two known angles: 48 + 67 = 115",
          "Take that total away from 180: 180 - 115 = 65",
          "Check by adding all three: 48 + 67 + 65 = 180",
        ],
      },
      blitz: [
        { statement: "A right angle measures 90 degrees.", truth: true, why: "A right angle is a quarter of a full turn of 360." },
        { statement: "An angle with longer arms is a bigger angle.", truth: false, why: "Angle measures the turn between the arms, not their length." },
        { statement: "Two angles on a straight line add up to 360 degrees.", truth: false, why: "A straight line is half a turn, so they add up to 180." },
        { statement: "An angle of 110 degrees is obtuse.", truth: true, why: "Obtuse means bigger than 90 but smaller than 180." },
      ],
      blanks: [
        { sentence: "A quarter turn is called a ___ angle.", options: ["right", "acute", "straight"], answer: 0 },
        { sentence: "The three angles inside any triangle add up to ___ degrees.", options: ["90", "180", "360"], answer: 1 },
      ],
    },
    {
      id: "math-4-2",
      title: "Perimeter and area: around and inside",
      hook: "A fence and a lawn measure two different things. The fence goes around the edge; the lawn fills the space inside.",
      steps: [
        { label: "Perimeter", text: "Perimeter is the distance all the way around a shape. Add up every side. A rectangle 5 long and 3 wide has a perimeter of 5 + 3 + 5 + 3 = 16." },
        { label: "Area", text: "Area is the space inside, counted in squares. Cover the same rectangle with unit squares: 3 rows of 5 makes 15 squares. So area is length times width." },
        { label: "Units", text: "Perimeter is a length, so it comes in centimetres or metres. Area counts squares, so it comes in square centimetres or square metres." },
        { label: "Odd shapes", text: "For an L shape, cut it into rectangles, find each area and add them. For perimeter, still walk the whole outside edge and add every side." },
      ],
      analogy: "Think of a picture frame and the photo inside it. The frame is the perimeter, a strip running around the edge. The photo is the area, the flat space the frame surrounds.",
      story: [
        "Ben's class was given a patch of the school field for a vegetable bed. It was a rectangle, 6 metres long and 4 metres wide. Their teacher asked two questions. How much edging board would they need, and how many bags of compost?",
        "Ben paced out the edge first. Six metres, four, six, four. He added them: 20 metres of board. Then Maya pointed out that compost covers the inside, not the edge. They drew the bed on squared paper, one square per metre, and counted 4 rows of 6. That was 24 squares, so 24 square metres.",
        "One bag covered 2 square metres, so they needed 12 bags. Ben grinned. 'Twenty metres and twelve bags. Two different numbers for two different jobs.' The board hugged the outside, the compost filled the middle, and nobody bought too much of either.",
      ],
      deepRead: [
        "Perimeter and area answer different questions about the same shape. Perimeter asks how far it is around the outside, so it is a length and is measured in units such as centimetres or metres. Area asks how much flat space the shape covers, so it is measured in square units: the number of 1 by 1 squares needed to tile it with no gaps and no overlaps. For a rectangle the perimeter is twice the length plus twice the width, because opposite sides are equal, and the area is length times width, because the squares sit in rows.",
        "Take a rectangular rug 4 metres by 2.5 metres. The perimeter is 4 + 2.5 + 4 + 2.5 = 13 metres, which is the length of braid needed to trim the edge. The area is 4 × 2.5 = 10 square metres, which is the floor it covers. Notice that the two numbers do not move together. A 1 by 9 rectangle has a perimeter of 20 and an area of 9. A 5 by 5 square also has a perimeter of 20 but an area of 25. Same fence, very different lawn.",
        "Shapes that are not rectangles can still be handled. For perimeter, walk the entire boundary and add every side, however many there are. For area, cut the shape into rectangles, find each area and add them up. An L shape made from a 6 by 2 rectangle and a 2 by 3 rectangle has an area of 12 + 6 = 18 square units, however the two pieces are joined.",
      ],
      example: {
        question: "A rectangle is 8 cm long and 3 cm wide. What is its area?",
        options: ["11 square cm", "22 square cm", "24 square cm"],
        answer: 2,
        why: "Area is length times width, and 8 × 3 = 24; the 22 is the perimeter.",
      },
      keyPoints: [
        "Perimeter is the distance all the way around the outside of a shape.",
        "Area is the number of unit squares that fit inside a shape.",
        "For a rectangle, add all four sides for perimeter and multiply length by width for area.",
      ],
      misconception: {
        belief: "If two shapes have the same perimeter, they must have the same area.",
        correction: "A 1 by 9 rectangle and a 5 by 5 square both have a perimeter of 20. But the first has an area of 9 and the second 25. The same length of fence can wrap around a thin strip or a wide square, so perimeter never tells you the area.",
      },
      quiz: [
        {
          question: "A square has sides of 7 cm. What is its perimeter?",
          options: ["14 cm", "28 cm", "49 cm"],
          answer: 1,
          why: "A square has four equal sides, so the perimeter is 7 + 7 + 7 + 7 = 28; the 49 is its area.",
        },
        {
          question: "Which unit would you use for the area of a bedroom floor?",
          options: ["Square metres", "Metres", "Centimetres"],
          answer: 0,
          why: "Area counts squares, so it needs square units; metres and centimetres only measure length.",
        },
        {
          question: "A rectangle has an area of 24 square cm and a length of 6 cm. How wide is it?",
          options: ["18 cm", "12 cm", "4 cm"],
          answer: 2,
          why: "Area is length times width, so the width is 24 ÷ 6 = 4.",
        },
      ],
      pairs: [
        { term: "Perimeter", match: "The distance all the way around a shape" },
        { term: "Area", match: "The flat space inside a shape, counted in squares" },
        { term: "Square centimetre", match: "A unit for area, one centimetre each way" },
        { term: "Length times width", match: "The quick way to find a rectangle's area" },
        { term: "Compound shape", match: "An odd shape you can cut into rectangles" },
      ],
      order: {
        prompt: "Put the steps in order to find the area of an L shape.",
        items: [
          "Split the L shape into two rectangles",
          "Find the length and width of each rectangle",
          "Multiply to get each rectangle's area",
          "Add the two areas together",
        ],
      },
      blitz: [
        { statement: "Perimeter is measured in square units.", truth: false, why: "Perimeter is a length around the edge, so it uses plain units like metres." },
        { statement: "A 6 by 4 rectangle has an area of 24 square units.", truth: true, why: "Area is length times width, and 6 × 4 = 24." },
        { statement: "Two shapes with the same perimeter always have the same area.", truth: false, why: "A 1 by 9 rectangle and a 5 by 5 square share a perimeter of 20 but not an area." },
        { statement: "To find the perimeter of a shape with straight sides, add up all the sides.", truth: true, why: "Perimeter is the total distance around, so every side counts." },
      ],
      blanks: [
        { sentence: "The distance all the way around a shape is called its ___.", options: ["area", "perimeter", "volume"], answer: 1 },
        { sentence: "A rectangle 9 cm long and 2 cm wide has an area of ___ square cm.", options: ["11", "22", "18"], answer: 2 },
      ],
    },
    {
      id: "math-4-3",
      title: "Volume: how much a box holds",
      hook: "Area tells you how much floor a box covers. Volume tells you how much it can hold, and one extra number makes all the difference.",
      steps: [
        { label: "Cubes", text: "Volume is measured in cubes. A cube 1 cm on every edge is 1 cubic centimetre. Volume asks how many of these fill the shape." },
        { label: "One layer", text: "Start with the bottom layer of a box 5 long and 3 wide. That is 5 × 3 = 15 cubes, the same as its floor area." },
        { label: "Stack up", text: "If the box is 4 tall, there are 4 layers of 15. So 15 × 4 = 60 cubes. That is the volume: 60 cubic centimetres." },
        { label: "Shortcut", text: "Length times width times height gives the volume of any box shape. The order doesn't matter: 5 × 3 × 4 is the same as 4 × 5 × 3." },
      ],
      analogy: "Stacking sugar cubes in a shoebox. First cover the bottom in one neat layer and count it. Then count how many layers reach the lid. Layers times cubes per layer is the whole box.",
      story: [
        "Kenji was packing for a move and had run out of boxes. The shop sold two kinds. The cube-shaped one was 30 cm long, 30 cm wide and 30 cm tall. The flat one was 60 cm by 40 cm by 10 cm. 'The flat one's bigger,' said his flatmate Rosa. 'It's twice as long.'",
        "Kenji did the sums on the back of the receipt. The cube: 30 × 30 = 900 for one layer, and 30 layers made 900 × 30 = 27,000 cubic centimetres. The flat box: 60 × 40 = 2,400 for one layer, but only 10 layers, so 24,000.",
        "'The little cube holds more,' he said. Rosa checked his working and laughed. 'The flat one looks huge because it's all length. It's the height that lets it down.' They bought cubes for the books and one flat box for the framed prints, and the van was loaded before dark.",
      ],
      deepRead: [
        "Volume is the amount of space something takes up, measured in cubic units. A cubic centimetre is a cube with every edge 1 cm long. For a box shape, properly called a cuboid, volume is length × width × height. The reason is layers. The bottom layer holds length × width cubes, the same number as the area of the base, and the height says how many identical layers sit on top. A box 12 cm long, 5 cm wide and 8 cm high has a base of 12 × 5 = 60 square centimetres and 8 layers, so its volume is 60 × 8 = 480 cubic centimetres.",
        "Because volume multiplies three lengths, small changes in the edges have a large effect. Double every edge of a box and the volume grows by 2 × 2 × 2 = 8 times, not 2 times. It also means you cannot judge volume by one measurement alone: a long, thin box and a short, deep one can hold exactly the same amount.",
        "Volume connects to liquid measures too. One cubic centimetre holds exactly 1 millilitre, so a container 10 cm by 10 cm by 10 cm has a volume of 1,000 cubic centimetres and holds 1,000 millilitres, which is one litre. To check whether a tank will hold a litre, measure the inside edges in centimetres, multiply the three numbers and compare the result with 1,000.",
      ],
      example: {
        question: "A box is 6 cm long, 2 cm wide and 5 cm high. What is its volume?",
        options: ["13 cubic cm", "60 cubic cm", "30 cubic cm"],
        answer: 1,
        why: "Multiply all three edges: 6 × 2 = 12 for one layer, and 5 layers make 60.",
      },
      keyPoints: [
        "Volume is the space inside a solid shape, counted in cubes.",
        "For a box, volume is length times width times height.",
        "Think of it as the area of the bottom layer times the number of layers.",
      ],
      misconception: {
        belief: "The longer box must hold more, because it's the biggest one on the shelf.",
        correction: "Length is only one of three edges. A box 60 by 40 by 10 has a volume of 24,000 cubic cm, while a cube 30 by 30 by 30 has 27,000. All three edges multiply together, so a short edge anywhere pulls the whole volume down.",
      },
      quiz: [
        {
          question: "Which unit is used for volume?",
          options: ["Cubic centimetres", "Square centimetres", "Centimetres"],
          answer: 0,
          why: "Volume counts cubes, so it uses cubic units; squares are for area and plain centimetres for length.",
        },
        {
          question: "A cube has edges of 4 cm. What is its volume?",
          options: ["12 cubic cm", "16 cubic cm", "64 cubic cm"],
          answer: 2,
          why: "Every edge is 4, so the volume is 4 × 4 × 4 = 64.",
        },
        {
          question: "A box has a base of 20 square cm and a volume of 100 cubic cm. How tall is it?",
          options: ["80 cm", "5 cm", "2,000 cm"],
          answer: 1,
          why: "Volume is base area times height, so the height is 100 ÷ 20 = 5.",
        },
      ],
      pairs: [
        { term: "Volume", match: "How much space a solid shape takes up" },
        { term: "Cubic centimetre", match: "A cube with every edge one centimetre long" },
        { term: "Cuboid", match: "A box shape with six rectangular faces" },
        { term: "Layer", match: "One flat sheet of cubes covering the base" },
        { term: "Litre", match: "The same as 1,000 cubic centimetres" },
      ],
      order: {
        prompt: "Put the steps in order to find the volume of a box 7 cm long, 3 cm wide and 4 cm high.",
        items: [
          "Multiply length by width for the bottom layer: 7 × 3 = 21",
          "Use the height to count the layers: 4 cm high means 4 layers of 21",
          "Multiply the layer by the number of layers: 21 × 4 = 84",
          "Write the answer with its unit: 84 cubic centimetres",
        ],
      },
      blitz: [
        { statement: "Volume is measured in cubic units.", truth: true, why: "Volume counts how many unit cubes fill a shape." },
        { statement: "A box 2 by 3 by 4 has a volume of 9 cubic units.", truth: false, why: "You multiply, not add: 2 × 3 × 4 = 24." },
        { statement: "Doubling every edge of a box doubles its volume.", truth: false, why: "All three edges double, so the volume grows 2 × 2 × 2 = 8 times." },
        { statement: "A box 10 cm on every edge holds one litre.", truth: true, why: "10 × 10 × 10 = 1,000 cubic centimetres, and 1,000 millilitres is a litre." },
      ],
      blanks: [
        { sentence: "To find the volume of a box, multiply length by width by ___.", options: ["height", "perimeter", "area"], answer: 0 },
        { sentence: "A box 5 cm long, 2 cm wide and 3 cm high has a volume of ___ cubic cm.", options: ["10", "30", "13"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
