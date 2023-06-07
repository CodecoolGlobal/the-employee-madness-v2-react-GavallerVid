import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const EmployeeTable = ({ employees, onDelete, onSort, onLastNameSort, onSortMiddleName, setSearchClicked, fetchEmployeesOnCancel }) => {

  const [showButton, setShowButton] = useState(true)
  const [showCancel, setShowCancel] = useState(false)

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
          <th >Equipment Name</th>
          <th >Equipment Type</th>
          <th >Amount</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>Pistole</td>
            <td>Handgun</td>
            <td>1</td>
            <td>
              <Link to={`/edit${'equipment._id'}`}>
                <button type="button">Edit Equipment</button>
              </Link>
            </td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
};

export default EmployeeTable;
