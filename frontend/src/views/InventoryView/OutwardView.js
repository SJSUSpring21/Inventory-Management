import React,{useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, useField, FieldArray } from 'formik';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import * as initialData from '../../components/initialData'
import moment from 'moment'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OutwardView = () => {
  const classes = useStyles();
  var today = new Date().toISOString().slice(0, 10)
  const [allResources, setAllResources] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [selectedResource, setSelectedResource] = useState([]);
  const handleResourceChange = (selectedResource, values, idx) => {
    if(selectedResource == null) {
      values.rows[idx].resource = '';
      return;
    };
    values.rows[idx].resource = selectedResource.value;
    setSelectedResource(selectedResource);
  };
  
  // const locations = initialData.locations
  const handleLocationChange = (selectedLocation, values, idx) => {
    if(selectedLocation == null) {
      values.rows[idx].toLocation = '';
      return;
    };
    values.rows[idx].toLocation = selectedLocation.value;
    console.log(selectedLocation);
    setSelectedLocation(selectedLocation);
  };
  
  const [locations, setAllLocations] = useState([]);
  useEffect(()=>{
    fetch('/api/getAllLocations',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
        for(var i in result.locations){
            x.push({"label": result.locations[i].name, "value" : result.locations[i].name})
        }
        setAllLocations(x)
    })
  },[locations])

  // useEffect(()=>{
  // fetch('/api/getFullResources',{
  // }).then(res=>res.json())
  // .then(result=>{
  //     setAllResources(result.resources)
  // })
  // },[]);
  useEffect(()=>{
    fetch('/api/getFullResources',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
      console.log("JRRRRRRRRR",JSON.stringify(result))
        for(var i in result.resources){
            x.push({"label": result.resources[i].full_name + "-"+result.resources[i].sku +"("+result.resources[i].units+")", "value":  result.resources[i].full_name +"-"+ result.resources[i].sku})
        }
        setAllResources(x)
    })
  },[])
  useEffect(()=>{
  fetch('/api/getAllPersons',{
  }).then(res=>res.json())
  .then(result=>{
      setAllPersons(result.persons)
  })
  },[]);
 
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f4f6f8",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "blue"
      },
      paddingTop : 5
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      zIndex : 9999,
      // kill the gap
      marginTop: 0,
      background: "light blue",
    }),
    menuList: base => ({
      ...base,
      
      // kill the white space on first and last option
      padding: 10
    })
  };


  
  return (
    <Page
      className={classes.root}
      title="Add Outward"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              requestedBy: '',
              transportedBy: '',
              contractor: '',
              date: today,
              vehicleNo: '',
              rows: [{
                resource: '',
                toLocation: '',
                quantity: '',
              },]
            }}
            validationSchema={
              Yup.object().shape({
                requestedBy: Yup.string().max(255).required('Requested By is required'),
                transportedBy: Yup.string().max(255).required('Transported By is required'),
                contractor: Yup.string().max(255).required('Contractor are required'),
                rows: Yup.array()
                  .of(
                    Yup.object().shape({
                      resource: Yup.string().max(255).required('resource is required'),
                      quantity: Yup.string().max(255).required('quantity is required'),
                      toLocation: Yup.string().max(255).required('Location is required'),
                    })
                  )
              })
            }
            
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              console.log("values = ", values);
              setTimeout(() => {
                fetch('/api/addOutward', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values}) 
                })
                .then((res) => {
                  console.log("res - ", res);
                  if(res.ok){
                    res.text().then(x => alert(x));
                  }else{
                    alert("There was an errror");
                  }
                  
                  setSubmitting(false);
                  resetForm({})
                  
                })
                .catch(() => alert("There was a error, Please try again"))
              }, 1000);
              console.log("values = " , values)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                {/* <Box mb={1}> */}
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    OUTWARD
                  </Typography>
                  <Grid
                  container
                  spacing={3}
                ><Grid
                item
                md={6}
                xs={12}
              >
              <RouterLink to = "/app/addResource">
              <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                variant="contained"
              >
                ADD RESOURCE
              </Button>
            </Box>
            </RouterLink>
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
              >
            <RouterLink to = "/app/addPerson">
            <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                variant="contained"
              >
                ADD PERSON
              </Button>
            </Box>
            </RouterLink>
            </Grid>
            </Grid>
              <Grid
              container
              spacing={3}
                >
                <Grid
                    item
                    md={4}
                    xs={12}
                  >
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                  >
               <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText= {touched.Date && errors.Date}
                      type = "date"
                      margin="normal"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date}
                      variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                  >

                </Grid>
                </Grid>
                <TextField
                      error={Boolean(touched.vehicleNo && errors.vehicleNo)}
                      fullWidth
                      helperText={touched.vehicleNo && errors.vehicleNo}
                      margin="normal"
                      label="vehicle number"
                      name="vehicleNo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.vehicleNo}
                      variant="outlined"
                    />
              
                <TextField
                  fullWidth
                  name="transportedBy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.transportedBy}
                  variant="outlined"
                  margin = "normal"
                  label = "Transported By"
                >
                  <option  value= "" />
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name+"("+option.role+")"}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="contractor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.contractor}
                  variant="outlined"
                  margin = "normal"
                  label = "Contractor"
                >
                  <option  value= "" />
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name+"("+option.role+")"}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="requestedBy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.requestedBy}
                  variant="outlined"
                  margin = "normal"
                  label = "Requested By"
                >
                  <option  value= "" />
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name+"("+option.role+")"}
                    </option>
                  ))}
                </TextField>
            
                <div style = {{paddingTop: 20}}>
                <FieldArray name = "rows">
                  {({insert, remove, push}) => (
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
                                <th className="text-center"> Resource </th>
                                <th className="text-center"> Quantity </th>
                                <th className="text-center"> Location </th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                                  {/* <div> */}
                                    {values.rows.length > 0 && values.rows.map((item, idx) => (
                                      <tr id="addr0" key={idx}>
                                        <td>{idx+1}</td>
                                        <td style={{width: "55%"}}>
                                        <Select
                                         name={`rows[${idx}].resource`}
                                         fullWidth
                                         onChange={selectedOption => {
                                           handleResourceChange(selectedOption,values, idx);
                                           handleChange("resource");
                                         }}
                                         isClearable
                                         SelectProps={{ native: true}}
                                         options = {allResources}
                                         required
                                         defaultValue={{ label: "Resource", value: '' }}
                                         variant="outlined"
                                         margin = "normal"
                                         styles = {customStyles}
                                          />
                                          
                                         
                                          
                                        </td>
                                        <td style={{width: "20%"}}>
                                      
                                        <TextField
                                            // error={ Boolean(touched.rows[0].quantity )}
                                            fullWidth
                                            required
                                            // helperText={ touched.rows && errors.rows}
                                            
                                            type = "number"
                                            size = "small"
                                            margin="normal"
                                            name={`rows[${idx}].quantity`}
                                            onBlur={handleBlur}
                                            onChange={e => 
                                              {
                                              handleChange(e)
                                            }
                                          }
                                            value={values.rows[idx].quantity}
                                            variant="outlined"
                                          />
                                        </td>
                                        <td style = {{width: "35%"}}>
                                          <CreatableSelect
                                              name={`rows[${idx}].toLocation`}
                                              fullWidth
                                              onChange={selectedOption => {
                                                handleLocationChange(selectedOption,values, idx);
                                                handleChange("toLocation");
                                              }}
                                              isClearable
                                              SelectProps={{ native: true}}
                                              options = {locations}
                                              required
                                              defaultValue={{ label: "To Location", value: '' }}
                                              variant="outlined"
                                              margin = "normal"
                                              styles = {customStyles}
                                            />
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
                          type= "button"
                          
                          onClick={() => push({resource: '',toLocation: '',quantity: '' })}
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    SAVE
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default OutwardView;
