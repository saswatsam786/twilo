import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    console.log(res.data.accessToken);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    console.log(res.data.msg);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  console.log(firstLogin);
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refreshtoken");
      console.log(res);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  }
};

export const signup = (data) => async (dispatch) => {
  const check = valid(data);
  console.log(data);
  console.log(check.errLength);
  if (check.errLength > 0) {
    console.log(check.errMsg);
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("signup", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    console.log(res.data.message);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  }
};
