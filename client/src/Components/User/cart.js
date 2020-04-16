import React, { Component } from 'react';
import Userlayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';

import {connect} from 'react-redux';
import {getCartItems} from '../../actions/user_actions';

// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faFrown from '@fortawesome/react-fontawesome-free-solid/faFrown'
// import faSmile from '@fortawesome/react-fontawesome-free-solid/faSmile'

class UserCart extends Component {


    state ={
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,

    }

    componentDidMount(){
        var cartItems = [];
        var user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){


                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                });

                    this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(()=>{

                    })


            }
        }
    }


    removeFromCart = () => {

    }


    render() {
        return (
            <Userlayout>
                <h1>My Cart</h1>
                <div className="user_cart">
                    <UserProductBlock
                        products={this.props.user}
                        type="cart"
                        removeItem={(id)=> this.removeFromCart(id)}
                    />

                </div>
            </Userlayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);