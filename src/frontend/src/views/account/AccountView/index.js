import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();
  const user = localStorage.getItem("team5-token");
  return (
    <div>
      {!user && <Navigate to="/login"></Navigate>}
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
};

export default Account;
