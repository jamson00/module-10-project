const readline = require('readline');
const fs = require('fs');

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function generateLogo() {
  const userInput = await prompt('Enter your text (up to three characters): ');
  const textColor = await prompt('Enter the text color: ');

  // Prompt for shape selection
  console.log('Select a shape:');
  console.log('1. Circle');
  console.log('2. Triangle');
  console.log('3. Square');
  const shapeChoice = await prompt('Enter the shape number: ');

  let shape;
  switch (shapeChoice) {
    case '1':
      shape = 'circle';
      break;
    case '2':
      shape = 'triangle';
      break;
    case '3':
      shape = 'square';
      break;
    default:
      console.log('Invalid shape selection.');
      return;
  }

  const shapeColor = await prompt('Enter the shape color: ');

  // Create the SVG markup
  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <text x="50" y="100" fill="${textColor}">${userInput}</text>
    <${shape} x="100" y="50" width="100" height="100" fill="${shapeColor}"/>
  </svg>`;

  // Save the SVG markup to a file
  fs.writeFile('logo.svg', svgMarkup, 'utf8', (err) => {
    if (err) {
      console.log('Error saving the SVG file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

generateLogo();
