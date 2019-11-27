import React from "react";

import ProductList from "page/product/index/index.jsx";
import CategoryList from "page/product/category/index.jsx"
import Home from "page/home/index.jsx";
import AddProduct from 'page/product/index/add-product.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import DetailProduct from 'page/product/index/detail.jsx';
import CategoryAdd      from 'page/product/category/add.jsx';
import DeepCategoryList from 'page/product/category/children-category.jsx';

class ProductRouter extends React.Component{
  render(){
      return (
              <Switch>
                  <Route path="/product/index" component={ProductList}/>
                  <Redirect exact from='/product' to='/product/index' />
                  <Route path="/product/category/add" component={CategoryAdd}/>
                  
                  <Route exact path="/product/category" component={CategoryList}/>
                  <Route  path="/product/add/:pid?" component={AddProduct}/>
                  <Route  path="/product/detail/:pid?" component={DetailProduct}/>
              </Switch>
      )
  }
}
export default ProductRouter;



