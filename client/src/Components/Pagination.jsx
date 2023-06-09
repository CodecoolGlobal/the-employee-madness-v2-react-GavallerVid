import React from "react";

function Pagination ({employeesPerPage, setCurrentPage, totalEmployees}) {
    let pages = [];
    
    for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
        pages.push(i)
    }

    return <div className="pagination" style={{display: "flex", justifyContent: "center"}}>
        {pages.map((page, index) => {
            return <button key={index} onClick={() => {setCurrentPage(page)}}>{page}</button>
        })}
    </div>
}

export default Pagination