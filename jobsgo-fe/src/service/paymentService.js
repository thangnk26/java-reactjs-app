import request from '~/utils/request';

export const getUrlVnPay = async (data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post(
            '/vnPay/url',
            {
                packageId: data.packageId,
                recruiterId: user.userId,
                quantity: data.quantity,
                bankCode: data.bankCode,
                orderDesc: data.orderDesc,
                price: data.price,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllPayment = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/payments`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getPaymentByRecruiterId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/payments/recruiter/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
