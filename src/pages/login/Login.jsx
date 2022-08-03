import './login.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import image from '../../image/airport.jpg';
import FormInput from "../../components/commonInput/FormInput";
import FormButton from '../../components/commonInput/FormButtons';

const Login = ({ inputs, title }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  //console.log(data);

  const handleInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    //console.log(data.email)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const res = onSnapshot(collection(db,"users"),(snapShot)=>{
          snapShot.docs.forEach((doc)=>{
            const newDoc = doc.data();
            if(newDoc.email === data.email){
              if(newDoc.status === "Active"){
                //alert("Approved");
                if(newDoc.role === "Transport Admin"){
                  //alert("transport Admin")
                  dispatch({type:"LOGINTRANSPORT", payload:user})
                  navigate("/transport")
                }else if(newDoc.role === "Crew Admin"){
                  //alert("crew Admin")
                  dispatch({type:"LOGINAIRLINE", payload:user})
                  navigate("/airline")
                }else if(newDoc.role === "Transport Provider"){
                  dispatch({type:"LOGINPROVIDER", payload:user})
                  navigate("/transportProvider")
                }else{
                  dispatch({type:"LOGIN", payload:user})
                  navigate("/home")
                }
              }else{
                console.log("User Not Approved")
              }
            }
          })
        }) 
      })
      .catch((error) => {
        setError(true);
      });
   
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
          <div className="rightl">
            <form onSubmit={handlelogin}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <FormInput
                    {...input}
                    value={data[input.name]}
                    onChange={handleInput}
                  />
                </div>
              ))}
              {/* <button type="submit">
                Submit
              </button> */}
              <FormButton type="submit">Sign In</FormButton>
              <div className="eror">{error && <a>Wrong email or password!</a>}</div>
              <p><Link to='/forgotPassword'style={{ textDecoration: "none" }}>Forgot Password ?</Link></p>
              {/* <input type="checkbox" label="Remember Me"/> */}
              <p>New User.?</p>
              <FormButton><Link to='/register' style={{ textDecoration: "none" ,color:'white'}}>
                Sign Up</Link>
              </FormButton>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
