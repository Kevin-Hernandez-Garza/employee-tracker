const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


// wrap each prompt inside of a function
const promptUser = () => {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all Department',
                'View all Roles',
                'Add Employee',
                'Update Employee Role'
            ]
        },
    ])
    // switch case statement depending of what the user picks
    .then((data) => {
        switch (data.choices) {
            case 'View all Employees':
            allEmployees();
            break;

            case 'View all Department':
            allDepartment();
            break;

            case 'View all Roles':
            allRoles();
            break;

            case 'Add Employee':
            newEmployee();
            break;

            case 'Update Employee Role':
            updateEmp();
            break;
        }
    })
};

// console.table(data coming from sql)
// when inserting sql queries according to the prompt insert literals in the tables

// update employee
// literal `UPDATE employee SET role_id = ? WHERE id = ?;`
// literal `UPDATE employee SET manager_id = ? WHERE id = ?;`
updateEmp = () => {

}


/* 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?);`
*/
//new employee
newEmployee = () => {
inquirer 
    .prompt([
        {
            type: 'input',
            name: 'newName',
            message: 'What is your first name?',
            validate: firstName => {
                if(firstName) {
                    return true;
                } else {
                    console.log('Please provide a first name!');
                    return false;
                }
            }
        },
        {
           type: 'input',
           name: 'lastName',
           message: 'What is your last name?',
           validate: lastName => {
               if(lastName) {
                   return true;
               } else {
                   console.log('Please provide a last name1');
                   return false;
               }
           }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is your role in the team?',
            choices: [
                'Senior Engineer', 
                'Software Engineer', 
                'Lead Engineer', 
                'Sales Person', 
                'Sales Lead', 
                'Accountant', 
                'Lawyer'
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is you manager?',
            choices: [
                'Kevin Hernandez',
                'Heather West',
                'Stephen McGuire',
                'Not Available'
            ]
        }

    ])
    .then((answers) => {
        if(answers.role === 'Senior Engineer') {
            answers.role = 1;
        }
        if(answers.role === 'Software Engineer') {
            answers.role = 2;
        }
        if(answers.role === 'Lead Engineer') {
            answers.role = 3;
        }
        if(answers.role === 'Sales Person') {
            answers.role = 4;
        }
        if(answers.role === 'Sales Lead') {
            answers.role = 5;
        }
        if(answers.role === 'Accountant') {
            answers.role = 6;
        }
        if(answers.role === 'Lawyer') {
            answers.role = 7;
        }
        if(answers.manager === 'Kevin Hernandez') {
            answers.manager = 1;
        }
        if(answers.manager === 'Heather West') {
            answers.manager = 7;
        }
        if(answers.manager === 'Stephen McGuire') {
            answers.manager = 9;
        }
        if(answers.manager === 'Not Available') {
            answers.manager = NULL; 
        }
        
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,[answers.newName, answers.lastName, answers.role, answers.manager], (err, results) => {
            if (err) throw err;
            console.table(`You have inserted ${results.affectedRows} as an employee!`);
            allEmployees()
        })
    })
    // promptUser()
}

allEmployees = () => {
    // console.table all employees
    db.query(`SELECT * FROM employee`, (err, results) => {
        console.table(results);
        promptUser();
    })
}

allDepartment = () => { 
    // console.table all departments
    db.query(`SELECT * FROM department`, (err, results) => {
        console.table(results);
        promptUser();
    })
}

allRoles = () => {
    // console.table all roles
    db.query(`SELECT * FROM roles`, (err, results) => {
        console.table(results);
        promptUser();
    })
}

//calling this function on initiation
function init(){
    promptUser()
};

//initializing the application
init();