import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from "./Menu";
import CreateImage from "./CreateImage"
import Home from "./Home";
import History from "./History";
import { connect } from 'react-redux';
import Login from './Login';

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps,null)(function MainRouter(props) {

    return (
        <div>
            <Menu />
            <Switch>
                <Route path="/mainRouter/home">
                <div className="mt-3">
                        <Home />
                    </div>
                </Route>
                <Route path="/mainRouter/history">
                    <div className="mt-5">
                        <History />
                    </div>
                </Route>
                <Route path="/mainRouter/createImage">
                    <CreateImage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </div>
    )
})