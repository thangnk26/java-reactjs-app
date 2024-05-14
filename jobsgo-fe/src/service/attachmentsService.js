import request from '~/utils/request';

export const create = async (id, data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.post(`/attachments/candidate/${id}`, data, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteById = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.delete(`/attachments/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const update = async (id, data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/attachments/${id}`, data, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAttachmentsByCandidateId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/attachments/candidate/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
