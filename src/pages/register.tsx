import axios from 'axios';
import type { NextPage } from 'next'
import React, { useState, useRef, useEffect, RefObject } from 'react';

const URL_TO_REGISTER = "http://localhost:3000/api/account/user"

const Register : NextPage = () => {

    const [context, setContext] = useState("");
    const volunteerElem = useRef<HTMLHeadingElement>(null);
    const orgElem = useRef<HTMLHeadingElement>(null);

    const switchContext = () => {
        // console.log(newContext)
        if (context === "Volunteer"){
            setContext("Organisation")
        }
        else{
            setContext("Volunteer")
        }
    }

    useEffect(() => {
        let newRef : RefObject<HTMLHeadingElement>;
        let oldRef : RefObject<HTMLHeadingElement>;
        if (context === "Volunteer"){
            newRef = volunteerElem
            oldRef = orgElem
        }
        else if(context === "Organisation"){
            newRef = orgElem
            oldRef = volunteerElem
        }
        else if(context === ""){
            console.log("first render")
            newRef = volunteerElem;
            oldRef = orgElem;
        }
        else{
            console.error(`not supposed to happen, context value = ${context}`)
            newRef = volunteerElem;
            oldRef = orgElem;
        }

        let newElement = newRef.current as HTMLElement;
        newElement.classList.remove("greyedOut");
        if (!newElement.classList.contains("selected")){
            newElement.classList.add("selected")
        }

        let oldElement = oldRef.current as HTMLElement;
        oldElement.classList.remove("selected");
        if (!oldElement.classList.contains("greyedOut")){
            oldElement.classList.add("greyedOut")
        }
        

      }, [context])

    useEffect(() => {
        switchContext()
    }, [])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
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
            // const myJSON = JSON.stringify(objectToSend)
            return axios.post(URL_TO_REGISTER, objectToSend).then((val) => {
                console.log(val)
            })
        }
        else{
            let objectToSend = {
                "accountType" : "Organisation",
                "name" : (document.querySelector("#org_name") as HTMLInputElement).value,
                "type" : (document.querySelector("#org_type") as HTMLInputElement).value,
                "email" : (document.querySelector("#org_email") as HTMLInputElement).value,
                "password" : (document.querySelector("#org_password") as HTMLInputElement).value,
                "phone" : (document.querySelector("#org_phoneNumber") as HTMLInputElement).value,
            }
            const myJSON = JSON.stringify(objectToSend)
            return axios.post(URL_TO_REGISTER, myJSON).then((val) => {
                console.log(val)
            })
        }
    }

    const showVolunteerInputs = () => {
        return(
            <>  
                <div className="m-2">
                    <label htmlFor="givenName">Given Name</label><br/>
                    <input id="vol_givenName" className="rounded-sm bg-btn-500" type="text" name="giveName"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="lastName">Last Name</label><br/>
                    <input id="vol_lastName" className="rounded-sm bg-btn-500" type="text" name="lastName"></input>
                </div>
                <div className="m-2">
                    <label htmlFor='email'>Email</label><br/>
                    <input id="vol_email" className="rounded-sm bg-btn-500" type="email" name="email"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="password">Password</label><br/>
                    <input id="vol_password" className="rounded-sm bg-btn-500" type="password" name="password"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="confirmPassword">Confirm Password</label><br/>
                    <input className="rounded-sm bg-btn-500" type="password" name="confirmPassword"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="phoneNumber">phone number</label><br/>
                    <input id="vol_phoneNumber" className="rounded-sm bg-btn-500" type="tel" name="phoneNumber"></input>
                </div>
            </>
        )
    }

    const showOrgInputs = () => {
        return(
            <>  
                <div className="m-2">
                    <label htmlFor="name">Name</label><br/>
                    <input id="org_name" className="rounded-sm bg-btn-500" type="text" name="name"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="business_email">Email</label><br/>
                    <input id="org_email" className="rounded-sm bg-btn-500" type="email" name="business_email"></input>
                </div>
                <div className="m-2">
                    <label htmlFor='type'>Type</label><br/>
                    <input id="org_type" className="rounded-sm bg-btn-500" type="text" name="type"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="website">Website</label><br/>
                    <input id="org_website" className="rounded-sm bg-btn-500" type="text" name="website"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="phoneNumber">phone number</label><br/>
                    <input id="org_phoneNumber" className="rounded-sm bg-btn-500" type="tel" name="phoneNumber"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="business_password">Password</label><br/>
                    <input id="org_password" className="rounded-sm bg-btn-500" type="password" name="business_password"></input>
                </div>
                <div className="m-2">
                    <label htmlFor="business_confirmPassword">Confirm Password</label><br/>
                    <input className="rounded-sm bg-btn-500" type="password" name="business_confirmPassword"></input>
                </div>
            </>
        )
    }
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