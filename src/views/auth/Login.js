import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { Formik, Form } from "formik";
import InputComponent from "components/form/InputComponent";
import * as Yup from "yup";
import { useHistory } from "react-router";

import Toast from "components/Toast";
import { ToastContainer } from "react-toastify";
import { contextApi } from "../../context/GlobalContext";

// @material-ui/icons components
import PersonIcon from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";

const useStyles = makeStyles(componentStyles);

function Login() {
  const classes = useStyles();
  const theme = useTheme();

  let { LoginF, setAuthDetails } = useContext(contextApi);

  const validation = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const history = useHistory();
  return (
    <>
      <Grid item xs={12} lg={5} md={7} className="login">
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Or sign in with credentials
              </Box>
            </Box>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={validation}
              onSubmit={async (values) => {
                try {
                  const { data } = await LoginF(values);

                  if (data.success) {
                    // console.log("data", data);
                    setAuthDetails(data);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.userinfo));
                  }
                } catch (error) {
                  if (error.response.status === 400) {
                    Toast({ message: error.response.data.error, type: false });
                  }
                }
              }}
            >
              {(formik) => (
                <Form>
                  <InputComponent
                    Icon={PersonIcon}
                    placeholder="Username"
                    name="username"
                  />
                  <InputComponent
                    Icon={Lock}
                    placeholder="Password"
                    name="password"
                    type="password"
                  />
                  <Box
                    textAlign="center"
                    marginTop="1.5rem"
                    marginBottom="1.5rem"
                  >
                    <Button color="primary" variant="contained" type="submit">
                      Sign in
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default Login;
