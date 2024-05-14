import * as React from 'react';
import { useState, useEffect } from 'react';
import * as adminService from '~/service/admin/adminService';
import Button from '@mui/material/Button';
import ModalDetailJob from './package/ModalDetailJob';

import * as handleDate from '~/utils/handleDate';
import AdminLayout from '~/layout/adminLayout';

export default function AdJobApproved() {
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [modalJob, setModalJob] = useState(false);

    function offModal() {
        setModalJob(false);
    }

    const handleDetail = (job) => {
        setDataDetail(job);
        setModalJob(true);
    };
    const handleAccept = async (id) => {
        await adminService.jobAccept(id);
        getAllDenied();
    };
    const getAllDenied = async () => {
        let data = await adminService.jobAllDenied();
        setData(data.data);
    };
    useEffect(() => {
        getAllDenied();
    }, []);
    return (
        <AdminLayout>
            <>
                {data.length > 0 ? (
                    <div className="px-4">
                        <h2 className="text-2xl font-semibold pb-4">Việc làm đã từ chối</h2>
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="w-[5%]">ID</th>
                                    <th className="w-[20%]">Tên công việc</th>
                                    <th className="w-[15%]">Ngày đăng</th>
                                    <th className="w-[30%]">Tên công ty</th>
                                    <th className="w-[15%]">Địa điểm</th>
                                    <th className="w-[15%]">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((job) => (
                                    <tr key={job.id}>
                                        <td>{job.id}</td>
                                        <td>{job.title}</td>
                                        <td>{handleDate.formatDate(job.createAt, 'dd-mm-yyyy hh:MM:ss')}</td>
                                        <td>{job.recruiter.name}</td>
                                        <td>{job.city}</td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="warning"
                                                    onClick={() => handleDetail(job)}
                                                >
                                                    Xem
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleAccept(job.id)}
                                                >
                                                    Duyệt
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {modalJob && <ModalDetailJob job={dataDetail} offModal={offModal} />}
                    </div>
                ) : (
                    <h2 className="text-2xl font-semibold pb-4">Không có việc đã từ chối</h2>
                )}
            </>
        </AdminLayout>
    );
}
