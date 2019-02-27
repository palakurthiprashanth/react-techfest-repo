import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts , fetchOrderTotal } from '../../store/actions';
import ProductItem from '../ProductItem';
import CartPage from '../CartPage';
import Categories from '../categories';
import ListGridToggle from '../ListGridToggle';
import Pagination from "react-js-pagination";
import './plp.css';

class PlpPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      productsList : this.props.productsList,
      activePage:1,
      hasMore:true
    }
  }
  componentWillMount() {
    this.props.fetchProducts().then(()=>{
    //  this.handlePageChange(1);
    });
    this.props.fetchOrderTotal();
  }

  componentWillReceiveProps(nextprops) {
     this.setState({
        productsList: nextprops.productsList ? nextprops.productsList : [],
        pageNo: 1,
        hasMore: true
      })
  }

  renderProducts(){
    return (
       <div className="row">
        <ListGridToggle/>
          {this.state.productsList.length ? this.state.productsList.map(product =>{
            return <ProductItem key={product.id} product={product}/>
          }): this.renderProduct()
          }
       </div>
    );
  }

  renderProduct(){
    return (
      <div className="row">
        {this.state.productsList.id ? <ProductItem key={this.state.productsList.id} product={this.state.productsList}/> : ''}
      </div>
    );
  }

  handlePageChange(pageNumber){
    debugger;
    this.setState({
      productsList: this.state.productsList.slice((pageNumber-1)*5 ,  Math.min(((pageNumber-1)*5) + 5 - 1, this.state.productsList.length - 1))
    })
  }

  render() {
    
    return(
      <div className="container product-wrapper">
      <Categories/>
      <div className="col-md-8 col-md-offset-1">
         { this.renderProducts()}
      </div>
       <div>  
      {/*<hr/>
         Total :  { this.props.totalPrice }
         */}
       </div>
         {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={this.state.productsList.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
       */ }
      </div>
   
    );
  }
}

 function mapStateToProps(state){
    return {
      productsList: Object.assign([],state.FetchProductsReducer),
      totalPrice : state.FetchOrderTotalReducer
    }
 }


export default connect(mapStateToProps,{ fetchProducts , fetchOrderTotal })(PlpPage);