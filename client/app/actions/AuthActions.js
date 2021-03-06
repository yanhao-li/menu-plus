import setAuthorizationToken from 'utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { fetchFavorites } from './FavoritesActions';
import apiPath from 'utils/apiPath';
import fetchStatusHandler from 'utils/fetchStatusHandler';
import { showNot } from 'actions/NotActions';

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user,
  };
}

export const initAuth = () => (dispatch) => {
  if (localStorage.jwtToken) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      let user = {};
      try {
        user = jwtDecode(token);
      } catch (e) {
        throw new Error('invalid Token');
      }
      setAuthorizationToken(token);
      dispatch(setCurrentUser(user));
    }
  }
};

export const login = (auth) =>
  (dispatch) => {
    return fetch(apiPath + '/authtoken',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth)
      })
      .then(fetchStatusHandler)
      .then(json => {
        const token = json.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        const user = jwtDecode(token);
        dispatch(setCurrentUser(user));
        dispatch(showNot("Login Successful", "OK"));
      })
  }

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  dispatch(showNot("Logged out", "OK"))
};

export const signup = (auth) =>
  (dispatch) => {
    return fetch(apiPath + '/user',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth)
      })
      .then(fetchStatusHandler)
      .then(() => dispatch(login(auth)))
  }
