import request from '~/utils/request';

export const getAllPackage = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/packages', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};