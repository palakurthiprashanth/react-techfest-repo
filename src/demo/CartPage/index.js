import React, { Component } from 'react';
import CartItem from '../CartItem';
import { connect } from 'react-redux';

class CartPage extends Component {
  render(){
    return(
      <div>
        { this.props.cartDetails.map((product)=>{
          return <CartItem key={product.id} product={product.product}/>  
        })}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    cartDetails : state.CartDetailsReducer
  }
}

export default connect(mapStateToProps,null)(CartPage);