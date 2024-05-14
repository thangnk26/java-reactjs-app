import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import * as adminService from '~/service/admin/adminService';
import UpdatePack from './package/UpdatePack';
import AdminLayout from '~/layout/adminLayout';
import CreatePack from './package/CreatePack';

export default function AdPackage() {
    const [updateModal, setUpdateModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [data, setData] = useState([]);
    const [idUpdate, setIdUpdate] = useState(null);
    const getAllPackage = async () => {
        let data = await adminService.getAllPackage();
        if (data?.success) {
            setData(data.data);
        }
    };
    useEffect(() => {
        getAllPackage();
    }, []);
    const handleUpdate = (id) => {
        setIdUpdate(id);
        setUpdateModal(true);
    };
    const closeUpdateModal = () => {
        setUpdateModal(false);
        getAllPackage();
    };
    const closeCreateModal = () => {
        setCreateModal(false);
        getAllPackage();
    };
    return (
        <AdminLayout>
            <div className="flex justify-end mt-4 mb-4 mr-4">
                <Button size="large" variant="contained" onClick={() => setCreateModal(true)}>
                    Tạo gói
                </Button>
            </div>
            {createModal && <CreatePack onCloseModal={closeCreateModal} />}
            <div className="text-base">
                <div className="px-4">
                    <table className="w-full text-center">
                        <thead>
                            <th>ID</th>
                            <th>Tên gói</th>
                            <th>Mô tả</th>
                            <th>Thời hạn</th>
                            <th>Đơn giá (VNĐ)</th>
                            <th>Giảm giá(%)</th>
                            <th>Sau khi giảm (VNĐ)</th>
                            <th>Thao tác</th>
                        </thead>
                        <tbody>
                            {data?.map((packageItem) => (
                                <tr key={packageItem.id}>
                                    <td className="w-[5%]">{packageItem.id}</td>
                                    <td className="w-[20%]">{packageItem.name}</td>
                                    <td className="w-[30%]">{packageItem.description}</td>
                                    <td className="w-[5%]">{packageItem.duration}</td>
                                    <td className="w-[10%]">{packageItem.price}</td>
                                    <td className="w-[5%]">{packageItem.discount}</td>
                                    <td className="w-[10%]">
                                        {(packageItem.price * (100 - packageItem.discount)) / 100}
                                    </td>
                                    <td className="w-[15%]">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleUpdate(packageItem.id)}
                                        >
                                            Cập nhật
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <Box className="flex justify-end" component="span" style={{ marginBottom: 10 }}>
                    <Button variant="contained" onClick={() => onModal()}>
                        Tạo gói
                    </Button>
                    <CreatePack onModal={modal} offModal={offModal} />
                </Box>
                <Box>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box> */}
                {updateModal && <UpdatePack updateId={idUpdate} onCloseModal={closeUpdateModal} />}
            </div>
        </AdminLayout>
    );
}
