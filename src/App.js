import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import AirlineList from "./pages/list/AirlineList"
import CrewMemberList from "./pages/list/CrewMemberList";
import New from "./pages/new/New";
import NewCrew from "./pages/new/NewCrew"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { crewInputs, cabDriversInputs,crewMemberInputs,userInputs ,providerInputs,cabInputs,forgotInputs ,loginInputs,resetInputs,userEditInputs} from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register"
import Forgot from './pages/forgotPassword/ForgotPassword'
import Edituser from "./pages/edit/EditUser";
import EditCrew from "./pages/edit/EditCrew";
import NewPassword from "./pages/newPassword/NewPassword";
import AirlineHome from "./pages/home/AirlineHome";
import TransportHome from "./pages/home/TransportHome";
import CrewProfile from "./pages/profile/CrewProfile"
import ManageCrewMembers from "./pages/crewmembers/ManageCrewMembers";
import NewCrewMembers from "./pages/new/NewCrewMember";
import ViewRoster from "./pages/Roster/Roaster";
import CrewRoster from "./pages/Roster/CrewRoster"
import TransportProfile from "./pages/profile/TransportProfile";
import NewCabDriver from "./pages/new/CabDrivers";
import CabLists from "./pages/list/CabLists";
import CrewListForLogistic from "./pages/list/LogisticCrewList";
import RequestApproval from "./pages/new/RequestApproval";

import { serverTimestamp } from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  updateDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import CabDriversList from "./pages/list/CabDriversList";
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import {translationsEn , translationsFr} from "./Translation";
import CrewLogisticArrangement from "./pages/LogisticArrangement/CrewLogisticArrangement";
import MembersList from "./pages/list/MembersList";
import Cabregistration from "./pages/new/Cabregistration";
import CabAssign from "./pages/new/CabAssign";
import CrewListForApproval from "./pages/list/crewListForApproval"
import TransportProviderList from "./pages/list/TransportProviderList";
import TransportProvider from "./pages/new/TransportProvider";
import EditTransportProvider from "./pages/edit/EditTransportProvider";
import EditCabDriver from "./pages/edit/EditCab";
import TransportProviderHome from "./pages/home/TransportProviderHome";
import TransportProviderProfile from "./pages/profile/TransportProviderPfrofile";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationsEn },
      fr: { translation: translationsFr },
    },
    lng: "en",
  });

function App() {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  useEffect(() => {
    
  const unsub = onSnapshot(
    collection(db, "users"),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((docs) => {
        const newDoc = docs.data();
        const today  = new Date();
        const activeto = new Date(newDoc.activeTo);
        //console.log(activeto.getTime())
        //console.log(activeto)
        if(activeto.getTime() < today.getTime()){
          //console.log(doc.id)
          updateDoc(doc(db, "users",docs.id), {
            status: "InActive"
          });
          //alert("jddj")
        }
      });
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
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login inputs={loginInputs} title={t("login")}/>} />
            <Route path="register" element={<Register inputs={userInputs} title="New User Registration"/>} />
            <Route path="forgotPassword" element={<Forgot inputs={forgotInputs} title="Forgot Password"/>} />
            <Route path="newPassword" element={<NewPassword inputs={resetInputs} title="New Password"/>} />
          </Route>
            <Route path="/home">
            <Route
              index element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Edituser inputs={userEditInputs}  title="Modify User" userId />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
          <Route path="/airline">
          <Route index element={
                <RequireAuth>
                  <AirlineHome />
                </RequireAuth>
              }
            />
            <Route path="Crewprofile" element={
                  <RequireAuth>
                    <CrewProfile title={t("CrProfile")} />
                  </RequireAuth>
                }
              />
            <Route path="manageCrew" element={
                <RequireAuth>
                  <AirlineList />
                </RequireAuth>
              }
            />
            <Route
                path=":crewId"
                element={
                  <RequireAuth>
                    <CrewMemberList title="Crew Member List" crewId />
                  </RequireAuth>
                }
              />
            <Route path="newCrew" element={
                  <RequireAuth>
                    <NewCrew inputs={crewInputs} title="Add New Crew" />
                  </RequireAuth>
                }
              />
              <Route path="newCrewMembers/newCrew" element={
                  <RequireAuth>
                    <NewCrewMembers inputs={crewMemberInputs} title="Add Crew Member" />
                  </RequireAuth>
                }
              />
              <Route path="newCrewMembers/:flightId" element={
                  <RequireAuth>
                    <MembersList title="Add Crew Member from list" flightId/>
                  </RequireAuth>
                }
              />
              <Route path="mangcrewMembers" element={
                  <RequireAuth>
                    <ManageCrewMembers title="Crew Member List" />
                  </RequireAuth>
                }
              />
              <Route path="viewRoster" element={
                  <RequireAuth>
                    <ViewRoster title="View Roster" />
                  </RequireAuth>
                }
              />
              <Route path="crewRoster/:flightId" element={
                  <RequireAuth>
                    <CrewRoster title="View Crew Roster" flightId/>
                  </RequireAuth>
                }
              />
              <Route path="logisticArrangement" element={
                  <RequireAuth>
                    <CrewListForLogistic title={t("logisticArrangement")} />
                  </RequireAuth>
                }
              />
                <Route path = "logisticArrangement/:crewId" element={
                  <RequireAuth>
                    <CrewLogisticArrangement title = "Request Form For Logistic Arrangement" crewId/>
                  </RequireAuth>
                }/>
              {/* </Route> */}
          </Route>
          <Route path="/transportProvider">
          <Route
              index
              element={
                <RequireAuth>
                  <TransportProviderHome />
                </RequireAuth>
              }
            />
            <Route path="CabDrivers" element={
                  <RequireAuth>
                    <CabDriversList />
                  </RequireAuth>
                }
                />
            <Route path="NewCabDriver" element={
                  <RequireAuth>
                    <NewCabDriver inputs={cabDriversInputs} title={t("newcabDriver")} />
                  </RequireAuth>
                }
                />
            <Route path="CabDrivers/:driverId" element={
                  <RequireAuth>
                    <CabAssign title={t("cabAssign")} driverId/>
                  </RequireAuth>
                }
              />    
            <Route path="cabDetails" element={
                <RequireAuth>
                  <CabLists inputs={cabDriversInputs} title={t("newcabDriver")} />
                </RequireAuth>
                }
                />
            <Route path="cabDetails/:cabId" element={
                <RequireAuth>
                  <EditCabDriver title={t("editcabDriver")} cabId/>
                </RequireAuth>
                }
                />
            <Route path="Cabregistration" element={
                <RequireAuth>
                  <Cabregistration inputs={cabInputs} title={t("newcabregi")} />
                </RequireAuth>
              }
            />
            <Route path="transportProviderProfile" element={
                  <RequireAuth>
                    <TransportProviderProfile />
                  </RequireAuth>
                }
              />
          </Route>
          <Route path="/transport">
          <Route
              index
              element={
                <RequireAuth>
                  <TransportHome />
                </RequireAuth>
              }
            />
            <Route path="transportProfile" element={
                  <RequireAuth>
                    <TransportProfile />
                  </RequireAuth>
                }
              />
              <Route path="CrewListForApproval" element={
                  <RequireAuth>
                    <CrewListForApproval title={t("cabAssign")} driverId/>
                  </RequireAuth>
                }
              />
              <Route path="trnsprtPvder" element={
                  <RequireAuth>
                    <TransportProviderList />
                  </RequireAuth>
                }
              />
              <Route path="newProvider" element={
                  <RequireAuth>
                    <TransportProvider title={t("provider")} inputs={providerInputs}/>
                  </RequireAuth>
                }
              />
              <Route path="trnsprtPvder/:providerId" element={
                  <RequireAuth>
                    <EditTransportProvider title={t("editProvider")} providerId/>
                  </RequireAuth>
                }
              />
              <Route path="CrewListForApproval/:memberId" element={
                  <RequireAuth>
                    <RequestApproval title={t("logisticArrangementApproval")} memberId/>
                  </RequireAuth>
                }
              />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
