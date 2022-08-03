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
  setDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/commonInput/FormInput";
import FormButton from "../../components/commonInput/FormButtons";

const EditCab = ({ title }) => {
  const [location, setLocation] = useState([]);
  const [cabTyp, setCabTyp] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {cabId} = useParams();
  //console.log(cabId)
useEffect((e)=>{
    const unsub = onSnapshot(
        collection(db, "Locations"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            const newDoc = doc.data();
            list.push({ id: doc.id, ...doc.data() });
            //console.log(newDoc.arrival)
          });
          setLocation(list); 
        },
        (error) => {
          console.log(error);
        }
      );

      const unsubb = onSnapshot(
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
    const id = e.target.name;
    const value = e.target.value;
    setData({ ...data, [id]: value });
    console.log(data)
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      //console.log(...data)
      const res = await setDoc(doc(db, "cab_details",id), {
        ...data,
        taxiId : id,
        AssignedDriver : "Na",
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
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
                <div className="formInput">
                    <label>Location</label>
                        <select className="mt-4" id="location" name="location" onChange={handleInput} >
                            { location.map((item) => {
                                return(
                                    <option value={item.LocationName}
                                    key={item.LocationId}>{item.LocationName}</option>
                                    )
                                })
                            }
                        </select>
                </div>
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
              <FormButton type="submit">Save</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCab;
