
import Sidebar from "../../components/sidebar/AirlineSidebar";
import Navbar from "../../components/navbar/TransportNavbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";

const AirlineHome = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {/* <Widget type="user" /> */}
          <Widget type="Airline" />
          <Widget type="crewMembers" />
          {/* <Widget type="earning" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Crew Update</div>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default AirlineHome
