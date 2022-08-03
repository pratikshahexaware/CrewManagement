import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewColumns, userRows } from "../../datatablesource";
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

const Datatable = () => {
  const [data, setData] = useState([]);
  const [editBox , seteditBox] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "flight_schedule"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flight_schedule", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/airline/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Manage Crew</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  const statusColumn = [
    {
      field: "route",
      headerName: "Flight Route",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            {params.row.Origin}-{params.row.Destination}
          </div>
        );
      },
    },
  ]
  const dateColumn = [
    {
      field: "date",
      headerName: "Flight Date & Time",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.OperationalDay}- At {params.row.Departure}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Crew
        {/*="/airline/newCrew" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={crewColumns.concat(statusColumn,dateColumn,actionColumn)}
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

export default Datatable;
