import request from '~/utils/request';

export const checkUsedPackage = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request.get(`/public/usedPackage/check/${user.userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const cancelAllPackageByRecruiterId = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        await request.get(`/public/usedPackage/cancelAllPackage/recruiter/${user.userId}`);
    } catch (error) {
        console.log(error);
    }
};
