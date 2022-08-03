import Sidebar from "../../components/sidebar/TransportProviderSidebar";
import TransprtNavbar from "../../components/navbar/TransportNavbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import { useTranslation } from "react-i18next";


const TransportProviderHome = () => {
  const {t} = useTranslation();
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <TransprtNavbar />
        <div className="widgets">
          {/* <Widget type="Providers" /> */}
          <Widget type="Drivers" />
          <Widget type="Cabs" />
          {/* <Widget type="earning" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">{t("trlistHometitle")}</div>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default TransportProviderHome;
