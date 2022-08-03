import './newPassword.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { updatePassword  } from "firebase/auth";
import { useNavigate, Link} from "react-router-dom";
import image from '../../image/airport.jpg'

const NewPassword = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
   // alert(user.uid)
    try {
        if(data.password === data.confirmPassword){
            updatePassword(user , data.password).then(() =>{
            })
            await updateDoc(doc(db, "users", user.uid), {
                    timeStamp: serverTimestamp(),
                    password : data.password
                  });
                  navigate(-1)
        }else{
            alert("password does not not match")
        } 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="leftimg">
            <img
              src={image}
              alt=""
            />
          </div>
          <div className="rightf">
            <form onSubmit={handleSubmit}>
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
              <button type="submit">
                Submit
              </button>
              <p>Go to Login... <Link to='/login' style={{ textDecoration: "none" }}><span>Sign In</span></Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;

