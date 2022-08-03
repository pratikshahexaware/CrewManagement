import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewColumnsForLogisticApproval, userRows } from "../../datatablesource";
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,updateDoc,setDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import FormInput from "../commonInput/FormInput";
import moment from 'moment';
import FormButton from "../commonInput/FormButtons";



const TransportLogisticArrangement = () => {
  const [data, setData] = useState([]);
  const [flightList, setlightList] = useState([]);
  const [tableData, settableData] = useState([]);
  const [newtableData, setNewtableData] = useState([]);
  const today = new Date();
  var dateString = moment(today).format('YYYY-MM-DD');
  const [date,setDate] = useState(dateString);
  const [pickupTime,setPickupTime] = useState('');
  const [pickupTitle,setPickupTitle] = useState('');
  const [dropTitle,setDropTitle] = useState('');
  const [dropStartDate,setDropStartDate] = useState('');
  const {t} = useTranslation();

  //console.log(params.row.id)
  const navigate = useNavigate();

    useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "Locations"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          list.push({ id: doc.id, ...doc.data() });
          //console.log(newDoc.arrival)
        });
        setData(list); 
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  //console.log(data)


const handleOnchange = (e) =>{
  //alert(e.target.value)
  const city = e.target.value;
  const unsub = onSnapshot(
    collection(db, "flight_schedule"),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        const newDoc = doc.data();
        if(newDoc.Destination === city){
          list.push({ id: doc.id, ...doc.data() });
        }
      });
      setlightList(list);
    },
    (error) => {
      console.log(error);
    }
  );
}
const handleOnchangeLocation = (e) =>{
  
  const flightno = e.target.value;
  const unsub = onSnapshot(
    collection(db, "allotedCrewForFlight"),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        const newDoc = doc.data();
        //console.log(newDoc.flightNo+"-------"+flightno)
        if(newDoc.flightNo === flightno && newDoc.isRequested === "1"){
          //console.log("inside ")
          list.push({ id: doc.id, ...doc.data() });
        }
      });
      settableData(list);
    },
    (error) => {
      console.log(error);
    }
  );
}
const statusColumn = [
  {
    field : "status",
    headerName : "Transport Admin Status",
    width : 200,
    renderCell:(params) =>{
      return (
        <div className={`cellWithStatus ${params.row.transSatus}`}>
          {params.row.transSatus}
        </div>
      );
    }
  }
]
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/transport/CrewListForApproval/${params.row.id}`} style={{ textDecoration: "none" }}>
              <FormButton disabled={params.row.transSatus === "Approved"}className="viewButton">Approve</FormButton>
            </Link>
          </div>
        );
      },
    },
  ];
  
  const dateColumn = [
    {
      field: "date",
      headerName: "Flight Date & Time",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.flightDate}-{params.row.FlightArrival}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
      {t("logisticArrangementApproval")} 
      </div>
      <div className="SearchDiv">
      <div className="formInput">
          <label>Select Location</label>
          <select
          className="mt-4" id="status"
          onChange={handleOnchange} >
              {
              data.map((item) => {
                  return(
                    <option value={item.LocationName}
                    key={item.LocationId}>{item.LocationName}</option>
                    )
                  })
                }
          </select>
        </div>
        <div className="formInput">
          <label>Flight No</label>
          <select
          className="mt-4" id="status"
          onChange={handleOnchangeLocation} >
              {
              flightList.map((item) => {
                  return(
                    <option value={item.FlightNo}
                    key={item.itemID}>{item.FlightNo}</option>
                    )
                  })
                }
          </select>
        </div>
        {/* <FormInput type="date" label="Select Date" value={date} onChange={populateTableData}/> */}
        </div>
      <DataGrid
        className="datagrid"
        rows={tableData}
        columns={crewColumnsForLogisticApproval.concat(statusColumn,actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
          }}
      />
    </div>
  );
};

export default TransportLogisticArrangement;
