import "./editUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
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

const Edituser = ({inputs ,title}) => {
  //console.log(userData)
  const { userId } = useParams()
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("Select Value");
  const [role, setRole] = useState("Select Value");
  const navigate = useNavigate()

  //console.log(userId);
  useEffect(() => {
    try {
      const res = onSnapshot(
        collection(db, "users"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
           // if(data.email === doc.email)
          // console.log(userId)
           if(doc.id === userId){
            setUserData(doc.data())
            //console.log(doc.data())
           }
          });
        },
        (error) => {
          console.log(error);
        }
      );
      //console.log(data.email)
      //data.email = data.email;
    } catch (err) {
      console.log(err);
    }
    setUserid(userData.userid);
    setEmail(userData.email);
    setUsername(userData.username);
  }, [userData]);
  
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
      await updateDoc(doc(db, "users", userId), {
        timeStamp: serverTimestamp(),
        status : status,
        role : role
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
                  <label>User Id</label>
                  <input
                  className="form-control"
                  value={userid}
                  placeholder={"User Id"}
                  onChange={(e) => setUserid(e.target.value)} disabled/>
                </div>
                <div className="formInput">
                  <label>Username</label>
                  <input
                  className="form-control"
                  value={username}
                  placeholder={"username"}
                  onChange={(e) => setUsername(e.target.value)} disabled/>
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)} disabled/>
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

export default Edituser;
