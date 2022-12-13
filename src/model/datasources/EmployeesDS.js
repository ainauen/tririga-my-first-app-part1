import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";


async function fetchEmployees(filters=[]) {
    const response = await getAppModel().getRecord(
        DatasourceNames.GET_EMPLOYEES,
        {
            filters: filters            
        }
    );
    return response.data;  
}
export async function getEmployees() {
    const response = await getAppModel().getRecord(DatasourceNames.GET_EMPLOYEES);
    return response.data;  
}

export async function searchEmployees(searchText) {
    return await fetchEmployees([
        { name: "firstName", operator: "contains", value: searchText },
        { operator: "or" },
        { name: "lastName", operator: "contains", value: searchText },
    ])
}




export async function updateEmployee(employee) {
    const response = await getAppModel().updateRecord(
        DatasourceNames.GET_EMPLOYEES,
        employee,
        true
    );
    return response.data;
}