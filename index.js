const inquirer = require('inquirer');
const db = require('./db');


// wrap each prompt inside of a function
inquirer
    .prompt([
        {
            type: 'list',
            name: 'query',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all Employees by Department',
                'View all employees by Manager',
                'Add Employee',
                'Update Employee Role'
            ]
        },
    ]);

    // console.table(data coming from sql)