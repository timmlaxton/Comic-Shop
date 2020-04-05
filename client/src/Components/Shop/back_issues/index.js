import React, { Component } from 'react';
import PageTop from '../../utils/page_top';

import {publishers} from '../../utils/Form/fixed_catergories';

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

    handleFilters = (filters,catergory) => {
            const newFilters = {...this.state.filters}
            newFilters[catergory] = filters;

            this.setState({
                filters: newFilters
            })
    }


    render() {
        console.log(this.state.filters)
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
                            title="Comics"
                            list={products.articles}
                            handleFilters={(filters)=> this.handleFilters(filters, 'articles')}
                           /> 

                            <CollapseCheckbox
                            initState={false}
                            title="Publishers"
                            list={publishers}
                            handleFilters={(filters)=> this.handleFilters(filters, 'publishers')}
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