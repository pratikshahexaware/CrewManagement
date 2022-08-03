import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewMembersListForCrew } from "../../datatablesource";
import { Link ,useNavigate,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import FormInput from "../commonInput/FormInput";
import FormButton from "../commonInput/FormButtons";
import { uuid } from "uuidv4";
import moment from 'moment'

const AllCrewMembers = () => {
    const { flightId } = useParams()
  const [data, setData] = useState([]);
  const [prvData, setprvData] = useState([]);
  const [flightNo, setflightNo] = useState([]);
  const [location,setLocation] = useState('');
  const [flight, setFlight] = useState('')
  const [selectedRows, setSelectedRows] = useState([]);
  const today = new Date();
  var dateString = moment(today).format('YYYY-MM-DD');
  const todayDate = today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate(); //+' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
  //console.log(todayDate)
  const [date,setDate] = useState(dateString);
  const navigate = useNavigate();

//console.log(flightId)
  useEffect(() => {
    const res = onSnapshot(
      collection(db, "flight_schedule"),
    (snapShot) =>{
      snapShot.docs.forEach((doc)=>{
        const newDoc = doc.data();
        if(flightId === newDoc.itemID){
          setflightNo(newDoc);
          setFlight(newDoc.FlightNo);
          setLocation(newDoc.Destination);
        }
      })
    })
   
  }, []);
  //console.log("Total Length"+prvData.length)

const ResetPage = () =>{
  //console.log("object")
  window.location.reload()
}
const backToList = () => {
  //console.log("object")
  navigate(-1);
}
const handleOnchange = () => {
  console.log("object")
  //navigate(-1);
}
const PopulateList = async (e) =>{
  //console.log(arrival.memberId)
  e.preventDefault();
  const ress = onSnapshot(collection(db,"allotedCrewForFlight"),
  (snapShot) =>{
    let oldList = [];
    snapShot.docs.forEach((old)=>{
      if(old.exists()){
        const newDoc = old.data();
        if(newDoc.Destination === location && newDoc.flightDate !==date)
        oldList.push({id :old.id, ...old.data()})
        //console.log("exists")
      }
    })
    setprvData(oldList);
  })
//console.log(date +"---" +location+ "-----" +flight)
  const MSI = prvData.filter((e) => { return  e.flightDate === date && e.Destination === location && e.flightNo=== flight});
  const empList = [];
  console.log(MSI.length)
  if(MSI.length!==0){
    //console.log("object")
    MSI.map((e) => {
      //console.log("KEY"+e.id)
      return(
        empList.push({ id : e.memberId, flightDate : e.flightDate, flightId : e.flightid, empName : e.empName, key : e.id})
      )
    });
  }else{
    //console.log("Else")
    empList.push("");
  
  }

 
  

//   //const values = empIdList.filter((value) => {return value.id !== doc.id})

//  //console.log(empList.id)
//  //console.log(prvData.memberId)
//  empList.map((e) => {
//     console.log(e.id)
//     console.log(data.id)
//     //const miss = data.filter((val) => );
//     if(data.id !== e.id)
//       {
//         console.log("miss")
//       }
        
  
//  })
  

}
//alert(JSON.stringify(selectedRows, null, 4))
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Crew Members List
      </div>
      <form className="SearchDiv" onSubmit={PopulateList}>
          <FormInput type="text" label="Flight No"  value={flight}
                    placeholder={"Flight No"}
                    onChange={(e) => setFlight(e.target.value)} disabled/>
          {/* <div className="formInput">
                <label>Cab Type</label>
                <select
                  className="mt-4" id="cabType"  onChange={handleOnchange}
                 >
                  {
                    data.map((item) => {
                      return (
                        <option value={item.cabType}
                          key={item.cabId}>{item.cabType}</option>
                      )
                    })
                  }
                </select>
              </div> */}
          <FormInput type="date" label="Select Date" value={date} onChange={(e)=>{setDate(e.target.value); }}/>
          <FormButton className="link" type="submit">Show</FormButton>
          <FormButton className="link" type="button" onClick={(e) =>{ResetPage()}}>Reset</FormButton>
          <FormButton className="link" type="button" onClick={(e) =>{backToList()}}>Back</FormButton>
        </form>
     
     
      <DataGrid
        className="datagrid"
        rows={prvData}
        columns={crewMembersListForCrew}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = prvData.filter((row) =>
            selectedIDs.has((row.id).toString()),
          );
         // setSelectedRows(selectedRowData);
          //handleSave();
          //console.log(selectedRowData)
         const empIdList = [];
         const id = uuidv4();
          selectedRowData.map((e) => {
                    //console.log(e.id)
                  empIdList.push(e.id);
                  setDoc(doc(db ,"allotedCrewForFlight" , id),{
                    flightDate : date,
                    memberId : e.id,
                    flightid : flightId,
                    flightNo : flight,
                    empName : e.empName,
                    empCode : e.empCode,
                    email : e.email,
                    gender : e.gender,
                    status : e.status,
                    transSatus: "Pending",
                    FlightDeparture : flightNo.Departure,
                    FlightArrival : flightNo.Arrival,
                    Origin : flightNo.Origin,
                    Destination : flightNo.Destination

                  })
                  console.log("Crew Added")
                  });
                //console.log(empIdList)
                setSelectedRows(empIdList)
        }}
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

export default AllCrewMembers;
