import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import { checkToken, Login, Register } from '@sspa/auth'
import { Prof } from '@sspa/profile'

console.log(Prof)

import { createAuth, removeAuth, setLoggedIn } from "../features/auth/authSlice";
import { updateEmail } from "../features/profile/profileSlice";

function App () {
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const history = useHistory()
  const dispatch = useDispatch()

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    checkToken()
      .then(res => {
        dispatch(setLoggedIn(true))
        dispatch(updateEmail(res.data.email))
        history.push("/")
      })
      .catch(console.error)
  }, [history]);

  function closeAllPopups () {
    setIsInfoToolTipOpen(false);
  }

  function onRegister (res) {
    res
      .then(() => {
        setTooltipStatus('success');
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin (res) {
    res
      .then(r => {
          dispatch(createAuth(r))
          dispatch(updateEmail(r.email))
          history.push("/")
        }
      )
      .catch(() => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      })
  }

  function onSignOut () {
    dispatch(removeAuth())
    dispatch(updateEmail(''))
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <div className="page__content">
      <Header onSignOut={ onSignOut }/>


      <Switch>
      {/*<Route path="/profile" component={<Prof />}/>*/}
        <ProtectedRoute
          exact
          path="/"
          component={ Main }
        />

        <Route path="/signup">
          <Register onRegister={ onRegister }/>
        </Route>
        <Route path="/signin">
          <Login onLogin={ onLogin }/>
        </Route>
      </Switch>
      <Footer/>
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
      <InfoTooltip
        isOpen={ isInfoToolTipOpen }
        onClose={ closeAllPopups }
        status={ tooltipStatus }
      />
    </div>
  );
}

export default App;
