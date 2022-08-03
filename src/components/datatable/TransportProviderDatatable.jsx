import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { providerColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Edituser from "../../pages/edit/EditUser";

const TransportProviderDatatable = () => {
  const [data, setData] = useState([]);
  const [editBox , seteditBox] = useState(false);
  const { t } = useTranslation();

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
      collection(db, "transport_provider"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        
        setData(list);
       // console.log(data)
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
      await deleteDoc(doc(db, "transport_provider", id));
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
            <Link to={`/transport/trnsprtPvder/${params.row.id}`} className="viewButton">
                        Edit
                      </Link>
              {/* <div className="viewButton" onClick={() => seteditBox(true)}>Set Role</div>
              {editBox === true && <Edituser userData={data} seteditBox = {seteditBox} inputs={userInputs} title="Edit User"/>} */}
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
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ]
  const lastEditedColumn = [
    {
      field: "timeStamp",
      headerName: "Last Edited",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {  (params.row.timeStamp).toDate().toDateString()
            }
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {t("providerList")}
        <Link to="/transport/newProvider" className="link">
          {t("new")}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={providerColumns.concat(statusColumn,actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
            toolbar: {
                showQuickFilter: true,
                
            },
          }}
      />
    </div>
  );
};

export default TransportProviderDatatable;
