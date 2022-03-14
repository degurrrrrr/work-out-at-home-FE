import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import jwt_decode from "jwt-decode";
import Videoplayer from "../components/Videoplayer";
function App() {
  const dispatch = useDispatch();
  const nickName = localStorage.getItem("isLogin")
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(userActions.getNickname(nickName));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          {/* <Header /> */}
          <Route path="/" exact component={Main}></Route>
          {/* <Route path="/room/:roomId" exact component={Videoplayer}></Route> */}
          <Route path="/room/:roomId" exact component={Detail}></Route>
        </ConnectedRouter>
      </ThemeProvider>
    </>
  );
}

// 컴포넌트에서 theme 사용법
// const Title = styled.h1`
//   color: ${props => props.theme.color.primary};
// `;
export default App;
