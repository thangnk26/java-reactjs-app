import request from '~/utils/request';

export const getAllProSkill = async () => {
    try {
        const res = await request.get('/public/proSkills');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createProSkill = async (data) => {
    try {
        console.log(data);
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post('/admin/create-proskill', data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateProSkill = async (id, data) => {
    try {
        console.log(id, data);
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/admin/update-proskill/${id}`, data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
