import { AccessTime, AttachMoney, DeleteOutline, LocationOnOutlined, StarOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as handleDate from '~/utils/handleDate';
import * as jobService from '~/service/jobService';
import * as applyService from '~/service/applyService';
import * as emailService from '~/service/emailService';

import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';

import { Link } from 'react-router-dom';

function ListJobApply() {
    const [listJob, setListJob] = useState();

    const handleDelete = async (job) => {
        if (window.confirm(`Bạn có chắc muốn hủy ứng tuyển công việc ${job.title}?`)) {
            const res = await applyService.deleteById(job?.applyId);
            if (res?.success) {
                setListJob(listJob.filter((jobItem) => jobItem?.applyId !== job?.applyId));
                emailService.sendEmail(
                    job?.emailCompany,
                    `[JobsGO] Thông báo hủy ứng tuyển`,
                    `${job?.nameCandidate} đã hủy ứng tuyển công việc ${job?.title}`,
                );
                alert('Hủy ứng tuyển thành công');
            }
        }
    };
    useEffect(() => {
        const getData = async () => {
            const res = await jobService.viewAllJobApplyByCandidateId();
            if (res?.success) {
                setListJob(res.data);
            }
        };
        getData();
    }, []);
    return (
        <div className="bg-gray-100 pt-20">
            <div className="container border shadow-ssm uppercase text-lg font-semibold bg-white m-auto mt-8 p-2">
                Danh sách việc làm đã ứng tuyển
            </div>
            <div className="container bg-white m-auto border pt-8 min-h-[100vh]">
                {listJob?.map((job) => (
                    <div key={job?.id} className="grid grid-cols-8 gap-2">
                        <div className="w-[120px] h-[120px] col-span-1 m-2 rounded-full overflow-hidden object-contain">
                            <img src={job?.image || AvatarRecruiter} alt="avatar" />
                        </div>

                        <div className="col-span-6">
                            <Link to={`/jobs/${job?.id}`} className="text-lg text-sky-700 font-semibold py-2 block">
                                {job?.title}
                            </Link>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center flex-wrap gap-1 pb-2">
                                    <div className="border flex items-center p-1">
                                        <LocationOnOutlined fontSize="small"></LocationOnOutlined>
                                        <span className="text-xs">{job?.city}</span>
                                    </div>
                                    <div className="border flex items-center p-1">
                                        <AccessTime fontSize="small"></AccessTime>
                                        <span className="text-xs">{handleDate.formatDate(job?.expiredAt)}</span>
                                    </div>
                                    <div className="border flex items-center p-1">
                                        <AttachMoney fontSize="small"></AttachMoney>
                                        <span className="text-xs">
                                            {job?.statusSalary ? (
                                                <p>Thỏa thuận</p>
                                            ) : (
                                                <p>
                                                    {job?.salaryFrom} - {job?.salaryTo} triệu
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                    <div className="border flex items-center p-1">
                                        <StarOutline fontSize="small"></StarOutline>
                                        <span className="text-xs">{job?.natureOfWork}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="pl-6 text-sm line-clamp-5 overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: job?.description }}
                            ></div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-2 p-2">
                            {job?.statusApply === 0 ? (
                                <span className="p-1 rounded-md text-center bg-sky-500 text-white text-sm uppercase">
                                    Mới ứng tuyển
                                </span>
                            ) : job?.statusApply === 1 ? (
                                <span className="p-1 rounded-md text-center bg-sky-500 text-white text-sm uppercase">
                                    Đã được duyệt
                                </span>
                            ) : job?.statusApply === 2 ? (
                                <span className="p-1 rounded-md text-center bg-sky-500 text-white text-sm uppercase">
                                    Đã bị từ chối
                                </span>
                            ) : job?.statusApply === 3 ? (
                                <span className="p-1 rounded-md text-center bg-sky-500 text-white text-sm uppercase">
                                    Đang xem xét
                                </span>
                            ) : (
                                ''
                            )}
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteOutline />}
                                onClick={() => handleDelete(job)}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListJobApply;
