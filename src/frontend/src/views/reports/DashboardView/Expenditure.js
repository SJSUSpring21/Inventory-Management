import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";
import AppsIcon from "@material-ui/icons/Apps";
import { url } from "../../../prodConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.indigo[900],
  },
  differenceValue: {
    color: colors.indigo[900],
    marginRight: theme.spacing(1),
  },
}));

const Expenditure = ({ className, ...rest }) => {
  const classes = useStyles();
  const [price, setprice] = useState([]);

  useEffect(() => {
    fetch(url + "/api/getMonthlyExpenditure", {})
      .then((res) => res.json())
      .then((result) => {
        console.log("RESULT: ", result);
        setprice(result.price);
      });
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL EXPENDITURE
            </Typography>
            <Typography color="textPrimary" variant="h3">
              ${price}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};

Expenditure.propTypes = {
  className: PropTypes.string,
};

export default Expenditure;
