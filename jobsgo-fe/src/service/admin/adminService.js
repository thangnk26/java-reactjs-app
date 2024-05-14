import request from '~/utils/request';

export const createPackage = async (inputs) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        // let config = {
        //     headers: {
        //         Authorization: 'Bearer ' + user.accessToken,
        //     },
        // };
        const res = await request.post('/package', inputs, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllPackage = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get('/packages', config);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getPackageById = async (input) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };

        const res = await request.get(`/package/${input}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updatePackage = async (id, inputs) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/package/update/${id}`, inputs, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const jobAllPending = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/jobs/pending`, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const jobAccept = async (id) => {
    try {
        console.log(id);
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/jobs/changeStatusApply/${id}`, null, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const jobDenied = async (id) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/jobs/changeStatusDenied/${id}`, null, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const jobPause = async (id) => {
    try {
        console.log(id);
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/jobs/changeStatusPause/${id}`, null, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const jobAllApprove = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`public/jobs/open`, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const jobAllDenied = async () => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/jobs/denied`, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
