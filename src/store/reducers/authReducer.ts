interface AuthAction {
  type: string;
  error: string;
}

interface AuthState {
  authError: null | string;
}

const initState: AuthState = {
  authError: null,
};

const authReducer = (state: AuthState = initState, action: AuthAction) : AuthState => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('login failed');
      return {
        ...state,
        authError: action.error,
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      }
    case 'LOGOUT_SUCCESS':
      console.log('logout success');
      return state;
    default:
      return state;
  }
}

export default authReducer;
