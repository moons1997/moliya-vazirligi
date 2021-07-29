import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// @material-ui/core components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// import Pagination from "@material-ui/lab/Pagination";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

// core components
import componentStyles from "assets/theme/views/admin/dashboard.js";
import { contextApi } from "context/GlobalContext";

// import Toast from "components/Toast";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles(componentStyles);
const useStyles2 = makeStyles((theme) => ({
  pagination: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    maxHeight: 600,
  },
}));

const Contract = () => {
  const { contractlist, setContractlist } = useContext(contextApi);
  const classes = useStyles();
  const classes2 = useStyles2();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [search, setSearch] = useState("");
  const [orderType, setOrderType] = useState("asc");
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSort = (SortColumn) => {
    setSortColumn(SortColumn);

    if (orderType == "asc") {
      setOrderType("desc");
    } else {
      setOrderType("asc");
    }
  };

  const alertOpen = () => {
    setOpen(true);
  };

  const alertClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getContractList(search, sortColumn, orderType, page + 1, rowsPerPage);
  }, []);

  useEffect(() => {
    getContractList(search, sortColumn, orderType, page + 1, rowsPerPage);
  }, [rowsPerPage, page, sortColumn, orderType, search]);

  const getContractList = async (
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) => {
    setLoading(true);

    const data = await axios.get("/Contractor/GetList", {
      params: {
        Search,
        SortColumn,
        OrderType,
        PageNumber,
        PageLimit,
      },
    });
    if (data.status === 200) {
      setContractlist(data.data);
      setLoading(false);
    }
  };

  const emptyRows = contractlist.rows.length < 1;

  const DeleteBankData = async (id) => {
    const data = await axios.delete("/Bank/Delete", {
      params: {
        id,
      },
    });
    // console.log(data);
    getContractList(search, sortColumn, orderType, page + 1, rowsPerPage);
    setDel("");
  };

  const GenerateTableRow = (prop) => {
    if (prop.load) {
      return (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6}>
            <Box className="progress">
              <CircularProgress />
            </Box>
          </TableCell>
        </TableRow>
      );
    }
    return prop.list.rows.map((row, index) => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.shortname}</TableCell>
        <TableCell>{row.contactinfo}</TableCell>
        <TableCell align="center">
          {/* {row.status == "Актив" ? (
            <Box component="span" className="box-outlin active">
              {row.status}
            </Box>
          ) : (
            <Box component="span" className="box-outlin passive">
              {row.status}
            </Box>
          )} */}
          {row.mobilenumber}
        </TableCell>
        <TableCell align="center">
          <Box component="span" marginRight="10px">
            <Link className="btn sucees" to={`/admin/contract/${row.id}`}>
              <EditIcon />
            </Link>
          </Box>
          <Box
            component="span"
            className="btn danger"
            onClick={() => {
              alertOpen();
              setDel(row.id);
            }}
          >
            <DeleteIcon />
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              alertClose();
            }}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              alertClose();
              DeleteBankData(del);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        maxWidth={false}
        component={Box}
        classes={{ root: classes.containerRoot }}
        paddingTop="6rem"
      >
        <Card className={classes.root}>
          <CardContent>
            <Box className="table-top">
              <Box className="search">
                <InputBase
                  placeholder="Search by bank code"
                  inputProps={{ "aria-label": "search google maps" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>

              <Box>
                <Link to="/admin/contract/0" className="btn primary">
                  <ControlPointIcon />
                  <Box component="span" marginLeft="10px">
                    add
                  </Box>
                </Link>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            <TableContainer component={Paper} className={classes2.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      onClick={() => {
                        getSort("id");
                      }}
                    >
                      id{" "}
                      {orderType == "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => {
                        getSort("code");
                      }}
                    >
                      ShortName
                      {orderType == "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => {
                        getSort("name");
                      }}
                    >
                      Contract Info
                      {orderType == "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </TableCell>
                    <TableCell align="center">Mobile Number</TableCell>
                    <TableCell align="center">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <GenerateTableRow list={contractlist} load={loading} />
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6}>Empty</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={contractlist.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Contract;
