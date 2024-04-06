// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const generateMarkdown = require('./utils/generateMarkdown.js');


// License function
function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}



// Validate input function
function validateInput(value){
    if (value != ""){
        return true;
    } else {
        return "Please anser the question with an input value.";
    }
}

// TODO: Create an array of questions for user input
const questions = [
{
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: validateInput, 
},
{
    type: "input",
    name: "description",
    message: "Please enter a description of your project ",
    validate: validateInput,
},
{
    type: "input",
    name: "installation",
    message: "Please enter an explanation how to install the software, or commands for the program. ",
    validate: validateInput,
},
{
    type: "input",
    name: "usage",
    message: "Please describe how can use this program/project.", 
    validate: validateInput,
},
{
    type: "list",
    name: "license",
    message: "Please select a license for this project.",
    choices: [
        "GNU AGPLv3",
        "GNU GPLv3",
        "GNU LGPLv3",
        "Apache 2.0",
        "Boost Software 1.0",
        "MIT",
        "Mozilla",
    ],
    validate: validateInput,
},
{

    type: "input",
    name: "tests",
    message: "Please enter any tests or test instructions for your project.",
    validate: validateInput,
},
{
    type: "input",
    name: "userName",
    message: "What is your GitHub username?",
    validate: validateInput,
},
{
    type: "input",
    name: "userEmail",
    message: "What is your GitHub email address that contributors may contact?",
    validate: function (value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        } else {
            return "Not a valid email address";
        }
    },
},
];
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, ""));
        data.getLicense = getLicense(data.license);
        writeToFile("./Readme/README.md",data);
    });
}

// Function call to initialize app
init();
