import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoginForm from "./login";
import { Link, withRouter } from "react-router-dom";

function signUpForm(props) {
  const history = props.history;
  function handleSubmit(values, actions) {
    console.log(values);
    debugger;
    axios
      .post(
        "https://african-marketplace-2020.herokuapp.com/api/auth/register",
        {
          ...values,
          profile_pic_url: ""
        }
      )
      .then(response => {
        debugger;
        history.push("/login");

        console.log(response.data);

        actions.resetForm();
      })
      .catch(error => console.log(error.response.data))
      .finally(() => {
        console.log("done");
      });
  }

  return (
    <div className='LoginForm'>
      <h1>Africa MarketPlace SignUp Form</h1>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialState}>
        <Form>
          <ErrorMessage name='username' component='div' className='error' />
          <label htmlFor='user_username'>Username</label>
          <Field
            type='text'
            id='user_username'
            name='username'
            placeholder='Enter your username here'
          />

          <ErrorMessage name='password' component='div' className='error' />
          <label htmlFor='user_password'>Password</label>
          <Field
            type='password'
            id='user_password'
            name='password'
            placeholder='Enter your password here'
          />
          <button type='submit'>SignUp</button>
          {/* <p>
            Not register yet? <br />
            <Link to='/signUp'> Register here </Link>
          </p> */}
        </Form>
      </Formik>
    </div>
  );
}
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a username"),
  password: Yup.string().required("Please enter a password")
});
const initialState = {
  username: "",
  password: ""
};

export default withRouter(signUpForm);
