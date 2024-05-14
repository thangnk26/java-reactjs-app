import request from '~/utils/request';

export const register = async (email, password, name, role) => {
    try {
        const res = await request.post('/v1/auth/register', {
            email: email,
            password: password,
            name: name,
            role: role,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const login = async (email, password) => {
    try {
        const res = await request.post('/v1/auth/login', {
            email: email,
            password: password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const loginGoogleAndFacebook = async (email, name, role) => {
    try {
        const res = await request.post('/v1/auth/loginGoogleAndFacebook', {
            email,
            name,
            role,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
