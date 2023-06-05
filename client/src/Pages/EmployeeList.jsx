import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

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
  const [sorted, setSorted] = useState(false);
  const [sortedLevel, setSortedLevel] = useState(false);
  const [sortedPos, setSortedPos] = useState(false);
  const [sortedByLast, setsortedByLast] = useState(false);
  const [sortedByMiddle, setsortedByMiddle] = useState(false)

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const sortFirstNameAscOrd = () => {
    const ascFNameEmps = [...employees].sort((a,b) => a.name > b.name ? 1 : -1)
    setEmployees(ascFNameEmps)
  };

  const sortFirstNameDescOrd = () => {
    const descFNameEmps = [...employees].sort((a,b) => b.name < a.name ? -1 : 1 )
    setEmployees(descFNameEmps)
  };

  const sortLevelAsc = () => {
    const ascLevelEmps = [...employees].sort((a,b) => a.level > b.level ? 1 : -1)
    setEmployees(ascLevelEmps)
  };

  const sortLevelDesc = () => {
    const descLevelEmps = [...employees].sort((a,b) => b.level < a.level ? -1 : 1)
    setEmployees(descLevelEmps)
  };

  const sortPosAsc = () => {
    const ascPosEmps = [...employees].sort((a,b) => a.position > b.position ? 1 : -1)
    setEmployees(ascPosEmps)
  };

  const sortPosDesc = () => {
    const descPosEmps = [...employees].sort((a,b) => b.position < a.position ? -1 : 1)
    setEmployees(descPosEmps)
  };

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

  const sortPosition = () => {
    if (sortedPos) {
      setSortedPos(false)
      sortPosAsc()
    } else {
      setSortedPos(true)
      sortPosDesc()
    }
  };

  const sortLevel = () => {
    if (sortedLevel) {
      setSortedLevel(false)
      sortLevelAsc()
    } else {
      setSortedLevel(true)
      sortLevelDesc()
    }
  };

  const sortFirstName = () => {
    if (sorted) {
      setSorted(false)
      sortFirstNameAscOrd()
    } else {
      setSorted(true)
      sortFirstNameDescOrd()
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

  return <EmployeeTable employees={employees} onDelete={handleDelete} onSort={sortFirstName} onSortLevel={sortLevel}
  onPosSort={sortPosition} onLastNameSort={sortByLastN} onSortMiddleName={sortMiddleName}/>;
};

export default EmployeeList;
