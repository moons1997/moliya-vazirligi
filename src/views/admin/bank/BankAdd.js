import React, { useEffect, useState } from "react";

// react library
import { Formik, Form } from "formik";
import * as Yup from "yup";
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

// core componenet
import SelectComponent from "components/form/SelectComponent";
import InputComponent from "components/form/InputComponent";
import Toast from "components/Toast";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import { Link } from "react-router-dom";

// icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(componentStyles);

const BankAdd = ({ match }) => {
  const classes = useStyles();
  const [dataId, setDataId] = useState({
    Code: "",
    Bankname: "",
    Stateid: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id > 0) {
      GetDataId(id);

      //   console.log(code);
    }
  }, []);

  const { id } = match.params;
  const validation = Yup.object({
    code: Yup.string().required("Required"),
    bankname: Yup.string().required("Required"),
    stateid: Yup.number().required().integer(),
  });

  const GetDataId = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get("/Bank/Get", {
        params: {
          id,
        },
      });
      if (data.status == 200) {
        setDataId(data.data);
        setLoading(false);
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

  const BankAdd = async (values) => {
    try {
      const data = await axios.post("/Bank/Update", {
        code: values.code,
        bankname: values.bankname,
        stateid: values.stateid,
        id: id > 0 ? id : 0,
      });
      if (data.data.success) {
        history.push("/admin/bank");
        Toast({ message: "Success ", type: true });
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

  const history = useHistory();

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
              <h2>Bank List {id > 0 ? "Update" : "Add"}</h2>
              <Box>
                <Link
                  to="/admin/bank"
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
              <Formik
                initialValues={{
                  code: dataId.Code,
                  bankname: dataId.Bankname,
                  stateid: dataId.Stateid,
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  BankAdd(values);
                }}
              >
                {(formik) => (
                  <Form>
                    {/* {console.log(formik.values)} */}
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justifycontent="center"
                      alignItems="center"
                    >
                      <Grid item xs={3}>
                        Bank Code
                      </Grid>
                      <Grid item xs={9}>
                        <InputComponent
                          placeholder="Bank code"
                          name="code"
                          type="text"
                          Icon={null}
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
                      <Grid item xs={3}>
                        Bank Name
                      </Grid>
                      <Grid item xs={9}>
                        <InputComponent
                          placeholder="Bank Name"
                          name="bankname"
                          type="text"
                          Icon={null}
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
                      <Grid item xs={3}>
                        StateId
                      </Grid>
                      <Grid item xs={9}>
                        <SelectComponent
                          placeholder="StateId"
                          name="stateid"
                          items={[
                            {
                              name: "Актив",
                              value: 1,
                            },
                            {
                              name: "Пассив",
                              value: 2,
                            },
                          ]}
                        />
                      </Grid>
                    </Grid>

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
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CloudUploadIcon />}
                          type="submit"
                        >
                          Send
                        </Button>
                      )}
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </CardContent>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
};

export default BankAdd;
