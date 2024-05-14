import request from '~/utils/request';

export const getAllLanguage = async () => {
    try {
        const res = await request.get('/public/languages');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createLanguage = async (data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post('/admin/create-language', data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateLanguage = async (id, data) => {
    console.log(id, data);
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/admin/update-language/${id}`, data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
