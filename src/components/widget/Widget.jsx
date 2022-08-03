import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FlightIcon from '@mui/icons-material/Flight';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;
  let today = new Date();
  let lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
  let prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

  switch (type) {
    case "Inactive":
      data = {
        title: "IN ACTIVE USERS",
        isMoney: false,
        link: "View all Member",
        query:"users",
        column:"status",
        condition : "==",
        status : "InActive",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Airline":
      data = {
        title: "AIRLINES",
        isMoney: true,
        link: "View All Airlines",
        icon: (
          <FlightIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
      case "Providers":
      data = {
        title: "TRANSPORT PROVIDERS",
        query:"transport_provider",
        link: "View All Poviders",
        column:"status",
        condition : "==",
        status: "Active",
        icon: (
          <BikeScooterIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
      case "crewMembers":
      data = {
        title: "CREW MEMBERS",
        isMoney: true,
        link: "View All Members",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "Active":
      data = {
        title: "ACTIVE USERS",
        query:"users",
        link: "See details",
        column:"status",
        condition : "==",
        status: "Active",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "Cabs":
      data = {
        title: "CAB REGISTRED",
        query:"cab_details",
        link: "See details",
        column:"status",
        condition : "==",
        status: "Active",
        icon: (
          <LocalTaxiIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "Drivers":
      data = {
        title: "DRIVER REGISTRED",
        query:"cabDrivers",
        link: "See details",
        column:"status",
        condition : "==",
        status: "Active",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      
      

      const lastMonthQuery = query(
        collection(db, data.query),
        where(data.column, data.condition, data.status),
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const activeUsers = query(
        collection(db,data.query),
        where("status","==","Active")
      )

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
