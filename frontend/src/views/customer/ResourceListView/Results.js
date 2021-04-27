import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, resources, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Nick Name
                </TableCell>
                <TableCell>
                  Owner
                </TableCell>
                <TableCell>
                  Available Quantity
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Date Created
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.slice(0, limit).map((resource) => (
                <TableRow
                  hover
                  key={resource.id}>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                        {/* <Avatar
                          className={classes.avatar}
                          src={customer.avatarUrl}
                        >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {resource.full_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {resource.nick_name}
                  </TableCell>
                  <TableCell>
                    {resource.owner}
                  </TableCell>
                  <TableCell>
                    {resource.available_quantity}
                  </TableCell>
                  <TableCell>
                    {resource.location}
                  </TableCell>
                  <TableCell>
                    {moment(resource.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={resources.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25,100, 10000]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  resources: PropTypes.array.isRequired
};

export default Results;
