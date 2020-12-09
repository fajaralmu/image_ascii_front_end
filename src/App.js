
import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, withRouter } from 'react-router-dom'
import * as actions from './redux/actions/actionCreators'
import { connect } from 'react-redux'
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Loader from './components/widget/Loader';
import Alert from './components/messages/Alert';
import SideBar from './components/layout/SideBar';
import './components/layout/SideBar.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      menuCode: '',
      loading: false,
      loadingPercentage: 0,
      requestId: null,
      mainAppUpdated: new Date(),
      showAlert: false,

    };

    this.alertTitle = null;
    this.alertBody = null;
    this.alertIsYesOnly = true;
    this.alertIsError = false;
    this.alertOnYesCallback = null;
    this.alertOnCancelCallback = null;

    this.loadings = 0;



    this.setMenuCode = (code) => {
      this.setState({ menuCode: code });
    }

    this.refresh = () => {
      this.setState({ mainAppUpdated: new Date() });
    }

    this.incrementLoadings = function () {
      this.loadings++;
    }

    this.decrementLoadings = function () {
      this.loadings--;
      if (this.loadings < 0) {
        this.loadings = 0;
      }
    }

    this.requestAppId = () => {
      //this.props.requestAppId(this);
    }
    this.startLoading = (realtime) => {
      this.incrementLoadings();
      this.setState({ loading: true, realtime: realtime });
    }

    this.endLoading = () => {
      console.log("END LOADING");
      this.decrementLoadings();
      if (this.loadings == 0) {
        this.setState({ loading: false, loadingPercentage: 0 });
      }
    }

    this.showAlertError = (title, body, yesOnly, yesCallback, noCallback) => {
      this.alertIsError = true;
      this.showAlert(title, body, yesOnly, yesCallback, noCallback)
    }
    this.showAlert = (title, body, yesOnly, yesCallback, noCallback) => {
      this.alertTitle = title;
      this.alertBody = body;
      this.alertIsYesOnly = yesOnly;
      const app = this;
      this.alertOnYesCallback = function (e) {
        app.dismissAlert();
        yesCallback(e);
      }
      if (!yesOnly) {
        this.alertOnCancelCallback = function (e) {
          app.dismissAlert();
          if (noCallback != null) {
            noCallback(e);
          }
        };
      }
      this.setState({ showAlert: true })
    }
    this.dismissAlert = () => {
      this.alertIsError = false;
      this.setState({ showAlert: false })
    }

    this.routedContent = () => {
      return (<>
        <Switch>
          <Route path="/home" render={
            (props) =>
              <h2>HOME</h2>
          } />

          <Route path="/login" render={
            (props) => <h2>Login</h2>
          } />
          {/* ///////////authenticated//////////// */}

        </Switch>

      </>);
    }


  }

  componentDidUpdate() {
    if (this.props.requestId != this.state.requestId) {
      this.setState({ requestId: this.props.requestId });
      
    }
  }


  componentDidMount() {
    this.requestAppId();
    this.setState({ loadingPercentage: 0 });
  }

  setMenus() {
    const additionalMenus = this.props.menus ? this.props.menus : [];
    const menus = new Array();
    for (let i = 0; i < additionalMenus.length; i++) {

      const menu = additionalMenus[i];
      const isNotAuthenticated = this.props.loginStatus != true && menu.authenticated == true;
      const isShoppingDisabled = !this.state.enableShopping && menu.code == 'cart';

      if (isNotAuthenticated) { continue; }
      if (isShoppingDisabled) { continue; }

      menus.push(menu);
    }

    return menus;

  }

  render() {

    if (!this.props.requestId) {
      return (<Loader show={true} />)
    }
    return (
      <div className="App">
        {this.state.showAlert ?
          <Alert
            isError={this.alertIsError}
            yesOnly={this.alertIsYesOnly}
            title={this.alertTitle}
            onYes={this.alertOnYesCallback} onNo={this.alertOnCancelCallback}
          >{this.alertBody}</Alert> :
          null}
        <Header app={this} />
        <section style={{ minHeight: '70vh' }}>
          <div >
            <Loader show={this.state.loading} />
          </div>
          <div className="columns" style={{ minHeight: '70vh', marginBottom: '1px' }}>
            <div style={{ paddingTop: '20px', paddingLeft: '20px', borderRight:'solid 2px #ccc' }}
              className="menu-container column is-one-fifth has-background-water-ter">
              
                <SideBar app={this} />
               
            </div>
            <div className="column is-four-fifths">

              <Content app={this} />
            </div>
          </div>
        </section>
        <Footer />

      </div>
    )
  }

}




const mapStateToProps = state => {
  //console.log(state);
  return {

    //user
    loginStatus: state.userState.loginStatus,
    requestId: state.userState.requestId,
  }
}

const mapDispatchToProps = dispatch => ({
  // performLogout: (app) => dispatch(actions.accountAction.performLogout(app)),
  // requestAppId: (app) => dispatch(actions.accountAction.requestAppId(app)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
