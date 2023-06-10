import React from "react";

function Pagination ({fetchEmployees, possiblePages}) {
    let pages = [];
    
    for (let i = 1; i <= Math.ceil(possiblePages); i++) {
        pages.push(i)
    }

    return (<div className="pagination" 
        style={{
            display: "flex", 
            justifyContent: "center",
        }}>

            {pages.map((page, index) => {
                return <button key={index} onClick={() => {fetchEmployees(page)}}>{page}</button>
            })}

    </div>)
}

export default Pagination