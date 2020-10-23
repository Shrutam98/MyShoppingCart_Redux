import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "actions/categoryList";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "components/Category/CategoryForm";
import { useToasts } from "react-toast-notifications";

const CategoryList = (props) => {
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllCategories();
  }, []);
  const onDelete = (categoryId) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteCategory(categoryId, () =>
        addToast("Category Deleted Successfully", { appearance: "info" })
      );
  };
  return (
    <div className="border">
      <div className="grid-demo">
        <div className="ant-row demo-row">
          <div className="ant-col-12 demo-col demo-col-1">
            <CategoryForm {...{ currentId, setCurrentId }} />
          </div>
          <div className="ant-col-10 demo-col demo-col-3">
            <h2 className="text-left ml-5">Category List</h2>
            <hr />
            <TableContainer>
              <Table className="border">
                <TableHead className="tHeader">
                  <TableRow>
                    <TableCell className="text-light">Category</TableCell>
                    <TableCell className="text-light">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.categories.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.categoryName}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setCurrentId(record.categoryId)}
                          >
                            <EditOutlined style={{ color: "blue" }} />
                          </Button>
                          <Button onClick={() => onDelete(record.categoryId)}>
                            <DeleteOutlined style={{ color: "red" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categoryList.list,
});

const mapActionToProps = {
  fetchAllCategories: actions.fetchAll,
  deleteCategory: actions.Delete,
};
export default connect(mapStateToProps, mapActionToProps)(CategoryList);
