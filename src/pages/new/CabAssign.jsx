import Sidebar from "../../components/sidebar/TransportProviderSidebar";
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
import { useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/commonInput/FormInput";
import FormButton from "../../components/commonInput/FormButtons";

const CabAssign = ({ inputs, title }) => {
  const [location, setLocation] = useState([]);
  const [cab ,setCab] = useState('')
  const [cabTyp, setCabTyp] = useState([]);
  const [data, setData] = useState([]);
  const [drivName, setDrivName] = useState('');
  const [service, setService] = useState('');
  const [driverData, setDriverData] = useState([]);
  const [cabData, setcabData] = useState([]);
  const { driverId } = useParams();
 // console.log(driverId)

  const navigate = useNavigate();

    useEffect((e)=>{
        const drivrData = onSnapshot(
            collection(db, "cabDrivers"),
            (snapShot) => {
              let emplist = [];
              snapShot.docs.forEach((doc) => {
                const newDoc = doc.data();
                //console.log(crewId +"------"+doc.id)
                if (driverId === doc.id) {
                  // emplist.push({id :doc.id ,...doc.data() });
                  setDriverData(newDoc);
                  setDrivName(newDoc.firstName +" "+newDoc.lastName)
                  setService(newDoc.serviceArea)
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
          setCabTyp(list);
        },
        (error) => {
          console.log(error);
        }
      );


      return () => {
        unsub();
      };
},[]);
  

 //console.log(crewId);
  const handleInput = (e) => {
    const category = e.target.value;
    //setCabTyp(category)
    const unsub = onSnapshot(
      collection(db, "cab_details"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          if (newDoc.Category === category && newDoc.location === service) {
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
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    const cabId =  cabData.filter((e)=>{ return(e.regiNo === cab )})
    console.log(cab+"----"+drivName+"e.taxiId--"+e.taxiId+"CabId ---"+cabId+"driverID--"+driverId)
     try {
      const id = uuidv4();
      await updateDoc(doc(db, "cabDrivers",driverId), {
         AssignedCab:cab,
     });
     cabId.map((e) => {return (
      //console.log(e.taxiId+"---")
    updateDoc(doc(db,"cab_details",e.taxiId),{
        AssignedDriver : drivName,
     })
     )})
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
                <FormInput type="text" label="Driver Name" placeholder={"Driver Name"} value={drivName}
                onChange={(e) => setDrivName(e.target.value)} disabled />
                <FormInput type="text" label="Register Area" placeholder={"Register Area"} value={service}
                onChange={(e) => setService(e.target.value)} disabled />
                <div className="formInput">
                    <label>Category</label>
                        <select className="mt-4" id="Category" name="Category" onChange={handleInput} >
                            { cabTyp.map((item) => {
                                return(
                                    <option value={item.cabType}
                                    key={item.cabId}>{item.cabType}</option>
                                    )
                                })
                            }
                        </select>
                </div>
                <div className="formInput">
                    <label>Registered Cabs</label>
                        <select className="mt-4" id="Category" name="Category" 
                        value={cab} onChange={(e) => {setCab(e.target.value)}}  >
                            { cabData.map((item) => {
                                return(
                                    <option value={item.regiNo}
                          key={item.taxiId}>{item.regiNo }</option>
                                    )
                                })
                            }
                        </select>
                </div>
              {/* //<button >Save</button> */}
              
              <FormButton type="submit">Save</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabAssign;
