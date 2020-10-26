import api, { baseUrl } from "actions/api";

export const ACTION_TYPES = {
  CREATE_PRODUCT: "CREATE_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  FETCH_ALL_PRODUCT: "FETCH_ALL_PRODUCT",
};

const url = baseUrl + "Products/";

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(url)
    .fetchAll()
    .then((response) => {
      console.log("products", response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_PRODUCT,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  data = data;
  api
    .actions(url)
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_PRODUCT,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Update
export const update = (id, data, onSuccess) => (dispatch) => {
  data = data;
  api
    .actions(url)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PRODUCT,
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
        type: ACTION_TYPES.DELETE_PRODUCT,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};
