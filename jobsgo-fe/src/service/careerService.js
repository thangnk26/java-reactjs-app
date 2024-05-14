import request from '~/utils/request';

export const getAllCareer = async (size = 0) => {
    try {
        const res = await request.get('/public/careers', {
            params: {
                size,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createCareer = async (data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post('/admin/create-career', data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const updateCareer = async (id, data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/admin/update-career/${id}`, data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
