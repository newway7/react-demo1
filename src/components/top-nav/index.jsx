import React from "react";
import { Link } from "react-router-dom";
import mm from "util/mm.jsx";
import User from "service/user-service.jsx";


const _user = new User();
const _mm = new mm();
class TopNav extends React.Component {
  constructor(props) {
    super(props);
    var userInfo = _mm.getStorage("userInfo");
    this.state = {
      username: userInfo.username
    };
  }

  logOut() {
    _user.logout().then(res=>{
        _mm.removeStorage("userInfo");//删除保存值；
        window.location.href='/#/login'
    },err=>{
        _mm.errorTips(errMsg);
    })
    

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default top-navbar" role="navigation">
          <div className="navbar-header">
            <Link className="navbar-brand" to="index.html">
              <b>TEST</b>REACT
            </Link>
          </div>

          <ul className="nav navbar-top-links navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" aria-expanded="false">
                <i className="fa fa-user fa-fw"></i>
                {this.state.username ? (
                  <span>欢迎，{this.state.username}</span>
                ) : (
                  <span>欢迎您</span>
                )}
                <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown-menu dropdown-user" onClick={this.logOut}>
                <li>
                  <a href="#">
                    <i className="fa fa-sign-out fa-fw"></i> 退出
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default TopNav;
