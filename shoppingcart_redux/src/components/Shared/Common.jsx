import React, { useState, useEffect } from "react";
import { TablePagination } from "@material-ui/core";

const Common = (initialFieldValues, records) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
    />
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    // resetForm,
    TablePagination,
  };
};

export default Common;
