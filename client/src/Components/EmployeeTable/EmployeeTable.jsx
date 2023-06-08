import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";
import Dialog from "../Dialog";

const EmployeeTable = ({ employees,onCheck, onDelete, onSort, onLastNameSort, onSortMiddleName, setSearchClicked, fetchEmployeesOnCancel }) => {

  const [showButton, setShowButton] = useState(true)
  const [showCancel, setShowCancel] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  const displayDialog = (id) => {
    setDialog(true);
    setIdToDelete(id)
  }

  return (
  <div className="EmployeeTable">
    <button type="button" onClick={() => {
      onSortMiddleName()
    }}>Middle Name First</button>
    <button type="button" onClick={() => {
      onLastNameSort()
    }}>Sort By Last Name</button>
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
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>
              <input type="checkbox" onChange={() => onCheck(employee._id)}></input>
            </td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
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
