const initialState = {
  onBoarded: false,
  searchResult: null,
  locationChanged: false,
  location: null,
  selectedResult: {},
  currentRequest: {},
  destinationCoords: {},
  isSignedIn: false,
  appLoading: false,
};

const requestorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SKIP':
      return {
        ...state,
        onBoarded: true,
      };
    case 'LOCATION':
      return {
        ...state,
        location: action.payload,
        locationChanged: true,
      };
    case 'SELECTEDRESULT':
      return {
        ...state,
        selectedResult: action.payload,
      };
    case 'CURRENTREQUEST':
      return {
        ...state,
        currentRequest: action.payload,
      };
    case 'NAVIGATE':
      return {
        ...state,
        destinationCoords: action.payload,
      };
    case 'SIGNIN':
      return {
        ...state,
        isSignedIn: true,
      };
    case 'SIGNOUT':
      return {
        ...state,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default requestorReducer;
