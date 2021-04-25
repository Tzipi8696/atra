import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from "../redux/actions"

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUserName: (name) => dispatch(actions.setUserName(name)),
})


export default connect(mapStateToProps, mapDispatchToProps)(function Menu(props) {

    const logout = (e) => {
        props.setUserName("");
        localStorage.removeItem("token");
    }
 
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand btn btn-secondary" to="/mainRouter/home">
                    Picture of the Day</Link>
                <Link className="navbar-brand btn btn-secondary" to="/mainRouter/history">
                    My History</Link>
                <Link className="navbar-brand btn btn-secondary" to="/mainRouter/createImage">
                    Add a Picture</Link>
                <Link className="navbar-brand btn btn-secondary" onClick={(e) => { logout(e) }} to="/login">
                    Log out</Link>
                <div className="navbar-brand" style={{ marginLeft: "30vw" }}>{`Hello ${props.user.name}`}</div>
            </nav>
        </div>
    )
})