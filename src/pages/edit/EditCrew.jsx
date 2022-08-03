import "./editUser.scss";
import Sidebar from "../../components/sidebar/AirlineSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const EditCrew = ({inputs ,title}) => {
  //console.log(userData)
  const { crewId } = useParams()
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("Select Value");
  const [role, setRole] = useState("Select Value");
  const navigate = useNavigate()

  //console.log(userId);
  useEffect(() => {
    try {
      const res = onSnapshot(
        collection(db, "crewDetails"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
           // if(data.email === doc.email)
          // console.log(userId)
           if(doc.id === crewId){
            setUserData(doc.data())
            //console.log(doc.data())
           }
          });
        },
        (error) => {
          console.log(error);
        }
      );
      //console.log(data.flightNo)
      //data.email = data.email;
    } catch (err) {
      console.log(err);
    }
    setRoute(userData.route);
    setAirline(userData.airline);
    setCrewNo(userData.members);
  }, [userData]);
  
  const [airline, setAirline] = useState("");
  const [crewNo, setCrewNo] = useState("");
  const [route, setRoute] = useState("");

  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;
  //   //console.log("data")
  //   setData({ ...data, [id]: value });
  // };

  const handleAdd = async (e) => {
    e.preventDefault();
   //alert(userid)
    try {
      await updateDoc(doc(db, "crewDetails", crewId), {
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

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
            <form onSubmit={handleAdd}>
            <div className="formInput">
                  <label>AirLine</label>
                  <input
                  className="form-control"
                  value={airline}
                  placeholder={"Airline"}
                  onChange={(e) => setAirline(e.target.value)} disabled/>
                </div>
                <div className="formInput">
                  <label>Username</label>
                  <input
                  className="form-control"
                  value={crewNo}
                  placeholder={"username"}
                  onChange={(e) => setCrewNo(e.target.value)} disabled/>
                </div>
                <div className="formInput">
                  <label>Flight Route</label>
                  <input
                  className="form-control"
                  value={route}
                  placeholder={"Flight Route"}
                  onChange={(e) => setRoute(e.target.value)} disabled/>
                </div>
              <div className="formInput">
                <label>Status</label>
                <select className="mt-4" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Select Value">Select Value</option>
                  <option value="Active" defaultValue>Active</option>
                  <option value="In Active">In Active</option>
                </select>
              </div>
              <div className="formInput">
                <label>Role</label>
                <select className="mt-4" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Select Value" defaultValue>Select Value</option>
                  <option value="Crew Admin" >Crew Admin</option>
                  <option value="Transport Admin">Transport Admin</option>
                </select>
              </div>
              <button type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCrew;
