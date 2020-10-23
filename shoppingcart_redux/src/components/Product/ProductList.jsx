import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "actions/productList";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import ProductForm from "./ProductForm";
import { useToasts } from "react-toast-notifications";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const ProductList = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    props.fetchAllProducts();
  }, []);

  const onDelete = (productId) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteProduct(productId, () =>
        addToast("Deleted Successfully", { appearance: "info" })
      );
  };
  return (
    <div className="border">
      <div className="grid-demo">
        <div className="ant-row demo-row">
          <div className="ant-col-11 demo-col demo-col-1">
            <ProductForm {...{ currentId, setCurrentId }} />
          </div>
          <div className="ant-col-13 demo-col demo-col-3">
            <h1 className="text-center">List of Products</h1>
            <hr></hr>
            <TableContainer>
              <Table>
                <TableHead className="tHeader">
                  <TableRow>
                    <TableCell className="text-light">Product</TableCell>
                    <TableCell className="text-light">Category</TableCell>
                    <TableCell className="text-light">Price</TableCell>
                    <TableCell className="text-light">Quantity</TableCell>
                    <TableCell className="text-light">Discount</TableCell>
                    <TableCell className="text-light">GST</TableCell>
                    <TableCell className="text-light">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.products.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.productName}</TableCell>
                        <TableCell> {record.category?.categoryName}</TableCell>
                        <TableCell>{record.price}</TableCell>
                        <TableCell>{record.quantity}</TableCell>
                        <TableCell>{record.discount}</TableCell>
                        <TableCell>{record.gst}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button
                              onClick={() => setCurrentId(record.productId)}
                            >
                              <EditOutlined style={{ color: "blue" }} />
                            </Button>
                            <Button onClick={() => onDelete(record.productId)}>
                              <DeleteOutlined style={{ color: "red" }} />
                            </Button>
                          </ButtonGroup>
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
  products: state.productList.list,
});

const mapActionToProps = {
  fetchAllProducts: actions.fetchAll,
  deleteProduct: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);
