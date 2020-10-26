import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import * as actions from "actions/productList";
import * as actionsCategory from "actions/categoryList";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Common from "components/Shared/Common";

const initialFieldValues = {
  productName: "",
  categoryId: "",
  price: "",
  quantity: "",
  discount: "",
  gst: "",
  categoryName: "",
  image: "",
  imageFile: null,
};
const ProductForm = (props) => {
  const { addToast } = useToasts();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  useEffect(() => {
    props.fetchAllCategories();
  }, [props.products]);

  //Validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("productName" in fieldValues)
      temp.productName = fieldValues.productName
        ? ""
        : "This field is Required";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is Required";
    if ("categoryId" in fieldValues)
      temp.categoryId = fieldValues.categoryId ? "" : "This field is Required";
    if ("image" in fieldValues)
      temp.image = fieldValues.image ? "" : "This field is Required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange } = Common(
    initialFieldValues,
    validate
  );
  function handleOnChange(value, event) {
    let categoryId = value;
    setValues({
      ...values,
      categoryId: categoryId,
    });
  }
  const saveImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      console.log(e);
      setValues({
        ...values,
        imageFile: imageFile,
      });
    } else {
      setValues({
        ...values,
        imageFile: null,
      });
    }
  };
  const data = props.products.find((x) => x.productId === props.currentId);
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...values,
        ...data,
      });
      setErrors({});
    }
  }, [props.currentId]);
  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    props.setCurrentId(0);
    setErrors({});
  };
  const dataForm = new FormData();
  dataForm.append("productId", props.currentId);
  dataForm.append("productName", values.productName);
  dataForm.append("categoryId", values.categoryId);
  dataForm.append("price", values.price);
  dataForm.append("quantity", values.quantity);
  dataForm.append("discount", values.discount);
  dataForm.append("gst", values.gst);
  dataForm.append("image", values.image);
  dataForm.append("imageFile", values.imageFile);
  const handleSubmit = () => {
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
      if (props.currentId === 0) {
        props.createProduct(
          dataForm,
          onSuccess,
          addToast("Product Added Successfully", { appearance: "success" })
        );
        props.products();
      } else {
        props.updateProduct(
          props.currentId,
          dataForm,
          onSuccess,
          addToast("Product Updated Successfully", { appearance: "success" })
        );
        props.fetchAllProducts();
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center">Product Form</h1>
        <hr />
        <Form
          className="mt-4"
          {...layout}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item label="Product">
            <Input
              name="productName"
              size="large"
              value={values.productName}
              onChange={handleInputChange}
              className={!errors.productName ? "" : "border-danger"}
            />
            {!errors.productName ? (
              ""
            ) : (
              <span className="text-danger">{errors.productName}</span>
            )}
          </Form.Item>
          <Form.Item label="Category">
            <Select
              name="categoryId"
              size="large"
              value={values.categoryId}
              onChange={(value, event) => handleOnChange(value, event)}
              className={!errors.categoryId ? "" : "border-danger"}
            >
              <Option value="">----Select Category----</Option>
              {props.categories.map((item, index) => (
                <Option key={index} value={item.categoryId}>
                  {item.categoryName}
                </Option>
              ))}
            </Select>
            {!errors.categoryId ? (
              ""
            ) : (
              <span className="text-danger">{errors.categoryId}</span>
            )}
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="price"
              value={values.price}
              onChange={handleInputChange}
              className={!errors.price ? "" : "border-danger"}
              size="large"
              style={{ width: "100%" }}
            />
            {!errors.price ? (
              ""
            ) : (
              <span className="text-danger">{errors.price}</span>
            )}
          </Form.Item>
          <Form.Item label="Quantity">
            <Input
              name="quantity"
              value={values.quantity}
              onChange={handleInputChange}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Discount">
            <Input
              name="discount"
              value={values.discount}
              onChange={handleInputChange}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Gst">
            <Input
              name="gst"
              value={values.gst}
              onChange={handleInputChange}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Input
              name="image"
              type="file"
              id="image-uploader"
              className={!errors.image ? "" : "border-danger"}
              onChange={saveImage}
            />
            {!errors.image ? (
              ""
            ) : (
              <span className="text-danger">{errors.image}</span>
            )}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={resetForm} className="ml-2">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.productList.list,
  categories: state.categoryList.list,
});

const mapActionToProps = {
  fetchAllCategories: actionsCategory.fetchAll,
  fetchAllProducts: actions.fetchAll,
  createProduct: actions.create,
  updateProduct: actions.update,
};
export default connect(mapStateToProps, mapActionToProps)(ProductForm);
