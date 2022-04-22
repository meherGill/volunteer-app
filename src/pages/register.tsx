import axios from 'axios';
import type { NextPage } from 'next'
import Router from 'next/router';
import React, { useState, useRef, useEffect, RefObject } from 'react';

const URL_TO_REGISTER_VOLUNTEER = "http://localhost:3000/api/account/user"
const URL_TO_REGISTER_ORGANISATION = "http://localhost:3000/api/account/business"

const Register : NextPage = () => {

    const [context, setContext] = useState("");
    const volunteerElem = useRef<HTMLHeadingElement>(null);
    const orgElem = useRef<HTMLHeadingElement>(null);
    const checkboxRef = useRef(null);

    const switchContext = () => {
        // console.log(newContext)
        if (context === "Volunteer"){
            setContext("Organisation")
        }
        else{
            setContext("Volunteer")
        }
    }

    // useEffect(() => {
    //     let newRef : RefObject<HTMLHeadingElement>;
    //     let oldRef : RefObject<HTMLHeadingElement>;
    //     if (context === "Volunteer"){
    //         newRef = volunteerElem
    //         oldRef = orgElem
    //     }
    //     else if(context === "Organisation"){
    //         newRef = orgElem
    //         oldRef = volunteerElem
    //     }
    //     else if(context === ""){
    //         console.log("first render")
    //         newRef = volunteerElem;
    //         oldRef = orgElem;
    //     }
    //     else{
    //         console.error(`not supposed to happen, context value = ${context}`)
    //         newRef = volunteerElem;
    //         oldRef = orgElem;
    //     }

    //     let newElement = newRef.current as HTMLElement;
    //     newElement.classList.remove("greyedOut");
    //     if (!newElement.classList.contains("selected")){
    //         newElement.classList.add("selected")
    //     }

    //     let oldElement = oldRef.current as HTMLElement;
    //     oldElement.classList.remove("selected");
    //     if (!oldElement.classList.contains("greyedOut")){
    //         oldElement.classList.add("greyedOut")
    //     }
        

    //   }, [context])

    // useEffect(() => {
    //     switchContext()
    // }, [])

    const handleSubmit = () : Promise<void> => {
        if (context === "Volunteer"){
            let objectToSend = {
                "accountType" : "Volunteer",
                "givenName" : (document.querySelector("#vol_givenName") as HTMLInputElement).value,
                "lastName" : (document.querySelector("#vol_lastName") as HTMLInputElement).value,
                "email" : (document.querySelector("#vol_email") as HTMLInputElement).value,
                "password" : (document.querySelector("#vol_password") as HTMLInputElement).value,
                "phone" : (document.querySelector("#vol_phoneNumber") as HTMLInputElement).value,
            }
            console.log(objectToSend);
            // NEED TO REFACTOR THIS
            // NOT DRY
            return axios.post(URL_TO_REGISTER_VOLUNTEER, objectToSend).then((val) => {
                console.log(val)

                if (val.status === 200){
                    alert("User successfully registerd");
                    Router.push("/login")
                }
            }).catch(err => {
                console.log(err);
                alert(`Sorry, there was an error ${err}`)
            })
        }
        else{
            let objectToSend = {
                "accountType" : "Organisation",
                "name" : (document.querySelector("#org_name") as HTMLInputElement).value,
                "type" : "",
                "email" : (document.querySelector("#org_email") as HTMLInputElement).value,
                "password" : (document.querySelector("#org_password") as HTMLInputElement).value,
                "phone" : (document.querySelector("#org_phoneNumber") as HTMLInputElement).value,
                "website" : (document.querySelector("#org_website") as HTMLInputElement).value,
            }
            return axios.post(URL_TO_REGISTER_ORGANISATION, objectToSend).then((val) => {
                console.log(val)
                if (val.status === 200){
                    alert("User successfully registerd");
                    Router.push("/login")
                }
            }).catch(err => {
                console.log(err);
                alert(`Sorry, there was an error ${err}`)
            })
        }
    }

    const showVolunteerInputs = () => {
        return(
            <div className='mt-20 flex flex-col justify-start items-center'>
                <div><img className="w-10 h-10" src="/logo.svg"></img></div>
                <a>or create an organisation account instead</a>
                <div className="w-screen m-1 mt-10 flex justify-center max-w-md">
                    <input id="vol_givenName" className="input input-bordered bg-slate-100 w-10/12" placeholder="Given Name"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="vol_lastName" className="input input-bordered bg-slate-100 w-10/12" placeholder="Last Name"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="vol_email" className="input input-bordered bg-slate-100 w-10/12" placeholder="Email"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="vol_phoneNumber" className="input input-bordered bg-slate-100 w-10/12" placeholder="Phone Number"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="vol_newPassword" className="input input-bordered bg-slate-100 w-10/12" placeholder="New Password"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="vol_confirmPassword" className="input input-bordered bg-slate-100 w-10/12" placeholder="Confirm Password"></input>
                </div>
                <div className="flex justify-around mt-7">
                    <label className="label-text mr-3">I agree to the terms and conditions</label>
                    <input ref={checkboxRef} type="checkbox" className="checkbox ml-3 checkbox-accent"></input>
                </div>
                <div className="w-screen mt-7 flex justify-center max-w-md">
                    <button onClick={handleSubmit} className="btn w-10/12 bg-gradient-to-r from-accent to-neutral">
                        Register
                    </button>	
                </div>
            </div>
          )
    }

    const showOrgInputs = () => {
        return(
            <div className='mt-20 flex flex-col justify-start items-center'>
                <div><img className="w-10 h-10" src="/logo.svg"></img></div>
                <a>or create a volunteer account instead</a>
                <div className="w-screen m-1 mt-10 flex justify-center max-w-md">
                    <input id="org_givenName" className="input input-bordered bg-slate-100 w-10/12" placeholder="Organisation Name"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="org_email" className="input input-bordered bg-slate-100 w-10/12" placeholder="Email"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="org_phoneNumber" className="input input-bordered bg-slate-100 w-10/12" placeholder="Phone Number"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="org_newPassword" className="input input-bordered bg-slate-100 w-10/12" placeholder="New Password"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="org_confirmPassword" className="input input-bordered bg-slate-100 w-10/12" placeholder="Confirm Password"></input>
                </div>
                <div className="w-screen m-1 flex justify-center max-w-md">
                    <input id="org_website" className="input input-bordered bg-slate-100 w-10/12" placeholder="Link to website"></input>
                </div>
                <div className="flex justify-around mt-7">
                    <label className="label-text mr-3">I agree to the terms and conditions</label>
                    <input ref={checkboxRef} type="checkbox" className="checkbox ml-3 checkbox-accent"></input>
                </div>
                <div className="w-screen mt-7 flex justify-center max-w-md">
                    <button onClick={handleSubmit} className="btn w-10/12 bg-gradient-to-r from-accent to-neutral">
                        Register
                    </button>	
                </div>
            </div>
          )
    }
    return(
       <div></div>
      )

    return(
        <div className="w-screen h-screen bg-bg1-500 flex justify-center items-center">
            <div className='w-4/5 h-4/5 bg-bg2-500 rounded-md relative'>
                <div className="flex w-full justify-center">
                    <button onClick={switchContext} className="mr-5 mt-8"><h2 ref={volunteerElem} id="Register_Volunteer" className="text-2xl font-light">VOLUNTEER</h2></button>
                    <button onClick={switchContext} className="ml-5 mt-8"><h2 ref={orgElem} id="Register_Organisation" className="text-2xl font-light">ORGANISATION</h2></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col p-4 justify-center items-center">
                    {context === "Volunteer" ? showVolunteerInputs() : showOrgInputs()}
                    <button className="rounded-md bg-btn-500 p-4 absolute right-8 bottom-3" type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register