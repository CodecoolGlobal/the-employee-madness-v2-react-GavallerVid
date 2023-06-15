import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilteredEmployeeList from "../Components/FilteredEmployeeList";

const fetchFilteredEmps = (id) => {
    return fetch(`/api/filter/employees/${id}`).then((res) => res.json())
}

function EmployeeRecordsList () {

    const [filteredEmps, setFilteredEmps] = useState(null)
    const [direction, setDirection] = useState('asc')

    const {id} = useParams()

    const sort = () => {
        if (direction === 'asc') {
            const asending = [...filteredEmps].sort((a,b) => a.name < b.name ? -1 : 1)
            setFilteredEmps(asending)
            setDirection('desc')
        } else {
            const desc = [...filteredEmps].sort((a,b) => b.name < a.name ? -1 : 1)
            setFilteredEmps(desc)
            setDirection('asc')
        }
    }

    useEffect(() => {
        fetchFilteredEmps(id)
            .then((employees) => {
                setFilteredEmps(employees)
            })
    }, [])

    return (
        filteredEmps && <FilteredEmployeeList 
        employees={filteredEmps}
        onSort={sort}
        />
    )
}

export default EmployeeRecordsList