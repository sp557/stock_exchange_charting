import {React, Component} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import * as UserService from  '../../services/user.service';

import * as AuthService from  '../../services/auth.service';
  
export default class HeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
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

  handleLogOut(e) {
    e.preventDefault();

    this.setState({
      currentUser: {}
    });

      AuthService.logout();
      window.location.reload();
  }

  render(){
  return (
    <>
      <Nav>
        <Bars />
        {this.state.currentUser.username!=null ?
        <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/sector/all' activeStyle>
            Sectors
          </NavLink>
          <NavLink to='/company/all' activeStyle>
            Companies
          </NavLink>
          <NavLink to='/exchanges/all' activeStyle>
            Stock Exchanges
          </NavLink>
          <NavLink to='/ipo/all' activeStyle>
            Planned IPOs
          </NavLink>
          <NavLink to='/stocks/all' activeStyle>
            All Stocks
          </NavLink>
          <NavLink to='/profile' activeStyle>
            Welcome {localStorage.getItem('username')}
          </NavLink>
          {this.state.currentUser.isAdmin==="YES"?
          <NavLink to='/excel/upload' activeStyle>
            Upload Excel Stock Data
          </NavLink>
          :
          <NavLink to='/compareCharts' activeStyle>
            View Comparison Charts
          </NavLink>
        }
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          <NavBtn>
            <NavBtnLink to="/home" onClick={this.handleLogOut}>Sign Out</NavBtnLink>
          </NavBtn>
        </NavMenu>
        
          
        :
          <span>
            <NavMenu>
            <NavLink to='/home' activeStyle>
            Home
            </NavLink>
            
            <NavBtn>
              <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
            <NavBtn>
              <NavBtnLink to='/register'>Sign Up</NavBtnLink>
            </NavBtn>
            </NavMenu>
          </span>
        }
      </Nav>
    </>
  );
  }
};
  