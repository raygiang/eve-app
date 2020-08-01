export interface LoginCredential {
  email: string;
  password: string;
}

export const logIn = (credentials: LoginCredential) => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((error: any) => {
      dispatch({ type: 'LOGIN_ERROR', error: error.message });
    });
  }
}

export const logOut = () => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    });
  }
}
