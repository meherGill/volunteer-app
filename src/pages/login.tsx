import Link from "next/link";
import type { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef } from "react";

const URL_TO_LOGIN = "http://localhost:3000/api/account/login";

const Login: NextPage = () => {
  const router = useRouter();
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleLogin = (): Promise<void> => {
    const checkboxVal = checkboxRef.current?.checked;
	console.log(checkboxVal)
    const JSONObject = {
      email: (document.querySelector("#login_email") as HTMLInputElement).value,
      password: (document.querySelector("#login_password") as HTMLInputElement)
        .value,
      isOrg: checkboxVal,
    };
    console.log(JSONObject);
    return axios.post(URL_TO_LOGIN, JSONObject).then((val) => {
      console.log(val);
      if (val.status === 200) {
        console.log("wowowo");
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("accountType", val.data.accountType);
        let responseJson = val.data;
        localStorage.setItem("userData", JSON.stringify(responseJson));

        if (val.data.accountType === "volunteer") {
          console.log("hmm");
          router.push("/VolunteerHome");
        } else {
          router.push("/OrganisationHome");
        }
      } else {
        localStorage.clear();
      }
    });
  };


  return(
	<div className="w-screen h-screen flex justify-center items-center">
		<div className="flex flex-col justify-center items-center">
			<img src="/logo.svg" className="w-10 h-10">
			</img>
			<h1 className="text-gray-800 text-bold text-3xl mb-5">Sign In</h1>
			<div className="w-screen m-3 flex justify-center max-w-md">
				<input id="login_email" className="input input-bordered bg-slate-100 w-10/12" placeholder="Email"></input>
			</div>
			<div className="w-screen m-3 flex justify-center max-w-md">
				<input type="password" id="login_password" className="input input-bordered bg-slate-100 w-10/12" placeholder="Password"></input>
			</div>
			<div className="flex justify-around">
				<label className="label-text mr-3">Organisation</label>
				<input ref={checkboxRef} type="checkbox" className="checkbox ml-3 checkbox-accent"></input>
			</div>
			<div className="w-screen m-3 flex justify-center max-w-md">
				<button onClick={handleLogin} className="btn w-10/12 bg-gradient-to-r from-accent to-neutral">
					Sign In
				</button>	
			</div>
			<p className="pt-5 text-center">
				Don't have an account?<br/>
					<Link href="/register"><a className="link link-primary">Register</a></Link><br/>
					instead
			</p>
		</div>
	</div>
  )
}

export default Login;
