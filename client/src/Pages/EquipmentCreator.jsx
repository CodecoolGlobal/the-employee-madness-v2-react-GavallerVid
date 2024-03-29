import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createEquipment = (equipment) => {
    return fetch("/api/equipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      }).then((res) => res.json());
};

function EquipmentCreator () {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateEquipment = (equipment) => {
        setLoading(true);

        createEquipment(equipment)
            .then(() => {
                setLoading(false);
                navigate("/allequipments")
            });
    };

    return (
        <EquipmentForm
            onCancel={() => {navigate("/allequipments")}}
            disabled={loading}
            onSave={handleCreateEquipment}
        />
    );
};

export default EquipmentCreator