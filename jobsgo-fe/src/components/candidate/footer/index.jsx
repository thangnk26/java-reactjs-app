import { useContext, useEffect, useState } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import * as careerService from '~/service/careerService';
import { AppContext } from '~/context/AppProvider';
import { FacebookOutlined, LinkedIn, PublicOutlined, Twitter } from '@mui/icons-material';

function Footer() {
    const navigate = useNavigate();
    const { admin } = useContext(AppContext);
    const [listCareer, setListCareer] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const resCareer = await careerService.getAllCareer(7);
            if (resCareer?.success) {
                setListCareer(resCareer.data);
            }
        };
        getData();
    }, []);
    return (
        <div className="bg-slate-200 py-8">
            <div className="grid grid-cols-6 gap-2 container m-auto">
                <div className="flex flex-col justify-start items-start col-span-2">
                    <p className="font-bold mb-3 uppercase">{admin?.name}</p>
                    <div>
                        <span>
                            <strong>Địa chỉ: </strong>
                            {admin?.specificAddress}, {admin?.wards}, {admin?.districts}, {admin?.city}
                        </span>
                    </div>
                    <div>
                        <span>
                            <strong>Email: </strong>
                            <Link to={`mailto:${admin?.email}`} className="text-cyan-600">
                                {admin?.email}
                            </Link>
                        </span>
                    </div>
                    <div>
                        <span>
                            <strong>Liên hệ: </strong>
                            <Link to={`tel:${admin?.phone}`} className="text-cyan-600">
                                {admin?.phone}
                            </Link>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="font-bold mb-3">Việc làm theo địa điểm</p>

                    <Link
                        className="hover:text-[#1772bd] pb-1"
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
                        Hà Nội
                    </Link>
                    <Link
                        className="hover:text-[#1772bd] pb-1"
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
                        Đà Nẵng
                    </Link>
                    <Link
                        className="hover:text-[#1772bd] pb-1"
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
                        Hồ Chí Minh
                    </Link>
                    <Link
                        className="hover:text-[#1772bd] pb-1"
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
                        Bình Dương
                    </Link>
                    <Link
                        className="hover:text-[#1772bd] pb-1"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate({
                                pathname: '/jobs',
                                search: createSearchParams({
                                    keyword: '',
                                    address: 'Quảng Nam',
                                }).toString(),
                            });
                        }}
                    >
                        Quảng Nam
                    </Link>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-3">Việc làm theo ngành nghề</p>
                    {listCareer?.map((career) => (
                        <Link to={`/jobs/careers/${career.id}`} key={career.id} className="hover:text-[#1772bd] pb-1">
                            {career.name}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-3">Việc làm theo loại hình</p>

                    <Link
                        to={'/jobs/natureOfWork'}
                        className="hover:text-[#1772bd] pb-1"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate({
                                pathname: '/jobs/natureOfWork',
                                search: createSearchParams({
                                    natureOfWork: 'Full-time',
                                }).toString(),
                            });
                        }}
                    >
                        Full time
                    </Link>
                    <Link
                        to={'/jobs/natureOfWork'}
                        className="hover:text-[#1772bd] pb-1"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate({
                                pathname: '/jobs/natureOfWork',
                                search: createSearchParams({
                                    natureOfWork: 'Part-time',
                                }).toString(),
                            });
                        }}
                    >
                        Part time
                    </Link>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-3">Mạng xã hội</p>

                    <div className="flex justify-between">
                        <Link to={admin?.facebook || '/'}>
                            <FacebookOutlined color="primary" fontSize="large" />
                        </Link>
                        <Link to={admin?.linkedin || '/'}>
                            <LinkedIn color="primary" fontSize="large" />
                        </Link>
                        <Link to={admin?.twitter || '/'}>
                            <Twitter color="primary" fontSize="large" />
                        </Link>
                        <Link to={admin?.website || '/'}>
                            <PublicOutlined color="primary" fontSize="large" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
