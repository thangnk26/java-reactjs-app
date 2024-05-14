import { useState } from 'react';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '~/firebase';
import Loading from '../loading';
function LoginPhone({ setShowLoginPhone }) {
    const [phone, setPhone] = useState('+84');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getOTP = () => {
        setIsLoading(true);
        window.recaptchaVerifier = new RecaptchaVerifier(
            'sign-in-button',
            {
                size: 'invisible',
                callback: (response) => {
                    console.log('phone');
                },
            },
            auth,
        );

        let appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, '+84385078386', appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                alert('OTP đã được gửi tới số điện thoại bạn');
                // ...
            })
            .catch((error) => {
                console.log(error);
                // Error; SMS not sent
                // ...
            });
        setIsLoading(false);
    };
    const handleLoginPhone = () => {
        setIsLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                const user = result.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        setIsLoading(false);
    };
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10"
            onClick={() => setShowLoginPhone(false)}
        >
            {isLoading && <Loading />}
            <div className="sign-in-button"></div>
            <div className="bg-white min-w-[500px] rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
                <div className="my-4">
                    <label htmlFor="email" className="text-sky-500 font-semibold">
                        Số điện thoại <span className="text-red-700">*</span>
                    </label>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            className="flex-1 border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button
                            className="p-2 text-center uppercase bg-sky-800 text-white hover:opacity-90"
                            onClick={getOTP}
                        >
                            Lấy OTP
                        </button>
                    </div>
                    {/* <span className="text-sm text-red-600">abc</span> */}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-sky-500 font-semibold">
                        OTP <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {/* {false && <span className="text-sm text-red-600">abc</span>} */}
                </div>
                <div>
                    <button
                        className="w-full p-2 text-center uppercase bg-sky-800 text-white hover:opacity-90"
                        onClick={handleLoginPhone}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPhone;
