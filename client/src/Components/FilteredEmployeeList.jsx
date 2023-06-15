function FilteredEmployeeList ({employees, onSort}) {


    return <ul>
        {employees.map((employee) => { return <>
            <li onClick={() => {
                onSort()
            }}>{employee.name}</li>
            <li>{employee.level}</li>
            <li>{employee.yearsOfExperience}</li></>
        })}
    </ul>
}

export default FilteredEmployeeList