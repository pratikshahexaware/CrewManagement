import "./list.scss"
import Sidebar from "../../components/sidebar/AirlineSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/AllMembersForCrew"
import { useParams } from "react-router-dom"

const MembersList = () => {
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

export default MembersList
