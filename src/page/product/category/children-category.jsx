import React from 'react';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'

import PageTitle    from 'components/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _product      = new Product();



class DeepCategoryList extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.match.params)
        this.state={
            id:this.props.match.params.pid,
        }
    }
    loadDeepCList(){
        _product.getDeepCategoryList(this.state.id).then((res)=>{
            console.log(res)
        })
    }
    componentDidMount(){
        this.loadDeepCList();
    }
    render(){
        return(
            <div id='page-wrapper'>111</div>
        )
    }
}
export default DeepCategoryList;