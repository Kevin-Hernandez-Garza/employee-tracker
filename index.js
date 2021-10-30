const inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');


// wrap each prompt inside of a function
const promptUser = () => {
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
    ])
};

    // console.table(data coming from sql)
    // when inserting sql queries according to the prompt insert literals in the tables



    //return tables
const allEmployees = () => {

};

const allEmDepartment = () => {

};

const allManagers = () => {

};


// update employee
const updateEmp = () => {

};



//new employee
const newEmployee = () => {
inquirer 
    .prompt([
        {

        }
    ])
};



// calling this function on initiation
function init(){
    promptUser();
}

//initializing the application
init();