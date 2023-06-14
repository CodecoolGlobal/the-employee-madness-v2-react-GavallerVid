import React from "react";
import { useEffect, useState } from "react";
import DivisionTable from "../Components/DivisionTable";

const deleteDivision = (id) => {
    return fetch(`/api/divisions/${id}`).then((res) => res.json())
};

const fetchDivisions = () => {
    return fetch("/api/divisions").then((res) => res.json())
}

function DivisionList () {

    const [divisions, setDivisions] = useState([]);

    useEffect(() => {
    fetchDivisions()
    .then((divisions) => {
        setDivisions(divisions)
    }) 
    }, [])

    return (<>
    <DivisionTable 
        divisions={divisions}
        onDelete={deleteDivision}
        />
    </>)
}

export default DivisionList