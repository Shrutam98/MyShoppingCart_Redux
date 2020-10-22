import api from "actions/api";
import { ACTION_TYPES, baseUrl } from "actions/api";

const url = baseUrl + "Products/";

const formatData = (data) => ({
  ...data,
  categoryId: parseInt(data.categoryId ? data.categoryId : 0),
  price: parseFloat(data.price ? data.price : 0.0),
  quantity: parseInt(data.quantity ? data.quantity : 0),
  discount: parseFloat(data.discount ? data.discount : 0.0),
  gst: parseFloat(data.gst ? data.gst : 0.0),
});

//Get
export const fetchAll = () => (dispatch) => {
  api
    .actions(url)
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

//Create
export const create = (data, onSuccess) => (dispatch) => {
  data = formatData(data);
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
  data = formatData(data);
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
