import React, { useState, useEffect, forwardRef } from "react";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Edit from "@material-ui/icons/Edit";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Search from "@material-ui/icons/Search";
import FilterList from "@material-ui/icons/FilterList";
import MaterialTable from "material-table";
import Clear from "@material-ui/icons/Clear";
import PropTypes from "prop-types";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Check from "@material-ui/icons/Check";
import Input from "@material-ui/core/Input";
import { Redirect, Navigate } from "react-router-dom";
import { url } from "../../../prodConfig";

const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
};

const BalanceSheetView = ({ className, ...rest }) => {
  const [allResources, setAllResources] = useState([]);
  const [columns_array, setColsArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [resJson, setResJson] = useState([]);
  useEffect(() => {
    fetch(url + "/api/getFullResources", {})
      .then((res) => res.json())
      .then((result) => {
        console.log("result = ", columns_array);
        if (result.resources[0] != null) {
          var cols = Object.keys(result.resources[0]);
          cols = cols.filter(
            (item) =>
              item !== "nick_name" &&
              item !== "createdAt" &&
              item !== "identifier" &&
              item !== "type"
          );

          cols.map((x) => {
            if (x === "threshold_quantity") {
              columns_array.push({
                title: x,
                field: x,
                editComponent: (props) => (
                  <Input
                    defaultValue={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    type="number"
                  />
                ),
                customFilterAndSearch: (term, rowData) =>
                  rowData.available_quantity < rowData.threshold_quantity,
              });
            } else {
              columns_array.push({ title: x, field: x });
            }
          });
          console.log("Columns Array", cols);
          setAllResources(result.resources);
        }
      });
  }, [refresh, setRefresh]);
  const user = localStorage.getItem("team5-token");
  return (
    <div className="dashBoard">
      {!user && <Navigate to="/login"></Navigate>}
      <hr />
      <MaterialTable
        title="Balance Sheet"
        columns={columns_array.map((c) => ({ ...c, tableData: undefined }))}
        data={allResources.map((item) => Object.assign({}, item))}
        icons={tableIcons}
        localization={{
          header: {
            actions: "",
          },
        }}
        options={{
          filtering: true,
          sorting: true,
          pageSize: 5,
          paginationType: "stepped",
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.threshold_quantity > rowData.available_quantity
                ? "#ffe2e2"
                : "#ddfada",
          }),
        }}
        editable={{
          isDeleteHidden: (allResources) => allResources.name !== "y",
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                /* setData([...data, newData]); */
                const updated_resources = [];
                console.log("newData", changes);
                for (var i in changes) {
                  // await setResJson(resJson => [...resJson, {'identifier' : changes[i].newData.identifier, 'threshold_quantity' :changes[i].newData.threshold_quantity }])
                  updated_resources.push({
                    identifier: changes[i].newData.identifier,
                    threshold_quantity: changes[i].newData.threshold_quantity,
                  });
                }
                setTimeout(() => {
                  fetch(url + "/api/updateResourceThreshold", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ updated_resources }),
                  })
                    .then((res) => {
                      if (res.ok) {
                        alert("Updated Successfully ");
                        // setRefresh(refresh => !refresh);
                        window.location.reload(false);
                      } else {
                        alert("There was an error, please try later");
                      }
                    })
                    .catch(() => alert("There was a error, Please try again"));
                }, 100);
                // })
                resolve();
              }, 100);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

BalanceSheetView.propTypes = {
  className: PropTypes.string,
};

export default BalanceSheetView;
