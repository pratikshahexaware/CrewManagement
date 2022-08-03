import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,DateNavigator,TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState ,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { collection, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from "../../firebase";

const CrewRoster = () => {
    const {t} = useTranslation();
    const {flightId} = useParams();
    const [data, setData] = useState([]);

//console.log(flightId)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "roster_events"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          console.log(newDoc.memberID)
          if(newDoc.memberID === flightId){
            list.push({ id: doc.id, ...doc.data() });
            //setStartDate(newDoc.startDate);
          }    
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
const currentDate = new Date();
//console.log(startDate)
const schedulerData = [
  { startDate: '2022-07-18 08:15', title: 'Departure From Mumbai Airport' },
  { startDate: '2022-07-18 09:25', title: 'Arrival at Pune Airport' },
  { startDate: '2022-07-18 09:45', title: 'pick Up from Pune Airport' },
  { startDate: '2022-07-18 11:00', title: 'Drop at Hotel Radison' },
];

const [currentViewName, setcurrentViewName] = useState();

    return(
        <div className="datatable">
          <div className="datatableTitle">
            {t("crRostr")}
          </div>
    <Paper>
    <Scheduler
      data={data}
      height={660}
    >
      <ViewState
        defaultCurrentDate={currentDate}
        currentViewName={currentViewName}
        //onCurrentViewNameChange={currentViewNameChange}
      />
      <WeekView/>
      <MonthView />
      <DayView />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <ViewSwitcher />
      <Appointments />
    </Scheduler>
  </Paper>
  </div>
  )
}
export default CrewRoster
