import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "actions/categoryList";
import { useToasts } from "react-toast-notifications";
import Common from "components/Shared/Common";

const initialFieldValues = {
  categoryId: 0,
  categoryName: "",
};
const CategoryForm = (props) => {
  const { addToast } = useToasts();
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...values,
        ...props.categories.find((x) => x.categoryId === props.currentId),
      });
    }
  }, [props.currentId]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  //Validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("categoryName" in fieldValues)
      temp.categoryName = fieldValues.categoryName
        ? ""
        : "This field is Required";
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
  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    props.setCurrentId(0);
    setErrors({});
  };

  const handleSubmit = () => {
    debugger;
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
      if (props.currentId === 0) {
        props.createCategory(
          values,
          onSuccess,
          addToast("Category Added Successfully", { appearance: "success" })
        );
      } else {
        props.updateCategory(
          props.currentId,
          values,
          onSuccess,
          addToast("Category Updated Successfully", { appearance: "success" })
        );
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center">Category Form</h2>
        <hr />
        <Form
          {...layout}
          onFinish={handleSubmit}
          autoComplete="off"
          className="mt-4"
        >
          <Form.Item label="Category">
            <Input
              name="categoryName"
              size="large"
              value={values.categoryName}
              onChange={handleInputChange}
              className={!errors.categoryName ? "" : "border-danger"}
            />
            {!errors.categoryName ? (
              ""
            ) : (
              <span className="text-danger">{errors.categoryName}</span>
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
  categories: state.categoryList.list,
});

const mapActionToProps = {
  createCategory: actions.create,
  updateCategory: actions.update,
};
export default connect(mapStateToProps, mapActionToProps)(CategoryForm);
