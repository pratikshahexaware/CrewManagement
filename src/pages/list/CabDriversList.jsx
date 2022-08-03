import "./list.scss"
import Sidebar from "../../components/sidebar/TransportProviderSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/DriverDatatable"

const CabDriversList = () => {
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

export default CabDriversList