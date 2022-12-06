import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";



export async function getEmployees() {
    const response = await getAppModel().getRecord(
        DatasourceNames.GET_EMPLOYEES,
    );
    return response.data;
}

export async function searchEmployees(searchText) {
    const response = await getAppModel().getRecord(
        DatasourceNames.GET_EMPLOYEES, 
        {
            filters: [
                { name: "firstName", operator: "contains", value: searchText },
                { operator: "or" },
                { name: "lastName", operator: "contains", value: searchText },
            ]
        }
    );
    return response.data;
}

export async function updateEmployee(employee) {
    const response = await getAppModel().updateRecord(
        DatasourceNames.GET_EMPLOYEES,
        employee,
        true
    );
    return response.data;
}