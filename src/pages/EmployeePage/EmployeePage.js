import React, { useState, useEffect } from "react";
import { EmployeeServices } from "../../services";
import { AiOutlineCheck, AiOutlineClose, AiFillEdit, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import {SearchBox} from '../../components/SearchBox';
const EmployeePage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employeePerPage, setEmployeePerPage] = useState(5);
    const [page, setPage] = useState(1)

    const [viewableEmployees, setViewableEmployees] = useState([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(-1);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName,  setEditLastName]  = useState('');
    const [editTitle, setEditTitle] = useState('');
    
    useEffect(() => {
        (async () => {
            if(employees.length == 0) {
                let _employees = await EmployeeServices.getAllEmployees();
                _employees.forEach((item) => {
                    item.id = item._id;
                });
                console.log(_employees)
                setEmployees(_employees);
                setViewableEmployees(_employees.slice(employeePerPage * (page - 1), employeePerPage * page));
            } else {
                setViewableEmployees(employees.slice(employeePerPage * (page - 1), employeePerPage * page));
            }
            
            
        
        })();
    }, [page, employeePerPage]);
    
    const editEmployee = async (id) => {
        let _employees = viewableEmployees.filter((employee)=>{
            return id==employee.id
        });
        if(_employees.length != 1){
            return
        }
        setSelectedEmployeeId(id);
        let _employee = _employees[0]
        setEditFirstName(_employee.firstName);
        setEditLastName(_employee.lastName);
        setEditTitle(_employee.title);
    };

    const cancelEditEmployee = async(event) => {
        setSelectedEmployeeId(-1); 
    }

    const saveEmployee = async(id) => {

        let _employees = viewableEmployees.filter((employee)=>{
            return id==employee.id
        });

        if(_employees.length != 1){
            return
        }

        let _employee = _employees[0]
        _employee.firstName = editFirstName;
        _employee.lastName = editLastName;
        _employee.title = editTitle
        await EmployeeServices.updateEmployee(_employee);
        setSelectedEmployeeId(-1); 
    }

    const onSearch = async() => {
        await renderEmployees(await EmployeeServices.searchEmployees(searchTerm));
    }

    const pageChange = async(direction) => {

        if((direction == -1 && page == 1) || (direction==1 && page+1 > Math.ceil(employees.length / employeePerPage))) {
            return 
        }
        setSelectedEmployeeId(-1); 
        setPage(page+direction)

    }

    const onEmployeePerPageChange = async(_employeePerPage) => {
        if(_employeePerPage == employeePerPage) {
            return
        }
        setEmployeePerPage(_employeePerPage)
        setPage(1)
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
                    viewableEmployees.map((employee)=>{
                        if(employee.id == selectedEmployeeId) {
                            return (
                                <div className="table-row">
                                    <div class="table-cell-button">
                                        <button onClick={() => saveEmployee(employee.id)}><AiOutlineCheck /></button>
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
                                    <div class="table-cell-button"><button onClick={() => editEmployee(employee.id)}><AiFillEdit /></button></div>
                                    <div class="table-cell">{employee.firstName}</div>
                                    <div class="table-cell">{employee.lastName}</div>
                                    <div class="table-cell">{employee.title}</div>
                                </div>
                            );
                        }
                    })
                }
                <div class="navigate-container">
                    <select onChange={(event) => {onEmployeePerPageChange(event.target.value)}}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <button onClick={() => pageChange(-1)}><AiFillCaretLeft /></button>
                    <button onClick={() => pageChange(1)}><AiFillCaretRight /></button>
                </div>
            </div>
        </div>
    );
}
export default EmployeePage;
