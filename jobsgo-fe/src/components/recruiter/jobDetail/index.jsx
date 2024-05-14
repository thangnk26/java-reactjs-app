import { useEffect, useState } from 'react';
import ListCandidate from '../listCandidate';
import BtnCreateJob from '../btnCreateJob';
import { useParams } from 'react-router-dom';
import * as jobService from '~/service/jobService';
import * as applyService from '~/service/applyService';
import * as handleDate from '~/utils/handleDate';

function JobDetail({ className }) {
    const { id } = useParams();
    const [tab, setTab] = useState(1);
    const [job, setJob] = useState({});
    const [listResume, setListResume] = useState([]);

    const classActive = 'border-b border-red-700 text-[#000]';

    useEffect(() => {
        const getData = async () => {
            if (id) {
                //Job
                const resJob = await jobService.getJobById(id);
                if (resJob?.success) {
                    setJob(resJob.data);
                }

                //list resume
                const resListResume = await applyService.getAllResumeApplyByJobId(id);
                if (resListResume?.success) {
                    setListResume(resListResume.data);
                }
            }
        };
        getData();
    }, [id]);
    return (
        <div className={className}>
            <BtnCreateJob />

            <div className="border-y">
                <button
                    className={`p-2 text-gray-500 font-semibold hover:text-black ${tab === 1 ? classActive : ''}`}
                    onClick={() => setTab(1)}
                >
                    Tổng quan
                </button>
                <button
                    className={`p-2 text-gray-500 font-semibold hover:text-black ${tab === 2 ? classActive : ''}`}
                    onClick={() => setTab(2)}
                >
                    Hồ sơ đã nộp đơn <span className="text-red-500">({listResume.length})</span>
                </button>
            </div>

            {tab === 1 ? (
                <div className="grid grid-cols-11 gap-8 p-4">
                    <div className="col-span-4">
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Tiêu đề việc làm</h2>
                            <p>{job?.title}</p>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Mô tả công việc</h2>
                            <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Yêu cầu công việc</h2>
                            <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.required }}></div>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Quyền lợi được hưởng</h2>
                            <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.benefit }}></div>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Địa điểm việc làm</h2>
                            <p>{`${job?.specificAddress}, ${job?.ward}, ${job?.district}, ${job?.city}`}</p>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Ngành nghề chuyên môn</h2>
                            <ul>
                                {job?.listProSkill?.map((proSkill) => (
                                    <li key={proSkill.id} className="ml-4">
                                        {proSkill.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">
                                Yêu cầu bằng cấp(tối thiểu)
                            </h2>
                            <p>{job?.degree}</p>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Tính chất công việc</h2>
                            <p>{job?.natureOfWork}</p>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Yêu cầu kinh nghiệm</h2>
                            {job.statusExp ? (
                                <p>Không yêu cầu kinh nghiệm</p>
                            ) : (
                                <p>
                                    - Từ {job?.numberYearExperienceStart} năm đến {job?.numberYearExperienceEnd} năm
                                </p>
                            )}
                        </div>
                        <div>
                            <h2 className="text-base font-semibold uppercase underline my-2">Lương</h2>
                            {job.statusSalary ? (
                                <p>Thỏa thuận </p>
                            ) : (
                                <p>
                                    - Từ {job?.salaryFrom} triệu đến {job?.salaryTo} triệu
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-3">
                        <div className="border p-4 shadow-ssm mb-4">
                            <h2 className="text-base uppercase font-semibold mb-2 rounded-lg">Lịch sử thao tác</h2>
                            <p className="text-gray-600">Công việc {job?.title} đã được tạo thành công</p>
                            <p className="text-gray-400">
                                {handleDate.formatDate(job?.createAt, 'dd-mm-yyyy hh:MM:ss')}
                            </p>
                            <p className="text-gray-600">Công việc {job?.title} đã được cập nhật</p>
                            <p className="text-gray-400">
                                {handleDate.formatDate(job?.updateAt, 'dd-mm-yyyy hh:MM:ss')}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {listResume.length > 0 ? (
                        <>
                            <div className="p-2">
                                <ListCandidate
                                    setListResume={setListResume}
                                    listResume={listResume}
                                    type={'detailJob'}
                                />
                            </div>
                        </>
                    ) : (
                        <h2 className="text-xl p-4">Không có ứng viên</h2>
                    )}
                </>
            )}
        </div>
    );
}

export default JobDetail;
