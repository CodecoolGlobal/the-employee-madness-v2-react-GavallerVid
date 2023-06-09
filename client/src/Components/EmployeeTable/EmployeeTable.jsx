import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";
import Dialog from "../Dialog";

const EmployeeTable = ({ employees, onCheck, onDelete, onShowMissing, onSort, onLastNameSort, onSortMiddleName, missingShowed, setSearchClicked, fetchEmployeesOnCancel }) => {

  const [showButton, setShowButton] = useState(true)
  const [showCancel, setShowCancel] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  let huf = new Intl.NumberFormat('hu', {
    style: 'currency',
    currency: 'HUF',
  }); 

  const calculateSalaryDifference = (salary, desiredSalary) => {
    const diff = desiredSalary - salary
      return huf.format(diff)
  }

  const formatDate = (date) => {
    return date.split('-').join('.').slice(0, -14)
  } 

  const displayDialog = (id) => {
    setDialog(true);
    setIdToDelete(id)
  }

  return (
  <div className="EmployeeTable">
    <button type="button" onClick={() => {
      onSortMiddleName()
    }}>Sort By Middle Name</button>
    <button type="button" onClick={() => {
      onLastNameSort()
    }}>Sort By Last Name</button>
    {missingShowed ? <button onClick={() => {
      fetchEmployeesOnCancel()
    }}>Show All</button>
    : <button onClick={() => {
      onShowMissing()
    }}>Show Missing</button>}
    {showButton && <button type="button" id="mainSearchBut" onClick={() => {
      setSearchClicked(true)
      setShowButton(false)
      setShowCancel(true)
    }}>Search</button>}
    {showCancel && <button onClick={() => {
      fetchEmployeesOnCancel()
      setSearchClicked(false)
      setShowCancel(false)
      setShowButton(true)
    }}>Cancel</button>}
    <table>
      <thead>
        <tr>
          <th>Attendance</th>
          <th id="thButton" onClick={() => {
            onSort('name')
          }}>Name
          </th>
          <th id="thButton" onClick={() => {
            onSort('level')
          }}>Level
          </th>
          <th id="thButton" onClick={() => {
            onSort('position')
          }}>Position
          </th>
          <th>Starting Date</th>
          <th>Current Salary</th>
          <th>Desired Salary</th>
          <th>Salary Difference</th>
          <th>Favourite Color</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>
              {employee.attendance === 'present' 
              ? 
              <><input type="checkbox" id="attendanceInput" checked 
              onChange={() => {
                const attendance = {attendance: 'missing'}
                onCheck(employee._id, attendance)
                }}></input>
              <label htmlFor="attendanceInput">{employee.attendance}</label>
              </>
              : <><input type="checkbox" id="attendanceInput"  
              onChange={() => {
                const attendance = {attendance: 'present'}
                onCheck(employee._id, attendance)
                }}></input>
              <label htmlFor="attendanceInput">{employee.attendance}</label>
              </>}
            </td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{formatDate(employee.startingDate)}</td>
            <td>{huf.format(employee.salary)}</td>
            <td>{huf.format(employee.desiredSalary)}</td>
            <td>{calculateSalaryDifference(employee.salary, employee.desiredSalary)}</td>
            <td style={{backgroundColor: employee.favouriteColor,}}></td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => displayDialog(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {dialog && <Dialog 
                  message={'Are You Sure?'}
                  onDelete={onDelete}
                  id={idToDelete}
                  setDialog={setDialog}
                />}
  </div>)
};

export default EmployeeTable;
