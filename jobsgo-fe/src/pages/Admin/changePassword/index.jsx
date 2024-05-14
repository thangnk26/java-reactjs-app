import ChangePassword from '~/components/recruiter/changePassword';
import AdminLayout from '~/layout/adminLayout';

function ChangePasswordAdmin() {
    return (
        <AdminLayout>
            <div className="mt-[100px]">
                <ChangePassword type="admin"></ChangePassword>
            </div>
        </AdminLayout>
    );
}

export default ChangePasswordAdmin;
