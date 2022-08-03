
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { RoasterColumns } from "../../datatablesource";
import { Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";


const ViewRoster = ({inputs}) => {
  const {t} = useTranslation();
    const { crewId } = useParams()
  const [data, setData] = useState([]);
  const [inputData , setinputData] = useState([]);
//console.log(crewId)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "flight_schedule"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
            const newDoc = doc.data();
           // if(crewId === newDoc.crewId){
                list.push({ id: doc.id, ...doc.data() });
            //}
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
  
  return (
    <>
    <div className="datatable">
        <div className="datatableTitle">
         { t("vwRostr")}
          {/* <Link to={`/airline/newCrewMembers/${crewId}`} className="link">
      Add New
    </Link> */}
        </div>
    {/* <div className="new">
      <div className="newContainer">
        <div className="bottom">
          <div className="right">
            <form onSubmit={quickSearch}>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={inputData[input.name]}
                  onChange={handleInput} />
              ))}
              <FormButton type="submit">Search</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div> */}
        <DataGrid
          className="datagrid"
          rows={data}
          columns={RoasterColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          components={{
            Toolbar: GridToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }} />
      </div></>
  );
};

export default ViewRoster
