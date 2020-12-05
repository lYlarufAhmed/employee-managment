var fs = require('fs')

var rls = require('readline-sync')
const PROPERTIES = ['name', 'dateBirth', 'salary', 'postion']
const welcome_prompt = `Welcome
1. Show list of employees
2. Find employee
3. Add new employee
4. Remove employee
5. Quit

Select menu option. Type 1-5
`

class Employee {
	constructor({name, dateBirth, salary, position}) {
		this.name = name
		this.dateBirth = dateBirth
		this.salary = salary
		this.position = position
	}
}

class EmployeeBook {

	constructor() {
		//load the employees from file
		let readData
		try {
			readData = fs.readFileSync('EMPLOYEES.json')
		}
		catch (e) {console.log('no data file found.')}
		this._employees = readData ? JSON.parse(readData) : []
	}

	run() {
		let option
		do {
			console.log()
			console.log()
			console.log()
			console.log(welcome_prompt)
			option = rls.question("option: ")
			console.log(option)
			switch (option) {
				case '1':
					// action
					// console.log('got here')
					showEmployeeList(this._employees)
					break
				case '2':
					console.log('Please enter name of employee')
					let name = rls.question('name: ')
					this.findEmployee(name)
					//action
					break
				case '3':
					let tempObj = {}
					console.log('Please provide following information')
					for (let property of PROPERTIES) {
						let value = rls.question(`${property}: `)
						tempObj[property] = value
					}
					console.log()
					console.log('Employee added Successfully!')
					let emp = new Employee(tempObj)
					this._employees.push(emp)
					break
				case '4':
					console.log('Please enter the name of employee to remove')
					let remove_name = rls.question('name: ')
					if (this._employees.find(elem => elem.name == remove_name)) {
						this._employees = this._employees.filter((elem) => elem.name != remove_name)
						console.log('Removed successfully')
					}
					else console.log('not found', remove_name)
					break
			}
		} while (option != '5')
		fs.writeFile('EMPLOYEES.json', JSON.stringify(this._employees), (err) => err)
	}
	findEmployee(name) {
		console.log()
		let employee = this._employees.find(emp => emp.name == name)
		if (employee) {
			console.log('Match found')
			console.log()
			console.log(employee.name)
		} else console.log('Not found', name)
	}
}
function showEmployeeList(employees) {
	console.log()
	console.log()
	console.log()
	if (employees.length < 1) {
		console.log('No employees saved')
	}
	else {
		console.log('Employeee list:')
		console.log()
		console.log()
		for (const employee of employees) {
			console.log(employee.name)
		}
	}
}



function main() {
	let ebook = new EmployeeBook()
	ebook.run()
}


main()
