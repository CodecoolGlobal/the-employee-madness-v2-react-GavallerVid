import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"
import { useNavigate } from "react-router-dom"
import { useState, useParams } from "react"

const updateEquipment = (equipment) => {
    return fetch(`/api/eqipments/${equipment._id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(equipment)
    }).then((res) => res.json())
}

const fetchEquipment = (id) => {
    return fetch(`/api/equipments/${id}`).then((res) => res.json())
}

function EquiptmentEditor () {

    const [equipment, setEquipment] = useState(null)

    const { id } = useParams();
    const navigate = useNavigate();

    const handleUpdateEquipment = () => {

    }


    return <EquipmentForm 
                onCancel={() => navigate("/")} 
                equipment={equipment}
            />
}

export default EquiptmentEditor