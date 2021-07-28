import React, { useEffect, useState, useReducer } from 'react';

// react library
// import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router';

// material ui
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// core componenet
// import SelectComponent from 'components/form/SelectComponent';
// import InputComponent from 'components/form/InputComponent';
import Toast from 'components/Toast';
import componentStyles from 'assets/theme/views/admin/dashboard.js';
import ContractReducer from 'components/Reducer/ContractReducer';
import { Link } from 'react-router-dom';
// import Joi from 'joi-browser';

// icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
// import ComboBoxComponent from 'components/form/ComboBoxComponent';
import FormikControll from 'components/FormikControll';

const useStyles = makeStyles(componentStyles);
const useStyles2 = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100%',
    borderRadius: '5px',
  },
  form: {
    width: '800px',
  },
}));

const ContractAdd = ({ match }) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [dataId, setDataId] = useState({
    Code: '',
    Bankname: '',
    Stateid: '',
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [sendbtn, setSendbtn] = React.useState(false);

  const [allbank, setAllBank] = useState([]);
  const [oblast, setOblast] = useState([]);
  const [region, setRegion] = useState([]);

  // console.log("oblast", oblast);
  // console.log("region", region);

  useEffect(() => {
    GetBank();
    GetOblast();
    GetRegion();

    // if (id > 0) {
    //   GetDataId(id);
    // }
  }, []);

  const GetBank = async () => {
    const data = await axios.get('/Bank/GetList');
    if (data.status === 200) {
      setAllBank(data.data.rows);
    }
  };
  const GetOblast = async () => {
    const data = await axios.get('/Oblast/GetList');

    if (data.status === 200) {
      setOblast(data.data.rows);
    }
  };
  const GetRegion = async () => {
    const data = await axios.get('/Region/GetList');

    if (data.status === 200) {
      setRegion(data.data.rows);
    }
  };

  const GetCurrentOblast = (id) => {
    if (id) {
      const test = oblast.filter((item) => item.id == id)[0];
      setCurentOblast(test.fullname);
    }
  };
  const { id } = match.params;

  const validation = Yup.object({
    inn: Yup.string().required('Required'),
    shortname: Yup.string().required('Required'),
    fullname: Yup.string().required('Required'),
    vatcode: Yup.string().required('Required'),
    adress: Yup.string().required('Required'),
    contactinfo: Yup.string().required('Required'),
    mobilenumber: Yup.string().required('Required'),
    oked: Yup.string().required('Required'),
    director: Yup.string().required('Required'),
    accounter: Yup.string().required('Required'),
    oblastid: Yup.string().required('Required'),
    regionid: Yup.string().required('Required'),
  });

  const validationAccounts = Yup.object({
    accountname: Yup.string().required('Required'),
    stateid: Yup.number().required().integer(),
    statename: Yup.string().required('Required'),
  });

  // const GetDataId = async (id) => {
  //   setLoading(true);
  //   try {
  //     const data = await axios.get("/Bank/Get", {
  //       params: {
  //         id,
  //       },
  //     });
  //     if (data.status == 200) {
  //       setDataId(data.data);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       Toast({
  //         message: error.response.data.error,
  //         type: false,
  //       });
  //     }
  //   }
  // };

  const history = useHistory();

  const AddContract = async () => {
    try {
      console.log('to bazaga send', data);

      const result = await axios.post('/Contractor/Update', data);
      console.log('get db data', result);

      // setSendbtn(false);

      if (result.data.success) {
        // history.push("/admin/bank");
        Toast({ message: 'Success ', type: true });
      }
    } catch (error) {
      console.log(error);
      // setSendbtn(false);
      if (error.response.status === 400) {
        Toast({
          message: error.response.data.error,
          type: false,
        });
      }
    }
  };

  const AddAccountsToData = ({ accountname, stateid, statename }) => {
    setData((prevDefault) => ({
      ...prevDefault,
      accounts: [
        ...prevDefault.accounts,
        {
          id: 0,
          contractorid: data.id,
          code: '', //nullable true
          accountname,
          bankname: bankname.bankname,
          bankcode: bankname.code,
          bankid: bankname.id,
          stateid,
          statename, //nullable true
          status: 1,
        },
      ],
    }));
  };

  const AddData = ({
    inn,
    shortname,
    fullname,
    vatcode,
    adress,
    contactinfo,
    oblastid,
    regionid,
    mobilenumber,
    oked,
    director,
    accounter,
  }) => {
    setData((prevDefault) => ({
      ...prevDefault,
      inn,
      shortname,
      fullname,
      vatcode,
      adress,
      contactinfo,
      oblastid,
      regionid,
      mobilenumber,
      oked,
      director,
      accounter,
    }));
    setSendbtn(!sendbtn);
  };

  // -------------modal---------------
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // -------------modal---------------

  const GenerateTableRow = () => {
    return data.accounts.map((row, idx) => (
      <TableRow key={idx}>
        <TableCell component="th" scope="row">
          1
        </TableCell>
        <TableCell component="th" scope="row">
          {row.accountname}
        </TableCell>
        <TableCell align="right">{row.bankname}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          <Box component="span" marginRight="10px" className="btn sucees">
            <EditIcon />
          </Box>
          <Box
            component="span"
            className="btn danger"
            onClick={() => {
              //   alertOpen();
              //   setDel(row.id);
            }}>
            <DeleteIcon />
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  /*----------Restart----------*/

  const [errors, setErrors] = useState(null);
  const [curentOblast, setCurentOblast] = useState('');
  const [bankname, setBankname] = useState();
  const [data, setData] = useState({
    id: 0,
    shortname: '',
    fullname: '',
    inn: '',
    adress: '',
    vatcode: '',
    contactinfo: '',
    mobilenumber: '',
    oblastid: '',
    regionid: '',
    accounter: '',
    director: '',
    oked: '',
    isbudget: true,
    accounts: [],
    branches: [
      {
        branchcode: '',
        branchname: '',
      },
    ],
  });

  const [contractState, dispatch] = useReducer(ContractReducer, data);

  const [accounts, setAccounts] = useState({
    id: 0,
    contractorid: 0,
    code: '', //nullable
    accountname: '', //nullable
    bankcode: '', //nullable
    bankname: '', //nullable
    bankid: 0, //nullable
    stateid: '',
    statename: '', //nullable
    status: 0,
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oblastid') {
      const curentObl = oblast.filter((item) => item.id == value)[0];
      setCurentOblast(curentObl.fullname);
    }
    dispatch({
      type: 'HANDEL_INPUT_TEXT',
      field: name,
      payload: value,
    });
  };

  const handleAccountsChange = (e) => {
    const { name, value } = e.target;
    console.log('+-+-+-+-+-+-+-+-', e);

    setAccounts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log("+++++++++++++++++", data);
  console.log('-----------------', contractState);
  console.log('+++++++++++++++++', accounts);
  console.log('+-+--+-', bankname);
  return (
    <>
      <Container
        maxWidth={false}
        component={Box}
        classes={{ root: classes.containerRoot }}
        paddingTop="6rem">
        <Card>
          <CardContent>
            <Box className="bank-add">
              <h2>Contract List {id > 0 ? 'Update' : 'Add'}</h2>
              <Box>
                <Link to="/admin/bank" color="primary" className="btn secondary">
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
                    alignItems="center">
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
                    alignItems="center">
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
                    alignItems="center">
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
                    alignItems="center">
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
                </form>

                <Box textAlign="right" marginTop="1.5rem" marginBottom="1.5rem">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddBoxIcon />}
                    type="button"
                    onClick={handleOpen}>
                    Add
                  </Button>
                </Box>

                <Box>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
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

                <Box textAlign="right" marginTop="1.5rem" marginBottom="1.5rem">
                  {id > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      type="submit">
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      type="submit">
                      Send
                    </Button>
                  )}
                </Box>

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
                  }}>
                  <Fade in={open}>
                    <form className={classes2.form}>
                      <Box className={classes2.paper}>
                        <h2 id="transition-modal-title">Accounts Add</h2>

                        <Grid
                          container
                          spacing={3}
                          direction="row"
                          justifycontent="center"
                          alignItems="center">
                          <Grid item xs={12}>
                            <FormikControll
                              controll="input"
                              type="text"
                              label="Checking account"
                              name="statename"
                              placeholder="Statename"
                              handleChange={handleAccountsChange}
                              Icon={null}
                              value={accounts.statename}
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
                              handleChange={(val) => setBankname(val)}
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
                                  fullname: 'Актив',
                                  id: 1,
                                },
                                {
                                  fullname: 'Пассив',
                                  id: 2,
                                },
                              ]}
                              handleChange={handleAccountsChange}
                              value={accounts.stateid}
                              customValue={false}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </form>
                    {/* <Formik
                      initialValues={{
                        accountname: '',
                        stateid: '',
                        statename: '',
                      }}
                      validationSchema={validationAccounts}
                      onSubmit={(values) => {
                        AddAccountsToData(values);
                      }}>
                      {(formik) => (
                        <Form className={classes2.form}>
                          <Box className={classes2.paper}>
                            <h2 id="transition-modal-title">Accounts Add</h2>
                            <Box>
                              <Box>
                                <Box className="full-need" component="span">
                                  *
                                </Box>{' '}
                                Checking Account
                              </Box>
                              <InputComponent
                                placeholder="statename"
                                name="statename"
                                type="text"
                                Icon={null}
                              />
                            </Box>
                            <Box>
                              <Box>
                                <Box className="full-need" component="span">
                                  *
                                </Box>{' '}
                                Accountname
                              </Box>
                              <InputComponent
                                placeholder="accountname"
                                name="accountname"
                                type="text"
                                Icon={null}
                              />
                            </Box>

                            <Box>
                              <Box>
                                <Box className="full-need" component="span">
                                  *
                                </Box>{' '}
                                Bank Name
                              </Box>
                              <ComboBoxComponent
                                placeholder="bankname"
                                name="bankname"
                                getData={setBankname}
                                data={allbank}
                              />
                            </Box>

                            <Box>
                              <Box>
                                <Box className="full-need" component="span">
                                  *
                                </Box>{' '}
                                Status
                              </Box>
                              <SelectComponent
                                placeholder="StateId"
                                name="stateid"
                                items={[
                                  {
                                    fullname: 'Актив',
                                    id: 1,
                                  },
                                  {
                                    fullname: 'Пассив',
                                    id: 2,
                                  },
                                ]}
                              />
                            </Box>

                            <Box textAlign="right" marginTop="1.5rem" marginBottom="1.5rem">
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                type="submit">
                                Add Acoountant
                              </Button>
                            </Box>
                          </Box>
                        </Form>
                      )}
                    </Formik> */}
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
