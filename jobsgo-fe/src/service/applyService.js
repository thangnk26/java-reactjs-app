import request from '~/utils/request';

export const apply = async (jobId, resumeId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.post(
            '/apply',
            {
                jobId: jobId,
                resumeId: resumeId,
            },
            config,
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkApply = async (jobId, candidateId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/check/jobs/${jobId}/${candidateId}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllResumeApply = async (recruiterId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/recruiter/${recruiterId}/resumes/apply`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllResumeApplyByJobId = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/resumes/jobs/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllResumeConsider = async (recruiterId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/recruiter/${recruiterId}/resumes/consider`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllResumeApprove = async (recruiterId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/recruiter/${recruiterId}/resumes/approve`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllResumeDenied = async (recruiterId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/apply/recruiter/${recruiterId}/resumes/denied`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const approve = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/apply/approve/resume/${id}`, null, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const consider = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/apply/consider/resume/${id}`, null, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const denied = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/apply/denied/resume/${id}`, null, config);
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
        const res = await request.delete(`/apply/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllApplied = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/admin/approve/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
