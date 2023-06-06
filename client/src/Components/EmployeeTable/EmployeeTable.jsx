import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onSort, onSortLevel, onPosSort, onLastNameSort, onSortMiddleName }) => (
  <div className="EmployeeTable">
    <button type="button" onClick={() => {
      onSortMiddleName()
    }}>Middle Name First</button>
    <button type="button" onClick={() => {
      onLastNameSort()
    }}>Sort By Last Name</button>
    <table>
      <thead>
        <tr>
          <th id="thButton" onClick={() => {
            onSort()
          }}>Name</th>
          <th id="thButton" onClick={() => {
            onSortLevel()
          }}>Level</th>
          <th id="thButton" onClick={() => {
            onPosSort()
          }}>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>Here come the eqs</td>
            <td>
              {employee.equipment? <button type="button">Edit Equipment</button>
              : <button type="button">Add Equipment</button>} 
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
  </div>
);

export default EmployeeTable;
