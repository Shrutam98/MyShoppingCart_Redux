import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, InputNumber } from "antd";
import * as actions from "actions/productList";
import * as actionsCategory from "actions/categoryList";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

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
  const [valuesForm, setValuesForm] = useState(initialFieldValues);
  const [categoriesData, setCategoriesData] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onReset = () => {
    form.resetFields();
    props.setCurrentId(0);
  };
  useEffect(() => {
    const data = props.fetchAllCategories();
    setCategoriesData(data);
    console.log(categoriesData);
  }, []);
  const onFinish = (values) => {
    debugger;
    setValuesForm(values);
    console.log("Success:", values);
    if (props.currentId == 0) {
      props.createProduct(values);
      onReset();
    } else props.updateProduct(props.currentId, values);
    onReset();
  };

  return (
    <div>
      <div>
        <h1 className="text-center">Product Form</h1>
        <hr />
        <Form
          className="mt-4"
          {...layout}
          form={form}
          name="control-hooks"
          initialValues={initialFieldValues}
          onFinish={onFinish}
        >
          <Form.Item
            name="productName"
            label="Product"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item name="categoryId" label="Category">
            <Select placeholder="----Select Category---" size="large">
              {props.categories.map((item, index) => (
                <Option key={index} value={item.categoryId}>
                  {item.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gst"
            label="Gst"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button
                size="large"
                style={{ width: "100%" }}
                icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
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
  fetchAllCategories: actionsCategory.fetchAll,
  createProduct: actions.create,
  updateProduct: actions.update,
};
export default connect(mapStateToProps, mapActionToProps)(ProductForm);
