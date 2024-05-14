import request from '~/utils/request';

export const sendEmail = async (toEmail, subject, body) => {
    try {
        const res = await request.post('/public/emails', {
            toEmail,
            subject,
            body,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
