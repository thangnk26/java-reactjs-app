import request from '~/utils/request';

export const addJob = async (job) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.post('/jobs', job, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateJob = async (job, id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/jobs/${id}`, job, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobPending = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/jobs/pending', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewAllJob = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/jobs', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobPendingByRecruiterId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/jobs/pending/recruiter/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobOpen = async () => {
    try {
        const res = await request.get('/public/jobs/open');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobOpenByRecruiterId = async (id) => {
    try {
        const res = await request.get(`/public/jobs/open/recruiter/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobPauseByRecruiterId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/jobs/pause/recruiter/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobPause = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/jobs/pause', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobExpired = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/jobs/expired', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewJobExpiredByRecruiterId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/jobs/expired/recruiter/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobDenied = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get('/jobs/denied', {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewJobDeniedByRecruiterId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/jobs/denied/recruiter/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (id) => {
    try {
        const res = await request.get(`/public/jobs/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusPause = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/jobs/changeStatusPause/${id}`, null, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const changeStatusApply = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/jobs/changeStatusApply/${id}`, null, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const changeStatusPending = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/jobs/changeStatusPending/${id}`, null, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewAllJobApplyByCandidateId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/jobs/apply/candidate/${user.userId}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const search = async (keyword = null, address = null) => {
    try {
        const res = await request.get(`/public/jobs/search`, {
            params: {
                keyword: keyword,
                address: address,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewJobByCareerId = async (id) => {
    try {
        const res = await request.get(`/public/jobs/careers/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewJobNoExp = async () => {
    try {
        const res = await request.get(`/public/jobs/noExp`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewSuitableJob = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const res = await request.get(`/public/jobs/suitableJob/candidate/${user.userId}`);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const viewJobByRecruiterId = async (id) => {
    try {
        const res = await request.get(`/public/jobs/recruiter/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobFeatured = async () => {
    try {
        const res = await request.get(`/public/jobs/featured`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const viewJobNew = async () => {
    try {
        const res = await request.get(`/public/jobs/new`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewJobByNaturedOfWork = async (natureOfWork = '') => {
    try {
        const res = await request.get(`/public/jobs/natureOfWork`, {
            params: {
                natureOfWork,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateEmail = async (data) => {
    try {
        console.log(data);
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.put(`/recruiter/acceptMail/${user.userId}`, data, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getContentEmail = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/recruiter/mail/${user.userId}`, {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
