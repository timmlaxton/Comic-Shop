import React, { Component } from 'react';
import Userlayout from '../../hoc/user';

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
        var cartItem = [];
        var user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){


                user.userData.cart.forEach(item=>{
                    cartItem.push(item.id)
                });

                    this.props.dispatch(getCartItems(cartItem, user.userData.cart))
                    .then(()=>{

                    })


            }
        }
    }





    render() {
        return (
            <Userlayout>
                cart
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