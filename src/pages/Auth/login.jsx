import Layout from "../../Components/layout/layout";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config/firebaseconfig";
import { useDispatch,useSelector} from "react-redux";
import {authChecking } from "../../redux/actions/action";

import "./login.css";

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
    const data = useSelector(state=>state)
    console.log(data)
  const dispatch = useDispatch();

  const handleSubmit = async (values,action) => {
    try {
      const user = await signInWithEmailAndPassword(
        Auth,
        values.email,
        values.password
      );
      if(user){
        dispatch(authChecking(true))
      }
    } catch (err) {
      console.log(err);
    }
   action.resetForm()
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
