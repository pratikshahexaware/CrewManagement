import "./list.scss"
import Sidebar from "../../components/sidebar/TransportSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/TransportLogisticArrangement"

const crewListForApproval = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default crewListForApproval
