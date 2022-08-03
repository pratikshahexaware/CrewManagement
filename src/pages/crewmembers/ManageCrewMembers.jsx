import React from 'react'
import Sidebar from "../../components/sidebar/AirlineSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/AllCrewMembers"

const ManageCrewMembers = () => {
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

export default ManageCrewMembers
