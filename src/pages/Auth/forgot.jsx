import React, { useState } from "react";
import Header from "../../Components/header/header";
import Footer from "../../Components/footer/footer";
import Layout from "../../Components/layout/layout";
import {sendPasswordResetEmail} from "firebase/auth";
import { Auth } from "../../config/firebaseconfig";
import { useNavigate } from "react-router-dom";


const ResetPassword =  ()=>{
    const navigation = useNavigate()
    const [resetModeError, setResetModeError] = useState({
        message: "",
        isError: false,
      });
    const [sendEmail,setSendEmail] = useState({
        isSend:false
    })

    async function submitHandler(e){
        e.preventDefault();
        try{
             await sendPasswordResetEmail(Auth,e.target[0].value)
            setSendEmail((prev)=>{
                return {...prev,isSend:true}
            })
        }catch(err){
             setResetModeError((prev)=>{
                return {...prev,message:err.message,isError:true}
             })
        }

      e.target.reset()

    }

    return <>
        <Header/>
        <Layout>
            <form onSubmit={submitHandler}>
                <label htmlFor="resetPasswordEmail" className="form-label">Email</label>
                <input name="email" id="resetPasswordEmail" placeholder="abc@gmail.com" className="form-control"/>
                <button type="submit" className="btn btn-primary">Primary</button>
            </form>
            {resetModeError.isError ?  
            <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                        {resetModeError.message.substring(
                          22,
                          resetModeError.message.length - 2
                        )}
                      </p>: sendEmail.isSend && <p className="text- text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                        send link to your email
                      </p>
                      }
          
        </Layout>
        <Footer/>
    </>
}

export default ResetPassword;