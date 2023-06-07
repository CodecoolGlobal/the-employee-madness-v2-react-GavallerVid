import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import SearchField from "./SearchField";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};


const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
  res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [sorted, setSorted] = useState('ascending');
  const [sortedByLast, setsortedByLast] = useState(false);
  const [sortedByMiddle, setsortedByMiddle] = useState(false)
  const [searchClicked, setSearchClicked] = useState(false);
    
  const fetchEmployeesOnCancel = () => {
    return fetch("/api/employees").then((res) => res.json()).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    })
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleSort = (key) => {
    const actualDirection = sorted === 'ascending' ? 'descending' : 'ascending'
    const newEmployees = sort(employees, key, actualDirection);
    setSorted(actualDirection);
    setEmployees(newEmployees);
  }

  const sort = (list, key, direction) => {
    const ascendingEmps = [...list].sort((a,b) => {
      return direction === 'ascending' 
        ? (a[key] > b[key] ? 1 : -1)
        : (b[key] < a[key] ? -1 : 1)
    })
    return ascendingEmps
  }

  const sortLastAsc = () => {
    const ascLastNamesEmps = [...employees].sort((a,b) => {
      const lastNameA = a.name.split(' ').slice(-1)[0];
      const lastNameB = b.name.split(' ').slice(-1)[0];

      return lastNameA.localeCompare(lastNameB);
    })
    setEmployees(ascLastNamesEmps)
  };

  const sortLastDec = () => {
    const descLastNamesEmps = [...employees].sort((a,b) => {
      const lastNameA = a.name.split(' ').slice(-1)[0];
      const lastNameB = b.name.split(' ').slice(-1)[0];

      return lastNameB.localeCompare(lastNameA);
    })
    setEmployees(descLastNamesEmps)
  }

  const sortMiddleAsc = () => {
    const ascMiddleNamesEmps = [...employees].sort((a,b) => {
      const middleNameA = getMiddleName(a.name)
      const middleNameB = getMiddleName(b.name)

      return middleNameA.localeCompare(middleNameB);
    })
    setEmployees(ascMiddleNamesEmps)
  };

  const sortMiddleDec = () => {
    const descMiddleNamesEmps = [...employees].sort((a,b) => {
      const middleNameA = getMiddleName(a.name)
      const middleNameB = getMiddleName(b.name)

      return middleNameB.localeCompare(middleNameA);
    })
    setEmployees(descMiddleNamesEmps)
  }

  const sortMiddleName = () => {
    if (sortedByMiddle) {
      setsortedByMiddle(false)
      sortMiddleAsc()
    } else {
      setsortedByMiddle(true)
      sortMiddleDec()
    }
  }

  const sortByLastN = () => {
    if(sortedByLast) {
      setsortedByLast(false)
      sortLastAsc()
    } else {
      setsortedByLast(true)
      sortLastDec()
    }
  }

  const getMiddleName = (name) => {
    const nameParts = name.split(' ');

    if(nameParts.length > 2) {
      return nameParts[1]
    }

    return '';
  }

  const fetchSearchedEmployee = (searchParam) => {

    const caseFormattedParam = searchParam.charAt(0).toUpperCase() + searchParam.slice(1).toLowerCase();

        return fetch(`/api/employees/${caseFormattedParam}`).then((res) => res.json()).then((employees) => {
            setEmployees(employees)
        })
  }

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (<>
  {searchClicked && <SearchField fetchSearchedEmployee={fetchSearchedEmployee}/>}
  <EmployeeTable 
    fetchEmployeesOnCancel={fetchEmployeesOnCancel}
    employees={employees} 
    onDelete={handleDelete} 
    onSort={handleSort} 
    onLastNameSort={sortByLastN} 
    onSortMiddleName={sortMiddleName} 
    setSearchClicked={setSearchClicked}
  />
  </>)
};

export default EmployeeList;
