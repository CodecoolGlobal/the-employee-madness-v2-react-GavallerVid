import { useState } from "react";

const EquipmentForm = ({onSave, disabled, onCancel, equipment}) => {

    const [equipmentName, setEquipmentName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentAmount, setEquipmentAmount] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        return onSave()
    }

    return (<>
        <form className="EmployeeForm" onSubmit={onSubmit}>
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
          {equipment ? "Update Equipment" : "Create Equipment"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

        </form>
    </>)
}

export default EquipmentForm