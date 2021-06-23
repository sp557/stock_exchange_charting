import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './Footer/FooterComponent';
import LandingComponent from './LandingComponent.js';
import ListEmployeeComponent from './Company/ListCompanyComponent';
import CreateEmployeeComponent from './Company/CreateCompanyComponent';
import UpdateEmployeeComponent from './Company/UpdateCompanyComponent';
import ViewEmployeeComponent from './Company/ViewCompanyComponent';
import ListExchangeComponent from './Exchanges/ListExchangeComponent';
import CreateExchangeComponent from './Exchanges/CreateExchangeComponent';
import UpdateExchangeComponent from './Exchanges/UpdateExchangeComponent';
import ViewExchangeComponent from './Exchanges/ViewExchangeComponent';
import ListIpoComponent from './Ipos/ListIpoComponent';
import CreateIpoComponent from './Ipos/CreateIpoComponent';
import UpdateIpoComponent from './Ipos/UpdateIpoComponent';
import ViewIpoComponent from './Ipos/ViewIpoComponent';
import ListSectorComponent from './Sectors/ListSectorComponent';
import CreateSectorComponent from './Sectors/CreateSectorComponent';
import UpdateSectorComponent from './Sectors/UpdateSectorComponent';
import ViewSectorComponent from './Sectors/ViewSectorComponent';
import ListStockComponent from './Stocks/ListStockComponent';
import CreateStockComponent from './Stocks/CreateStockComponent';
import UpdateStockComponent from './Stocks/UpdateStockComponent';
import ViewStockComponent from './Stocks/ViewStockComponent';
import Login from './User/Login';
import Register from './User/Register';
import Profile from './User/Profile';
import ExcelUploadComponent from './ExcelUpload/ExcelUploader';
import ChartComponent from './ChartComponent';
import './styling2.css';

class Main extends Component {
  render(){

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        localStorage.getItem('token')
          ? <Component {...props} />
          : 
          <div>
            <Redirect to="/home"/>
          </div>
      )} />
    );

  return (
    <div>
      <HeaderComponent />
      <Switch> 
          <Route path = "/home" exact component = {LandingComponent}></Route>
          <PrivateRoute path = "/company/all" component = {ListEmployeeComponent}/>
          <PrivateRoute path = "/company/new" component = {CreateEmployeeComponent}/>
          <PrivateRoute path = "/company/:id/show" component = {ViewEmployeeComponent}/>
          <PrivateRoute path = "/company/:id/edit" component = {UpdateEmployeeComponent}/>
          <PrivateRoute path = "/sector/all" component = {ListSectorComponent}/>
          <PrivateRoute path = "/sector/new" component = {CreateSectorComponent}/>
          <PrivateRoute path = "/sector/:id/show" component = {ViewSectorComponent}/>
          <PrivateRoute path = "/sector/:id/edit" component = {UpdateSectorComponent}/>
          <PrivateRoute path = "/exchanges/all" component = {ListExchangeComponent}/>
          <PrivateRoute path = "/exchanges/new" component = {CreateExchangeComponent}/>
          <PrivateRoute path = "/exchanges/:id/show" component = {ViewExchangeComponent}/>
          <PrivateRoute path = "/exchanges/:id/edit" component = {UpdateExchangeComponent}/>
          <PrivateRoute path = "/ipo/all" component = {ListIpoComponent}/>
          <PrivateRoute path = "/ipo/new" component = {CreateIpoComponent}/>
          <PrivateRoute path = "/ipo/:id/show" component = {ViewIpoComponent}/>
          <PrivateRoute path = "/ipo/:id/edit" component = {UpdateIpoComponent}/>
          <PrivateRoute path = "/stocks/all" component = {ListStockComponent}/>
          <PrivateRoute path = "/stocks/new" component = {CreateStockComponent}/>
          <PrivateRoute path = "/stocks/:id/show" component = {ViewStockComponent}/>
          <PrivateRoute path = "/stocks/:id/edit" component = {UpdateStockComponent}/>
          <PrivateRoute path = "/excel/upload" component = {ExcelUploadComponent}/>
          <PrivateRoute path = '/profile' component = {Profile}/>
          <PrivateRoute path = '/compareCharts' component={ChartComponent}/>
          <Route path = '/signin' component = {Login}></Route>
          <Route path = '/register' component = {Register}></Route>
      </Switch>
      <FooterComponent/>
    </div>
    
  );
}
}

export default Main;
