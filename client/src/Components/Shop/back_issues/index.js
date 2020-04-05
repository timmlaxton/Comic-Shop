import React, { Component } from 'react';
import PageTop from '../../utils/page_top';

import {connect} from 'react-redux';
import { getCharacters, getArticles, getPublishers, getGenres} from '../../../actions/products_actions';

import CollapseCheckbox from '../../utils/collapseCheckbox';

class BackIssues extends Component {


    componentDidMount(){
        this.props.dispatch(getCharacters());
        this.props.dispatch(getArticles());
        this.props.dispatch(getPublishers());
        this.props.dispatch(getGenres());
    }

    handleFilters = (filters,catergory) => {

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
                            title="Comics"
                            list={products.articles}
                            handleFilters={(filters)=> this.handleFilters(filters, 'articles')}

                            
                           
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