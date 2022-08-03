import React from 'react'
import Sidebar from "../../components/sidebar/AirlineSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/CrewRosterDatatable"
import { useParams } from "react-router-dom"
import { rosterInput } from "../../formSource"

const CrewRoster = () => {
  const { flightId } = useParams()
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable flightId inputs={rosterInput}/>
      </div>
    </div>
  )
}

export default CrewRoster
