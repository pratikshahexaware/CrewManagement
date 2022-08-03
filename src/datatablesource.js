
export const userColumns = [
  { field: "id", headerName: "ID", width: 100 ,hide:true},
  
  { field: "userid", headerName: "ID", width: 100 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img
                  ? params.row.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } alt="Avtar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "role",
    headerName: "Role",
    width: 150,
  }
];

export const crewMembersColumns = [
  { field: "id", headerName: " User ID", width: 100,hide: true},
  { field: "empCode", headerName: " Emp ID", width: 100,},
  {
    field: 'empName',
    headerName: "Employee Name",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "flightDate",
    headerName: "Flight Date",
    width: 230,
  },
];
export const crewMembersList = [
  { field: "id", headerName: " User ID", width: 100,hide: true},
  { field: "empCode", headerName: " Emp ID", width: 100,},
  {
    field: 'empName',
    headerName: "Employee Name",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Contact No",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];
export const crewMembersListForCrew = [
  { field: "id", headerName: " User ID", width: 100,hide: true},
  { field: "empCode", headerName: " Emp ID", width: 100,},
  {
    field: 'empName',
    headerName: "Employee Name",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];
export const crewColumns = [
  { field: "id", headerName: "ID", width: 100, hide: true},
  {
    field: "FlightNo",
    headerName: "Flight No",
    width: 200,
  },
  {
    field: "crewMembers",
    headerName: "Crew Members",
    width: 150,
  },
];
export const crewColumnsForLogistic = [
  { field: "id", headerName: "ID", width: 100, hide: true},
  {
    field: "empCode",
    headerName: "Employee Code",
    width: 200,
  },
  {
    field: "empName",
    headerName: "Employee Name",
    width: 200,
  },
  {
    field: "flightDate",
    headerName: "Flight Date",
    width: 200,
  },
  {
    field: "FlightArrival",
    headerName: "Arrival Time",
    width: 200,
  },
];

export const RoasterColumns = [
  {
    field: "FlightNo",
    headerName: "Flight No",
    width: 150,
  },
  {
    field: "Origin",
    headerName: "Origin",
    width: 150,
  },
  {
    field: "Destination",
    headerName: "Destination",
    width: 150,
  },
  {
    field: "crewMembers",
    headerName: "Crew Members",
    width: 150,
  },
  {
    field: "OperationalDay",
    headerName: "Operational Day",
    width: 150,
  },
  {
    field: "Departure",
    headerName: "Departure Time",
    width: 150,
  },
  {
    field: "Arrival",
    headerName: "Arrival Time",
    width: 150,
  },

];

export const driverColumns = [
  {
    field: "firstName",
    headerName: "Driver Name",
    width: 150,
  },
  {
    field: "userId",
    headerName: "User Id",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "primaryNo",
    headerName: "Contact No",
    width: 150,
  },
  {
    field: "AssignedCab",
    headerName: "Assigned Cab",
    width: 150,
  },
]

export const cabColumns = [
  {
    field: "regiNo",
    headerName: "Registration No",
    width: 150,
  },
  {
    field: "Category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "regiArea",
    headerName: "Service Area",
    width: 150,
  },
  {
    field: "location",
    headerName: "Local Area",
    width: 150,
  },
  {
    field: "noOfseats",
    headerName: "No Of Seats",
    width: 150,
  },
  {
    field: "AssignedDriver",
    headerName: "Driver Assigned",
    width: 150,
  },
]
export const CrewRosterColumns = [
  {
    field: "crewID",
    headerName: "ID",
    width: 150,
    hide: true
  },
  {
    field: "crewName",
    headerName: "Name",
    width: 150,
  },
  {
    field: "assignedFlight",
    headerName: "Assigned Flight",
    width: 150,
  },
  {
    field: "route",
    headerName: "Flight Route",
    width: 150,
  },
  {
    field: "arrivalTime",
    headerName: "Arrival Time",
    width: 150,
  },
  {
    field: "assignedCab",
    headerName: "Assigned Cab",
    width: 150,
  },
  {
    field: "cabPickupAirport",
    headerName: "Cab Pickup Time",
    width: 150,
  },
  {
    field: "cabDropHotel",
    headerName: "Cab Drop Time",
    width: 150,
  },
  {
    field: "departureTime",
    headerName: "Departure Time",
    width: 150,
  },
  {
    field: "cabPickupHotel",
    headerName: "Cab Pickup Hotel Time",
    width: 150,
  },{
    field: "cabDropAirport",
    headerName: "Cab Pickup Hotel Time",
    width: 150,
  },

]

export const crewColumnsForLogisticApproval =[
  { field: "id", headerName: "ID", width: 100, hide: true},
  {
    field: "empCode",
    headerName: "Employee Code",
    width: 150,
  },
  {
    field: "empName",
    headerName: "Employee Name",
    width: 200,
  },
  {
    field: "pickupstartDate",
    headerName: "PickUp Date & Time",
    width: 200,
  },
  {
    field: "dropStartDate",
    headerName: "Drop Date & Time",
    width: 200,
  },
  {
    field: "assignedCab",
    headerName: "Assigned Cab",
    width: 200,
  },
]

export const providerColumns = [
  { field: "id", headerName: "ID", width: 100, hide: true},
  {
    field: "providerName",
    headerName: "Provider Name",
    width: 150,
  },
  {
    field: "contactPerson",
    headerName: "Conatact Person",
    width: 200,
  },
  {
    field: "contactPhone",
    headerName: "Conatact Phone",
    width: 200,
  },
  {
    field: "email",
    headerName: "Conatact Mail",
    width: 200,
  },
  {
    field: "loc",
    headerName: "Service Area",
    width: 200,
  },
]