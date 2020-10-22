import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { connect } from "react-redux";
import * as actions from "actions/categoryList";

const initialFieldValues = {
  categoryName: "",
};
const CategoryForm = (props) => {
  const [valuesForm, setValuesForm] = useState(initialFieldValues);

  useEffect(() => {
    debugger;
    if (props.currentId != 0) {
      setValuesForm({
        ...props.categories.find((x) => x.categoryId == props.currentId),
      });
    }
  }, [props.currentId]);

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onReset = () => {
    form.resetFields();
    props.setCurrentId(0);
  };
  const onFinish = (values) => {
    debugger;
    setValuesForm(values);
    console.log("Success:", values);
    if (props.currentId == 0) {
      props.createCategory(values);
      onReset();
    } else props.updateCategory(props.currentId, values);
    onReset();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div>
        <h2 className="text-center">Category Form</h2>
        <hr />
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          initialValues={initialFieldValues}
          onFinish={onFinish}
          className="mt-4"
        >
          <Form.Item
            name="categoryName"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset} className="ml-2">
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
