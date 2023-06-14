import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DivisionForm from "../Components/DivisionForm";

const fetchDivision = (id) => {
    return fetch(`/api/divisions/${id}`).then((res) => res.json())
}

const updateDivision = (division) => {
    return fetch(`/api/divisions/${division._id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(division)
    }).then((res) => res.json())
}

function DivisionUpdater () {
    const { id } = useParams()
    const navigate = useNavigate();

    const [division, setDivision] = useState(null)

    useEffect(() => {
        fetchDivision(id)
            .then((division) => {
                setDivision(division)
            })
    }, [id])

    const handleUpdateDivision = (division) => {
        updateDivision(division)
        .then(() => {
                navigate("/divisions")
            })
    }

    return (division && <DivisionForm 
        division={division}
        onUpdate={handleUpdateDivision}
        onCancel={() => navigate("/divisions")}
    />)
}

export default DivisionUpdater