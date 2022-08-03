import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Dropdowm from "../../components/commonInput/FormDropdown";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("Select Value");
  const [role, setRole] = useState("Select Value");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let password = "12345678";
    let userid = Number(new Date());
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        userid: userid,
        timeStamp: serverTimestamp(),
        password:password,
        //role: "NA"
      });
      //navigate("/home/users")
      alert("User Registred Succesfully..!")
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Status</label>
                <select className="mt-4" id="status" value={status.value} onChange={handleInput}>
                  <option value="Select Value">Select Value</option>
                  <option value="Active" Selected>Active</option>
                  <option value="In Active">In Active</option>
                </select>
              </div>
              {/* <Dropdowm 
              id = {inputs.id}
              /> */}
              <div className="formInput">
                <label>Role</label>
                <select className="mt-4" id="role" value={role.value} onChange={handleInput}>
                  <option value="Select Value">Select Value</option>
                  <option value="Crew Admin" Selected>Crew Admin</option>
                  <option value="Transport Admin">Transport Admin</option>
                </select>
              </div>
              <button disabled={per !== null && per < 100} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
