import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { driverColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInputs } from "../../formSource";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Edituser from "../../pages/edit/EditUser";
import { t } from "i18next";

const DriverDatatable = () => {
  const [data, setData] = useState([]);
  const [editBox , seteditBox] = useState(false);
  const [userData, setUserData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Locations"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
           list.push({ id: doc.id, ...doc.data() });  
        });
        setUserData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    // LISTEN (REALTIME)
    //console.log(user.email)
    const unsubb = onSnapshot(
      collection(db, "transport_provider"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const newDoc = doc.data();
          if(newDoc.email === user.email){
            setProviderData(newDoc);
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cabDrivers", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
 const handleOnchange = (e) =>{
  const loca = e.target.value;
  //console.log(loca+"---"+providerData.providerName)
  const unsub = onSnapshot(
    collection(db, "cabDrivers"),
    (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        const newDoc = doc.data();
        if(newDoc.providerName === providerData.providerName && newDoc.serviceArea === loca)
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    },
    (error) => {
      console.log(error);
    }
  );
 }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/transportProvider/CabDrivers/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Assign Cab</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const statusColumn = [
    {
      field: "route",
      headerName: "Flight Route",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.departure}-{params.row.arrival}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {t("driverlist")}
        <Link to="/transportProvider/NewCabDriver" className="link">
          Add New
        </Link>
      </div>
      <div className="SearchDiv">
      <div className="formInput">
          <label>Select Location</label>
          <select
          className="mt-4" id="TPlocation" name="TPlocation"
          onChange={handleOnchange} >
              {
              userData.map((item) => {
                  return(
                    <option value={item.LocationName}
                    key={item.LocationId}>{item.LocationName}</option>
                    )
                  })
                }
          </select>
        </div>
        </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={driverColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
          }}
      />
    </div>
  );
};

export default DriverDatatable;
