import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { userContext } from "../../context/userContext";
import AddProduct from "../addProduct";

function LoginForm(props) {
  const history = props.history;
  const [IdUser, setIdUser] = useState(null);

  function handleSubmit(values, actions) {
    console.log(values);
    axios
      .post("https://african-marketplace-2020.herokuapp.com/api/auth/login", {
        ...values,
        profile_pic_url: ""
      })

      .then(response => {
        debugger;
        const token = response.data.token;
        debugger;
        localStorage.setItem("token", token);
        setIdUser(response.data.user_id);

        debugger;

        console.log(response.data);
        history.push("/Products");
        actions.resetForm();
      })
      .catch(error => console.log(error.response.data))
      .finally(() => {
        console.log("done");
      });
  }
  const obj = { IdUser };
  debugger;
  return (
    <div className='LoginForm'>
      <h1>Africa MarketPlace LoginForm</h1>
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
          <button type='submit'>Log-in</button>
          {/* <p>
            Not register yet? <br />
            <Link to='/signUp'> Register here </Link>
          </p> */}
        </Form>
      </Formik>
      <userContext.Provider value={obj}>
        <AddProduct />
      </userContext.Provider>
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

export default withRouter(LoginForm);
