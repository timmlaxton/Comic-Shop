import React, { Component } from 'react';
import PageTop from '../../utils/page_top';

import {publishers, price} from '../../utils/Form/fixed_catergories';

import {connect} from 'react-redux';
import { getProductsToShop, getCharacters} from '../../../actions/products_actions';

import LoadmoreCards from './loadmoreCards';

import CollapseCheckbox from '../../utils/collapseCheckbox';
import CollapseRadio from '../../utils/collapseRadio'

class BackIssues extends Component {

    state = {
        grid: '',
        limit:6,
        skip:0,
        filters:{
            
            character:[],
            publisher:[],
            price:[]
        }
    }


    componentDidMount(){
        this.props.dispatch(getCharacters());
        this.props.dispatch(getProductsToShop(
            this.state.limit,
            this.state.skip,
            this.state.filters
        ))
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
            this.showFilteredResults(newFilters)
            this.setState({
                filters: newFilters
            })
    }


    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
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
                            list={products.characters}
                            handleFilters={(filters)=> this.handleFilters(filters, 'character')}
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
                            <div className="shop_options">
                                <div className="shop_grids_clear">
                                grids
                            </div>
                        </div>
                        <div>
                            <LoadmoreCards
                                grid={this.state.grid}
                                limit={this.state.limit}
                                size={products.toShopSize}
                                products={products.toShop}
                                loadMore={()=> this.LoadmoreCards()}
                            />
                         </div>
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