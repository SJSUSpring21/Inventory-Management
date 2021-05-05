import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import * as initialData from "../../components/initialData";
import CreatableSelect from "react-select/creatable";
import { Redirect, Navigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../..//components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddResourceView = () => {
  const classes = useStyles();
  // const locations = initialData.locations
  const types = initialData.types;
  const initialUnits = initialData.units;
  const [allOwners, setAllOwners] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([]);
  const handleLocationChange = (selectedLocation, values) => {
    if (selectedLocation == null) {
      values.location = "";
      return;
    }
    values.location = selectedLocation.value;
    setSelectedLocation(selectedLocation);
  };

  const [locations, setAllLocations] = useState([]);
  useEffect(() => {
    fetch("/api/getAllLocations", {})
      .then((res) => res.json())
      .then((result) => {
        var x = [];
        for (var i in result.locations) {
          x.push({
            label: result.locations[i].name,
            value: result.locations[i].name,
          });
        }
        setAllLocations(x);
      });
  }, []);
  useEffect(() => {
    fetch("/api/getAllPersons", {})
      .then((res) => res.json())
      .then((result) => {
        setAllOwners(result.persons);
      });
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f4f6f8",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "blue",
      },
      paddingTop: 5,
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      zIndex: 9999,
      // kill the gap
      marginTop: 0,
      background: "light blue",
    }),
    menuList: (base) => ({
      ...base,

      // kill the white space on first and last option
      padding: 10,
    }),
  };
  const user = localStorage.getItem("team5-token");
  return (
    <div>
      {!user && <Navigate to="/login"></Navigate>}
      <Page className={classes.root} title="Add Resource">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                fullName: "",
                nickName: "",
                type: "",
                location: "",
                owner: "",
                rows: [
                  {
                    SKU: "",
                    quantity: 0,
                    units: "",
                  },
                ],
              }}
              validationSchema={Yup.object().shape({
                fullName: Yup.string()
                  .max(255)
                  .required("Full name is required"),
                type: Yup.string()
                  .max(255)
                  .required("Type is required"),
                location: Yup.string()
                  .max(255)
                  .required("Location is required"),
                owner: Yup.string()
                  .max(255)
                  .required("Owner is required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  fetch("/api/addResource", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ values }),
                  })
                    .then((res) => {
                      if (res.ok) {
                        alert("Resource Successfully Added");
                      } else {
                        alert("There was an error, please try later");
                      }
                      setSubmitting(false);
                      resetForm({});
                    })
                    .catch(() => alert("There was a error, Please try again"));
                }, 1000);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <Box mb={1}> */}
                  <Typography color="textPrimary" variant="h2">
                    ADD RESOURCE
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                      <TextField
                        fullWidth
                        name="owner"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.owner}
                        variant="outlined"
                        margin="normal"
                      >
                        <option value="" label="select Owner" />
                        {allOwners.map((option) => (
                          <option
                            key={option.first_name}
                            value={option.first_name}
                          >
                            {option.first_name + "(" + option.role + ")"}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Box my={2}>
                        <RouterLink to="/app/addPerson">
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                          >
                            Add Person
                          </Button>
                        </RouterLink>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.fullName && errors.fullName)}
                        fullWidth
                        helperText={touched.fullName && errors.fullName}
                        label="Resource name"
                        margin="normal"
                        name="fullName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.nickName && errors.nickName)}
                        fullWidth
                        helperText={touched.nickName && errors.nickName}
                        label="Nick name"
                        margin="normal"
                        name="nickName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nickName}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <div style={{ paddingTop: 20 }}>
                    <FieldArray name="rows">
                      {({ insert, remove, push }) => (
                        <div className="container">
                          <div className="row clearfix">
                            <div className="col-md-12 column">
                              <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                              >
                                <thead>
                                  <tr>
                                    <th className="text-center"> # </th>
                                    <th className="text-center"> SKU </th>
                                    <th className="text-center"> Quantity </th>
                                    <th className="text-center"> Units </th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* <div> */}
                                  {values.rows.length > 0 &&
                                    values.rows.map((item, idx) => (
                                      <tr id="addr0" key={idx}>
                                        <td>{idx + 1}</td>
                                        <td style={{ width: "30%" }}>
                                          <TextField
                                            fullWidth
                                            // name="resource"
                                            name={`rows[${idx}].SKU`}
                                            size="small"
                                            // onChange={handleChange}
                                            onChange={(e) => {
                                              handleChange(e);
                                              // handleChangeInAddResource(values.rows,idx)
                                            }}
                                            required
                                            SelectProps={{ native: true }}
                                            // value={values.resource}
                                            value={values.rows[idx].SKU}
                                            variant="outlined"
                                            margin="normal"
                                          >
                                            <option
                                              value=""
                                              label="select SKU"
                                            />
                                          </TextField>
                                        </td>
                                        <td style={{ width: "40%" }}>
                                          <TextField
                                            // error={ Boolean(touched.rows[0].quantity )}
                                            fullWidth
                                            // helperText={ touched.rows && errors.rows}
                                            label="Starting Quantity"
                                            type="number"
                                            size="small"
                                            margin="normal"
                                            name={`rows[${idx}].quantity`}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                              handleChange(e);
                                            }}
                                            value={values.rows[idx].quantity}
                                            variant="outlined"
                                          />
                                        </td>
                                        <td style={{ width: "40%" }}>
                                          <TextField
                                            fullWidth
                                            name={`rows[${idx}].units`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            size="small"
                                            select
                                            SelectProps={{ native: true }}
                                            value={values.rows[idx].units}
                                            variant="outlined"
                                            label="Select Units"
                                            margin="normal"
                                          >
                                            <option value="" />
                                            {initialUnits.map((option) => (
                                              <option
                                                key={option.label}
                                                value={option.label}
                                              >
                                                {option.label}
                                              </option>
                                            ))}
                                          </TextField>
                                        </td>
                                        <td>
                                          <Button
                                            // className="btn btn-outline-danger btn-sm"
                                            className="secondary"
                                            onClick={() => remove(idx)}
                                            formNoValidate
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                          >
                                            remove
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  {/* </div> */}
                                </tbody>
                              </table>
                              <Button
                                type="button"
                                onClick={() =>
                                  push({ SKU: "", quantity: "", units: "" })
                                }
                                className="secondary"
                                formNoValidate
                                color="primary"
                                variant="contained"
                                size="small"
                              >
                                Add Resource
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <br />
                  <br />
                  <CreatableSelect
                    name="To Location"
                    onChange={(selectedOption) => {
                      handleLocationChange(selectedOption, values);
                      console.log("values", values.location);
                      handleChange("location");
                    }}
                    isClearable
                    SelectProps={{ native: true }}
                    options={locations}
                    required
                    defaultValue={{
                      label: "To Location",
                      value: values.location,
                    }}
                    variant="outlined"
                    margin="normal"
                    styles={customStyles}
                  />

                  <TextField
                    fullWidth
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.type}
                    variant="outlined"
                    margin="normal"
                    label="Select Type"
                  >
                    <option value="" />
                    {types.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>

                  <Box my={2}>
                    <Button
                      color="primary"
                      // disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    </div>
  );
};

export default AddResourceView;
