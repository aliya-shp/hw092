import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import Routes from "./Routes";
import {ToastContainer} from "react-toastify";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";

class App extends Component {
  render() {
    return (
        <Fragment>
          <ToastContainer autoClose={3000} />
          <header>
            <Toolbar
                user={this.props.user}
                logout={this.props.logoutUser}
            />
          </header>
          <Container style={{marginTop: '20px'}}>
            <Routes user={this.props.user}/>
          </Container>
        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));