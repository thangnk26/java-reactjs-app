import { useContext } from 'react';
import LoginRecruiter from '~/components/auth/loginRecruiter';
import Header from '~/components/recruiter/header';
import Sidebar from '~/components/recruiter/sidebar';
import { AppContext } from '~/context/AppProvider';

function RecruiterLayout({ children, tab }) {
    const { recruiter, admin } = useContext(AppContext);
    const flag = JSON.parse(localStorage.getItem('user'))?.roles?.includes('RECRUITER');
    return (
        <>
            {flag ? (
                <>
                    <Header recruiter={recruiter} admin={admin} />
                    <div className="grid grid-cols-5">
                        <Sidebar tab={tab} className="col-span-1"></Sidebar>
                        <div className="col-span-4 text-sm border-l">{children}</div>
                    </div>
                </>
            ) : (
                <LoginRecruiter />
            )}
        </>
    );
}

export default RecruiterLayout;
