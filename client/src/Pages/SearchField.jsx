import { useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import "../Components/EmployeeTable/EmployeeTable.css";
import EmployeeList from "./EmployeeList";


const SearchField = ({fetchSearchedEmployee}) => {

const [searchParam, setSearchParam] = useState("")

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
                        <button type="button" onClick={() => {
                            fetchSearchedEmployee(searchParam)}
                            }>Search</button>
                    </div>
                </form>
            </div>
        </div>)
}

export default SearchField