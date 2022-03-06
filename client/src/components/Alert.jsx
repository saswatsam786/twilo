import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          msg={{ title: "error", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
        />
      )}
      {alert.success && (
        <Toast
          msg={{ title: "success", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
        />
      )}
    </div>
  );
};

export default Alert;
