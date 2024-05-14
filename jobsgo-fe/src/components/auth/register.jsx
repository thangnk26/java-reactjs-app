// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '~/firebase';

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '~/service/auth/authService';
import Loading from '../loading';
import { addValidatorOnBlur, removeValidatorOnInput, validatorMultiple, errorClass } from '~/utils/validator';

function Register() {
    const inputsRef = useRef([]);
    const messageErrorRef = useRef([]);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (
            validatorMultiple([
                {
                    //Họ tên
                    inputRef: inputsRef.current[0],
                    messageErrorRef: messageErrorRef.current[0],
                    rules: ['required'],
                },
                {
                    //email
                    inputRef: inputsRef.current[1],
                    messageErrorRef: messageErrorRef.current[1],
                    rules: ['required', 'email'],
                },
                {
                    //password
                    inputRef: inputsRef.current[2],
                    messageErrorRef: messageErrorRef.current[2],
                    rules: ['required'],
                },
                {
                    //rePassword
                    inputRef: inputsRef.current[3],
                    messageErrorRef: messageErrorRef.current[3],
                    rules: ['required'],
                },
            ])
        ) {
            if (inputsRef.current[2].value !== inputsRef.current[3].value) {
                inputsRef.current[3].classList.add(...errorClass);
                messageErrorRef.current[3].innerHTML = 'Nhập lại mật khẩu không chính xác';
                messageErrorRef.current[3].style.opacity = 1;
                return;
            }
            setIsLoading(true);
            const res = await authService.register(email, password, name, 'CANDIDATE');
            if (res?.success) {
                navigate('/login');
            } else if (res?.success === false) {
                if (res.message === 'Email đã tồn tại') {
                    inputsRef.current[1].classList.add(...errorClass);
                    messageErrorRef.current[1].innerHTML = res.message;
                    messageErrorRef.current[1].style.opacity = 1;
                }
            }
            // await createUserWithEmailAndPassword(auth, email, password)
            //     .then(async () => {
            //         const res = await authService.register(email, password, name, 'CANDIDATE');
            //         if (res?.success) {
            //             navigate('/login');
            //         } else if (res?.success === false) {
            //             if (res.message === 'Email đã tồn tại') {
            //                 inputsRef.current[1].classList.add(...errorClass);
            //                 messageErrorRef.current[1].innerHTML = res.message;
            //                 messageErrorRef.current[1].style.opacity = 1;
            //             }
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error.code);
            //     });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        addValidatorOnBlur([
            {
                //Họ tên
                inputRef: inputsRef.current[0],
                messageErrorRef: messageErrorRef.current[0],
                rules: ['required'],
            },
            {
                //email
                inputRef: inputsRef.current[1],
                messageErrorRef: messageErrorRef.current[1],
                rules: ['required', 'email'],
            },
            {
                //password
                inputRef: inputsRef.current[2],
                messageErrorRef: messageErrorRef.current[2],
                rules: ['required'],
            },
            {
                //rePassword
                inputRef: inputsRef.current[3],
                messageErrorRef: messageErrorRef.current[3],
                rules: ['required'],
            },
        ]);
        removeValidatorOnInput(inputsRef.current, messageErrorRef.current);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputsRef.current.length, messageErrorRef.current.length]);
    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen flex justify-center items-center"
            style={{ backgroundImage: 'url("https://jobsgo.vn/bolt/assets/images/backgrounds/bg-9.jpg")' }}
        >
            {isLoading && <Loading />}
            <div className="bg-white p-4 w-[30%] min-w-[400px] rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 pb-2 border-b">Đăng ký</h2>
                <div className="mt-4">
                    <label htmlFor="name" className="text-sky-500 font-semibold">
                        Họ và tên <span className="text-red-700">*</span>
                    </label>
                    <input
                        ref={(el) => (inputsRef.current[0] = el)}
                        name="name"
                        id="name"
                        type="text"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span
                        className="text-sm text-red-600 font-semibold opacity-0"
                        ref={(el) => (messageErrorRef.current[0] = el)}
                    >
                        error
                    </span>
                </div>
                <div>
                    <label htmlFor="email" className="text-sky-500 font-semibold">
                        Email <span className="text-red-700">*</span>
                    </label>
                    <input
                        ref={(el) => (inputsRef.current[1] = el)}
                        name="email"
                        id="email"
                        type="email"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                        className="text-sm text-red-600 font-semibold opacity-0"
                        ref={(el) => (messageErrorRef.current[1] = el)}
                    >
                        error
                    </span>
                </div>

                <div>
                    <label htmlFor="password" className="text-sky-500 font-semibold">
                        Mật khẩu <span className="text-red-700">*</span>
                    </label>
                    <input
                        ref={(el) => (inputsRef.current[2] = el)}
                        name="password"
                        id="password"
                        type="password"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="text-sm text-red-600 font-semibold opacity-0"
                        ref={(el) => (messageErrorRef.current[2] = el)}
                    >
                        error
                    </span>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="text-sky-500 font-semibold">
                        Nhập lại mật khẩu <span className="text-red-700">*</span>
                    </label>
                    <input
                        ref={(el) => (inputsRef.current[3] = el)}
                        name="rePassword"
                        id="confirm-password"
                        type="password"
                        className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                    />
                    <span
                        className="text-sm text-red-600 font-semibold opacity-0"
                        ref={(el) => (messageErrorRef.current[3] = el)}
                    >
                        error
                    </span>
                </div>

                <div>
                    <button
                        className="w-full p-2 text-center uppercase bg-sky-800 text-white hover:opacity-90"
                        onClick={handleRegister}
                    >
                        Đăng ký
                    </button>
                </div>

                <p className="my-2 text-[#666] text-center">Bạn đã có tài khoản?</p>
                <div>
                    <Link
                        to={'/login'}
                        className="block w-full p-2 text-center uppercase bg-white border hover:bg-black/5"
                    >
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
