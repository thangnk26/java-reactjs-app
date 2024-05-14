import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomQuill from '~/components/quill';
import * as jobService from '~/service/jobService';

function Mail() {
    const [tab, setTab] = useState(1);
    const [mail, setMail] = useState({
        acceptMail: '',
        refuseMail: '',
    });
    const classActive = '!border-b !border-red-700 !text-[#000]';
    const handleSubmit = async (type) => {
        let data = {
            email: type === 'acceptMail' ? mail.acceptMail : mail.refuseMail,
            type: type,
        };
        const resJob = await jobService.updateEmail(data);
        console.log(resJob);
    };
    useEffect(() => {
        const getData = async () => {
            const res = await jobService.getContentEmail();
            console.log(res.data);
            setMail({
                acceptMail: res.data.contentEmailAccept,
                refuseMail: res.data.contentEmailDenied,
            });
        };
        getData();
    }, []);
    console.log(mail);
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-sky-700">Cấu hình Email</h2>

            <div className="my-4">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Lưu ý các tên biến: </h3>
                <p>
                    <strong className="text-sky-700">[Tên ứng viên]: </strong> Tên ứng viên ứng tuyển
                </p>
                <p>
                    <strong className="text-sky-700">[Tên công việc]: </strong> Tên công việc đang tuyển
                </p>
                <p>
                    <strong className="text-sky-700">[Tên công ty]: </strong> Tên công ty của bạn
                </p>
                <p>
                    <strong className="text-sky-700">[Ngày nhận hồ sơ]: </strong> Ngày nhận hồ sơ ứng tuyển của ứng viên
                </p>
                <p>
                    <strong className="text-sky-700">[Địa chỉ email của công ty]: </strong> Địa chỉ của công ty của bạn
                </p>
                <p>
                    <strong className="text-sky-700">[Số điện thoại của công ty]: </strong> Số điện thoại công ty của
                    bạn
                </p>
            </div>
            <div className="py-2">
                <button
                    className={`p-2 text-gray-500 font-semibold hover:text-black ${tab === 1 ? classActive : ''}`}
                    onClick={() => setTab(1)}
                >
                    Mail xác nhận
                </button>
                <button
                    className={`p-2 text-gray-500 font-semibold hover:text-black ${tab === 2 ? classActive : ''}`}
                    onClick={() => setTab(2)}
                >
                    Mail từ chối
                </button>
            </div>
            {tab === 1 ? (
                <>
                    <CustomQuill value={mail.acceptMail} setMail={setMail} type="acceptMail" />
                    <div className="flex justify-center mt-4 mb-16">
                        <Button size="large" variant="contained" onClick={() => handleSubmit('acceptMail')}>
                            Gửi
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <CustomQuill value={mail.refuseMail} setMail={setMail} type="refuseMail" />
                    <div className="flex justify-center mt-4 mb-16">
                        <Button size="large" variant="contained" onClick={() => handleSubmit('refuseMail')}>
                            Gửi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
export default Mail;
