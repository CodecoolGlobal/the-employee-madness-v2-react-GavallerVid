import { Link } from "react-router-dom";

function DivisionTable ({divisions, onDelete}) {

    return (<div id="divisions">
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Boss</th>
                <th>Budget</th>
                <th>Location</th>
                <th>Update</th>
                </tr>
            </thead>
            <tbody>
                {divisions.map((division) => (
                    <tr key={division._id}>
                        <td>
                            {division.name}
                        </td>
                        <td>
                            {division.boss.name}
                        </td>
                        <td>
                            {division.budget}
                        </td>
                        <td>
                            {division.location.city} : {division.location.country}
                        </td>
                        <td>
                            <Link to={`/divisionUpdate/${division._id}`}>
                            <button type="button">Update</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

export default DivisionTable