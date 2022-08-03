import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";

const Home = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Active" />
          <Widget type="Inactive" />
          {/* <Widget type="earning" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest User Registered</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
