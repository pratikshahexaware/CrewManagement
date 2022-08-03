import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/TransportSidebar";
import Navbar from "../../components/navbar/Navbar";
import FormInput from "../../components/commonInput/FormInput";
import { logisticCrewInput } from "../../formSource";
import FormButton from '../../components/commonInput/FormButtons';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const RequestApproval = ({ title }) => {
  const [data, setData] = useState([]);
  const [cabData, setcabData] = useState([]);
  const [empData, setempData] = useState([]);
  const [empName, setEmpName] = useState('');
  const [pickupTime,setpickupTime] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [cabTyp ,setcabTyp] = useState('')
  const [cab ,setCab] = useState('')
  const { memberId } = useParams();
  const navigate = useNavigate()
  // console.log(memberId);

  useEffect(() => {
    const empData = onSnapshot(
      collection(db, "allotedCrewForFlight"),
      (snapShot) => {
        let emplist = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          //console.log(crewId +"------"+doc.id)
          if (memberId === doc.id) {
            // emplist.push({id :doc.id ,...doc.data() });
            setempData(newDoc);
            setEmpName(newDoc.empName);
            setpickupTime(newDoc.pickupstartDate);
            setDropLocation(newDoc.dropLocation)
          }
        })
      }
    )
    const unsub = onSnapshot(
      collection(db, "cabType"),
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

  const handleOnchange = (e) => {
    const type = e.target.value;
   //alert("cabType"+cabTyp +"hjgg"+type)
    setcabTyp(type)
    const unsub = onSnapshot(
      collection(db, "cab_details"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          if (newDoc.Category === type && newDoc.location === empData.Destination) {
            list.push({ id: doc.id, ...doc.data() });
          }

          //console.log(newDoc.arrival)
        });
        setcabData(list);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = uuidv4();
    const id2 = uuidv4();
   //console.log(empData.empName+""+empData.memberId+"--PT----"+pickupTime+"_____DL_____"+dropTime+"===DT====="+empData.pickupTitle+"----CT---"+empData.dropTitle)
    //(id);
    const dropTitle = "Drop At "+ dropLocation;
    const dropStartDate = empData.flightDate+" "+dropTime;
    const newPickupTitle = empData.pickupTitle + " " +cab;
    console.log(empData.memberId +"crewId olll" + pickupTime +" ---- " + newPickupTitle )
    console.log(empData.memberId +"crewId olll" + dropStartDate +" ---- " + cab )
     try {
      //Pick Up Event
      await setDoc(doc(db, "roster_events",id), {
        memberID : empData.memberId,
        startDate : pickupTime,
        title : newPickupTitle,
      });
    //   //Drop Event
      await setDoc(doc(db,"roster_events",id2),{
        memberID : empData.memberId,
        startDate : dropStartDate,
        title : dropTitle,
      });
      // updating Previous Table for table Data 
        await updateDoc(doc(db,"allotedCrewForFlight",memberId),{
            transSatus : "Approved",
            dropStartDate : dropStartDate,
            dropTitle : dropTitle,
            assignedCab : cab,
        });
     alert("Events Created")
        navigate(-1)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <FormInput type="text" label="Employee Name" placeholder={"Employee Name"} value={empName}
                onChange={(e) => setEmpName(e.target.value)} disabled />
              <FormInput type="text" label="PickUp Date And Time" placeholder={"PickUp Time"} value={pickupTime}
                onChange={(e) => setpickupTime(e.target.value)} disabled/>
              <FormInput type="text" label="Drop Location" placeholder={"Drop Location"} value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)} />
              <FormInput type="time" label="Drop Time" placeholder={"Drop Time"} value={dropTime}
                onChange={(e) => setDropTime(e.target.value)} />
              <div className="formInput">
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
              </div>
              <div className="formInput">
                <label>Available Cabs</label>
                <select
                  className="mt-4" id="Cab" 
                  value={cab} onChange={(e) => {setCab(e.target.value)}} >
                  {
                    cabData.map((item) => {
                      return (
                        <option value={item.regiNo + "-" + item.vehicle}
                          key={item.taxiId}>{item.regiNo + "-" + item.vehicle}</option>
                      )
                    })
                  }
                </select>
              </div>
              <FormButton type="submit">Approve</FormButton>
              {/* <FormButton type="submit">Reject</FormButton> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestApproval
