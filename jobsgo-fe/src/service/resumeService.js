import request from '~/utils/request';

export const getResumeById = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/resumes/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllByCandidateID = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.get(`/resumes/candidate/${user.userId}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (resume) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.post('/resumes', resume, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (resume, id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/resumes/${id}`, resume, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const changeTemplate = async (id, template) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/resumes/${id}/template/${template}`, null, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const changeIsPublic = async (id, status) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        };
        const res = await request.put(`/resumes/${id}/public/${status}`, null, config);
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
        const res = await request.delete(`/resumes/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchCandidate = async (position = null, specialized = null, language = null, degree = null) => {
    try {
        const res = await request.get(`/public/resumes/search`, {
            params: {
                position: position,
                specialized: specialized,
                language: language,
                degree: degree,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
