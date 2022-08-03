import "./list.scss"
import Sidebar from "../../components/sidebar/AirlineSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/CrewMembersDatatable"
import { useParams } from "react-router-dom"

const CrewMemberList = () => {
    const { crewId } = useParams()
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable crewId/>
      </div>
    </div>
  )
}

export default CrewMemberList