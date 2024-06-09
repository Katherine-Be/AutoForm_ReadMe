// required for application
var inquirer = require('inquirer');
var fs = require('fs');


function init() {
  inquirer.prompt([
      // prompt format:
      // {
      // allowed user input type,
      // question/prompt displayed in console for user, 
      // object name to reference user's answer
      // },
    {
    type: 'input',
    message: 'Your project title:',
    name: 'title',
    },
    {
    type: 'input',
    message: 'Describe your application.',
    name: 'description',
    },
    {
    type: 'input',
    message: 'Describe each step to installing your application.',
    name: 'installation',
    },
    {
    type: 'input',
    message: 'How does the user interact with your application?',
    name: 'use',
    },
    {
      type: 'input',
      message: 'How does the user run tests for the application?',
      name: 'testing',
    },
    {
      type: 'input',
      message: 'What other colaborators were involved in making your application? (If none, hit ENTER)',
      name: 'creditCollabs',
    },
    {
      type: 'input',
      message: 'Include any third-party attributions are required. (If none, hit ENTER)',
      name: 'creditAttributions',
    },
    {
      type: 'input',
      message: 'How can users contribute to your application?',
      name: 'contributing',
    },
    {
      type: 'input',
      message: 'What is the licensing for your application?',
      name: 'license',
    },
    {
      type: 'input',
      message: 'Add a link or the file path to a screenshot of your application.',
      name: 'demo',
    },
    {
      type: 'input',
      message: 'If you would like to include a Badge, what is the badge subject(left side text)? (If none, hit ENTER)',
      name: 'badgeSubject',
    },
    {
      type: 'input',
      message: 'If you would like to include a Badge, what is the badge status(right side text)? (If none, hit ENTER)',
      name: 'badgeStatus',
    },
    {
      type: 'input',
      message: 'If youw= would like to include a Badge, what is the badge color(hex, rgb, rgba, hsl, hsla and css format accepted without special characters)? (If none, hit ENTER)',
      name: 'badgeColor',
    },
    {
      type: 'input',
      message: 'What is your name and/or GitHub username?',
      name: 'github',
    },
    {
      type: 'input',
      message: 'What is your email?',
      name: 'emsil',
    }
  ])
  .then((answers) => {
    // format the readmefile
    const readmeContent = `
    # ${answers.title}
    
    ## Description
    ${answers.description}

    ## Table of Contents
    - [Description](#description)
    - [Installation](#installation)
    - [Use](#use)    
    - [Credits](#credits)
    - [Contributing](#contributing)
    - [License](#license)
    - [Testing](#testing)

    
    ## Installation
    ${answers.installation}
    
    ## Use
    ${answers.use}

    ## Testing
    ${answers.testing}

    ## Credits
    ${answers.credits}
    ${answers.creditAttributions}

    ## Contributing
    ${answers.contributing}

    ## License
    ${answers.license}

    ![alt text](${answers.demo})

    ![ alt text ](https://img.shields.io/badge/${answers.badgeSubject}-${answers.badgeStatus}-${answers.badgeColor})]

    ## Questions
    ${answers.github}
    ${answers.email}
    `;

    // create file in fs
    fs.writeFile('newReadMe.md', readmeContent, function (err) {
      if (err) throw err;
      console.log('newReadMe.md has been saved!');
    });
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
};

// initialize app
init();
