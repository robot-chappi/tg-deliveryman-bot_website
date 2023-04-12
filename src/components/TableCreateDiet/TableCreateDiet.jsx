import React, { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Creating styles
const useStyles = makeStyles({
  root: {
    // "& > *": {
    //   borderBottom: "unset",
    // },
  },
  table: {
    minWidth: 650
  },
  snackbar: {
    bottom: "104px",
  },
});

// rgb(190 24 93 / var(--tw-bg-opacity));

function TableCreateDiet() {
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    { day: "Понедельник", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Вторник", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Среда", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Четверг", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Пятница", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Суббота", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
    { day: "Воскресенье", breakfast: {id: null, title: ""}, launch: {id: null, title: ""}, dinner: {id: null, title: ""}, snack: {id: null, title: ""} },
  ]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  // const [disable, setDisable] = React.useState(true);
  // const [showConfirm, setShowConfirm] = React.useState(false);


  // let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  // const handleAdd = () => {
  //
  //   setRows([
  //     ...rows,
  //     {
  //       day: days[rows.length - 1], breakfast: "",
  //       launch: "", dinner: "", snack: ""
  //     },
  //   ]);
  //   setEdit(true);
  // };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    console.log(321312)
    setEdit(!isEdit);
    setRows(rows);
    console.log("сохранены : ", rows);
    // setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    // setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  // Showing delete confirmation to users
  // const handleConfirm = () => {
  //   setShowConfirm(true);
  // };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  // const handleRemoveClick = (i) => {
  //   const list = [...rows];
  //   list.splice(i, 1);
  //   setRows(list);
  //   setShowConfirm(false);
  // };

  // Handle the case of delete confirmation
  // where user click no
  // const handleNo = () => {
  //   setShowConfirm(false);
  // };

  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Сохранено успешно!
        </Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div>
            {isEdit ? (
              <div className={'flex item-center gap-2 p-2'}>
                {rows.length !== 0 && (
                  <>
                    <button onClick={handleSave}>
                      <label className={'flex item-center gap-1 p-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'}>
                      <DoneIcon />
                        Сохранить
                      </label>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className={'flex item-center gap-2 p-2'}>
                <>
                  <button onClick={handleEdit}>
                    <label className={'flex item-center gap-1 p-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'}>
                    <CreateIcon />
                      Редактировать
                    </label>
                  </button>
                </>
              </div>
            )}
          </div>
        </div>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell><p className={'text-sm font-medium text-white'}>День</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Завтрак</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Обед</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Ужин</p></TableCell>
              <TableCell><p className={'text-sm font-medium text-white'}>Перекус</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                  <TableRow>
                    {isEdit ? (
                      <>
                        <TableCell scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.day}</p>
                        </TableCell>
                        <TableCell scope="row">
                          <select
                            name="breakfast"
                            value={row.breakfast.title}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell>
                        <TableCell scope="row">
                          <select
                            name="launch"
                            value={row.launch.title}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell>
                        <TableCell scope="row">
                          <select
                            name="dinner"
                            value={row.dinner.title}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell>
                        <TableCell scope="row">
                          <select
                            name="snack"
                            value={row.snack.title}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.day}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.breakfast.id ? row.breakfast.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.launch.id ? row.launch.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.dinner.id ? row.dinner.title : 'Нет'}</p>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <p className={'text-sm font-medium text-white'}>{row.snack.id ? row.snack.title : 'Нет'}</p>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}

export default TableCreateDiet;
