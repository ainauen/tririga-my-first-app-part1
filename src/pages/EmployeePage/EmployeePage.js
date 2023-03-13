// import React, { useState, useEffect } from "react";
// import { EmployeeServices } from "../../services";
// import { AiOutlineCheck, AiOutlineClose, AiFillEdit, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
// import {SearchBox} from '../../components/SearchBox';
// import { useHistory } from "react-router-dom";

// const EmployeePage = () => {

//     const [filter, setFilter] = useState('');
//     const [employees, setEmployees] = useState([]);
//     const [employeePerPage, setEmployeePerPage] = useState(5);
//     const [page, setPage] = useState(1)

//     const [viewableEmployees, setViewableEmployees] = useState([])

//     const [editableEmployee, setEditableEmployee] = useState({
//         id: -1,
//         firstName: '',
//         lastName: '',
//         title: ''
//     })

//     const history = useHistory();
//     const home = () => {
//         history.push("/");
//     }
//     useEffect(() => {
//         (async () => {
//             if(employees.length == 0) {
//                 let _employees = await EmployeeServices.getAllEmployees();
//                 _employees.forEach((item) => {
//                     item.id = item._id;
//                 });
//                 console.log(_employees)
//                 setEmployees(_employees);
//                 setViewableEmployees(_employees.slice(employeePerPage * (page - 1), employeePerPage * page));
//             } else {
//                 await renderEmployees();
//             }
//         })();
//     }, [page, employeePerPage, filter]);
    
//     const renderEmployees = async() => {
//         if(filter === '') {
//             setViewableEmployees(employees.slice(employeePerPage * (page - 1), employeePerPage * page));
//         } else {
//             let _employees = employees.filter(
//                 (employee) => {return (employee.firstName.toLowerCase().includes(filter.toLowerCase()) || employee.lastName.toLowerCase().includes(filter.toLowerCase()))}
//             ).slice(employeePerPage * (page - 1), employeePerPage * page)
//             setViewableEmployees(_employees);
//         }  
        
//     }


//     const editEmployee = async (id) => {

//         let _employees = viewableEmployees.filter((employee)=>{
//             return id==employee.id
//         });

//         if(_employees.length != 1){
//             return
//         }

//         let _employee = _employees[0]

//         setEditableEmployee({
//             id: id,
//             firstName: _employee.firstName,
//             lastName: _employee.lastName,
//             title: _employee.title
//         });
//     };

//     const cancelEditEmployee = async(event) => {
//         setEditableEmployee({
//             id: -1,
//             firstName: '',
//             lastName: '',
//             title: ''
//         });
//     }

//     const saveEmployee = async(id) => {

//         let _employees = viewableEmployees.filter((employee)=>{
//             return id==employee.id
//         });

//         if(_employees.length != 1){
//             return
//         }

//         let _employee = _employees[0]
//         _employee.firstName = editableEmployee.firstName;
//         _employee.lastName = editableEmployee.lastName;
//         _employee.title = editableEmployee.title;
        
//         await EmployeeServices.updateEmployee(_employee);
//         setEditableEmployee({
//             id: -1,
//             firstName: '',
//             lastName: '',
//             title: ''
//         });
//     }



//     const pageChange = async(direction) => {

//         if((direction == -1 && page == 1) || (direction==1 && page+1 > Math.ceil(employees.length / employeePerPage))) {
//             return 
//         }

//         if(page == 1 && viewableEmployees <= employeePerPage) {
//             return
//         }
        
//         setEditableEmployee({
//             id: -1,
//             firstName: '',
//             lastName: '',
//             title: ''
//         });
//         setPage(page+direction)

//     }

//     const onEmployeePerPageChange = async(_employeePerPage) => {
//         if(_employeePerPage == employeePerPage) {
//             return
//         }
//         setEmployeePerPage(_employeePerPage)
//         setPage(1)
//     }

//     const onEmployeeChange = async(event) => {
//         const { name, value } = event.target;
//         setEditableEmployee((prevState) => ({ ...prevState, [name]: value }));
//     }
//     return (
//         <div> 
//             <div className="grid-frame">
//                 <SearchBox searchTerm={filter} onSearchTermChange={(event)=> {setFilter(event.target.value)}}/>
//                 <div className="table-row">
//                     <div class="table-cell-button"> </div>
//                     <div class="table-cell header">First Name</div>
//                     <div class="table-cell header">Last Name</div>
//                     <div class="table-cell header">Title</div>
//                 </div>
//                 {
//                     viewableEmployees.map((employee)=>{
//                         if(employee.id == editableEmployee.id) {
//                             return (
//                                 <div className="table-row">

//                                     <div class="table-cell-button">
//                                         <button onClick={() => saveEmployee(employee.id)}><AiOutlineCheck /></button>
//                                         <button onClick={cancelEditEmployee}><AiOutlineClose /></button>
//                                     </div>
//                                     <input class="table-cell-input"
//                                         type="text"
//                                         name="firstName"
//                                         value={editableEmployee.firstName}
//                                         onChange={onEmployeeChange}
//                                     />
//                                     <input class="table-cell-input"
//                                         type="text"
//                                         name="lastName"
//                                         value={editableEmployee.lastName}
//                                         onChange={onEmployeeChange}
//                                     />
//                                     <input class="table-cell-input"
//                                         type="text"
//                                         name="title"
//                                         value={editableEmployee.title}
//                                         onChange={onEmployeeChange}
//                                     />
//                                 </div>
//                             );
//                         } else {
//                             return (
//                                 <div className="table-row">
//                                     <div class="table-cell-button"><button onClick={() => editEmployee(employee.id)}><AiFillEdit /></button></div>
//                                     <div class="table-cell">{employee.firstName}</div>
//                                     <div class="table-cell">{employee.lastName}</div>
//                                     <div class="table-cell">{employee.title}</div>
//                                 </div>
//                             );
//                         }
//                     })
//                 }
//                 <div class="navigate-container">
//                     <select onChange={(event) => {onEmployeePerPageChange(event.target.value)}}>
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="15">15</option>
//                     </select>
//                     <button onClick={() => pageChange(-1)}><AiFillCaretLeft /></button>
//                     <button onClick={() => pageChange(1)}><AiFillCaretRight /></button>
//                 </div>
//             </div>
//             <div className="goHome">
//                 <button className="btn btn-success"
//                     onClick={home}> Go Home
//                 </button>
//             </div>
//         </div>
//     );
// }
// export default EmployeePage;
