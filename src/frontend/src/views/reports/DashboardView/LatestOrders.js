import React, { useState, useEffect, forwardRef } from "react";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Search from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import MaterialTable from "material-table";
import { Navigate } from "react-router-dom";
import Clear from "@material-ui/icons/Clear";
import PropTypes from "prop-types";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { url } from "../../../prodConfig";

const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => <div />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
};

const LatestOrders = ({ className, ...rest }) => {
  const [inwardOutwardData, setInwardOutwardData] = useState([]);
  var today = new Date().toISOString().slice(0, 10);
  console.log(today);
  const [selectedDate, setSelectedDate] = React.useState(new Date(today));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  var columns_array = [];
  useEffect(() => {
    fetch(url + "/api/getInwardOutward", {})
      .then((res) => res.json())
      .then((result) => {
        console.log("HAHAHAHHAHAHAH");
        setInwardOutwardData(result.inwardOutward);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (inwardOutwardData != null) {
    if (inwardOutwardData.length > 0) {
      columns_array = [];
      console.log(inwardOutwardData);
      var keys1,
        keys2 = null,
        keys3 = null;
      for (var i = 0; i < inwardOutwardData.length; i++) {
        if (keys1 != null && keys2 !== null && keys3 == null) {
          break;
        } else if (inwardOutwardData[i].type === "Inward") {
          keys1 = Object.keys(inwardOutwardData[i]);
        } else if (inwardOutwardData[i].type === "Outward") {
          keys2 = Object.keys(inwardOutwardData[i]);
        } else {
          keys3 = Object.keys(inwardOutwardData[i]);
        }
      }
      if (keys1 == null) {
        keys1 = [];
      }
      for (i in keys2) {
        if (keys1 != null && keys1.includes(keys2[i])) {
          continue;
        } else {
          keys1.push(keys2[i]);
        }
      }
      for (i in keys3) {
        if (keys1 != null && keys1.includes(keys3[i])) {
          continue;
        } else {
          keys1.push(keys3[i]);
        }
      }
      keys1.map((x) => {
        columns_array.push({ title: x, field: x });
      });
    }
  }

  const user = localStorage.getItem("team5-token");
  return (
    <div className="dashBoard">
      {!user && <Navigate to="/login"></Navigate>}
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            id="date-picker-inline"
            label="From Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            id="date-picker-inline"
            label="To Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <Button color="primary" size="large" type="submit" variant="outlined">
            FILTER
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
      <MaterialTable
        title="Inward/Outward"
        columns={columns_array}
        data={inwardOutwardData.map((item) => Object.assign({}, item))}
        icons={tableIcons}
        options={{
          filtering: true,
          sorting: true,
          pageSize: 5,
          paginationType: "stepped",
          rowStyle: (rowData) => {
            if (rowData.type === "Inward") {
              return { backgroundColor: "#ddfada ", maxWidth: "px" };
            } else if (rowData.type === "Outward") {
              return { backgroundColor: "#ffe2e2", maxWidth: "5px" };
            }
          },
        }}
      />
    </div>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default LatestOrders;
