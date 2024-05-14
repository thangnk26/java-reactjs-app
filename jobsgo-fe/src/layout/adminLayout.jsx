import LoginAdmin from '~/components/auth/loginAdmin';

function AdminLayout({ children }) {
    let admin = null;
    if (JSON.parse(localStorage.getItem('user'))?.roles?.includes('ADMIN')) {
        admin = JSON.parse(localStorage.getItem('user'));
    }
    return <>{admin ? <>{children}</> : <LoginAdmin />}</>;
}
export default AdminLayout;
