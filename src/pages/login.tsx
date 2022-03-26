import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";

const URL_TO_LOGIN = "http://localhost:3000/api/account/login"
const Login: NextPage = () => {
  
	const handleLogin = () : Promise<void> => {
		const checkboxVal = (document.querySelector('#login_isOrgAccount') as HTMLInputElement).checked
		const JSONObject = {
			email : (document.querySelector("#login_email") as HTMLInputElement).value,
			password : (document.querySelector("#login_password") as HTMLInputElement).value,
			accountType: checkboxVal,
		}
		console.log(JSONObject)
		return axios.post(URL_TO_LOGIN, JSONObject).then((val) => {
			console.log(val)
			if (val.status === 200){
				console.log("wowowo")
				localStorage.setItem("authenticated", "true")
				// localStorage.setItem("accountType" , val.)
			}
			else{
				localStorage.setItem("authenticated", "false");
			}
		})
	}

	return (
		<div className="h-screen w-screen bg-bg1-500 flex justify-center items-center">
		<div className="flex flex-col justify-around items-center rounded-md drop-shadow-xl w-150 h-64 bg-bg2-500">
			<h1 className="h-5 text-2xl tracking-wider font-bold text-pFont-500">
			LOGIN
			</h1>
			<div className="text-sFont">
			<div className="w-full flex justify-end mb-2">
				<label htmlFor="email" className="mr-4">
				Email
				</label>
				<input
				type="email"
				name="email"
				className="bg-btn-500 rounded-md text-lFont-500"
				id="login_email"
				></input>
			</div>
			<div className="w-full flex justify-end">
				<label htmlFor="password" className="mr-4">
				Password
				</label>
				<input
				type="password"
				name="password"
				className="bg-btn-500 rounded-md text-lFont-500"
				id="login_password"
				></input>
				
			</div>
			<div className="w-full flex justify-end">
					<label htmlFor="isOrgAccount">Organisation</label>
					<input id="login_isOrgAccount" type="checkbox"></input>
				</div>
			</div>
			
			<div className="flex">
			<button className="bg-btn-500 w-36 h-8 mr-8 rounded-sm">
				<Link href="/register">
				<a>Register</a>
				</Link>
			</button>
			<button className="bg-btn-500 w-36 h-8 ml-8 rounded-sm"
					onClick={handleLogin}>Login</button>
			</div>
		</div>
		</div>
	);
};

export default Login;
