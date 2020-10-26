import React, { useState } from "react";
import { TablePagination } from "@material-ui/core";

const Common = (initialFieldValues, data) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, product.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
  };
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      //count={product.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  const recordAfterPaging = () => {
    return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    TblPagination,
    recordAfterPaging,
    page,
    rowsPerPage,
  };
};

export default Common;
