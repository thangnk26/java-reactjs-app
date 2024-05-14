import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SendIcon from '@mui/icons-material/Send';
import { LocationOnOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import JobItem from '../slider/jobItem';
import Search from '../search';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as jobService from '~/service/jobService';
import * as applyService from '~/service/applyService';
import * as handleDate from '~/utils/handleDate';
import ModalSelectResumeApply from '~/components/modal/modalSelectResumeApply';
import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';

import { AppContext } from '~/context/AppProvider';

function DetailJob() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const [isApply, setIsApply] = useState(false);
    const { id } = useParams();
    const [job, setJob] = useState();
    const [jobAnother, setJobAnother] = useState([]);

    const [showModalSelectCV, setShowModalSelectCV] = useState(false);

    const getAddress = (specificAddress, ward, district, city) => {
        let result = [];
        if (specificAddress) result.push(specificAddress);
        if (ward) result.push(ward);
        if (district) result.push(district);
        if (city) result.push(city);

        return result.join(', ');
    };

    useEffect(() => {
        const getData = async () => {
            const res = await jobService.getJobById(id);
            if (res?.success) {
                setJob(res.data);

                const resAllJobByRecruiter = await jobService.viewJobOpenByRecruiterId(res?.data?.recruiter?.id);

                if (resAllJobByRecruiter?.success) {
                    setJobAnother(resAllJobByRecruiter.data.filter((job) => job.id.toString() !== id));
                }
            }
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const resIsApply = await applyService.checkApply(id, user.userId);
                if (resIsApply?.success) {
                    setIsApply(true);
                }
            }
        };
        getData();
    }, [id]);

    return (
        <div className="grid grid-cols-3 mt-[90px] container mx-auto">
            {showModalSelectCV && (
                <ModalSelectResumeApply
                    setIsApply={setIsApply}
                    job={job}
                    title={job?.title}
                    setShowModalSelectCV={setShowModalSelectCV}
                />
            )}

            <div className="col-span-2 border p-2">
                <Search className="container mx-auto border-sky-700 rounded-full border-2"></Search>
                <h1 className="text-2xl font-bold mt-4">{job?.title}</h1>
                <div className="flex justify-start items-center gap-4 py-4">
                    <div className="flex items-center">
                        <AccessTimeIcon fontSize="small" />
                        <span className="text-sm pl-1">
                            Hết hạn sau{' '}
                            <strong className="text-orange-600">
                                {job?.expiredAt && handleDate.minusDate(job?.expiredAt)}
                            </strong>{' '}
                            ngày
                        </span>
                    </div>
                    <div className="flex items-center">
                        <AttachMoneyIcon fontSize="small" />
                        <span className="text-sm pl-1">
                            Mức lương{' '}
                            {job?.statusSalary ? (
                                <strong className="text-green-600">Thoả thuận</strong>
                            ) : (
                                <strong className="text-green-600">
                                    {job?.salaryFrom} - {job?.salaryTo} triệu
                                </strong>
                            )}
                        </span>
                    </div>
                </div>
                {isApply ? (
                    <Button disabled={true} size="medium" startIcon={<SendIcon />} variant="contained">
                        Đã ứng tuyển
                    </Button>
                ) : (
                    <Button
                        size="medium"
                        startIcon={<SendIcon />}
                        variant="contained"
                        onClick={() => {
                            if (user) {
                                setShowModalSelectCV(true);
                            } else {
                                if (window.confirm('Bạn cần đăng nhập để ứng tuyển')) {
                                    navigate('/login');
                                }
                            }
                        }}
                    >
                        Ứng tuyển ngay
                    </Button>
                )}

                <div className="grid grid-cols-3 my-4">
                    <div>
                        <h2 className="font-bold underline">Tính chất công việc</h2>
                        <p className="text-sm my-1">{job?.natureOfWork}</p>
                    </div>
                    <div>
                        <h2 className="font-bold underline">Vị trí/chức vụ</h2>
                        <p className="text-sm my-1">{job?.typePosition}</p>
                    </div>
                    <div>
                        <h2 className="font-bold underline">Ngày đăng tuyển</h2>
                        <p className="text-sm my-1">{handleDate.formatDate(job?.createAt)}</p>
                    </div>
                    <div>
                        <h2 className="font-bold underline">Yêu cầu về bằng cấp</h2>
                        <p className="text-sm my-1">{job?.degree}</p>
                    </div>
                    <div>
                        <h2 className="font-bold underline">Yêu cầu kinh nghiệm</h2>
                        {job?.statusExp ? (
                            <p className="text-sm my-1">Không yêu cầu kinh nghiệm</p>
                        ) : (
                            <p className="text-sm my-1">
                                {job?.numberYearExperienceStart} - {job?.numberYearExperienceEnd} năm kinh nghiệm
                            </p>
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold underline">Yêu cầu ngôn ngữ</h2>
                        <p className="text-sm my-1">{job?.listLanguage.map((language) => language?.name).join(', ')}</p>
                    </div>
                </div>
                <div className="mb-3">
                    <h2 className="font-bold underline">Địa điểm làm việc</h2>
                    <div className="flex items-center gap-1">
                        <LocationOnOutlined fontSize="small"></LocationOnOutlined>
                        <p className="text-sm my-1">
                            {`${job?.specificAddress}, ${job?.ward}, ${job?.district}, ${job?.city}`}
                        </p>
                    </div>
                </div>
                <div className="mb-3">
                    <h2 className="font-bold underline">Mô tả công việc</h2>
                    <div className="pl-4 text-sm" dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                </div>
                <div className="mb-3">
                    <h2 className="font-bold underline">Yêu cầu công việc</h2>
                    <div className="pl-4 text-sm" dangerouslySetInnerHTML={{ __html: job?.required }}></div>
                </div>
                <div className="mb-3">
                    <h2 className="font-bold underline">Quyền lợi được hưởng</h2>

                    <div className="pl-4 text-sm" dangerouslySetInnerHTML={{ __html: job?.benefit }}></div>
                </div>
            </div>

            <div className="flex flex-col border p-2">
                <div className="w-full flex justify-center items-center">
                    <img src={job?.recruiter?.image || AvatarRecruiter} alt="avatar" />
                </div>

                <Link to={`/company/${job?.recruiter?.id}`} className="font-bold">
                    Chào mừng đến với: <span>{job?.recruiter?.name}</span>
                </Link>
                {job?.recruiter && (
                    <>
                        <h2 className="font-bold underline">Địa chỉ: </h2>
                        <p className="text-sm">
                            {getAddress(
                                job?.recruiter?.specificAddress,
                                job?.recruiter?.wards,
                                job?.recruiter?.districts,
                                job?.recruiter?.city,
                            )}
                        </p>
                    </>
                )}
                {job?.description && (
                    <>
                        <h2 className="font-bold underline">Mô tả</h2>
                        <p className="text-sm">{job?.recruiter?.description}</p>
                    </>
                )}

                <h3 className="font-bold uppercase bg-slate-200 py-2 pl-2 my-2">Việc làm khác của công ty:</h3>

                <div>
                    {jobAnother?.map((job) => (
                        <JobItem key={job.id} job={job}></JobItem>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailJob;
