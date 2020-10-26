import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "actions/productList";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
  TablePagination,
} from "@material-ui/core";
import ProductForm from "./ProductForm";
import { useToasts } from "react-toast-notifications";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProductList = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);
  const data = props.products;
  useEffect(() => {
    props.fetchAllProducts();
  }, []);

  const onDelete = (productId) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteProduct(productId, () =>
        addToast("Product Deleted Successfully", { appearance: "info" })
      );
  };
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [dense, setDense] = React.useState(false);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={data.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  const recordAfterPaging = () => {
    return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
                  {recordAfterPaging().map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.productName}</TableCell>
                        <TableCell> {record.category?.categoryName}</TableCell>
                        <TableCell>{record.price}</TableCell>
                        <TableCell>{record.quantity}</TableCell>
                        <TableCell>{record.discount}</TableCell>
                        <TableCell>{record.gst}</TableCell>
                        <TableCell>{record.image}</TableCell>
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
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TblPagination />
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
