import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import {
    Header,
    Footer,
} from "components/layouts"

import {
    Home,
    Account,
    ProudctDetail,
    Checkout,
    CheckoutSuccess,
    Search,
    AboutUs
} from "./index";


function NotFound() {
    return(
        <Redirect to="/not-found" />
    )
}

class ClientApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="Client-App">
                <Header />
                <Switch>
                    <Route exact path="/my-account" component={Account} />
                    <Route exact path="/product/:product_name" component={ProudctDetail} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/checkout-success" component={CheckoutSuccess} />
                    <Route exact path="/search/:keyword" component={Search} />
                    <Route exact path="/about-us" component={AboutUs} />

                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default ClientApp;