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
  onPosSort={sortPosition}/>;
};

export default EmployeeList;
