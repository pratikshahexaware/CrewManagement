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
import { useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/commonInput/FormInput";
import FormButton from "../../components/commonInput/FormButtons";

const EditTransportProvider = ({ inputs, title }) => {
  const [location, setLocation] = useState([]);
  const [loc ,setLoc] = useState('');
  const [email ,setEmail] = useState('');
  const [contactPhone ,setContactPhone] = useState('');
  const [contactPerson ,setContactPerson] = useState('');
  const [licenceNo ,setLicenceNo] = useState('');
  const [providerName ,setProviderName] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const {providerId} = useParams();
  console.log(providerId)

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
         
            const providerData = onSnapshot(
              collection(db, "transport_provider"),
              (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                  const newDoc = doc.data();
                  if(newDoc.providerId === providerId){
                  //list.push({ id: doc.id, ...doc.data() });
                  setProviderName(newDoc.providerName);
                  setLicenceNo(newDoc.licenceNo);
                  setContactPerson(newDoc.contactPerson);
                  setContactPhone(newDoc.contactPhone);
                  setEmail(newDoc.email);
                  setLoc(newDoc.loc);
                }
                })
              }
            )
      return () => {
        locData();
      };
},[]);
  

 //console.log(crewId);

  const handleAdd = async (e) => {
    e.preventDefault();
    
    //console.log(data)
    //const id = uuidv4()
     try {
      await updateDoc(doc(db, "transport_provider", providerId), {
        providerName : providerName,
        licenceNo :licenceNo,
        contactPerson :contactPerson,
        contactPhone :contactPhone,
        email : email,
        loc : loc,
        timeStamp: serverTimestamp(),
        //providerId:providerId,
        status : "Active",
        //role: "NA"
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
                  <label>Transport Provider Name</label>
                  <input className="form-control" value={providerName} placeholder={"Provider Name"}
                  onChange={(e) => setProviderName(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label>Licence No</label>
                  <input className="form-control" value={licenceNo} placeholder={"Provider Name"}
                  onChange={(e) => setLicenceNo(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label>Contact Person Name</label>
                  <input className="form-control" value={contactPerson} placeholder={"Provider Name"}
                  onChange={(e) => setContactPerson(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label>Contact Person Number</label>
                  <input className="form-control" value={contactPhone} placeholder={"Provider Name"}
                  onChange={(e) => setContactPhone(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label>Contact Person Email</label>
                  <input className="form-control" value={email} placeholder={"Provider Name"}
                  onChange={(e) => setEmail(e.target.value)}/>
                </div>

              <div className="formInput">
                    <label>Service Location</label>
                        <select className="mt-4" id="loc" name="loc" 
                        value={loc} onChange={(e) => setLoc(e.target.value)}  >
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

export default EditTransportProvider;
