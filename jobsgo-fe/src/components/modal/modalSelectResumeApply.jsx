import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as resumeService from '~/service/resumeService';
import * as applyService from '~/service/applyService';
import { useParams } from 'react-router-dom';
import * as emailService from '~/service/emailService';
import Loading from '../loading';

function ModalSelectResumeApply({ title, setShowModalSelectCV, job, setIsApply }) {
    const { id } = useParams();
    const [listResume, setListResume] = useState([]);
    const [resumeId, setResumeId] = useState();
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        setLoading(true);
        const res = await applyService.apply(id, resumeId);
        if (res?.success) {
            alert('Bạn đã ứng tuyển thành công');
            setLoading(false);
            const resResume = await resumeService.getResumeById(resumeId);
            if (resResume?.success) {
                emailService.sendEmail(
                    job?.recruiter.emailCompany,
                    `[JobsGO] Thông báo ứng tuyển`,
                    `${resResume.data.name} đã ứng tuyển vào công việc ${job?.title}`,
                );
            }
            setIsApply(true);
            setShowModalSelectCV(false);
        } else {
            alert('Bạn ứng tuyển thất bại');
            setLoading(false);
        }
    };

    useEffect(() => {
        const getListResume = async () => {
            const res = await resumeService.getAllByCandidateID();
            if (res?.success) {
                setListResume(res.data);
                setResumeId(res.data[0]?.resumeId);
            }
        };
        getListResume();
    }, []);
    return (
        <div
            className="flex justify-center items-center fixed top-0 right-0 left-0 bottom-0 bg-black/20 z-10"
            onClick={() => setShowModalSelectCV(false)}
        >
            {loading && <Loading />}
            <div className="min-w-[50vw] bg-white" onClick={(e) => e.stopPropagation()}>
                <h2 className="p-4 bg-sky-700 text-lg text-white">Chọn hồ sơ ứng tuyển: {title}</h2>
                <div className="p-4">
                    <div className="border border-orange-500 border-dashed p-4 bg-orange-100">
                        {listResume?.map((resume, index) => (
                            <div key={resume?.resumeId} className="flex justify-start items-center gap-2">
                                {index === 0 ? (
                                    <input
                                        defaultChecked
                                        type="radio"
                                        name="resume"
                                        id={`resume${resume?.resumeId}`}
                                        value={resume?.resumeId || 0}
                                        onChange={(e) => setResumeId(e.target.value)}
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        name="resume"
                                        id={`resume${resume?.resumeId}`}
                                        value={resume?.resumeId || 0}
                                        onChange={(e) => setResumeId(e.target.value)}
                                    />
                                )}
                                <label className="font-semibold text-sky-600" htmlFor={`resume${resume?.resumeId}`}>
                                    {resume?.positionApply}
                                </label>
                            </div>
                        ))}

                        <div className="pt-4">
                            <Button
                                className="w-full"
                                color="warning"
                                size="medium"
                                startIcon={<Send />}
                                variant="contained"
                                onClick={handleApply}
                            >
                                Xác nhận ứng tuyển
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSelectResumeApply;
