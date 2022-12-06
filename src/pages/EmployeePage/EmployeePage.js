import React, { useState, useEffect } from "react";
import { EmployeeServices } from "../../services";
import { AiOutlineCheck, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import {SearchBox} from '../../components/SearchBox';
const EmployeePage = () => {

    useEffect(() => { }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(-1);

    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName,  setEditLastName]  = useState('');
    const [editTitle, setEditTitle] = useState('');
    
    useEffect(() => {
        (async () => {
            renderEmployees(await EmployeeServices.getAllEmployees());
        })();
    }, []);
    
    const editEmployee = async (index) => {
        setSelectedEmployee(index);
        setEditFirstName(employees[index].firstName);
        setEditLastName(employees[index].lastName);
        setEditTitle(employees[index].title);
    };

    const cancelEditEmployee = async(event) => {
        setSelectedEmployee(-1); 
    }

    const saveEmployee = async(event) => {
        setEmployees(employees.map((employee, index)=> {
            if(index == selectedEmployee) {
                employee.firstName = editFirstName;
                employee.lastName = editLastName;
                employee.title = editTitle
            }
            return employee;
        }));
        await EmployeeServices.updateEmployee(employees[selectedEmployee]);
        setSelectedEmployee(-1); 
    }


    const renderEmployees = async(_employees) => {
        await (async () => {
            _employees.forEach((item) => {
                item.id = item._id;
            });
        })();

        setEmployees(_employees);
    }

    const onSearch = async() => {

        await renderEmployees(await EmployeeServices.searchEmployees(searchTerm));
    }

    return (
        <div> 
            <div className="grid-frame">
                <SearchBox searchTerm={searchTerm} onSearchTermChange={(event)=> {setSearchTerm(event.target.value)}} onSearch={onSearch}/>
                <div className="table-row">
                    <div class="table-cell-button"> </div>
                    <div class="table-cell header">First Name</div>
                    <div class="table-cell header">Last Name</div>
                    <div class="table-cell header">Title</div>
                </div>
                {
                    employees.map((employee, index)=>{
                        if(index == selectedEmployee) {
                            return (
                                <div className="table-row">
                                    <div class="table-cell-button">
                                        <button onClick={saveEmployee}><AiOutlineCheck /></button>
                                        <button onClick={cancelEditEmployee}><AiOutlineClose /></button>
                                    </div>
                                    <input class="table-cell-input"
                                        type="text"
                                        value={editFirstName}
                                        onChange={(event) => setEditFirstName(event.target.value)}
                                    />
                                    <input class="table-cell-input"
                                        type="text"
                                        value={editLastName}
                                        onChange={(event) => setEditLastName(event.target.value)}
                                    />
                                    <input class="table-cell-input"
                                        type="text"
                                        value={editTitle}
                                        onChange={(event) => setEditTitle(event.target.value)}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div className="table-row">
                                    <div class="table-cell-button"><button onClick={() => editEmployee(index)}><AiFillEdit /></button></div>
                                    <div class="table-cell">{employee.firstName}</div>
                                    <div class="table-cell">{employee.lastName}</div>
                                    <div class="table-cell">{employee.title}</div>
                                </div>
                            );
                        }
                    })
                }
            </div>
        </div>
    );
}
export default EmployeePage;
