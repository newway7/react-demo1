import React from "react";
import "./index.scss";
import MUtil from "util/mm.jsx";
import User from "service/user-service.jsx";

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: _mm.getUrlParam('redirect') || '/'
    };
  }
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }
  // 当用户名发生改变
  onInputChange(e) {
    let inputValue = e.target.value,
      inputName = e.target.name;
    console.log(inputName);
    this.setState({
      [inputName]: inputValue
    });
  }
  onSubmit() {
    let loginInfo = {
        username: this.state.username,
        password: this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
    // 验证通过
    if (checkResult.status) {
      _user.login(loginInfo).then(
        res => {//成功状态；
         
          _mm.setStorage('userInfo', res);
          this.props.history.push(this.state.redirect);
        },
        errMsg => {
          _mm.errorTips(errMsg);
        }
      );
    }
    // 验证不通过
    else {
      _mm.errorTips(checkResult.msg);
    }
  }

  render() {
    return (
      <>
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default panel-login">
            <div className="panel-heading">REACT TEST 登陆</div>
            <div className="panel-body">
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="请输入用户名"
                    onKeyUp={e => {
                      this.onInputKeyUp(e);
                    }}
                    onChange={e => this.onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="请输入密码"
                    onKeyUp={e => {
                      this.onInputKeyUp(e);
                    }}
                    onChange={e => this.onInputChange(e)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-block btn-lg btn-primary"
                  onKeyUp={e => {
                    this.onInputKeyUp(e);
                  }}
                  onClick={e => {
                    this.onSubmit(e);
                  }}
                >
                  登陆
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
