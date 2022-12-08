import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";


async function fetchEmployees(index, size, filters=[]) {
    const response = await getAppModel().getRecord(
        DatasourceNames.GET_EMPLOYEES,
        {
            page: {
                from: index,
                size: size
            },
            filters: filters            
        }
    );
    return response.data;  
}
export async function getEmployees(index, size) {
    return await fetchEmployees(index, size)
}

export async function searchEmployees(searchText, index, size) {
    return await fetchEmployees(index, size, [
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