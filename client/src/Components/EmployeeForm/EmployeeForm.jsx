import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [salary, setSalary] = useState(employee?.salary?? "");
  const [desiredSalary, setDesiredSaraly] = useState(employee?.desiredSalary?? "");
  const [favouriteColor, setFavouriteColor] = useState(employee?.favouriteColor?? "");
  const [startingDate, setStartingDate] = useState(employee?.startingDate?? "");
  const [equipment, setEquipment] = useState(employee?.equipment?? "")
  const [favouriteBrand, setFavouriteBrand] = useState(employee?.favouriteBrand?? "")

  const formatDate = (date) => {
    if (date.length > 14) {
      return date.slice(0, -14)
    } else {
      return date
    }
  }

  const handleSelection = (id) => {
    const equipmentToAdd = equipments.find((eq) => eq._id === id);
    setEquipment(equipmentToAdd)
  }

  const handleBrandSelection = (id) => {
    setFavouriteBrand(id)
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
        startingDate,
        equipment,
        favouriteBrand
      });
    }

    return onSave({
      name,
      level,
      position,
      salary,
      desiredSalary,
      favouriteColor,
      startingDate,
      equipment,
      favouriteBrand
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
          <label htmlFor="select">Choose An Equipment:</label>
          <select style={{textAlign: "center", width: "200px", marginTop: "28px", fontSize: "17px"}}
            onChange={(e) => {
              handleSelection(e.target.value)
              }} id="select">
              <option>Choose an Equipment</option>
              {equipments && equipments.map((equipment, i) => {
                return <option key={i} value={equipment._id}>{equipment.name}</option>
              })}
          </select>
        </div>

        <div className="control">
          <label htmlFor="select">Choose A Brand:</label>
          <select style={{textAlign: "center", width: "200px", marginTop: "28px", fontSize: "17px"}}
            onChange={(e) => {
              handleBrandSelection(e.target.value)
              }} id="select">
              <option>Choose a Brand</option>
              {brands && brands.map((brand, i) => {
                return <option key={i} value={brand._id}>{brand.name}</option>
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
