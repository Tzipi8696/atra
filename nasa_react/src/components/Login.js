import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NavBar from "./NavBar"
import userService from "../services/UserService";
import { connect } from 'react-redux';
import { actions } from "../redux/actions"
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const mapDispatchToProps = (dispatch) => ({
    setUserName: (name) => dispatch(actions.setUserName(name)),
})

export default connect(null, mapDispatchToProps)(withRouter(function Login(props) {
    
    const login = async (values) => {
        try {
            const data = await userService.login(values);
            if (data.token === "") {
                alert("One of the details is incorrect!")
            }
            else {
                localStorage.setItem("token", data.token);
                props.setUserName(values.name);
                props.history.push("/mainRouter/home");
            }
        } catch (err) {
            console.log("err", err);
        }
    }

    const LoginSchema = Yup.object().shape(
        {
            name: Yup.string().required("this field is required!"),
            password: Yup.string().required("this field is required!").min(4, "The password must be at least 4 characters long")
        }
    )

    return (
        <>
            <NavBar status="login"></NavBar>
            <div className="m-3" style={{ backgroundColor: "lightgray", width: "30%", height: "70vh", border: "solid gray", display: "inline-block" }}>
                <br></br>
                <h1>Welcome!!</h1>
                <Formik
                    initialValues={{ name: '', password: '' }}
                    onSubmit={login}
                    validationSchema={LoginSchema}>
                    <Form className="col-10" style={{ margin: "auto" }}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" className="form-control" name="name" id="name" placeholder="Enter Name" ></Field>
                            <ErrorMessage name="name" component="div" className="alert alert-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" className="form-control" name="password" id="password" placeholder="Enter Password" ></Field>
                            <ErrorMessage name="password" component="div" className="alert alert-danger" />
                        </div>
                        <button type="submit" className="btn btn-secondary mt-5" >Log in</button>
                    </Form>
                </Formik>
            </div>
            <div>
                <h5>Not registered yet? </h5>
                <Link to="/register"> Sign up here</Link>
            </div>
        </>
    )
}))
