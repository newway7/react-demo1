import React          from "react";
import ReactDOM       from "react-dom";

import Layout         from "components/layout/index.jsx";

import ErrorPage      from "page/error/index.jsx";
import Login          from "page/login/index.jsx";
import UserList       from "page/user/index.jsx"
import Home           from "page/home/index.jsx";

import OrderList      from 'page/order/index.jsx';
import OrderDetail    from 'page/order/detail.jsx';


import ProductRouter  from 'page/product/router.jsx'
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  render(){
      let LayoutRouter = (
          <Layout> 
              <Switch>
                   <Route exact path="/" component={Home}/>
                   
                   <Route path="/user/index" component={UserList}/>
                   <Route path='/product' component={ProductRouter}/>
                   <Redirect exact from="/user" to="/user/index"/> 
                   <Redirect exact from="/order" to="/order/index"/> 
                   
                   <Route path="/order/index" component={OrderList}/>
                   <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                   <Route component={ErrorPage}/>


              </Switch>
          </Layout>
      );
      return (
          <Router>
              <Switch>
                  <Route path="/login" component={Login}/>
                  <Route  path="/" render={ props => LayoutRouter}/>
              </Switch>
          </Router>
      )
  }
}



ReactDOM.render(<App />, document.getElementById("root"));














