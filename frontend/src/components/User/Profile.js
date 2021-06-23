import React, { Component } from "react";
import * as UserService from  '../../services/user.service';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}
    };
  }

  componentDidMount(){
    if(localStorage.getItem('username')){
      UserService.getUserDetails().then( res => {
          this.setState({currentUser: res.data});
      })
    }
  }

  render() {

    return (
      <>
        {localStorage.getItem('token') ?
        <div className="containerH">
          <header className="jumbotron">
            <h3>
            Profile
              <strong></strong> 
            </h3>
          </header>
          <p>
            <strong>Username:</strong>
            {localStorage.getItem("username")}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {this.state.currentUser.email}
          </p>
          <p>
            <strong>Mobile:</strong>{" "}
            {this.state.currentUser.mobile}
          </p>
        </div>
      :
        <div><h>You are not authorized!!!</h></div>
      }
      </>
    );
  }
}
