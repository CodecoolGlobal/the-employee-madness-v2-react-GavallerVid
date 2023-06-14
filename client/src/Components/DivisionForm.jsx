import { useState } from "react"

function DivisionForm ({onUpdate, division, onCancel}) {

const [name, setName] = useState(division?.name?? "");
const [budget, setBudget] = useState(division?.budget?? "")
const [city, setCity] = useState(division?.location?.city?? "")
const [country, setCountry] = useState(division?.location?.country?? "")
const location = {}
location.city = city
location.country = country
console.log(division)
const handleSubmit = (e) => {
    e.preventDefault()

        onUpdate({
            ...division,
            name,
            budget,
            location
        })
    }
    

    return (<form onSubmit={handleSubmit}>

        <div className="control"></div>
        <label htmlFor="name">Divison Name</label>
        <input value={name} name="name"
        onChange={(e) => setName(e.target.value)}
        ></input>

        <div className="control"></div>
        <label htmlFor="budget">Divison Budget</label>
        <input value={budget} name="budget"
        onChange={(e) => setBudget(e.target.value)}
        ></input>

        <div className="control"></div>
        <label htmlFor="location">Divison City</label>
        <input value={location.city} name="location"
        onChange={(e) => setCity(e.target.value)}
        ></input>

        <div className="control"></div>
        <label htmlFor="location">Divison Country</label>
        <input value={location.country} name="location"
        onChange={(e) => setCountry(e.target.value)}
        ></input>

        <div className="buttons">
        <button type="submit">Submit</button>
        </div>

    </form>)
}

export default DivisionForm