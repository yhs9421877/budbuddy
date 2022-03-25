import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStore from "../store/store";
import { makeModal } from "../utils/errExeption";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  display: grid;
  font-size: 10px;

  .title {
    color: white;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: black;
  }

  .signup {
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      ligth: "#6cb842",
      dark: "#005900",
    },
    secondary: {
      light: "#01689b",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        fontSize: 4,
      },
    },
  },
});

const LoginForm = () => {
  let navigate = useNavigate();
  const { setLogin } = useStore();
  const [modalCode, setModalCode] = useState(0);

  async function loginReq(e) {
    e.preventDefault();
    // console.log("호출");
    const { email, password } = e.target;
    if (email.value === "" || password.value === "") {
      setModalCode("reqfillLoginform");
      return;
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const resData = await axios.post(process.env.REACT_APP_API_URL + "/users/login", payload);
      // console.log("응답::::", resData.data);
      setModalCode(resData.data.message);
      if (resData.data.message === "ok") {
        setLogin(true);
        navigate("/mypage");
        return;
      }
    } catch (err) {
      console.log(err.response.data);
      setModalCode(err.response.data.message);
    }
  }

  return (
    <Layout>
      {makeModal(modalCode)}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}>
          <Box component="form" onSubmit={loginReq} noValidate sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70%" }}>
            <TextField
              margin="none"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              InputProps={{ style: { fontSize: 10 } }}
              InputLabelProps={{ style: { fontSize: 10 } }}
              fullWidth
            />
            <TextField
              type="password"
              margin="none"
              required
              id="password"
              label="password"
              name="password"
              autoComplete="current-password"
              variant="standard"
              InputProps={{ style: { fontSize: 10 } }}
              InputLabelProps={{ style: { fontSize: 10 } }}
              fullWidth
            />
            <FormControlLabel
              className="saved"
              control={<Checkbox value="remember" color="primary" sx={{ "& .MuiSvgIcon-root": { fontSize: "0.5rem" } }} />}
              label={
                <Box component="div" fontSize={"0.6rem"}>
                  로그인 저장
                </Box>
              }
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: "22%", height: "10%", fontSize: "0.7rem" }}
              onBlur={() => {
                setModalCode(0);
              }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 0.5, width: "22%", height: "10%", fontSize: "0.7rem" }}
              size="small"
              onClick={async () => {
                setLogin(true);
                setModalCode("testLogin");
              }}>
              Test
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item className="signup">
                <Link href="/signup">회원가입</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Layout>
  );
};

export default LoginForm;