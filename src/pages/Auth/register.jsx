import Layout from "../../Components/layout/layout"
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import './register.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config/firebaseconfig";

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};
const Register = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: yup.object().shape({
                name: yup
                    .string()
                    .min(4, "minimum 4 chreacter")
                    .max(20)
                    .required("please enter your name"),
                email: yup
                    .string()
                    .email()
                    .required(),
                password: yup
                    .string()
                    .required("please enter your password")
                    .min(8)
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        "At least one letter and one number"
                    ),
                confirmPassword: yup
                    .string()
                    .required("Please ReEnter Your Password")
                    .oneOf([yup.ref("password"), null], "password must not match"),
            }),
            onSubmit: async(values, action) => {
               try{
                const user = await createUserWithEmailAndPassword(Auth,values.email,values.password)
                console.log(user)
               }catch(err){
                console.log(err)
               }
               action.confirmPassword = ""
                action.resetForm();
            },
        });

    return (
        <>
            <Header />
            <Layout>
                <div className="container ">
                    <div className="row shadow-sm p-3 mb-5 bg-body-info rounded">
                        <div className="col-md-6 ">
                            <img width={'100%'} src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fa26ed82102569.5d1352710b828.gif" alt="image" />
                        </div>
                        <div className="col-md-6">
                            <div className="card border-0 g-2">
                                <div className="card-body ">
                                    <form onSubmit={handleSubmit}>
                                        <h2 className="account">Create Account</h2>
                                        <div className="divider d-flex align-items-center my-3 "></div>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter your full name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="abcd1234@gmail.com"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Minimum eight characters password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm password </label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="ReEnter the password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <div className="text-danger">{errors.confirmPassword}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-4">
                                            <input className="form-check-input me-2" type="checkbox" defaultValue id="registerCheck" />
                                            <label className="form-check-label" htmlFor="registerCheck">
                                                I accept the terms of use & privacy policy
                                            </label>
                                        </div>

                                        <div>
                                            <button className="btn btn-primary w-100">Signup</button>
                                        </div>
                                        <div className="mb-3 mt-3 text-center">
                                            Already have an account? <span><Link to={'/Login'} className="link-underline link-underline-opacity-0 fw-medium ">Login</Link></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer />
        </>
    );
};
export default Register;