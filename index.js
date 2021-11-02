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
                'Add a Department',
                'Add a Role',
                'Update Employee Role',
                "I'm Done"
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

            case 'Add a Department':
            addDepartment();
            break;

            case 'Add a Role':
            addRole();
            break;

            case 'Add Employee':
            newEmployee();
            break;

            case 'Update Employee Role':
            updateEmp();
            break;

            case "I'm Done":
            console.log('Thank you!');
            break;
        }
    })
};

// console.table(data coming from sql)
// when inserting sql queries according to the prompt insert literals in the tables


addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a department name!',
                validate: departName => {
                    if(departName) {
                        return true;
                    } else {
                        console.log('Please enter a department name!');
                        return false;
                    }
                }
            },
        ]) .then((answers) => {
            db.query(`INSERT INTO department(name) VALUES (?)`, answers.name, (err,results) => {
            if (err) throw err;
            console.table(`You have inserted ${results.affectedRows} as an department!`);
            allDepartment()
            })
        })
}

addRole = () => {
    inquirer 
        .prompt([
            {
                type: 'input',
                name:'title',
                message: 'Please enter a title for the role!',
                validate: newRole => {
                    if(newRole) { 
                        return true;
                    } else {
                        console.log('Please enter a valid role!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name:'salary',
                message: 'Please enter the salary pay for this role',
                validate: validSalary => {
                    if(validSalary) {
                        return true;
                    } else {
                        console.log('Please enter a valid salary!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: ['Engineering', 'Sales', 'Legal', 'Finance', 'Not Available']
            }
        ]) .then((answers) => {
            if(answers.department === 'Engineering') {
                answers.department = 1;
            }
            if(answers.department === 'Sales') {
                answers.department = 2;
            }
            if(answers.department === 'Legal') {
                answers.department = 3;
            }
            if(answers.department === 'Finance') {
                answers.department = 4;
            }
            if(answers.department === 'Not Available') {
                answers.department = NULL;
            }
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [answers.title, answers.salary, answers.department], (err, results) => {
            if (err) throw err;
            console.table(`You have inserted ${results.affectedRows} as a new role!`);
            allRoles()
            })
        })
}


// update employee
// literal `UPDATE employee SET role_id = ? WHERE id = ?;`
// literal `UPDATE employee SET manager_id = ? WHERE id = ?;`
updateEmp = () => {

    const sql = db.query(`SELECT first_name, last_name FROM employee;`)


    inquirer 
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What employee ID would you like to update?',
                validate: empId => {
                    if(empId) {
                        return true;
                    } else {
                        console.log('Please pick the correct ID!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What is there new Role ID?',
                choices: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                type: 'list',
                name: 'newManager',
                message: 'Do they have a new manager?',
                choices: [1,3,7, "NULL"]
            }
        ]) .then((answers) => {
            db.query(`UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`, [answers.newRole, answers.newManager, answers.employeeId], (err, results) => {
                if(err) throw err;
                console.table(`You have updated the employee's role ${results.affectedRows}`);
                allEmployees()
            })
        })
}


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