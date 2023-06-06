import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentAmount, setEquipmentAmount] = useState("");
  const equipment = {name: equipmentName, type: equipmentType, amount: equipmentAmount}

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Equipment Name:</label>
        <input
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Equipment Type:</label>
        <input
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Equipment amount:</label>
        <input
          value={equipmentAmount}
          onChange={(e) => setEquipmentAmount(e.target.value)}
          name="position"
          id="position"
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
