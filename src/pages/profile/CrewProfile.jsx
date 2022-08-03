import "./profile.scss";
import Sidebar from "../../components/sidebar/AirlineSidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect ,useState} from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user.email)
  const [data, setData] = useState({});
  useEffect (() =>{
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        //let list = [];
        snapShot.forEach((doc) => {
          const newDoc = doc.data() 
          //console.log(user.email)
          //console.log("new" +newDoc.email)
         if(newDoc.email === user.email){
          console.log("newDoc")
            setData(newDoc);     
         }
        });
        //console.log(data)
        //console.log(user.email)
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <h1 className="title">{t("CrProfile")}</h1>
            <div className="item">
              <img
                src={data.img}
                alt="img"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">{t("email")}:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{t("phone")}:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{t("country")}:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{t("role")}:</span>
                  <span className="itemValue">{data.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
