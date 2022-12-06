
import { EmployeesDS } from "../model";

export async function getAllEmployees() {
    let employees = [];
    try {

        employees = await EmployeesDS.getEmployees()
    } finally {
     
    }
    return employees;
}

export async function updateEmployee(employee) {
    try {

        await EmployeesDS.updateEmployee(employee)
    } finally {
     
    } 
}


export async function searchEmployees(searchTerm) {
    let employees = [];
    try {

        employees = await EmployeesDS.searchEmployees(searchTerm);
    } finally {

    }
    return employees;
}
