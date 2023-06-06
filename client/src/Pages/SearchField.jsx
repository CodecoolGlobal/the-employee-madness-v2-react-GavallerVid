import { useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import "../Components/EmployeeTable/EmployeeTable.css";
import EmployeeList from "./EmployeeList";

const SearchField = () => {

    const [searchedEmps, setSearchedEmps] = useState(null)
    const [searchParam, setSearchParam] = useState("")

    const fetchSearchedEmployee = () => {

        const caseFormattedParam = searchParam.charAt(0).toUpperCase() + searchParam.slice(1).toLowerCase();

            return fetch(`/api/employees/${caseFormattedParam}`).then((res) => res.json()).then((employees) => {
                setSearchedEmps(employees)
            })
    }

    return (
        <div id="formContainer">
            <div id="form">
                <form className="EmployeeForm">
                    <div className="control">
                        <label htmlFor="name">Look Up Name, Level or Position:</label>
                        <input
                            value={searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                            name="search"
                            id="search"
                            />
                        <button type="button" onClick={fetchSearchedEmployee}>Search</button>
                    </div>
                </form>
            </div>
            {searchedEmps && <EmployeeList searchedEmps={searchedEmps}/>}
        </div>)
}

export default SearchField