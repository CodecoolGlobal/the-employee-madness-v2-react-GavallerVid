import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import SearchField from "./SearchField";
import Pagination from "../Components/Pagination";

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
  const [sortedByMiddle, setsortedByMiddle] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [missingShowed, setMissingShowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceChanged, setAttendanceChanged] = useState(1);
  const [possiblePages, setPossiblePages] = useState(null);

  const fetchEmployees = (page) => {
    return fetch(`/api/employees?page=${page}&limit=14`).then((res) => res.json()).then((results) => {
      setLoading(false);
      setEmployees(results.employees);
      setPossiblePages(results.possiblePages);
      setCurrentPage(page);
      setMissingShowed(false)
    });
  };

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const filterEmployeesOnAttendance = () => {
    setMissingShowed(true)
    const missingEmployees = employees.filter((employee) => employee.attendance === 'missing')
    setEmployees(missingEmployees)
  }
  
  const handleSort = (key) => {
    const actualDirection = sorted === 'ascending' ? 'descending' : 'ascending'
    const newEmployees = sort(employees, key, actualDirection);
    setSorted(actualDirection);
    setEmployees(newEmployees);
  }
  
  const sort = (list, key, direction) => {
    const sortedEmployees = [...list].sort((a,b) => {
      return direction === 'ascending' 
        ? (a[key] > b[key] ? 1 : -1)
        : (b[key] < a[key] ? -1 : 1)
    })
    return sortedEmployees
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
    return fetch(`/api/employees/${searchParam}`).then((res) => res.json()).then((employees) => {
      setEmployees(employees)
    })
  }
  
  const setEmployeeAttendanceOnCheck = (attendanceId, attendanceState) => {
    return fetch(`/api/employees/${attendanceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceState),
    }).then((res) => {
      res.json()
      if (attendanceChanged === 1) {
        setAttendanceChanged(2)
      } else {
        setAttendanceChanged(1)
      }
    })
  }
  
  useEffect(() => {
    fetchEmployees(1)
    
  }, [attendanceChanged]);

  if (loading) {
    return <Loading />;
  }

  return (<>
  {searchClicked && <SearchField fetchSearchedEmployee={fetchSearchedEmployee}/>}
  <EmployeeTable 
    fetchEmployeesOnCancel={fetchEmployees}
    onShowMissing={filterEmployeesOnAttendance}
    employees={employees}
    missingShowed={missingShowed}
    onDelete={handleDelete} 
    onSort={handleSort} 
    onLastNameSort={sortByLastN} 
    onSortMiddleName={sortMiddleName} 
    setSearchClicked={setSearchClicked}
    onCheck={setEmployeeAttendanceOnCheck}
    currentPage={currentPage}
    />
      {possiblePages && <Pagination 
          possiblePages={possiblePages}
          fetchEmployees={fetchEmployees}
      />}
  </>)
};

export default EmployeeList;
