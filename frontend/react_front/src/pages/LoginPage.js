import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BasicBar from "../components/BasicBar";
import axios from "axios";
import { loginDB } from "../LoginValidation"
import store from "../redux_modules/user.js";

const LoginPage = () => {
  const history = useHistory()
  return(
    <div>
      <BasicBar />
      <Formik
        initialValues={{ id: '', password: '' }}
        validationSchema={Yup.object({
          id: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
         
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // setLoginStatus(onLogin(values, loginstatus,history));
            loginDB(values, history);
            setSubmitting(false);
            
          }, 400);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>

           
            <label htmlFor="id">Id</label>
            <input id="id" type="email" {...formik.getFieldProps('id')} />
            {formik.touched.id && formik.errors.id ? (
              <div>{formik.errors.id}</div>
            ) : null}
            <p></p>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <p></p>
            <button type="submit">Submit</button>
            
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
