import { createContext, useEffect, useState } from 'react';
import * as userService from '~/service/userService';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [user, setUser] = useState();
    const [recruiter, setRecruiter] = useState();
    const [admin, setAdmin] = useState();
    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (userLocalStorage) {
            if (userLocalStorage?.roles.includes('CANDIDATE')) {
                setUser(userLocalStorage);
            } else if (userLocalStorage?.roles.includes('RECRUITER')) {
                setRecruiter(userLocalStorage);
            }
        }
        const getAdmin = async () => {
            const res = await userService.getAdmin();
            if (res?.success) {
                setAdmin(res.data);
            }
        };
        getAdmin();
    }, []);
    return (
        <AppContext.Provider value={{ user, setUser, recruiter, setRecruiter, admin, setAdmin }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
