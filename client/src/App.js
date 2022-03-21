import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NavigationBar from "./pages/components/NavigationBar";
import { OutLine, Content } from "./pages/pageStyled/common/CommonStyled";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <OutLine>
          <Content className="Content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <NavigationBar className="navi" />
          </Content>
        </OutLine>
      </ThemeProvider>
    </div>
  );
};

export default App;
