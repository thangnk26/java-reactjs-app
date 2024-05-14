import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { Tooltip, tooltipClasses } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/AppProvider';
import Logo from '~/assets/images/candidate/candidate-logo.png';
import AvatarMale from '~/assets/images/candidate/avatar-candidate-male.jpg';

import * as careerService from '~/service/careerService';

function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const [isLogin, setIsLogin] = useState(false);
    const [listCareer, setListCareer] = useState([]);

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip placement="top-start" {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#fff',
            color: '#333',
            fontSize: 16,
            border: '1px solid #dadde9',
            maxWidth: '70vw',
        },
    }));

    useEffect(() => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [user]);

    useEffect(() => {
        const getListCareer = async () => {
            const res = await careerService.getAllCareer(7);
            if (res?.data) {
                setListCareer(res.data);
            }
        };
        getListCareer();
    }, []);

    return (
        <div className="shadow-sm fixed top-0 right-0 left-0 bg-white z-10">
            <nav className="h-20 flex justify-between items-center container m-auto">
                <div className="flex justify-start items-center h-full">
                    <Link to="/" className="block h-20 py-3">
                        <img src={Logo} alt="Logo" className="h-full w-auto"></img>
                    </Link>

                    <div className="flex ml-8">
                        <div className="px-3">
                            <CustomTooltip
                                title={
                                    <div className="flex">
                                        <div className="flex flex-col p-3">
                                            <h2 className="font-semibold pb-2">Việc theo ngành nghề</h2>
                                            {listCareer?.map((career) => (
                                                <Link
                                                    to={`/jobs/careers/${career.id}`}
                                                    key={career.id}
                                                    className="hover:text-[#1772bd] p-1"
                                                >
                                                    Việc làm {career.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex flex-col p-3">
                                            <h2 className="font-semibold pb-2">Việc theo địa điểm</h2>
                                            <Link
                                                className="hover:text-[#1772bd] p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate({
                                                        pathname: '/jobs',
                                                        search: createSearchParams({
                                                            keyword: '',
                                                            address: 'Hà Nội',
                                                        }).toString(),
                                                    });
                                                }}
                                            >
                                                Việc làm tại Hà Nội
                                            </Link>
                                            <Link
                                                className="hover:text-[#1772bd] p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate({
                                                        pathname: '/jobs',
                                                        search: createSearchParams({
                                                            keyword: '',
                                                            address: 'Đà Nẵng',
                                                        }).toString(),
                                                    });
                                                }}
                                            >
                                                Việc làm tại Đà Nẵng
                                            </Link>
                                            <Link
                                                className="hover:text-[#1772bd] p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate({
                                                        pathname: '/jobs',
                                                        search: createSearchParams({
                                                            keyword: '',
                                                            address: 'Hồ Chí Minh',
                                                        }).toString(),
                                                    });
                                                }}
                                            >
                                                Việc làm tại Hồ Chí Minh
                                            </Link>
                                            <Link
                                                className="hover:text-[#1772bd] p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate({
                                                        pathname: '/jobs',
                                                        search: createSearchParams({
                                                            keyword: '',
                                                            address: 'Bình Dương',
                                                        }).toString(),
                                                    });
                                                }}
                                            >
                                                Việc làm tại Bình Dương
                                            </Link>
                                            <Link
                                                className="hover:text-[#1772bd] p-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate({
                                                        pathname: '/jobs',
                                                        search: createSearchParams({
                                                            keyword: '',
                                                            address: 'Hải Phòng',
                                                        }).toString(),
                                                    });
                                                }}
                                            >
                                                Việc làm tại Hải Phòng
                                            </Link>
                                        </div>
                                        <div className="flex flex-col p-3">
                                            <h2 className="font-semibold pb-2">Việc theo nhu cầu</h2>
                                            {/* <Link className="hover:text-[#1772bd] p-1">Việc làm tuyển gấp</Link> */}
                                            <Link to={`/jobs/featured`} className="hover:text-[#1772bd] p-1">
                                                Việc làm nổi bật
                                            </Link>
                                            <Link to={`/jobs/noExp`} className="hover:text-[#1772bd] p-1">
                                                Việc làm không kinh nghiệm
                                            </Link>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="cursor-pointer flex items-center h-full">
                                    <Link to={'/jobs'}>Việc làm</Link>
                                    <ArrowDropDownIcon></ArrowDropDownIcon>
                                </div>
                            </CustomTooltip>
                        </div>
                        <div className="px-3">
                            <CustomTooltip
                                title={
                                    <div className="flex flex-col">
                                        <Link to={'/company/featured'} className="p-1 hover:text-[#1772bd]">
                                            Công ty tiêu biểu
                                        </Link>
                                        <Link to={'/company'} className="p-1 hover:text-[#1772bd]">
                                            Tất cả công ty
                                        </Link>
                                    </div>
                                }
                            >
                                <div className="cursor-pointer flex items-center">
                                    <Link to={'/company'}>Công ty</Link>
                                    <ArrowDropDownIcon></ArrowDropDownIcon>
                                </div>
                            </CustomTooltip>
                        </div>
                        <div className="px-3">
                            <CustomTooltip
                                title={
                                    <div className="flex flex-col">
                                        <Link
                                            to={'/cv/create'}
                                            className="p-1 hover:text-[#1772bd]"
                                            onClick={(e) => {
                                                if (!user) {
                                                    e.preventDefault();
                                                    if (window.confirm('Bạn cần đăng nhập để tạo CV')) {
                                                        navigate('/login');
                                                    }
                                                }
                                            }}
                                        >
                                            Tạo CV
                                        </Link>
                                        <Link
                                            to={'/cv/upload'}
                                            className="p-1 hover:text-[#1772bd]"
                                            onClick={(e) => {
                                                if (!user) {
                                                    e.preventDefault();
                                                    if (window.confirm('Bạn cần đăng nhập để tải lên CV')) {
                                                        navigate('/login');
                                                    }
                                                }
                                            }}
                                        >
                                            Tải lên chứng chỉ
                                        </Link>
                                    </div>
                                }
                            >
                                <div className="cursor-pointer flex items-center">
                                    <Link to={'/cv/view'}>CV/Chứng chỉ</Link>
                                    <ArrowDropDownIcon></ArrowDropDownIcon>
                                </div>
                            </CustomTooltip>
                        </div>
                        {/* <div className="px-3">
                            <div>
                                <Link to={'#'} className="pr-1">
                                    Trắc nghiệm tính cách
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    {isLogin ? (
                        <CustomTooltip
                            title={
                                <div className="flex flex-col">
                                    <Link to={'/cv/view'} className="p-1 hover:text-[#1772bd]">
                                        Xem hồ sơ/CV
                                    </Link>
                                    {/* <Link to={'#'} className="p-1 hover:text-[#1772bd]">
                                        Việc làm đã lưu
                                    </Link> */}
                                    <Link to={'/jobs/job-applied'} className="p-1 hover:text-[#1772bd]">
                                        Việc làm đã ứng tuyển
                                    </Link>
                                    <Link to={'/candidate/attachments'} className="p-1 hover:text-[#1772bd]">
                                        Chứng chỉ của bạn
                                    </Link>
                                    <Link to={'/candidate/info'} className="p-1 hover:text-[#1772bd]">
                                        Thông tin cá nhân
                                    </Link>
                                    <Link to={'/candidate/changePassword'} className="p-1 hover:text-[#1772bd]">
                                        Đổi mật khẩu
                                    </Link>
                                    <button
                                        className="p-1 text-left hover:text-[#1772bd]"
                                        onClick={() => {
                                            signOut(auth)
                                                .then(() => {
                                                    localStorage.removeItem('user');
                                                    setUser(undefined);
                                                })
                                                .catch((error) => {
                                                    alert(error.code);
                                                });
                                        }}
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            }
                        >
                            <div className="flex items-center  cursor-pointer">
                                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={user?.image || AvatarMale}
                                        alt="avatar"
                                    ></img>
                                </div>
                                <span className="pl-2 font-semibold">{user?.name || user?.email}</span>
                                <ArrowDropDownIcon></ArrowDropDownIcon>
                            </div>
                        </CustomTooltip>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                to={'/register'}
                                className="bg-white border border-sky-700 text-sky-900 py-[6px] px-4 rounded-lg hover:bg-sky-700 hover:text-white"
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to={'/login'}
                                className="bg-sky-600 border-none text-white py-[6px] px-4 rounded-lg hover:opacity-90"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    )}
                    <div className="w-[1px] h-[50px] bg-[#ccc] mx-4"></div>
                    <CustomTooltip
                        title={
                            <div className="flex flex-col">
                                <Link to={'/recruiter/jobs/create'} className="p-1 hover:text-[#1772bd]">
                                    Đăng tin Online
                                </Link>
                                <Link to={'/recruiter/search'} className="p-1 hover:text-[#1772bd]">
                                    Tìm hồ sơ
                                </Link>
                            </div>
                        }
                    >
                        <div className="p-2 border text-[#1772bd] cursor-pointer rounded-sm flex items-center">
                            <span>Nhà tuyển dụng</span>
                            <ArrowDropDownIcon></ArrowDropDownIcon>
                        </div>
                    </CustomTooltip>
                </div>
            </nav>
        </div>
    );
}

export default Header;
