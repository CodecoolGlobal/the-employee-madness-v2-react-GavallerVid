import {Link} from 'react-router-dom'

function EquipmentTable ({equipments, onDelete}) {

    return (<div className="EquipmentTable">
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {equipments.map((equipment) => (
                    <tr key={equipment._id}>
                        <td>{equipment.name}</td>
                        <td>{equipment.type}</td>
                        <td>{equipment.amount}</td>
                        <td>
                            <Link to={`/edit/${equipment._id}`}>
                                <button type="button">Edit Equipment</button>
                            </Link>
                            <button type='button' onClick={() => {
                                onDelete(equipment._id)
                            }}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>);
};

export default EquipmentTable