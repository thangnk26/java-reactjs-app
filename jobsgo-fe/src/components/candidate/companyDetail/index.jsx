import { Facebook, LinkedIn, LocationOnOutlined, PhoneOutlined, PublicOutlined, Twitter } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import JobItem from '../slider/jobItem';
import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';

import * as jobService from '~/service/jobService';
import * as userService from '~/service/userService';

function CompanyDetail() {
    const { id } = useParams();
    const [tab, setTab] = useState(1);
    const [company, setCompany] = useState();
    const [jobs, setJobs] = useState([]);

    const getAddress = (specificAddress, ward, district, city) => {
        let result = [];
        if (specificAddress) result.push(specificAddress);
        if (ward) result.push(ward);
        if (district) result.push(district);
        if (city) result.push(city);

        return result.join(', ');
    };

    useEffect(() => {
        const getData = async () => {
            const res = await jobService.viewJobOpenByRecruiterId(id);
            if (res?.success) {
                setJobs(res.data);
            }
        };
        getData();
    }, [id]);

    useEffect(() => {
        const getCompany = async () => {
            const res = await userService.getUserById(id);
            if (res?.success) {
                setCompany(res.data);
            }
        };
        getCompany();
    }, [id]);

    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center mb-4">
                <div className="w-[100px] h-[100px]">
                    <img src={company?.image || AvatarRecruiter} alt="avatar" />
                </div>

                <div className="flex flex-col p-4">
                    <h1 className="text-2xl font-bold">{company?.name || ''}</h1>
                    <p className="text-xl">{company?.shortName || ''}</p>
                </div>
            </div>
            <div className="border-b">
                <button
                    onClick={() => setTab(1)}
                    className={`mr-[1px] py-2 px-4 ${
                        tab === 1 ? 'text-sky-600 border-b-2 border-sky-800' : ''
                    } hover:text-sky-600 hover:border-b-2 hover:border-sky-800`}
                >
                    Tổng quan
                </button>
                <button
                    onClick={() => setTab(2)}
                    className={`mr-[1px] py-2 px-4 ${
                        tab === 2 ? 'text-sky-600 border-b-2 border-sky-800' : ''
                    } hover:text-sky-600 hover:border-b-2 hover:border-sky-800`}
                >
                    Việc làm <span className="text-sky-700">({jobs.length})</span>
                </button>
            </div>

            {tab === 1 ? (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="col-span-2">
                        <h2 className="text-xl font-bold my-2">Giới thiệu công ty</h2>

                        <p>{company?.description || ''}</p>
                    </div>

                    <div className="rounded-lg p-4 shadow-ssm h-max my-4">
                        <h2 className="text-xl font-bold">Thông tin</h2>
                        <div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.city && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <LocationOnOutlined fontSize="small" />
                                        </div>
                                        {/* <span>{`${company?.specificAddress} ${company?.wards} ${company?.districts} ${company?.city}`}</span> */}
                                        <span>
                                            {getAddress(
                                                company?.specificAddress,
                                                company?.wards,
                                                company?.districts,
                                                company?.city,
                                            )}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.website && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <PublicOutlined fontSize="small" />
                                        </div>
                                        <Link to={company?.website} className="text-sky-600 underline">
                                            {company?.website}
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.facebook && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <Facebook fontSize="small" />
                                        </div>
                                        <Link to={company?.facebook} className="text-sky-600 underline">
                                            {company?.facebook}
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.twitter && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <Twitter fontSize="small" />
                                        </div>
                                        <Link to={company?.twitter} className="text-sky-600 underline">
                                            {company?.twitter}
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.linkedin && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <LinkedIn fontSize="small" />
                                        </div>
                                        <Link to={company?.linkedin} className="text-sky-600 underline">
                                            {company?.linkedin}
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap py-4 text-[#666]">
                                {company?.phone && (
                                    <>
                                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-sky-600 bg-sky-100 mr-2">
                                            <PhoneOutlined fontSize="small" />
                                        </div>
                                        <Link
                                            to={`tel:${company?.phone}`}
                                            className="text-sky-600 underline"
                                            value={company?.phone || ''}
                                        >
                                            {company?.phone || ''}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-1">
                    {jobs.map((job) => (
                        <JobItem job={job}></JobItem>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompanyDetail;
