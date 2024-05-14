import BackGroundAuth from '~/assets/images/background-auth.jpg';
import Loading from '../loading';
import { useEffect, useRef, useState } from 'react';
import * as userService from '~/service/userService';

import { addValidatorOnBlur, removeValidatorOnInput } from '~/utils/validator';

function ForgotPassword() {
    const inputsRef = useRef([]);
    const messageErrorRef = useRef([]);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        setIsLoading(true);
        const res = await userService.forgotPassword(email);
        setIsLoading(false);
        if (res?.success) {
            alert('Mật khẩu mới đã được gửi tới email của bạn');
        } else {
            alert('Email không tồn tại trên hệ thống');
        }
    };

    useEffect(() => {
        addValidatorOnBlur([
            {
                inputRef: inputsRef.current[0],
                messageErrorRef: messageErrorRef.current[0],
                rules: ['required', 'email'],
            },
        ]);
        removeValidatorOnInput(inputsRef.current, messageErrorRef.current);
    }, [inputsRef.current.length, messageErrorRef.current.length]);

    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex justify-center items-center"
            style={{ backgroundImage: `url("${BackGroundAuth}")` }}
        >
            {isLoading && <Loading />}
            <div className="bg-white p-4 w-[30%] min-w-[400px] rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 pb-2 border-b">
                    Yêu cầu đặt lại mật khẩu
                </h2>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-700">Vui lòng nhập email của bạn</p>
                    <p className="text-sm text-gray-700">Mật khẩu mới sẽ được gửi đến email của bạn</p>
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="text-sky-500 font-semibold">
                        Email <span className="text-red-700">*</span>
                    </label>
                    <input
                        ref={(el) => (inputsRef.current[0] = el)}
                        name="email"
                        id="email"
                        type="email"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                        className="text-sm text-red-600 font-semibold opacity-0"
                        ref={(el) => (messageErrorRef.current[0] = el)}
                    >
                        error
                    </span>
                </div>
                <div>
                    <button
                        className="w-full p-2 text-center uppercase bg-sky-800 text-white hover:opacity-90"
                        onClick={handleForgotPassword}
                    >
                        Gửi yêu cầu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
