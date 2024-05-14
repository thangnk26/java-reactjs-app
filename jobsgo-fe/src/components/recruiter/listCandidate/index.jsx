import { HowToRegOutlined, LockPersonOutlined, PersonOffOutlined } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCVDetail from '~/components/modal/modalCVDetail';
import * as handleDate from '~/utils/handleDate';
import * as applyService from '~/service/applyService';
import * as emailService from '~/service/emailService';
import * as jobService from '~/service/jobService';

import AvatarMale from '~/assets/images/candidate/avatar-candidate-male.jpg';

function ListCandidate({ type, tab, listResume, setListResume }) {
    const classActive = 'bg-lime-600 text-white';
    const [typeCandidate, setTypeCandidate] = useState(1);
    const [resumeCurrent, setResumeCurrent] = useState();
    const [showModalDetailCV, setShowModalDetailCV] = useState(false);
    const [listResumeFilter, setListResumeFilter] = useState(listResume);
    const [mail, setMail] = useState({});
    const handleEmailAccept = (resume) => {
        let mail1 = mail.contentEmailAccept
            ?.replaceAll('[Tên ứng viên]', resume.name)
            ?.replaceAll('[Tên công việc]', resume.nameJobApply)
            ?.replaceAll('[Tên công ty]', mail.name)
            ?.replaceAll('[Ngày nhận hồ sơ]', handleDate.formatDate(resume.applyAt))
            ?.replaceAll('[Địa chỉ email của công ty]', mail.emailCompany)
            ?.replaceAll('[Số điện thoại của công ty]', mail.phone);
        return mail1;
    };
    const handleEmailDenied = (resume) => {
        let mail1 = mail.contentEmailDenied
            ?.replaceAll('[Tên ứng viên]', resume.name)
            ?.replaceAll('[Tên công việc]', resume.nameJobApply)
            ?.replaceAll('[Tên công ty]', mail.name)
            ?.replaceAll('[Ngày nhận hồ sơ]', handleDate.formatDate(resume.applyAt))
            ?.replaceAll('[Địa chỉ email của công ty]', mail.emailCompany)
            ?.replaceAll('[Số điện thoại của công ty]', mail.phone);
        return mail1;
    };
    const handleApprove = async (resume) => {
        const res = await applyService.approve(resume.applyId);
        if (res?.success) {
            emailService.sendEmail(
                resume?.email,
                `[JobsGO] Thông báo ứng tuyển`,
                mail.contentEmailAccept == null ? <p>Bạn chưa có mail xác nhận</p> : handleEmailAccept(resume),
            );
            setListResumeFilter(listResume.filter((resumeItem) => resumeItem.applyId !== resume.applyId));
            setListResume(
                listResume.map((resumeItem) => {
                    if (resumeItem.applyId === resume.applyId) {
                        return {
                            ...resumeItem,
                            status: 1,
                        };
                    } else {
                        return resumeItem;
                    }
                }),
            );
        }
    };
    const handleConsider = async (resume) => {
        const res = await applyService.consider(resume.applyId);
        if (res?.success) {
            setListResumeFilter(listResume.filter((resumeItem) => resumeItem.applyId !== resume.applyId));
            setListResume(
                listResume.map((resumeItem) => {
                    if (resumeItem.applyId === resume.applyId) {
                        return {
                            ...resumeItem,
                            status: 3,
                        };
                    } else {
                        return resumeItem;
                    }
                }),
            );
        }
    };
    const handleDenied = async (resume) => {
        const res = await applyService.denied(resume.applyId);
        if (res?.success) {
            emailService.sendEmail(
                resume?.email,
                `[JobsGO] Thông báo từ chối ứng tuyển`,
                mail.contentEmailDenied == null ? <p>Bạn chưa có mail từ chối</p> : handleEmailDenied(resume),
            );
            setListResumeFilter(listResume.filter((resumeItem) => resumeItem.applyId !== resume.applyId));
            setListResume(
                listResume.map((resumeItem) => {
                    if (resumeItem.applyId === resume.applyId) {
                        return {
                            ...resumeItem,
                            status: 2,
                        };
                    } else {
                        return resumeItem;
                    }
                }),
            );
        }
    };

    useMemo(() => {
        switch (typeCandidate) {
            case 1:
                setListResumeFilter(listResume);
                break;
            case 2:
                setListResumeFilter(listResume.filter((resume) => resume.status === 0));
                break;
            case 3:
                setListResumeFilter(listResume.filter((resume) => resume.status === 1));
                break;
            case 4:
                setListResumeFilter(listResume.filter((resume) => resume.status === 3));
                break;
            case 5:
                setListResumeFilter(listResume.filter((resume) => resume.status === 2));
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeCandidate]);

    useMemo(() => {
        setListResumeFilter(listResume);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listResume.length]);

    useEffect(() => {
        const getData = async () => {
            const res = await jobService.getContentEmail();
            setMail(res.data);
        };
        getData();
    }, []);

    return (
        <div>
            {showModalDetailCV && <ModalCVDetail resume={resumeCurrent} setShowModalDetailCV={setShowModalDetailCV} />}
            {/* button */}
            {type === 'detailJob' && (
                <div className="flex items-center">
                    <button
                        className={`px-4 py-2 border rounded-lg mr-4 ${typeCandidate === 1 ? classActive : ''}`}
                        onClick={() => setTypeCandidate(1)}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-lg mr-4 ${typeCandidate === 2 ? classActive : ''}`}
                        onClick={() => setTypeCandidate(2)}
                    >
                        Mới ứng tuyển
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-lg mr-4 ${typeCandidate === 3 ? classActive : ''}`}
                        onClick={() => setTypeCandidate(3)}
                    >
                        Đã được chọn
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-lg mr-4 ${typeCandidate === 4 ? classActive : ''}`}
                        onClick={() => setTypeCandidate(4)}
                    >
                        Quyết định sau
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-lg mr-4 ${typeCandidate === 5 ? classActive : ''}`}
                        onClick={() => setTypeCandidate(5)}
                    >
                        Đã từ chối
                    </button>
                </div>
            )}

            {/* table */}
            <div>
                {listResumeFilter?.length > 0 ? (
                    <table className="w-full mt-6">
                        <thead>
                            <tr>
                                <th className="text-sky-600">Ảnh đại diện</th>
                                <th className="text-sky-600">Họ tên</th>

                                {type !== 'search' && <th className="text-sky-600">Công việc ứng tuyển</th>}
                                <th className="text-sky-600">Kinh nghiệm làm việc</th>
                                <th className="text-sky-600">Kỹ năng chuyên môn</th>
                                <th className="text-sky-600">Học vấn</th>
                                {tab !== 'search' && <th className="text-sky-600">Thao tác</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {listResumeFilter?.map((resume) => (
                                <tr key={resume.resumeId}>
                                    <td>
                                        <div
                                            className="block max-w-[100px] cursor-pointer"
                                            onClick={() => {
                                                setResumeCurrent(resume);
                                                setShowModalDetailCV(true);
                                            }}
                                        >
                                            <img src={resume?.image || AvatarMale} alt="avatar" />
                                        </div>
                                    </td>
                                    <td>
                                        <p>Năm sinh: {handleDate.formatDate(resume.birthday)}</p>
                                        <p>Giới tính: Nam</p>
                                        <p>Chỗ ở: {resume.address}</p>
                                    </td>
                                    {type !== 'search' && (
                                        <td>
                                            <Link
                                                to={`/recruiter/jobs/${resume?.jobId}`}
                                                className="text-lime-600 underline font-semibold text-base"
                                            >
                                                {resume.nameJobApply}
                                            </Link>
                                            <p>Ngày ứng tuyển: {handleDate.formatDate(resume.applyAt)}</p>
                                        </td>
                                    )}
                                    <td>
                                        {resume?.listWorkExperience.map((exp) => (
                                            <p key={exp.id}>Vị trí: {`${exp.position}-${exp.nameCompany}`}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {resume?.listResumeProSkill?.map((proSkill) => (
                                            <p key={proSkill.id}>
                                                - {proSkill.yearExperience} năm kinh nghiệm {proSkill.proSkillName}
                                            </p>
                                        ))}
                                    </td>
                                    <td>
                                        {resume?.listResumeEducation?.map((education) => (
                                            <p key={education.id}>{`${education.nameSchool} - ${education.majors}`}</p>
                                        ))}
                                    </td>
                                    {tab !== 'search' && (
                                        <td>
                                            {tab !== 'selected' && typeCandidate !== 3 && (
                                                <button
                                                    className="p-1 mb-2 w-full flex items-center justify-center border rounded-lg hover:bg-black/5"
                                                    onClick={() => handleApprove(resume)}
                                                >
                                                    <HowToRegOutlined fontSize="small" className="mr-1" />{' '}
                                                    <span className="w-max">Duyệt</span>
                                                </button>
                                            )}
                                            {tab !== 'consider' && typeCandidate !== 4 && (
                                                <button
                                                    className="p-1 mb-2 w-full flex items-center justify-center border rounded-lg hover:bg-black/5"
                                                    onClick={() => handleConsider(resume)}
                                                >
                                                    <LockPersonOutlined fontSize="small" className="mr-1" />
                                                    <span className="w-max">Xem xét</span>
                                                </button>
                                            )}
                                            {tab !== 'denied' && typeCandidate !== 5 && (
                                                <button
                                                    className="p-1 mb-2 w-full flex items-center justify-center border rounded-lg hover:bg-black/5"
                                                    onClick={() => handleDenied(resume)}
                                                >
                                                    <PersonOffOutlined fontSize="small" className="mr-1" />
                                                    <span className="w-max">Từ chối</span>
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h2 className="text-xl p-4">Không có ứng viên nào</h2>
                )}
            </div>
        </div>
    );
}

export default ListCandidate;
