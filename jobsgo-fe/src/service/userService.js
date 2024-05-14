import request from '~/utils/request';

export const getUserById = async (id) => {
    try {
        const res = await request.get(`/public/user/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAdmin = async () => {
    try {
        const res = await request.get(`/public/admin`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUserByEmail = async (email) => {
    try {
        const res = await request.get(`/public/user/email/${email}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllRecruiter = async () => {
    try {
        const res = await request.get(`/public/recruiters`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCandidate = async () => {
    try {
        const res = await request.get(`/public/candidates`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllRecruiterFeatured = async () => {
    try {
        const res = await request.get(`/public/recruiters/featured`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateRecruiter = async (recruiter) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const res = await request.put(`/users/recruiter/${user.userId}`, recruiter, {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                },
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const updateCandidate = async (candidate) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const res = await request.put(`/users/candidate/${user.userId}`, candidate, {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                },
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const changePassword = async (oldPassword, newPassword) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const res = await request.put(
                `/users/changePassword/${user.userId}`,
                {
                    newPassword,
                    oldPassword,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken,
                    },
                },
            );
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const forgotPassword = async (email) => {
    try {
        const res = await request.get(`/public/users/forgotPassword/email/${email}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const searchRecruiter = async (keyword) => {
    try {
        const res = await request.get(`/public/searchRecruiter`, {
            params: {
                keyword,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
