import ChangePassword from '~/components/recruiter/changePassword';
import RecruiterLayout from '~/layout/recruiterLayout';

function ChangePasswordPage() {
    return (
        <RecruiterLayout>
            <ChangePassword title={'Đổi mật khẩu'}></ChangePassword>
        </RecruiterLayout>
    );
}

export default ChangePasswordPage;
