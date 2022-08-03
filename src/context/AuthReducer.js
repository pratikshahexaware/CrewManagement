const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGINAIRLINE": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGINTRANSPORT": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGINPROVIDER": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
