import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import CreatableSelect from "react-select/creatable";
import * as initialData from "../../components/initialData";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import Page from "../../components/Page";
import { Redirect, Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddPersonView = () => {
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [jobtitles, setJobTitles] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([]);
  const handleLocationChange = (selectedLocation, values) => {
    if (selectedLocation == null) {
      values.location = "";
      return;
    }

    values.location = selectedLocation.value;
    console.log(selectedLocation);
    setSelectedLocation(selectedLocation);
  };

  const [selectedJobTitle, setSelectedJobTitle] = useState([]);
  const handleRoleChange = (selectedJobTitle, values) => {
    if (selectedJobTitle == null) {
      values.jobTitle = "";
      return;
    }
    values.jobTitle = selectedJobTitle.value;
    console.log(selectedJobTitle);
    setSelectedJobTitle(selectedJobTitle);
  };

  const [selectedOrganizations, setSelectedOrganization] = useState([]);
  const handleOrganizationChange = (selectedOrganizations, values) => {
    if (selectedOrganizations == null) {
      values.organization = "";
      return;
    }
    values.organization = selectedOrganizations.value;
    setSelectedOrganization(selectedOrganizations);
  };

  useEffect(() => {
    fetch("/api/getRoles", {})
      .then((res) => res.json())
      .then((result) => {
        var x = [];
        for (var i in result.roles) {
          x.push({ label: result.roles[i].role, value: result.roles[i].role });
        }
        setJobTitles(x);
      });
  }, []);

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
        setLocations(x);
      });
  }, [locations]);

  useEffect(() => {
    fetch("/api/getOrganizations", {})
      .then((res) => res.json())
      .then((result) => {
        var x = [];
        for (var i in result.orgs) {
          x.push({ label: result.orgs[i].name, value: result.orgs[i].name });
        }
        setOrganizations(x);
      });
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f4f6f8",
      height: 45,
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
      <Page className={classes.root} title="Add Person">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                location: "",
                phone: "",
                address: "",
                organization: "",
                jobTitle: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                firstName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lastName: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                location: Yup.string()
                  .max(255)
                  .required("Location is required"),
                phone: Yup.string().matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  "Phone number is not valid"
                ),
                address: Yup.string()
                  .max(255)
                  .required("Address is required"),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
                organization: Yup.string()
                  .max(255)
                  .required("Organization is required"),
                jobTitle: Yup.string()
                  .max(255)
                  .required("Address is required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("In on Subbmit");
                setTimeout(() => {
                  fetch("/api/addPerson", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ values }),
                  })
                    .then((res) => {
                      if (res.ok) {
                        alert("Person Successfully Added");
                      } else {
                        alert("There was an error, please try later");
                      }
                      // setSubmitting(false);
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
                handleReset,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <Box mb={1}> */}
                  <Typography color="textPrimary" variant="h2">
                    ADD PERSON
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        name="phone"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.phone}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <CreatableSelect
                    name="Location"
                    label="Location"
                    onChange={(selectedOption) => {
                      handleLocationChange(selectedOption, values);
                      handleChange("location");
                    }}
                    isClearable
                    SelectProps={{ native: true }}
                    options={locations}
                    required
                    defaultValue={{
                      label: "Location",
                      value: values.location,
                    }}
                    variant="outlined"
                    margin="normal"
                    styles={customStyles}
                  />
                  <br />
                  <CreatableSelect
                    name="organization"
                    label="Organization"
                    onChange={(selectedOption) => {
                      handleOrganizationChange(selectedOption, values);
                      handleChange("organization");
                    }}
                    isClearable
                    SelectProps={{ native: true }}
                    options={organizations}
                    required
                    defaultValue={{
                      label: "Organizations",
                      value: values.organization,
                    }}
                    variant="outlined"
                    margin="normal"
                    styles={customStyles}
                  />
                  <br />
                  <CreatableSelect
                    name="jobTitle"
                    label="Job Title"
                    onChange={(selectedOption) => {
                      handleRoleChange(selectedOption, values);
                      handleChange("jobTitle");
                    }}
                    isClearable
                    SelectProps={{ native: true }}
                    options={jobtitles}
                    required
                    defaultValue={{
                      label: "Job title",
                      value: values.jobTitle,
                    }}
                    variant="outlined"
                    margin="normal"
                    styles={customStyles}
                  />

                  {/* <TextField
                  fullWidth
                  name="jobTitle"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.jobTitle}
                  variant="outlined"
                  label = "Select Jobtitle"
                  margin = "normal"
                >
                  <option  value= ""/>
                  {jobtitles.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> */}

                  {/* <TextField
                  fullWidth
                  label="Select Organization"
                  name="organization"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" />
                  {organizations.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> */}

                  <TextField
                    multiline
                    rows={3}
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Address"
                    margin="normal"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
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

export default AddPersonView;
