import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotions'

import {connect} from 'react-redux';
import { getProductsBySell, getProductsByArrival} from '../../actions/products_actions'


class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromotion/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.prop
    }
}

export default connect(mapStateToProps)(Home);