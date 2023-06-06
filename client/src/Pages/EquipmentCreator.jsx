import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function EquiptmentCreator () {

const fetchEquipment = () => {

}

const [equipment, setEquipment] = useState(null)

const navigate = useNavigate()

    return <EquipmentForm onCancel={() => navigate("/")} 
    equipment={equipment}/>
}

export default EquiptmentCreator