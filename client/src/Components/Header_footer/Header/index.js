import React, { Component } from 'react';
import logo from '../../../images/logo.png';

class Header extends Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <img src={logo} alt="Logo" className="logo"/>
                        <div className="logo">
                        
                            </div>
                                </div>
                                    <div className="right">
                                        <div className="top">
                                        Links
                                        
                                    </div>
                                <div className="bottom">
                                        Links
                            </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;