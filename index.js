// required for application
var inquirer = require('inquirer');
var fs = require('fs');
const { table } = require('console');


function init() {
  // create prompts in inquirer format
  inquirer.prompt([
      // prompt format:
      // {
      // allowed user input type,
      // question/prompt displayed in console for user, 
      // object name to reference user's answer
      // choices (if applicable),
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
      message: 'What other collaborators were involved in making your application? (If none, hit ENTER)',
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
        'LaTeX Project Public License v1.3c',
        'None'
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
      message: 'If you would like to include a Badge, what is the badge color(hex, rgb, rgba, hsl, hsla and css format accepted without special characters)? Default color is red. (If none, hit ENTER)',
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
    //check if bad color is in a valid format
    if (answers.badgeColor != '') {
      const color = answers.badgeColor;
      const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (regex.test(color)) {
        answers.badgeColor = color;
      } else {
        answers.badgeColor = 'red';
      }
    }
    return answers;
  })
  
  .then((answers) => {
      // create Table of Contents and format answers for ReadMe
      var tableOfContents = ("## Table of Contents\n\n")
  
      if (answers.description !='') {
        answers.description = ("## Description\n" + answers.description + "\n");
        tableOfContents += ("[Description](#description)\n")
      }
      if (answers.installation !='') {
        answers.installation = ("## Installation\n" + answers.installation + "\n");
        tableOfContents += ("[Installation](#installation)\n")
      }
      if (answers.use !='') {
        answers.use = ("## Use\n" + answers.use + "\n");
        tableOfContents += ("[Use](#use)\n")
      }
      if (answers.testing !='') {
        answers.testing = ("## Testing\n" + answers.testing + "\n");
        tableOfContents += ("[Testing](#testing)\n")
      }

      var credits = '';
      if ((answers.creditCollabs != '') && (answers.creditAttributions !='')) {
        credits = ("## Credits\n" + answers.creditCollabs + "\n" + answers.creditAttributions + "\n");
        tableOfContents += ("[Credits](#credits)\n")
      } else if ((answers.creditCollabs !='') && (!answers.creditAttributions)){
        credits = ("## Credits\n" + answers.creditCollabs + "\n");
        tableOfContents += ("[Credits](#credits)\n")
      } else if ((answers.creditAttributions !='') && (!answers.creditCollabs)){
        credits = ("## Credits\n" + answers.creditAttributions + "\n");
        tableOfContents += ("[Credits](#credits)\n")
      }

      if (answers.contributing !='') {
        answers.contributing = ("## Contributing\n" + answers.contributing + "\n");
        tableOfContents += ("[Contributing](#contributing)\n")
      }
      if ((answers.license !='') && (!answers.license === 'None')) {
        answers.license = ("## License\n" + "![ alt text ](https://img.shields.io/badge/License-" + answers.license + "-blue)\n" + answers.licenseDescription + "\n");
        tableOfContents += ("[License](#license)\n")
        } else {
        answers.license = ("## License\n" + "This application is not licensed.\n");
        tableOfContents += ("[License](#license)\n")
        }
      if (answers.demo !='') {
        answers.demo = ("![alt text](" + answers.demo + ")\n");
        tableOfContents += ("[Demo](#demo)\n")
      }
      if (answers.badgeSubject !='') {
        answers.badgeSubject = ("## Badge\n" + "![ alt text ](https://img.shields.io/badge/" + answers.badgeSubject + "-" + answers.badgeStatus + "-" + answers.badgeColor + ")\n");
        tableOfContents += ("[Badge](#badge)\n")
      }

      var questions = '';
      if ((answers.github !='') && (answers.email !='')) {
        questions = ("## Questions\n" + answers.github + "\n" + answers.email + "\n");
        tableOfContents += ("[Questions](#questions)\n");
     } else if ((answers.github !='') && (!answers.email)){
        questions = ("## Questions\n" + answers.github + " ![GitHub Profile](www.github.com/" + answers.github + ")\n");
        tableOfContents += ("[Questions](#questions)\n");
      } else if ((answers.email !='') && (!answers.github)){
        questions = ("## Questions\n" + answers.email + "\n");
        tableOfContents += ("[Questions](#questions)\n")
      }
      return {answers, tableOfContents, credits, questions};
  })

  .then(({answers, tableOfContents, credits, questions}) => {
    // generate user's ReadMe file
    const readmeContent = 
    `
# ${answers.title}

${answers.description}
${tableOfContents}    
${answers.installation}
${answers.use}
${answers.testing}
${credits}
${answers.contributing}
${answers.license}
${answers.licenseDescription}
${answers.demo}
${answers.badgeSubject}
${questions}`;

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
