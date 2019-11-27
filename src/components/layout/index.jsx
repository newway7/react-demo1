import React from 'react';
import './theme.css';

import SideNav from '../side-nav/index.jsx'
import TopNav from '../top-nav/index.jsx'
import './index.scss'


class Layout extends React.Component{
    render(){
        return (
           <div id='wrapper'>
               <TopNav />
               <SideNav /> 
               {this.props.children}
           </div>
        );

    }
}
export default Layout