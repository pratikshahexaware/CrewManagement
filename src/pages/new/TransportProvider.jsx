import Sidebar from "../../components/sidebar/TransportSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  set,
  setDoc, onSnapshot, updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/commonInput/FormInput";
import FormButton from "../../components/commonInput/FormButtons";
import moment from "moment";

const TransportProvider = ({ inputs, title }) => {
  const [location, setLocation] = useState([]);
  const [loc ,setLoc] = useState('Select Value');
  const [editData,setEditdata] = useState([]);
  const [data, setData] = useState([]);
  const today = new Date();
  var dateString = moment(today).format('YYYY-MM-DD');
 // console.log(dateString)
  var newDate = moment(today).add(12, 'M');
  var ns = moment(newDate).format('YYYY-MM-DD');
  const [date,setDate] = useState(dateString); 
  const [activeTo,setActiveTo] = useState(ns);
  const navigate = useNavigate();

  const {providerId} = useParams();
 // console.log(providerId)

    useEffect((e)=>{
        const locData = onSnapshot(
            collection(db, "Locations"),
            (snapShot) => {
              let list = [];
              snapShot.docs.forEach((doc) => {
                const newDoc = doc.data();
                list.push({ id: doc.id, ...doc.data() });
              })
              setLocation(list)
            }
          )
          if(providerId){
            console.log("modify page")
            const locData = onSnapshot(
              collection(db, "transport_provider"),
              (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                  const newDoc = doc.data();
                  if(doc.id === providerId)
                  list.push({ id: doc.id, ...doc.data() });
                })
                setEditdata(list)
              }
            )
          }
      return () => {
        locData();
      };
},[]);
  

 //console.log(crewId);
  const handleInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setData({ ...data, [id]: value});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    //console.log(data)
    const password = "12345678";
    //const id = uuidv4()
    let userid = Number(new Date());
     try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        password
      );
      //console.log("USer Created")
      await setDoc(doc(db, "transport_provider", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
        providerId:res.user.uid,
        status : "Active",
        //role: "NA"
      });
      //console.log("transport_provider Updated")
      await setDoc(doc(db, "users", res.user.uid), {
        userid: userid,
        phone : data.contactPhone,
        displayName : data.providerName,
        answer : data.contactPerson,
        email : data.email,
        username : data.licenceNo, 
        password : password,
        timeStamp: serverTimestamp(),
        status : "Active",
        role : "Transport Provider",
        activeTo : activeTo,
        activefrom : date,
        img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      });
      //console.log("users Updated")
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              
                { inputs.map((item) => {
                                return(
                                    <FormInput 
                                    key={item.id}
                                    {...item}
                                    value={data[item.name]}
                                    onChange={handleInput}/>
                                    )
                                })
                            }
              {/* //<button >Save</button> */}
              <div className="formInput">
                    <label>Service Location</label>
                        <select className="mt-4" id="loc" name="loc" 
                        value={loc.value} onChange={handleInput}  >
                            { location.map((item) => {
                                return(
                                    <option value={item.LocationName}
                          key={item.locationId}>{item.LocationName }</option>
                                    )
                                })
                            }
                        </select>
                </div>
              <FormButton type="submit">Save</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportProvider;
