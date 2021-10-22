import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BasicBar from '../components/BasicBar';
import { useHistory } from 'react-router';
import * as Yup from 'yup'
import axios from 'axios';

//https://velog.io/@roh160308/%EB%A6%AC%EC%95%A1%ED%8A%B8React-Formik-Yup
const SignupForm = () => {
   
    const history = useHistory()

    return (
        
        <div>
            <BasicBar />
            <Formik initialValues={{  id: '', password: '',name: '', telephone: '' }}
                validationSchema={Yup.object({
                    id: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    telephone: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        axios.post('/register', values)
                            .catch(error => {
                                // ... 에러 처리
                                alert(error)
                            });

                        setSubmitting(false);
                    }, 400);
                }}>
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="id">ID</label>
                        <input
                            id="id"
                            type="email"
                            {...formik.getFieldProps('id')}
                        />
                {formik.touched.id && formik.errors.id ? (<div>{formik.errors.id}</div>) : null}
                        <p></p>
                        <label htmlFor="password">PW</label>
                        <input
                            id="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                        <p></p>
           
                        <label htmlFor="name">name</label>
                        <input
                            id="name"
                            type="text"
                            {...formik.getFieldProps('name')}
                        />
                {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}
                        <p></p>
                        <label htmlFor="telephone">telephone</label>
                        <input
                            id="telephone"
                            type="text"
                            {...formik.getFieldProps('telephone')}
                        />
                {formik.touched.telephone && formik.errors.telephone ? (<div>{formik.errors.telephone}</div>) : null}
                        <button type="submit">Submit</button>
                    </form>)}

            </Formik>
            </div>
    )

}

export default SignupForm;
