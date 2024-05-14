import { BusinessCenter, SaveOutlined } from '@mui/icons-material';
import BtnCreateJob from '../btnCreateJob';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as userService from '~/service/userService';

import { addValidatorOnBlur, removeValidatorOnInput, validatorMultiple, errorClass } from '~/utils/validator';
import Loading from '~/components/loading';

function ChangePassword({ className, title, type = 'recruiter' }) {
    const inputsRef = useRef([]);
    const messageErrorRef = useRef([]);

    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState({
        newPassword: '',
        oldPassword: '',
        rePassword: '',
    });

    const handleChangePassword = async () => {
        if (
            validatorMultiple([
                {
                    inputRef: inputsRef.current[0],
                    messageErrorRef: messageErrorRef.current[0],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[1],
                    messageErrorRef: messageErrorRef.current[1],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[2],
                    messageErrorRef: messageErrorRef.current[2],
                    rules: ['required'],
                },
            ])
        ) {
            if (password.newPassword !== password.rePassword) {
                inputsRef.current[2].classList.add(...errorClass);
                messageErrorRef.current[2].innerHTML = 'Nhập lại mật khẩu không chính xác';
                messageErrorRef.current[2].style.opacity = 1;
                return;
            }
            setIsLoading(true);
            const res = await userService.changePassword(password.oldPassword, password.newPassword);
            if (res?.success) {
                alert('Thay đổi mật khẩu thành công');
                setPassword({
                    newPassword: '',
                    oldPassword: '',
                    rePassword: '',
                });
            } else if (res?.success === false) {
                inputsRef.current[0].classList.add(...errorClass);
                messageErrorRef.current[0].innerHTML = res.message;
                messageErrorRef.current[0].style.opacity = 1;
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        addValidatorOnBlur([
            {
                //old password
                inputRef: inputsRef.current[0],
                messageErrorRef: messageErrorRef.current[0],
                rules: ['required'],
            },
            {
                //new password
                inputRef: inputsRef.current[1],
                messageErrorRef: messageErrorRef.current[1],
                rules: ['required'],
            },
            {
                //rePassword
                inputRef: inputsRef.current[2],
                messageErrorRef: messageErrorRef.current[2],
                rules: ['required'],
            },
        ]);
        removeValidatorOnInput(inputsRef.current, messageErrorRef.current);
    }, [inputsRef.current.length, messageErrorRef.current.length]);

    return (
        <div className={className}>
            {isLoading && <Loading />}
            {type === 'recruiter' && (
                <>
                    <BtnCreateJob />
                    <div className="flex items-center border-y py-2 pl-4 font-semibold bg-black/5">
                        <BusinessCenter className="mr-1" /> {title}
                    </div>
                </>
            )}

            <div className="flex justify-center">
                <div className="min-w-[600px] p-4 mt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <p className="font-semibold col-span-1 text-right">
                            Mật khẩu hiện tại <span className="text-red-600">*</span>
                        </p>
                        <div className="col-span-2">
                            <input
                                ref={(el) => (inputsRef.current[0] = el)}
                                type="text"
                                className="w-full outline-none border rounded-lg p-2 focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                                value={password?.oldPassword}
                                onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                            />
                            <span
                                className="text-sm text-red-600 font-semibold opacity-0"
                                ref={(el) => (messageErrorRef.current[0] = el)}
                            >
                                error
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <p className="font-semibold col-span-1 text-right">
                            Mật khẩu mới <span className="text-red-600">*</span>
                        </p>
                        <div className="col-span-2">
                            <input
                                ref={(el) => (inputsRef.current[1] = el)}
                                type="text"
                                className="w-full outline-none border rounded-lg p-2 focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                                value={password?.newPassword}
                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            />
                            <span
                                className="text-sm text-red-600 font-semibold opacity-0"
                                ref={(el) => (messageErrorRef.current[1] = el)}
                            >
                                error
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <p className="font-semibold col-span-1 text-right">
                            Nhập lại mật khẩu mới<span className="text-red-600">*</span>
                        </p>
                        <div className="col-span-2">
                            <input
                                ref={(el) => (inputsRef.current[2] = el)}
                                type="text"
                                className="w-full outline-none border rounded-lg p-2 focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                                value={password?.rePassword}
                                onChange={(e) => setPassword({ ...password, rePassword: e.target.value })}
                            />
                            <span
                                className="text-sm text-red-600 font-semibold opacity-0"
                                ref={(el) => (messageErrorRef.current[2] = el)}
                            >
                                error
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1"></div>
                        <div className="col-span-2 mt-8">
                            <Button
                                startIcon={<SaveOutlined />}
                                variant="contained"
                                color="success"
                                onClick={handleChangePassword}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
