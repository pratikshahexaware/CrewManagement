
import Sidebar from "../../components/sidebar/AirlineSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/ViewRoster"
import { useParams } from "react-router-dom"
import { rosterInput } from "../../formSource"

const Roaster = ({}) => {
    const { crewId } = useParams()
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable crewId inputs={rosterInput}/>
      </div>
    </div>
  )
}

export default Roaster