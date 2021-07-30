import React, { useEffect, useState, useReducer } from "react";

// react library
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router";

// material ui
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// core componenet
import Toast from "components/Toast";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import ContractReducer from "components/Reducer/ContractReducer";
import { Link } from "react-router-dom";
// import Joi from 'joi-browser';

// icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FormikControll from "components/FormikControll";

const useStyles = makeStyles(componentStyles);
const useStyles2 = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
    borderRadius: "5px",
  },
  form: {
    width: "800px",
  },
}));

const initialData = {
  id: 0,
  shortname: "",
  fullname: "",
  inn: "",
  adress: "",
  vatcode: "",
  contactinfo: "",
  mobilenumber: "",
  oblastid: "",
  regionid: "",
  accounter: "",
  director: "",
  oked: "",
  isbudget: true,
  accounts: [],
  branches: [
    {
      branchcode: "",
      branchname: "",
    },
  ],
};
const initialAccounts = {
  id: 0,
  contractorid: 0,
  code: "", //nullable
  accountname: "", //nullable
  bankcode: "", //nullable
  bankname: "", //nullable
  bankid: 0, //nullable
  stateid: "",
  statename: "", //nullable
  status: 1,
};
const ContractAdd = ({ match }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [allbank, setAllBank] = useState([]);
  const [oblast, setOblast] = useState([]);
  const [region, setRegion] = useState([]);

  useEffect(() => {
    GetBank();
    GetOblast();
    GetRegion();

    if (id > 0) {
      GetDataId(id);
    }
  }, []);

  useEffect(() => {
    const curentObl = oblast.filter((item) => item.id == curentOblId)[0];

    // setCurentOblast(curentObl.fullname);
  }, [oblast]);

  const GetBank = async () => {
    const data = await axios.get("/Bank/GetList");
    if (data.status === 200) {
      setAllBank(data.data.rows);
    }
  };

  const GetOblast = async () => {
    const data = await axios.get("/Oblast/GetList");

    if (data.status === 200) {
      setOblast(data.data.rows);
    }
  };

  const GetRegion = async () => {
    const data = await axios.get("/Region/GetList");

    if (data.status === 200) {
      setRegion(data.data.rows);
    }
  };

  const { id } = match.params;

  const history = useHistory();

  // -------------modal---------------
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAccounts(initialAccounts);
    setEdit(false);
  };
  // -------------modal---------------

  const AddContract = async (data) => {
    try {
      const result = await axios.post("/Contractor/Update", data);
      console.log("get db data", result);

      if (result.status == 200) {
        history.push("/admin/contract");
        Toast({ message: "Success ", type: true });
        setData(initialData);
      }
    } catch (error) {
      if (error.response.status === 400) {
        Toast({
          message: error.response.data.error,
          type: false,
        });
      }
    }
  };

  const GetDataId = async (id) => {
    setLoading(true);
    try {
      const result = await axios.get("/Contractor/Get", {
        params: {
          id,
        },
      });

      if (result.status == 200) {
        // console.log("get sb to me______", result.data);
        setData(result.data);
        dispatch({
          type: "UPDATA_INPUT_TEXT",
          payload: result.data,
        });
        setCurentOblId(result.data.oblastid);
        // if (oblast.length > 0) {
        //   const curentObl = oblast.filter((item) => item.id == result.data.oblastid)[0];
        //   setCurentOblast(curentObl.fullname);
        // }

        setLoading(false);
      }
    } catch (error) {
      console.log("handle error", error);
      // Toast({
      //   message: error,
      //   type: false,
      // });
    }
  };

  /*----------Restart----------*/

  const [errors, setErrors] = useState(null);
  const [curentOblast, setCurentOblast] = useState("");

  const [data, setData] = useState(initialData);

  const [contractState, dispatch] = useReducer(ContractReducer, data);

  const [accounts, setAccounts] = useState(initialAccounts);
  const [curentOblId, setCurentOblId] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (name === "oblastid") {
      const curentObl = oblast.filter((item) => item.id == value)[0];
      setCurentOblast(curentObl.fullname);
    }
    dispatch({
      type: "HANDEL_INPUT_TEXT",
      field: name,
      payload: value,
    });
  };

  const handleAccountsChange = (e) => {
    const { name, value } = e.target;

    setAccounts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAutocoplateChange = (val) => {
    setAccounts((prevState) => ({
      ...prevState,
      bankid: val.id,
      bankcode: val.code,
      bankname: val.name,
    }));
  };

  const handleSubmitContract = (e) => {
    e.preventDefault();
    AddContract(contractState);
  };

  const EditAccountas = (Id) => {
    const idx = contractState.accounts.findIndex((item) => item.id === Id);

    const curentObject = contractState.accounts[idx];
    setEdit(true);
    const {
      id,
      contractorid,
      code,
      accountname,
      bankcode,
      bankname,
      bankid,
      stateid,
      statename,
      Status,
    } = curentObject;
    setAccounts({
      id,
      contractorid,
      code,
      accountname,
      bankcode,
      bankname,
      bankid,
      stateid,
      statename,
      status: Status,
    });

    handleOpen();
  };

  const DelAccountas = (Id) => {
    dispatch({
      type: "DEL_ACCOUNTS_TEXT",
      // payload: accounts,
      id: Id,
      status: 3,
    });
  };

  const UpdateAccountsSubmit = () => {
    dispatch({
      type: "EDIT_ACCOUNTS_TEXT",
      payload: accounts,
      id: accounts.id,
      status: 2,
    });
    handleClose();
  };
  const handleAddAccounts = () => {
    dispatch({
      type: "ADD_ACCOUNTS_TEXT",
      field: "accounts",
      payload: accounts,
    });

    handleClose();
  };

  const GenerateTableRow = () => {
    return contractState.accounts.map(
      (row, idx) =>
        row.status != 3 && (
          <TableRow key={idx}>
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell component="th" scope="row">
              {row.accountname}
            </TableCell>
            <TableCell align="right">{row.bankname}</TableCell>
            <TableCell align="right">
              {row.status ? row.status : row.Status}
            </TableCell>
            <TableCell align="right">
              <Box
                component="span"
                marginRight="10px"
                className="btn sucees"
                type="button"
                onClick={() => {
                  EditAccountas(row.id);
                }}
              >
                <EditIcon />
              </Box>
              <Box
                component="span"
                className="btn danger"
                type="button"
                onClick={() => {
                  // alertOpen();
                  DelAccountas(row.id);
                }}
              >
                <DeleteIcon />
              </Box>
            </TableCell>
          </TableRow>
        )
    );
  };

  // console.log('=====', curentOblast, curentOblId);
  // console.log("+++++++++++++++++", accounts);
  // console.log("-----------------", contractState);
  return (
    <>
      <Container
        maxWidth={false}
        component={Box}
        classes={{ root: classes.containerRoot }}
        paddingTop="6rem"
      >
        <Card>
          <CardContent>
            <Box className="bank-add">
              <h2>Contract List {id > 0 ? "Update" : "Add"}</h2>
              <Box>
                <Link
                  to="/admin/contract"
                  color="primary"
                  className="btn secondary"
                >
                  <ArrowBackIosIcon />
                  <Box component="span">Back</Box>
                </Link>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            {loading ? (
              <Box className="progress">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <form>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifycontent="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Tin"
                        name="inn"
                        placeholder="Tin"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.inn}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Short Name"
                        name="shortname"
                        placeholder="Short name"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.shortname}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Full Name"
                        name="fullname"
                        placeholder="Full name"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.fullname}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifycontent="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="VAT payer registration code"
                        name="vatcode"
                        placeholder="VAT code"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.vatcode}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Address"
                        name="adress"
                        placeholder="Adress"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.adress}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Contacts"
                        name="contactinfo"
                        placeholder="Contacts"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.contactinfo}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifycontent="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormikControll
                        controll="select"
                        label="Region"
                        name="oblastid"
                        options={oblast}
                        handleChange={handleTextChange}
                        value={contractState.oblastid}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="select"
                        label="District"
                        name="regionid"
                        options={region}
                        curentOblast={curentOblast}
                        handleChange={handleTextChange}
                        value={contractState.regionid}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Phone number"
                        name="mobilenumber"
                        placeholder="Phone number"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.mobilenumber}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifycontent="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="OKED"
                        name="oked"
                        placeholder="OKED"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.oked}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Director Organization (N.S.P)"
                        name="director"
                        placeholder="Director Organization (N.S.P)"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.director}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikControll
                        controll="input"
                        type="text"
                        label="Accounter"
                        name="accounter"
                        placeholder="Accounter"
                        handleChange={handleTextChange}
                        Icon={null}
                        value={contractState.accounter}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    textAlign="right"
                    marginTop="1.5rem"
                    marginBottom="1.5rem"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<AddBoxIcon />}
                      type="button"
                      onClick={handleOpen}
                    >
                      Add
                    </Button>
                  </Box>

                  <Box>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Checking account</TableCell>
                            <TableCell align="right">Account name</TableCell>
                            <TableCell align="right">Bank</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <GenerateTableRow />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    textAlign="right"
                    marginTop="1.5rem"
                    marginBottom="1.5rem"
                  >
                    {id > 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        type="button"
                        onClick={handleSubmitContract}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        type="button"
                        onClick={handleSubmitContract}
                      >
                        Send
                      </Button>
                    )}
                  </Box>
                </form>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes2.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <form
                      className={classes2.form}
                      onSubmit={handleAddAccounts}
                    >
                      <Box className={classes2.paper}>
                        <h2 id="transition-modal-title">
                          Accounts {accounts.id > 0 ? "Update" : "Add"}{" "}
                        </h2>

                        <Grid
                          container
                          spacing={3}
                          direction="row"
                          justifycontent="center"
                          alignItems="center"
                        >
                          <Grid item xs={12}>
                            <FormikControll
                              controll="input"
                              type="text"
                              label="Checking account"
                              name="code"
                              placeholder="Code"
                              handleChange={handleAccountsChange}
                              Icon={null}
                              value={accounts.code}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormikControll
                              controll="input"
                              type="text"
                              label="Accountname"
                              name="accountname"
                              placeholder="Accountname"
                              handleChange={handleAccountsChange}
                              Icon={null}
                              value={accounts.accountname}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormikControll
                              controll="autocomplete"
                              label="Bank name"
                              name="bankname"
                              options={allbank}
                              handleChange={handleAutocoplateChange}
                              value={accounts.bankname}
                              placeholder="Bank name"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormikControll
                              controll="select"
                              label="Status"
                              name="stateid"
                              options={[
                                {
                                  fullname: "Актив",
                                  id: 1,
                                },
                                {
                                  fullname: "Пассив",
                                  id: 2,
                                },
                              ]}
                              handleChange={handleAccountsChange}
                              value={accounts.stateid}
                              customValue={false}
                            />
                          </Grid>
                        </Grid>
                        <Box
                          textAlign="right"
                          marginTop="1.5rem"
                          marginBottom="1.5rem"
                        >
                          {edit ? (
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<SaveIcon />}
                              onClick={UpdateAccountsSubmit}
                              type="button"
                            >
                              Update Acoountant
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<SaveIcon />}
                              type="button"
                              onClick={handleAddAccounts}
                            >
                              Add Acoountant
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </form>
                  </Fade>
                </Modal>
              </>
            )}
          </CardContent>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
};

export default ContractAdd;
