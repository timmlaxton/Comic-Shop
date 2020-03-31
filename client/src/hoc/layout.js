import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="page_container">
                    {this.props.children}

                </div>
            </div>
        );
    }
}

export default Layout;