import React from "react";
import Geocode from "react-geocode";

const GCP_API_KEY = "AIzaSyBFvNDoVEJqDkF_pMJOBBMl97FLhpSJJ6A";

const RequestAid = () => {
    Geocode.setApiKey(GCP_API_KEY)
    
    const handleSubmitForAid = () => {
        
    }
    return(
        <div className="flex justify-center  h-full w-full pt-4">
            <div className="w-4/5 h-4/5 bg-bg2-500 rounded-md shadow-lg">
                <form>
                <div className="flex flex-col justify-center items-center mt-6">
                    <div className="flex flex-col w-11/12">
                        <label className="form-label">Description</label>
                        <textarea className="form-control bg-btn-500 text-sFont-500 placeholder:text-gray-700 border-2 rounded-md p-2 border-bg1-500
                            " 
                        placeholder="Write about your problem here"
                        rows={5}></textarea>
                    </div>
                    <div className="flex flex-col w-11/12 mt-10">
                        <span>
                        <label className="form-label mr-4">Attach Location ?</label><input type="checkbox"></input>
                        </span>
                        <input type="text" className="form-control bg-btn-500 text-sFont-500 placeholder:text-gray-700 border-2 rounded-md p-2 border-bg1-500" 
                        placeholder="Write address here"></input>
                    </div>
                    <button onClick={handleSubmitForAid} className="bg-green-200 p-3 rounded-sm mt-10">
                        SUBMIT REQUEST FOR AID
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default RequestAid