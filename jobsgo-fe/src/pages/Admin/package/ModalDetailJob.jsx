import AdminLayout from '~/layout/adminLayout';

const ModalDetailJob = ({ job, offModal }) => {
    console.log(job);
    return (
        <AdminLayout>
            <>
                <div className="fixed inset-0 flex items-center justify-center z-[10000]">
                    <div className=" bg-gray-800 bg-opacity-75 absolute inset-0" onClick={() => offModal()}></div>
                    <div className="w-[70%] h-[calc(100vh-64px)] overflow-y-auto bg-white rounded-lg z-10">
                        <div className="grid grid-cols-10 gap-8 p-4">
                            <div className="col-span-7">
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Tiêu đề việc làm
                                    </h2>
                                    <p>{job?.title}</p>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Mô tả công việc
                                    </h2>
                                    <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Yêu cầu công việc
                                    </h2>
                                    <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.required }}></div>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Quyền lợi được hưởng
                                    </h2>
                                    <div className="pl-4" dangerouslySetInnerHTML={{ __html: job?.benefit }}></div>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Địa điểm việc làm
                                    </h2>
                                    <p>{`${job?.specificAddress}, ${job?.ward}, ${job?.district}, ${job?.city}`}</p>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Ngành nghề chuyên môn
                                    </h2>
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
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Tính chất công việc
                                    </h2>
                                    <p>{job?.natureOfWork}</p>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold uppercase underline my-2">
                                        Yêu cầu kinh nghiệm
                                    </h2>
                                    {job.statusExp ? (
                                        <p>Không yêu cầu kinh nghiệm</p>
                                    ) : (
                                        <p>
                                            - Từ {job?.numberYearExperienceStart} năm đến {job?.numberYearExperienceEnd}{' '}
                                            năm
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
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
};
export default ModalDetailJob;
