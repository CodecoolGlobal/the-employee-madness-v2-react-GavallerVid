import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../Components/Loading";

const updateEquipment = (equipment) => {
    return fetch(`/api/equipments/${equipment._id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(equipment)
    }).then((res) => res.json())
}

const fetchEquipment = (id) => {
    return fetch(`/api/get/equipments/${id}`).then((res) => res.json())
}

function EquiptmentEditor () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false);
    const [equipmentLoading, setEquipmentLoading] = useState(true);

    useEffect(() => {
        setEquipmentLoading(true);
        fetchEquipment(id)
            .then((equipment) => {
                setEquipment(equipment)
                setEquipmentLoading(false)
            });
    }, [id]);

    const handleUpdateEquipment = (equipment) => {
        setUpdateLoading(true)
        updateEquipment(equipment)
            .then(() => {
                setUpdateLoading(false)
                navigate("/allequipments")
            });
    };

    if (equipmentLoading) {
        return <Loading />
    }

    return <EquipmentForm
                onSave={handleUpdateEquipment}
                onCancel={() => navigate("/allequipments")} 
                equipment={equipment}
                disabled={updateLoading}
            />
}

export default EquiptmentEditor