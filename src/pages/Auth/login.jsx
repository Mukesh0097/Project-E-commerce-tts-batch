import Layout from "../../Components/layout/layout";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config/firebaseconfig";
import "./login.css";
import { authChecking } from "../../redux/actions/action";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimum eight characters, at least one letter and one number"
    )
    .required("Required"),
});

const Login = () => {
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, action) => {
    try {
      const data = await signInWithEmailAndPassword(
        Auth,
        values.email,
        values.password
      );
      if (data) {
        localStorage.setItem("user", data.user.accessToken);
        const token = localStorage.getItem("user");
        if (token) {
          dispatch(authChecking(true));
        }
        Navigation("/");
      }
    } catch (err) {
      console.log(err);
      setloginModeError((prev) => {
        return { ...prev, message: err.message, isError: true };
      });
    }
    action.resetForm();
  };
  return (
    <>
      <Header />
      <Layout>
        <div className="container mt-5">
          <div className="row loginlayout">
            <div id="loginform " className="col-md-6 ps-0">
              <h2 className="ps-4">Login</h2>
              <div className="divider d-flex align-items-center my-3 "></div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label className="text form-label ">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue
                          id="form2Example3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link to="{/}">Forgot password?</Link>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 mt-5"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                    </div>
                    {loginModeError.isError && (
                      <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                        {loginModeError.message.substring(
                          22,
                          loginModeError.message.length - 2
                        )}
                      </p>
                    )}

                    <div className="mb-3 mt-3 text-center">
                      Don't have an account?{" "}
                      <span>
                        <Link
                          to={"/Register"}
                          className="link-underline text-danger link-underline-opacity-0   fw-medium "
                        >
                          Register account
                        </Link>
                      </span>
                    </div>
                    {/* login */}
                    <div className="text-center">
                      <p className="fs-5">or sign up with:</p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-4 icon"
                      >
                        <FaFacebookF />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-4 icon"
                      >
                        <FaGoogle />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-4 icon"
                      >
                        <FaTwitter />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-4 icon"
                      >
                        <FaGithub />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-md-6 mt-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt=""
                width={"100%"}
                height={"90%"}
              />
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Login;
