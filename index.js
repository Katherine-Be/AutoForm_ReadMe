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
      message: 'Include any third-party attributions that are required. (If none, hit ENTER)',
      name: 'creditAttributions',
    },
    {
      type: 'input',
      message: 'How can users contribute to your application?',
      name: 'contributing',
    },
    {
      type: 'rawlist',
      message: 'What is the licensing for your application? (This will create a badge and explanation of the license)',
      choices: [
        'Creative Commons Family',
        'Do What The F*ck You Want To Public License',
        'LaTeX Project Public License v1.3c'
      ],
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
      name: 'email',
    }
  ])
    .then((answers) => {
    // create license bage and add description of license
    if (answers.license === 'Creative Commons Family') {
      answers.license = 'CC BY';
      answers.licenseDescription = 'This license lets others distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you for the original creation.';
    } else if (answers.license === 'Do What The F*ck You Want To Public License') {
      answers.license = 'WTFPL';
      answers.licenseDescription = 'This is a free software license that allows for unlimited freedom and is permissive in nature. The user is allowed to do whatever they want with the software.';
    } else if (answers.license === 'LaTeX Project Public License v1.3c') {
      answers.license = 'LPPL-1.3c';
      answers.licenseDescription = 'This license is a free software license that allows users to use, modify, and distribute the software. It is specifically designed for the LaTeX project.';
    }
    return answers;
  })

  .then((answers) => {
    // format the readmefile - can make this a separate js file
    const readmeContent = 
    `
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
${answers.creditCollabs}
${answers.creditAttributions}

## Contributing
${answers.contributing}

## License
![ alt text ](https://img.shields.io/badge/License-${answers.licenses}-blue)
${answers.licenseDescription}

![alt text](${answers.demo})

![ alt text ](https://img.shields.io/badge/${answers.badgeSubject}-${answers.badgeStatus}-${answers.badgeColor})

## Questions
${answers.github} ![GitHub Profile](www.github.com/${answers.github})
${answers.email}
`;

    // create file in fs
    fs.writeFile('ReadMe.md', readmeContent, function (err) {
      if (err) throw err;
      console.log('ReadMe.md has been saved!');
    });
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
};

// initialize app
init();
