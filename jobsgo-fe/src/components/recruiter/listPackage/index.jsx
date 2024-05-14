import { useEffect, useState } from 'react';
import * as packageService from '~/service/packageService';
import * as paymentService from '~/service/paymentService';
import * as usedPackageService from '~/service/usedPackageService';
import * as handleDate from '~/utils/handleDate';
import { Button } from '@mui/material';
import BtnCreateJob from '../btnCreateJob';
import CreateInvoice from '../vnPay/createInvoice';

import 'react-toastify/dist/ReactToastify.css';

const classActive = '!border-b !border-red-700 !text-[#000]';

function ListPackage() {
    const [tab, setTab] = useState(1);
    const [listPackage, setListPackage] = useState([]);
    const [packageCurrent, setPackageCurrent] = useState();
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [packageUsed, setPackageUsed] = useState();
    const [historyPackage, setHistoryPackage] = useState([]);

    const handlePay = async (packageItem) => {
        if (packageItem.quantity) {
            packageItem.quantity = 1;
            packageItem.total = packageItem.price;
        }
        if (packageUsed) {
            let confirmResult = window.confirm('Bạn muốn hủy gói hiện tại để mua gói mới?');
            if (confirmResult) {
                await usedPackageService.cancelAllPackageByRecruiterId();
                setPackageUsed(null);
                setPackageCurrent(packageItem);
                setShowCreateInvoice(true);
            }
        } else {
            await usedPackageService.cancelAllPackageByRecruiterId();
            setPackageCurrent(packageItem);
            setShowCreateInvoice(true);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const res = await packageService.getAllPackage();
            if (res?.success) {
                setListPackage(res.data.map((item) => ({ ...item, total: item.price, quantity: 1 })));
            }

            const resUsed = await usedPackageService.checkUsedPackage();
            if (resUsed?.success) {
                setPackageUsed(resUsed.data);
            }

            const recruiter = JSON.parse(localStorage.getItem('user'));
            const resHistory = await paymentService.getPaymentByRecruiterId(recruiter.userId);
            if (resHistory?.success) {
                console.log(resHistory.data);
                setHistoryPackage(resHistory.data);
            }
        };
        getData();
    }, []);

    return (
        <div className="p-2">
            <BtnCreateJob />
            <div className="py-2">
                <button
                    className={`text-lg p-2 text-gray-500 font-semibold hover:text-black ${
                        tab === 1 ? classActive : ''
                    }`}
                    onClick={() => setTab(1)}
                >
                    Mua gói
                </button>
                <button
                    className={`text-lg p-2 text-gray-500 font-semibold hover:text-black ${
                        tab === 2 ? classActive : ''
                    }`}
                    onClick={() => setTab(2)}
                >
                    Lịch sử
                </button>
            </div>

            {tab === 1 ? (
                <div>
                    <div className="px-4">
                        {packageUsed && (
                            <div className="my-2">
                                <h2 className="text-lg text-sky-700 font-bold">
                                    Bạn đang sử dụng gói {packageUsed?.packageEntity?.name}
                                </h2>
                                <p>Ngày mua: {handleDate.formatDate(packageUsed.date_start)}</p>
                                <p>Ngày hết hạn: {handleDate.formatDate(packageUsed.date_end)}</p>
                            </div>
                        )}
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên gói</th>
                                    <th>Mô tả</th>
                                    <th>Thời hạn</th>
                                    <th>Đơn giá (VNĐ)</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền (VNĐ)</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPackage?.map((packageItem) => (
                                    <tr key={packageItem.id}>
                                        <td>{packageItem.id}</td>
                                        <td>{packageItem.name}</td>
                                        <td>{packageItem.description}</td>
                                        <td>{packageItem.duration}</td>
                                        <td>{packageItem.price}</td>
                                        <td>
                                            <input
                                                value={packageItem?.quantity}
                                                type="number"
                                                className="outline-none border rounded-sm p-1 text-center"
                                                onChange={(e) => {
                                                    if (e.target.value >= 0) {
                                                        setListPackage(
                                                            listPackage.map((item) => {
                                                                if (item.id === packageItem.id) {
                                                                    return {
                                                                        ...item,
                                                                        total: item.price * e.target.value,
                                                                        quantity: e.target.value,
                                                                    };
                                                                } else {
                                                                    return item;
                                                                }
                                                            }),
                                                        );
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td>{packageItem.total}</td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handlePay(packageItem)}
                                            >
                                                Mua
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showCreateInvoice && (
                        <CreateInvoice packageItem={packageCurrent} setShowCreateInvoice={setShowCreateInvoice} />
                    )}
                </div>
            ) : (
                <div className="my-4">
                    {historyPackage.length > 0 ? (
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên gói dịch vụ</th>
                                    <th>Ngày mua</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái thanh toán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyPackage?.map((item, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{item.namePackage}</td>
                                        <td>{handleDate.formatDate(item.dateCreate, 'dd-mm-yyyy hh:MM:ss')}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.total}</td>
                                        <td>{item.status ? 'Thành công' : 'Thất bại'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="text-lg font-bold p-2">Bạn chưa từng mua gói</h2>
                    )}
                </div>
            )}
        </div>
    );
}

export default ListPackage;
