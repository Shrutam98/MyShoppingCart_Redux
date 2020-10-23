import api, { baseUrl } from "actions/api";
export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const url = baseUrl + "Categories/";

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(url)
    .fetchAll()
    .then((response) => {
      console.log("categories", response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  api
    .actions(url)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .actions(url)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Delete
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .actions(url)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
