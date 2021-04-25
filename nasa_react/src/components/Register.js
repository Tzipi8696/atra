import React from 'react';
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar';
import userService from '../services/UserService'
import { connect } from 'react-redux';
import { actions } from "../redux/actions"
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const mapDispatchToProps = (dispatch) => ({
    setUserName: (name) => dispatch(actions.setUserName(name)),
})

export default connect(null, mapDispatchToProps)(withRouter(function Register(props) {

    const register = async (values) => {
        try {
            const data = await userService.register(values);
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                props.setUserName(values.name);
                props.history.push("/mainRouter/home")
            }
            else {
                alert("sorry")
            }
        } catch (err) {
            console.log("err", err);
        }
    }

    const RegisterSchema = Yup.object().shape(
        {
            name: Yup.string()
                .required("This field is required!"),
            password: Yup.string()
                .required("This field is required!")
                .min(4, "The password must be at least 4 characters long!"),
            email: Yup.string()
                .required("This field is required!")
                .email("The email is invalid!")
        }
    )

    return (
        <>
            <NavBar status="sign up"></NavBar>
            <div className="m-5" style={{ backgroundColor: "lightgray", width: "40%", height: "70vh", border: "solid gray", display: "inline-block" }}>
                <br></br>
                <h1>Welcome! Please enter your details:</h1>
                <Formik
                    initialValues={{ name: '', password: '', email: '' }}
                    onSubmit={register}
                    validationSchema={RegisterSchema}>
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
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" className="form-control" name="email" id="email" placeholder="Enter Email" ></Field>
                            <ErrorMessage name="email" component="div" className="alert alert-danger" />
                        </div>
                        <button type="submit" className="btn btn-secondary " >Sign up</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}))