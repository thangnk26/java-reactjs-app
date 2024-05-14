import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useEffect, useState } from 'react';
import * as userService from '~/service/userService';
import * as jobService from '~/service/jobService';
import * as paymentService from '~/service/paymentService';
import * as handleDate from '~/utils/handleDate';
import { AttachMoney, Work } from '@mui/icons-material';
function Statisfical() {
    const [candidates, setCandidates] = useState([]);
    const [candidatesFilter, setCandidatesFilter] = useState([]);

    const [recruiters, setRecruiters] = useState([]);
    const [recruitersFilter, setRecruitersFilter] = useState([]);

    const [jobs, setJobs] = useState([]);
    const [jobsFilter, setJobsFilter] = useState([]);

    const [revenue, setRevenue] = useState([]);
    const [revenueFilter, setRevenueFilter] = useState([]);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [ds, setDS] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const resCandidate = await userService.getAllCandidate();
            if (resCandidate?.success) {
                setCandidates(resCandidate.data);
                setCandidatesFilter(resCandidate.data);
            }
            const resRecruiter = await userService.getAllRecruiter();
            if (resRecruiter?.success) {
                setRecruiters(resRecruiter.data);
                setRecruitersFilter(resRecruiter.data);
            }
            const resJobs = await jobService.viewAllJob();
            if (resJobs?.success) {
                console.log(resJobs.data);
                setJobs(resJobs.data);
                setJobsFilter(resJobs.data);
            }
            const resRevenue = await paymentService.getAllPayment();
            if (resRevenue?.success) {
                var total = 0;
                for (let i = 0; i < resRevenue.data?.filter((revenue) => revenue.status === true).length; i++) {
                    total += resRevenue.data[i].total;
                }
                setDS(total);
                setRevenue(resRevenue.data?.filter((revenue) => revenue.status === true));
                setRevenueFilter(resRevenue.data?.filter((revenue) => revenue.status === true));
            }
        };
        getData();
    }, []);

    const getYearArray = () => {
        const year = new Date().getFullYear();
        let arr = [];
        for (let i = 0; i < 50; i++) {
            arr.push(year - i);
        }
        return arr;
    };

    const handleTK = () => {
        if (month && year) {
            setCandidatesFilter(
                candidates.filter((candidate) => {
                    return (
                        new Date(candidate.createAt).getFullYear().toString() === year.toString() &&
                        (new Date(candidate.createAt).getMonth() + 1).toString() === month.toString()
                    );
                }),
            );
            setRecruitersFilter(
                recruiters.filter((recruiter) => {
                    return (
                        new Date(recruiter.createAt).getFullYear().toString() === year.toString() &&
                        (new Date(recruiter.createAt).getMonth() + 1).toString() === month.toString()
                    );
                }),
            );
            setJobsFilter(
                jobs.filter((job) => {
                    return (
                        new Date(job.createAt).getFullYear().toString() === year.toString() &&
                        (new Date(job.createAt).getMonth() + 1).toString() === month.toString()
                    );
                }),
            );

            const arrayRevenue = revenue?.filter((revenue) => {
                return (
                    new Date(revenue.dateCreate).getFullYear().toString() === year.toString() &&
                    (new Date(revenue.dateCreate).getMonth() + 1).toString() === month.toString()
                );
            });
            setRevenueFilter(arrayRevenue);
            var total = 0;
            for (let i = 0; i < arrayRevenue?.length; i++) {
                total += arrayRevenue[i].total;
            }
            setDS(total);
        } else if (!month && year) {
            setCandidatesFilter(
                candidates.filter((candidate) => {
                    return new Date(candidate.createAt).getFullYear().toString() === year.toString();
                }),
            );
            setRecruitersFilter(
                recruiters.filter((recruiter) => {
                    return new Date(recruiter.createAt).getFullYear().toString() === year.toString();
                }),
            );
            setJobsFilter(
                jobs.filter((job) => {
                    return new Date(job.createAt).getFullYear().toString() === year.toString();
                }),
            );

            const arrayRevenue = revenue?.filter((revenue) => {
                return new Date(revenue.dateCreate).getFullYear().toString() === year.toString();
            });

            setRevenueFilter(arrayRevenue);
            var totalYear = 0;
            for (let i = 0; i < arrayRevenue?.length; i++) {
                totalYear += arrayRevenue[i].total;
            }
            setDS(totalYear);
        } else if (!year) {
            setCandidatesFilter(candidates);
            setRecruitersFilter(recruiters);
            setJobsFilter(jobs);
            setRevenueFilter(revenue);
            var totalFull = 0;
            for (let i = 0; i < revenue.length; i++) {
                totalFull += revenue[i].total;
            }
            setDS(totalFull);
        }
    };

    return (
        <>
            <div className="statisfical w-[full] ">
                <main className="py-10 bg-gray-100">
                    <div className="mx-10 grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg">
                            <div className="flex flex-col justify-center items-center py-2">
                                <div className="flex items-center justify-center gap-4">
                                    <AssignmentIndIcon color="primary" style={{ fontSize: 50 }} />
                                    <p className="text-[18px] font-bold">Ứng viên</p>
                                </div>
                                <div>
                                    <p className="text-[35px] font-[700]">{candidatesFilter.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg">
                            <div className="flex flex-col justify-center items-center py-2">
                                <div className="flex items-center justify-center gap-4">
                                    <AssignmentIndIcon color="secondary" style={{ fontSize: 50 }} />
                                    <p className="text-[18px] font-bold">Nhà tuyển dụng</p>
                                </div>
                                <div>
                                    <p className="text-[35px] font-[700]">{recruitersFilter.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg">
                            <div className="flex flex-col justify-center items-center py-2">
                                <div className="flex items-center justify-center gap-4">
                                    <Work color="success" style={{ fontSize: 50 }} />
                                    <p className="text-[18px] font-bold">Công việc</p>
                                </div>
                                <div>
                                    <p className="text-[35px] font-[700]">{jobsFilter.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg">
                            <div className="flex flex-col justify-center items-center py-2">
                                <div className="flex items-center justify-center gap-4">
                                    <AttachMoney color="error" style={{ fontSize: 50 }} />
                                    <p className="text-[18px] font-bold">Doanh số</p>
                                </div>
                                <div>
                                    <div className="text-[35px] font-[700]">{ds}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex justify-start items-center gap-4 mx-10">
                        <select
                            className="outline-none p-2 border"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">Không chọn</option>
                            <option value="1">Tháng 1</option>
                            <option value="2">Tháng 2</option>
                            <option value="3">Tháng 3</option>
                            <option value="4">Tháng 4</option>
                            <option value="5">Tháng 5</option>
                            <option value="6">Tháng 6</option>
                            <option value="7">Tháng 7</option>
                            <option value="8">Tháng 8</option>
                            <option value="9">Tháng 9</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                        <select
                            className="outline-none p-2 border max-h-[300px]"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">Không chọn</option>
                            {getYearArray().map((yearItem, index) => (
                                <option key={index} value={yearItem}>
                                    Năm {yearItem}
                                </option>
                            ))}
                        </select>

                        <button className="outline-none p-2 border bg-red-700 text-white rounded-lg" onClick={handleTK}>
                            Thống kê
                        </button>
                    </div>
                    <div className="mx-10 mt-10">
                        <h2 className="text-xl font-bold text-center">Dữ liệu thống kê</h2>
                        <table className="table-auto w-full">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th>STT</th>
                                    <th>Tên công ty</th>
                                    <th>Thời gian mua</th>
                                    <th>Tên gói dịch vụ</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {revenueFilter.map((revenueItem, index) => (
                                    <tr className="text-center" key={revenueItem.id}>
                                        <td>{index + 1}</td>
                                        <td>{revenueItem.nameRecruiter}</td>
                                        <td>{handleDate.formatDate(revenueItem.dateCreate, 'dd-mm-yyyy hh:MM:ss')}</td>
                                        <td>{revenueItem.namePackage}</td>
                                        <td>{revenueItem.quantity}</td>
                                        <td>{revenueItem.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Statisfical;
