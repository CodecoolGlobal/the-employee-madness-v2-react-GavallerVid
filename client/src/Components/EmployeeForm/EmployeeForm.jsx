import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [salary, setSalary] = useState(employee?.salary?? "");
  const [desiredSalary, setDesiredSaraly] = useState(employee?.desiredSalary?? "");
  const [favouriteColor, setFavouriteColor] = useState(employee?.favouriteColor?? "");
  const [startingDate, setStartingDate] = useState(employee?.startingDate?? "");

  const formatDate = (date) => {
    if (date.length > 14) {
      return date.slice(0, -14)
    } else {
      return date
    }
  } 

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        salary,
        desiredSalary,
        favouriteColor,
        startingDate
      });
    }

    return onSave({
      name,
      level,
      position,
      salary,
      desiredSalary,
      favouriteColor,
      startingDate
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>

      <div className="color-selec-container" style={{display: 'flex', width: "400px"}}>

        <div className="control">
          <label htmlFor="name">Full Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            style={{width: "250px"}}
          />
        </div>

        <div className="control">
          <select style={{textAlign: "center", width: "200px", height: "4.3vh", marginTop: "28px", fontSize: "17px"}}
            onChange={(e) => {console.log(e.target.value)}}>
              {equipments && equipments.map((equipment, i) => {
                return <option key={i} value={equipment._id}>{equipment.name}</option>
              })}
          </select>
        </div>

      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
          style={{width: "250px"}}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
          style={{width: "250px"}}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Salary:</label>
        <input
          value={salary}
          type="number"
          onChange={(e) => setSalary(e.target.value)}
          name="salary"
          id="salary"
          style={{width: "250px"}}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Desired Salary:</label>
        <input
          value={desiredSalary}
          type="number"
          onChange={(e) => setDesiredSaraly(e.target.value)}
          name="desired"
          id="desired"
          style={{width: "250px"}}
        />
      </div>

      <div className="control">
        <label htmlFor="position">Favourite Color:</label>
        <input
          value={favouriteColor}
          type="color"
          onChange={(e) => setFavouriteColor(e.target.value)}
          name="color"
          id="color"
          style={{width: "250px"}}
        />
      </div>



      <div className="control">
        <label htmlFor="position">Starting Date:</label>
        <input
          type="date"
          value={formatDate(startingDate)}
          onChange={(e) => {setStartingDate(e.target.value)}}
          name="startingDate"
          id="startingDate"
          style={{width: "250px"}}
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
