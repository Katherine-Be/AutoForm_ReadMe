// erquired for application
var inquirer = require('inquirer');
var fs = require('fs');

function init() {
  inquirer.prompt([
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
    }
  ])
  .then((answers) => {
    const readmeContent = `
    # ${answers.title}
    
    ## Description
    ${answers.description}
    
    ## Installation
    ${answers.installation}
    
    ## Use
    ${answers.use}
    `;

    fs.writeFile('newReadMe.md', readmeContent, function (err) {
      if (err) throw err;
      console.log('newReadMe.md has been saved!');
    });
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
};
init();
