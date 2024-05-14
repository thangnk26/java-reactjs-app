import request from '~/utils/request';

export const getAllSoftSkill = async () => {
    try {
        const res = await request.get('/public/softSkills');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createSoftSkill = async (data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post('/admin/create-softskill', data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateSoftSkill = async (id, data) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/admin/update-softskill/${id}`, data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
