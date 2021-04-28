import React,{useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik , FieldArray} from 'formik';
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
import Select from 'react-select';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const InwardView = () => {
  const [selectedResource, setSelectedResource] = useState([]);
  const handleResourceChange = (selectedResource, values, idx) => {
    if(selectedResource == null) {
      values.rows[idx].resource = '';
      return;
    };
    values.rows[idx].resource = selectedResource.value;
    setSelectedResource(selectedResource);
  };
  const classes = useStyles();
  const [allResources, setAllResources] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  
  useEffect(()=>{
    fetch('/api/getFullResources',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
      console.log("JRRRRRRRRR",JSON.stringify(result))
        for(var i in result.resources){
         
            x.push({"label": result.resources[i].full_name + "-"+result.resources[i].sku + "("+result.resources[i].units+")","value" :result.resources[i].full_name + "-"+result.resources[i].sku})
        }
        setAllResources(x)
    })
  },[])
 
  useEffect(()=>{
    fetch('/api/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
        setAllPersons(result.persons);
    })
  },[])
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
      padding: 10,

    })
  };
  return (
    <Page
      className={classes.root}
      title="Add Inward"
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
              suppliedBy:'',
              sourcedBy: '',
              date: '',
              billNo: '',
              comments: '',
              rows: [{
                resource: '',
                price: '',
                quantity: '',
                GST:0
              },]
            }}
            validationSchema={
              Yup.object().shape({
                sourcedBy: Yup.string().max(255).required('Sourced By is required'),
                suppliedBy: Yup.string().max(255).required('Sourced By is required'),
                date: Yup.string().max(255).required('Date is required'),
                comments: Yup.string().max(255).required('Comments are required'),
                billNo: Yup.string().max(255).required('bill Number are required')
              })
            }
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              setTimeout(() => {
                fetch('/api/addInward', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values})
                })
                .then((res) => {
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
                    INWARD
                  </Typography>
                  <Grid
                  container
                  spacing={3}
                >
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                  <Box my={2}>
                  <RouterLink to = "/app/addResource">
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      ADD RESOURCE
                    </Button>
                  </RouterLink>
                </Box>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                <Box my={2}>
                <RouterLink to = "/app/addPerson">
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      ADD PERSON
                    </Button>
                  </RouterLink>
                </Box>
                </Grid>
                </Grid>


                <Grid
                container
                spacing={3}
                >
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      multiline
                      error={Boolean(touched.suppliedBy && errors.suppliedBy)}
                      fullWidth
                      helperText={touched.suppliedBy && errors.suppliedBy}
                      label="Supplied By"
                      margin="normal"
                      name="suppliedBy"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.suppliedBy}
                      variant="outlined"
                    />
             
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                     <TextField
                      fullWidth
                      name="sourcedBy"
                      label="Sourced By"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true}}
                      value={values.sourcedBy}
                      variant="outlined"
                      margin = "normal"
                    >
                      <option  value= ""/>
                      {allPersons.map((option) => (
                        <option
                          key={option.first_name}
                          value={option.first_name}
                        >
                          {option.first_name+"("+option.role+")"}
                        </option>
                      ))}
                </TextField>
                </Grid>
                </Grid>
                
               
                <Grid
                  container
                  spacing={3}
                >
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                <TextField
                  error={Boolean(touched.billNo && errors.billNo)}
                  fullWidth
                  helperText={touched.billNo && errors.billNo}
                  label="Invoice Number"
                  margin="normal"
                  name="billNo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.billNo}
                  variant="outlined"
                />
              </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      type = "date"
                      margin="normal"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date}
                      variant="outlined"
                    />
                </Grid>
                </Grid>
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
                                <th className="text-center"> Price </th>
                                <th className="text-center"> GST </th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                                  {/* <div> */}
                                    {values.rows.length > 0 && values.rows.map((item, idx) => (
                                      <tr id="addr0" key={idx}>
                                        <td>{idx+1}</td>
                                        <td style={{width: "30%"}}>
                                        <Select
                                         name={`rows[${idx}].resource`}
                                         fullWidth
                                         onChange={selectedOption => {
                                           handleResourceChange(selectedOption,values,idx);
                                           handleChange("resource");
                                         }}
                                         isClearable
                                         SelectProps={{ native: true}}
                                         options = {allResources}
                                         required
                                         defaultValue={{ label: "Resource", value:  values.rows[idx].resource}}
                                         variant="outlined"
                                         margin = "normal"
                                         styles = {customStyles}
                                          />
                                        {/* <TextField
                                            fullWidth
                                            // name="resource"
                                            name={`rows[${idx}].resource`}
                                            size = "small"
                                            // onChange={handleChange}
                                            onChange={e => 
                                              {
                                              handleChange(e)
                                              // handleChangeInAddResource(values.rows,idx)
                                              }
                                            }
                                            required
                                            select
                                            SelectProps={{ native: true}}
                                            // value={values.resource}
                                            value={values.rows[idx].resource}
                                            variant="outlined"
                                            margin = "normal"
                                          >
                                            <option  value= "" label = "select resource"/>
                                            {allResources.map((option) => (
                                              <option
                                                key={option.full_name+option.sku}
                                                value={option.full_name + option.sku}
                                              >
                                                { option.full_name + option.sku+"("+option.units+")"}
                                              </option>
                                            ))}
                                          </TextField> */}
                                          
                                        </td>
                                        <td style={{width: "20%"}}>
                                        <TextField
                                            // error={ Boolean(touched.rows[0].quantity )}
                                            fullWidth
                                            // helperText={ touched.rows && errors.rows}
                                            label="Quantity"
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
                                       
                                        <td style = {{width: "20%"}}>
                                        <TextField
                                             // error={Boolean(touched.price && errors.price)}
                                              fullWidth
                                              type = "number"
                                              //helperText={touched.price && errors.price}
                                              label="Price"
                                              margin="normal"
                                              size = "small"
                                              name={`rows[${idx}].price`}
                                              onBlur={handleBlur}
                                              onChange={e => 
                                                {
                                                handleChange(e)
                                              }
                                            }
                                              value={values.rows[idx].price}
                                              variant="outlined"
                                            />
                                        </td>
                                        <td style={{width: "20%"}}>
                                        <TextField
                                            // error={ Boolean(touched.rows[0].quantity )}
                                            fullWidth
                                            // helperText={ touched.rows && errors.rows}
                                            label="GST"
                                            type = "number"
                                            size = "small"
                                            margin="normal"
                                            name={`rows[${idx}].GST`}
                                            onBlur={handleBlur}
                                            onChange={e => 
                                              {
                                              handleChange(e)
                                            }
                                          }
                                            value={values.rows[idx].GST}
                                            variant="outlined"
                                          />
                                        </td>
                                        <td>
                                          <Button
                                            className="secondary"
                                            onClick={() => remove(idx)}
                                            formNoValidate
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                          >
                                            Remove
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  {/* </div> */}
                            </tbody>
                          </table>
                          <Button  
                          type= "button"
                          onClick={() => push({resource: '',price: '',quantity: '', GST:0 })}
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
                
               
                <TextField
                      multiline
                      error={Boolean(touched.comments && errors.comments)}
                      fullWidth
                      rows = {3}
                      helperText={touched.comments && errors.comments}
                      label="comments"
                      margin="normal"
                      name="comments"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.comments}
                      variant="outlined"
                    />
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

export default InwardView;
