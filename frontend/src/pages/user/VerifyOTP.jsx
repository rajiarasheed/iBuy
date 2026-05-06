import React, { memo, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resendOtp, verifyOtp } from '../../services/authService'

const VerifyOTP = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const email=location.state?.email;
    const [otp,setOtp]=useState(["","","","","",""]);
    const [loading,setLoading]=useState(false);
    const handleChange=(value,index)=>{
        if(!/^\d*$/.test(value))return;

        const newOtp=[...otp];
        newOtp[index]=value;
        setOtp(newOtp)

        // auto focus
        if (value&&index<5) {
            document.getElementById(`otp-${index+1}`).focus()
        }
    }

    // resend otp
    const handleResendOtp = async () => {
        try {
          await resendOtp({ email });
          toast.success("New OTP sent!");
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to resend OTP");
        }
      };

    // handleSubmit
    const handleSubmit=useCallback(async()=>{
        const finalOtp=otp.join("")

        if(finalOtp.length!==6){
            toast.error("Enter complete otp")
            return
        }
        setLoading(true)
        try {
            await verifyOtp({email,otp:finalOtp})
            toast.success("OTP verified successfully!")
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Invalid otp')
        }finally{
            setLoading(false)
        }
    },[otp,email,navigate])

  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#F83758] to-[#ff6b81]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
            <p className='text-gray-500 mb-6'>Enter the 6-digit code sent to your email</p>

            {/* otp box */}
            <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit,index)=>(
                    <input key={index}
                     value={digit} 
                     id={`otp-${index}`} 
                     onChange={(e)=>handleChange(e.target.value,index)}
                     maxLength={1}
                     className='w-10 h-12 border rounded-lg text-center focus:ring-2 focus:ring-[#F83758] outline-none focus:border-0'
                     />
                ))}
            </div>

            <div className="text-right mb-3">
              <span
                className="text-sm text-[#F83758] cursor-pointer hover:underline"
                onClick={handleResendOtp}
              >
                Resend otp
              </span>
            </div>

            {/* button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#F83758] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </div>
    </div>
  )
}

export default memo(VerifyOTP)