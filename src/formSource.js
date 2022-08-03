
export const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "username",
    },
    {
      id: "displayName",
      label: "Name and Surname",
      type: "text",
      placeholder: "full name",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "email",
    },
    {
      id: "answer",
      label: "what is your birth place?",
      type: "text",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
    },
    {
      id: "activefrom",
      label: "Active From",
      type: "date",
    }, 
    {
      id: "activeTo",
      label: "Active To",
      type: "date",
    },  
  ];

  export const userEditInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "username",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "email",
    },
 
  ];
  
  export const forgotInputs = [
    {
      id: "email",
      label: "Username",
      type: "email",
      placeholder: "Email",
    },  
    {
      id: "answer",
      label: "what is your birth place?",
      type: "text",
      placeholder: "Answer",
    },  
  ];

  export const loginInputs = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be Required",
      label: "Password",
      //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ]

  export const resetInputs = [
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
    },  
    {
      id: "confirmPassword",
      label: "Password",
      type: "password",
      placeholder: "Confirm Password",
    },  
  ]

  export const crewInputs = [
    {
      id: "airline",
      name : "airline",
      type: "text",
      placeholder: "Airline Name",
      errorMessage:
      "Airline should be 3-16 characters and shouldn't include any special character!",
      label: "Airline Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },  
    {
      id: "flightNo",
      name : "flightNo",
      type: "text",
      placeholder: "Flight No",
      errorMessage:
      "Flight No should be Alphanumeric ",
      label: "Flight No",
      pattern: "^[A-Z0-9]{0,8}$",
      required: true,
    }, 
    {
      id: "members",
      name : "members",
      type: "text",
      placeholder: "No of Members",
      errorMessage:
      " include Only Numbers !",
      label: "No of Members",
      pattern: "^[0-9]$",
      required: true,
    },  
    {
      id: "departure",
      name : "departure",
      type: "text",
      placeholder: "Departure from",
      errorMessage:
      " Required and only characters !",
      label: "Departure from",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
      
    },
    {
      id: "arrival",
      name : "arrival",
      type: "text",
      placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Arrival To",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },  
    {
      id: "flightDate",
      name : "flightDate",
      type: "date",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Flight Date",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    {
      id: "flightArrivalTime",
      name : "flightArrivalTime",
      type: "time",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Filght Arrival Time",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    {
      id: "flightDepartureTime",
      name : "flightDepartureTime",
      type: "time",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Filght Departure Time",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    
  ]

  export const crewMemberInputs = [
    {
      id: "empName",
      name : "empName",
      type: "text",
      placeholder: "Employee Name",
      errorMessage:
      "Employee Name should be Required !",
      label: "Employee Name",
      //pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },   
    {
      id: "dob",
      name : "dob",
      type: "date",
      placeholder: "Date of birth",
      errorMessage:
      "Date Of Birth should be Required !",
      label: "Date Of Birth",
      //pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },  
    {
      id: "empCode",
      name : "empCode",
      type: "text",
      placeholder: "Employee Code",
      errorMessage:
      "Employee Code should be Required and it should be 6 characters!",
      label: "Employee Code",
      pattern: "^[A-Za-z0-9]{6}$",
      required: true,
    }, 
    {
      id: "gender",
      name : "gender",
      type: "text",
      placeholder: "Gender",
      errorMessage:
      "Gender should be Required !",
      label: "Gender",
      pattern: "^[A-Za-z]{1,13}$",
      required: true,
    },
    {
      id: "phone",
      name : "phone",
      type: "text",
      placeholder: "Phone Number",
      errorMessage:
      "Phone is Required and only Numbers !",
      label: "Phone Number",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: "email",
      name : "email",
      type: "email",
      placeholder: "Email",
      errorMessage:
      "Email is Required !",
      label: "Email",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    },
    {
      id: "address",
      name : "address",
      type: "text",
      placeholder: "Address",
      errorMessage:
      " This field is Required !",
      label: "Address",
      //pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$",
      required: true,
    },
    {
      id: "city",
      name : "city",
      type: "text",
      placeholder: "City",
      errorMessage:
      " This field is Required!",
      label: "City",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    }, 
    {
      id: "state",
      name : "state",
      type: "text",
      placeholder: "State",
      errorMessage:
      " This field is Required!",
      label: "State",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    }, 
    {
      id: "pinCode",
      name : "pinCode",
      type: "text",
      placeholder: "Pin Code",
      errorMessage:
      " This field is Required and only Numbers !",
      label: "Address",
      pattern: "^[0-9]{6}$",
      required: true,
    }, 
    {
      id: "requirements",
      name : "requirements",
      type: "text",
      placeholder: "Additional Requirements",
      // errorMessage:
      // "Additional Requirements should Required",
      label: "Additional Requirements",
      //pattern: "^[A-Za-z]{3,16}$",
      //required: true,
    },  
  ]

  export const cabDriversInputs = [
    {
      id: "firstName",
      name : "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
      "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: "lastName",
      name : "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
      "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },  
    {
      id: "birthDate",
      name : "birthDate",
      type: "date",
      //placeholder: "Arrival To",
      errorMessage:
      " This field is Required !",
      label: "Birth Date",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    // {
    //   id: "userId",
    //   name : "userId",
    //   type: "text",
    //   placeholder: "User ID",
    //   errorMessage:
    //   "User ID should be Alphanumeric ",
    //   label: "User ID",
    //   pattern: "^[A-Z0-9]{0,8}$",
    //   required: true,
    // }, 
    {
      id: "gender",
      name : "gender",
      type: "text",
      placeholder: "Gender",
      errorMessage:
      " This field is Required!",
      label: "Gender",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },  
    {
      id: "primaryNo",
      name : "primaryNo",
      type: "text",
      placeholder: "Primary Number",
      errorMessage:
      " This field is Required and only Numbers !",
      label: "1st Number",
      pattern: "^[0-9]{10}$",
      required: true,
    },  
    {
      id: "secondaryNo",
      name : "secondaryNo",
      type: "text",
      placeholder: "Secondary Number",
      errorMessage:
      " This field is Required and only Numbers !",
      label: "2nd Number",
      pattern: "^[0-9]{10}$",
      //required: true,
    },
    {
      id: "email",
      name : "email",
      type: "email",
      placeholder: "Email",
      errorMessage:
      " This field is Required !",
      label: "Email",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    {
      id: "address",
      name : "address",
      type: "text",
      placeholder: "Address",
      errorMessage:
      " This field is Required !",
      label: "Address",
      //pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$",
      required: true,
    }, 
    {
      id: "city",
      name : "city",
      type: "text",
      placeholder: "City",
      errorMessage:
      " This field is Required!",
      label: "City",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    }, 
    {
      id: "state",
      name : "state",
      type: "text",
      placeholder: "State",
      errorMessage:
      " This field is Required!",
      label: "State",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    }, 
    {
      id: "pinCode",
      name : "pinCode",
      type: "text",
      placeholder: "Pin Code",
      errorMessage:
      " This field is Required and only Numbers !",
      label: "Address",
      pattern: "^[0-9]{6}$",
      required: true,
    }, 
    
  ]

  export const rosterInput =[
    {
      id: "date",
      name : "date",
      type: "date",
      //placeholder: "First Name",
      errorMessage:
      "Select Date ",
      label: "Select Date",
     // pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: "departure",
      name : "departure",
      type: "text",
      placeholder: "Departure",
      errorMessage:
      "Select Departure",
      label: "Departure",
      //pattern: "^[A-Za-z]{3,16}$",
     // required: true,
    },
    {
      id: "arrival",
      name : "arrival",
      type: "text",
      placeholder: "Arrival",
      errorMessage:
      "Select Arrival",
      label: "Arrival",
      //pattern: "^[A-Za-z]{3,16}$",
      //required: true,
    },
  ]
  export const cabInputs = [
  {
    id: "regiArea",
    name : "regiArea",
    type: "text",
    placeholder: "Registration Area",
    errorMessage:
    " This field is Required and only characters !",
    label: "Registration Area (state)",
    pattern: "^[A-Za-z]{3,16}$",
    required: true,
  }, 
  {
    id: "noOfseats",
    name : "noOfseats",
    type: "text",
    placeholder: "No of Seats",
    errorMessage:
    " This field is Required and only Numbers !",
    label: "No of Seats",
    pattern: "^[0-9]{1}$",
    required: true,
  },
  {
    id: "regiNo",
    name : "regiNo",
    type: "text",
    placeholder: "Registration No",
    errorMessage:
    " This field is Required !",
    label: "Registration No",
   // pattern: "^[A-Za-z0-9]{4,16}$",
    required: true,
  },
  {
    id: "vehicle",
    name : "vehicle",
    type: "text",
    placeholder: "Vehicle",
    errorMessage:
    " This field is Required !",
    label: "Vehicle",
    pattern: "^[A-Za-z0-9]{4,16}$",
    required: true,
  },
 ]
export const providerInputs = [
  {
    id: "providerName",
    name : "providerName",
    type: "text",
    placeholder: "Transport Provider Name",
    errorMessage:
    " This field is Required !",
    label: "Transport Provider Name",
   // pattern: "^[A-Za-z0-9,]{3,16}$",
    required: true,
  },
  {
    id: "licenceNo",
    name : "licenceNo",
    type: "text",
    placeholder: "Licence No",
    errorMessage:
    " This field is Required !",
    label: "Licence No",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: "contactPerson",
    name : "contactPerson",
    type: "text",
    placeholder: "Contact Person Name",
    errorMessage:
    " This field is Required !",
    label: "Contact Person Name",
   //pattern: "^[A-Za-z]{3,16}$",
    required: true,
  },
  {
    id: "contactPhone",
    name : "contactPhone",
    type: "text",
    placeholder: "Contact Person Number",
    errorMessage:
    " This field is Required and only Numbers !",
    label: "Contact Person Number",
    pattern: "^[0-9]{10}$",
    required: true,
  },  
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Contact Person Email",
    errorMessage: "It should be a valid email address!",
    label: "Contact Person Email",
    required: true,
  },
]