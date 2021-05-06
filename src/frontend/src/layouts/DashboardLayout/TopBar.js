import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Router } from "react-router";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotifyMe from "react-notification-timeline";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "../../components/Logo";
import { io } from "socket.io-client";
import { LaptopWindows, Markunread } from "@material-ui/icons";
import { url } from "../../prodConfig";

const END_POINT = "http://52.24.201.154:5000";
const socket = io(END_POINT, { transport: ["websocket"] });

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) === null
      ? []
      : localStorage.getItem(localStorageKey)
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [value, setValue] = useState([]);
  // const [value, setValue] = useStateWithLocalStorage(
  //   'myValueInLocalStorage'
  // );
  const dataRef = useRef([]);
  // dataRef.current = alerts;

  useEffect(() => {
    console.log(
      "local storage = ",
      localStorage.getItem("myValueInLocalStorage")
    );
    // setAlerts( [ {'jkds': 'jkds'}]);
    // var k = [];
    // k.push({"update": "hjds"});
    // x.push({"name": "saketh"});
    // setAlerts(k);
    socket.on("connect", () => {
      console.log(
        "socket client connect successfully, socket id = ",
        socket.id
      ); // x8WIv7-mJelg7on_ALbx
      // console.log("value ************* = " , value)
    });
    socket.on("notification", (data) => {
      console.log("INSIDE SOCK>ON***************");
      var x = {
        update:
          data.full_name +
          " (" +
          data.available_quantity +
          ") has gone below threshold(" +
          data.threshold_quantity +
          " ) at " +
          data.location,
        timestamp: data.updatedAt,
      };
      // const addNotification = useCallback(() => {
      // setItems(items => [...items, Math.random()]);
      // alerts.current.push(x);
      // dataRef.current.push(x);
      // setAlerts(() => ([...alerts, x]));
      setValue(() => [...value, x]);
      // localStorage.setItem('myValueInLocalStorage', value);
      console.log("data Ref ======== ", dataRef);
      // console.log("local storage ==== ", value);
      // }, []);

      console.log("DATE ============================= ", data);
    });

    fetch(url + "/api/getAlerts", {})
      .then((res) => res.json())
      .then((result) => {
        // socket.emit("notifications", data => {
        //   console.log("INSIDE SOCK>ON***************")
        //   setAlerts(data);
        // });
        // console.log(result.notifications)
        var x = [];
        for (var i in result.notifications) {
          x.push({
            update:
              result.notifications[i].full_name +
              " (" +
              result.notifications[i].available_quantity +
              ") has gone below threshold(" +
              result.notifications[i].threshold_quantity +
              " ) at " +
              result.notifications[i].location,
            timestamp: result.notifications[i].updatedAt,
          });
        }
        console.log("x ==== ", x);
        setAlerts(x);
      });
    return () => socket.disconnect();
  }, [value]);

  return (
    <Router>
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
        <Toolbar>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box flexGrow={1} />
          <Hidden mdDown>
            <NotifyMe
              data={alerts}
              storageKey="notific_key"
              notific_key="timestamp"
              notific_value="update"
              sortedByKey={true}
              showDate={true}
              heading=" "
              size={32}
              color="yellow"
              // markAsReadFn = {() => console.log("MarkAsReadFunction Called")}
            />

            <IconButton
              onClick={() => {
                localStorage.removeItem("team5-token");
                window.location = "/login";
                // <Navigate to="/login"></Navigate>
              }}
              color="inherit"
            >
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Router>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
