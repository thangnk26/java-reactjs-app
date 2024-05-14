import { useState } from 'react';
import { Button } from '@mui/material';
import * as paymentService from '~/service/paymentService';

function CreateInvoice({ packageItem, setShowCreateInvoice }) {
    const [orderDesc, setOrderDesc] = useState(`Noi dung thanh toan (khong dau)`);
    const [bankCode, setBankCode] = useState('NCB');

    const handlePay = async () => {
        const res = await paymentService.getUrlVnPay({
            packageId: packageItem.id,
            quantity: packageItem.quantity,
            orderDesc: orderDesc,
            bankCode: bankCode,
            price: packageItem.total,
        });
        if (res?.success) {
            window.location.href = res.data.urlVnPay;
        }
    };
    return (
        <div
            className="fixed top-0 right-0 left-0 bottom-0 bg-black/10 flex justify-center items-center text-base"
            onClick={() => {
                setShowCreateInvoice(false);
            }}
        >
            <div
                className="bg-white rounded-md w-[70%] h-[90vh] p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-semibold">Tạo mới đơn hàng</h3>
                <div className="py-2">
                    <label htmlFor="language" className="font-semibold">
                        Loại hàng hóa
                    </label>
                    <select className="w-full outline-none border rounded-md p-1" name="order_type" id="order_type">
                        <option value="billpayment">Thanh toán hóa đơn</option>
                    </select>
                </div>
                <div className="py-2">
                    <label htmlFor="order_id" className="font-semibold">
                        Mã hóa đơn
                    </label>
                    <input
                        className="w-full outline-none border rounded-md p-1"
                        id="order_id"
                        name="order_id"
                        type="text"
                        value={packageItem.id || ''}
                        disabled
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="amount" className="font-semibold">
                        Số tiền
                    </label>
                    <input
                        className="w-full outline-none border rounded-md p-1"
                        id="amount"
                        name="amount"
                        type="number"
                        value={packageItem.total || ''}
                        disabled
                    />
                </div>
                <div className="py-2">
                    <label htmlFor="order_desc" className="font-semibold">
                        Nội dung thanh toán
                    </label>
                    <textarea
                        className="w-full outline-none border rounded-md p-1"
                        id="order_desc"
                        name="order_desc"
                        value={orderDesc}
                        onChange={(e) => setOrderDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="py-2">
                    <label htmlFor="bank_code" className="font-semibold">
                        Ngân hàng
                    </label>
                    <select
                        className="w-full outline-none border rounded-md p-1"
                        name="bank_code"
                        id="bank_code"
                        value={bankCode}
                        onChange={(e) => {
                            setBankCode(e.target.value);
                        }}
                    >
                        <option value="">Không chọn</option>
                        <option value="NCB"> Ngan hang NCB</option>
                        <option value="AGRIBANK"> Ngan hang Agribank</option>
                        <option value="SCB"> Ngan hang SCB</option>
                        <option value="SACOMBANK">Ngan hang SacomBank</option>
                        <option value="EXIMBANK"> Ngan hang EximBank</option>
                        <option value="MSBANK"> Ngan hang MSBANK</option>
                        <option value="NAMABANK"> Ngan hang NamABank</option>
                        <option value="VNMART"> Vi dien tu VnMart</option>
                        <option value="VIETINBANK">Ngan hang Vietinbank</option>
                        <option value="VIETCOMBANK"> Ngan hang VCB</option>
                        <option value="HDBANK">Ngan hang HDBank</option>
                        <option value="DONGABANK"> Ngan hang Dong A</option>
                        <option value="TPBANK"> Ngân hàng TPBank</option>
                        <option value="OJB"> Ngân hàng OceanBank</option>
                        <option value="BIDV"> Ngân hàng BIDV</option>
                        <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
                        <option value="VPBANK"> Ngan hang VPBank</option>
                        <option value="MBBANK"> Ngan hang MBBank</option>
                        <option value="ACB"> Ngan hang ACB</option>
                        <option value="OCB"> Ngan hang OCB</option>
                        <option value="IVB"> Ngan hang IVB</option>
                        <option value="VISA"> Thanh toan qua VISA/MASTER</option>
                    </select>
                </div>
                <div className="py-2">
                    <label htmlFor="language" className="font-semibold">
                        Ngôn ngữ
                    </label>
                    <select className="w-full outline-none border rounded-md p-1" name="language" id="language">
                        <option value="vn">Tiếng Việt</option>
                    </select>
                </div>
                <Button variant="contained" size="small" onClick={handlePay}>
                    THANH TOÁN
                </Button>
            </div>
        </div>
    );
}

export default CreateInvoice;
