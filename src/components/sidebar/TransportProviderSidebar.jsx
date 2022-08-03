import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import { Link, useNavigate} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const TransportProviderSidebar = () => {
  const {t} = useTranslation();
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  const { dispatch } = useContext(DarkModeContext);
  const navitage = useNavigate();
  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.clear();
    navitage('/')
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/transportProvider" style={{ textDecoration: "none" }}>
          <span className="logo">{t("trpLogo")}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">{t("main")}</p>
          <Link to="/transportProvider" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>{t("dashboard")}</span>
          </li>
          </Link>
          <p className="title">{t("lists")}</p>
          <Link to="/transportProvider/CabDrivers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>{t("mngDr")}</span>
            </li>
          </Link>
          <Link to="/transportProvider/cabDetails" style={{ textDecoration: "none" }}>
             <li>
              <DirectionsCarIcon className="icon" />
              <span>{t("viCbdtls")}</span>
            </li>
          </Link>
          <Link to="/transportProvider/CrewListForApproval" style={{ textDecoration: "none" }}>
          <li>
            <EmojiTransportationIcon className="icon" />
            <span>{t("logArngmt")}</span>
          </li>
          </Link>
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          <p className="title">{t("usful")}</p>
          {/* <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">{t("user")}</p>
          <Link to="/transportProvider/transportProviderProfile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{t("prfl")}</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>{t("logout")}</span>
          </li>
          <p className="title">{t("theme")}</p>
        </ul>
        
      </div>
      
      <div className="bottom"> 
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default TransportProviderSidebar;
