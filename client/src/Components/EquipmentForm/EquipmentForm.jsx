import { useState } from "react";

const EquipmentForm = ({onSave, disabled, onCancel, equipment}) => {

    const [name, setName] = useState(equipment?.name ?? "");
    const [type, setType] = useState(equipment?.type ?? "");
    const [amount, setAmount] = useState(equipment?.amount ?? "");

    const onSubmit = (e) => {
        e.preventDefault();

        if (equipment) {
          return onSave({
            ...equipment,
            name,
            type,
            amount,
          });
        }

        return onSave({
          name,
          type,
          amount
        })
    }

    return (<>
        <form className="EmployeeForm" onSubmit={onSubmit}>
        <div className="control">
        <label htmlFor="position">Equipment Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Equipment Type:</label>
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Equipment amount:</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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