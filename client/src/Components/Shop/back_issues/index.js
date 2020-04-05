import React, { Component } from 'react';
import PageTop from '../../utils/page_top';

import {publishers, price} from '../../utils/Form/fixed_catergories';

import {connect} from 'react-redux';
import { getCharacters, getArticles, getPublishers, getGenres} from '../../../actions/products_actions';

import CollapseCheckbox from '../../utils/collapseCheckbox';
import CollapseRadio from '../../utils/collapseRadio'

class BackIssues extends Component {

    state = {
        grid: '',
        limit:6,
        skip:0,
        filters:{
            articles:[],
            publishers:[],
            price:[]
        }
    }


    componentDidMount(){
        this.props.dispatch(getCharacters());
        this.props.dispatch(getArticles());
        this.props.dispatch(getPublishers());
        this.props.dispatch(getGenres());
    }

    handlePrice = (value) => {
        const data = price;
        var array = [];

        for(var key in data){
            if(data[key]._id === parseInt(value,10)){
                array =  data[key].array
            }
        }
        return array;
    }

    handleFilters = (filters,catergory) => {
            const newFilters = {...this.state.filters}
            newFilters[catergory] = filters;

            if(catergory === 'price'){
                var priceValues = this.handlePrice(filters);
                newFilters[catergory] = priceValues;

            }

            this.setState({
                filters: newFilters
            })
    }


    render() {
        const products = this.props.products;
        return (
            <div>
                <PageTop
                title=" Back Issues"
                
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                           <CollapseCheckbox
                            initState={true}
                            title="Title"
                            list={products.articles}
                            handleFilters={(filters)=> this.handleFilters(filters, 'articles')}
                           /> 

                            <CollapseCheckbox
                            initState={false}
                            title="Publisher"
                            list={publishers}
                            handleFilters={(filters)=> this.handleFilters(filters, 'publishers')}
                           /> 

                            <CollapseRadio
                            initState={true}
                            title="Price"
                            list={price}
                            handleFilters={(filters)=> this.handleFilters(filters, 'price')}
                           /> 



                        </div>
                        <div className="right">
                            RIGHT
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}



export default connect(mapStateToProps)(BackIssues);