import { useEffect, useState } from 'react';
import JobItem from '../slider/jobItem';
import * as jobService from '~/service/jobService';
import * as careerService from '~/service/careerService';
import { Link, createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import addressArray from '~/data/address.json';
import Search from '../search';
function ListJobSearch({ type = 'jobs' }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('Danh sách công việc');
    const [searchParams] = useSearchParams();
    const [listJob, SetListJob] = useState([]);
    const [listCareer, SetListCareer] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const resCareer = await careerService.getAllCareer();
            if (resCareer?.success) {
                SetListCareer(resCareer.data);
            }
            switch (type) {
                case 'jobs':
                    if (
                        (searchParams.get('keyword') === '' && searchParams.get('address') === '') ||
                        (searchParams.get('keyword') === null && searchParams.get('address') === null)
                    ) {
                        const res = await jobService.viewJobOpen();
                        if (res?.success) {
                            SetListJob(res?.data);
                        }
                    } else if (searchParams.get('keyword') !== '' && searchParams.get('address') === '') {
                        const res = await jobService.search(searchParams.get('keyword'), null);
                        if (res?.success) {
                            SetListJob(res.data);
                        }
                    } else if (searchParams.get('keyword') === '' && searchParams.get('address') !== '') {
                        const res = await jobService.search(null, searchParams.get('address'));
                        if (res?.success) {
                            SetListJob(res.data);
                        }
                    } else if (searchParams.get('keyword') !== '' && searchParams.get('address') !== '') {
                        const res = await jobService.search(searchParams.get('keyword'), searchParams.get('address'));
                        if (res?.success) {
                            SetListJob(res.data);
                        }
                    }
                    break;
                case 'jobs-career':
                    const res = await jobService.viewJobByCareerId(id);
                    if (res?.success) {
                        const careerCurrent = listCareer.find((career) => career.id.toString() === id.toString());
                        setTitle(`Danh sách công việc của ngành nghề ${careerCurrent?.name}`);
                        SetListJob(res.data);
                    }
                    break;
                case 'jobs-noExp':
                    setTitle('Danh sách công việc không cần kinh nghiệm');
                    const resNoExp = await jobService.viewJobNoExp();
                    if (resNoExp?.success) {
                        SetListJob(resNoExp.data);
                    }
                    break;
                case 'jobs-featured':
                    setTitle('Danh sách công việc nổi bật');
                    const resFeatured = await jobService.viewJobFeatured();
                    if (resFeatured?.success) {
                        SetListJob(resFeatured.data);
                    }
                    break;
                case 'jobs-new':
                    setTitle('Danh sách công việc mới nhất');
                    const resNew = await jobService.viewJobNew();
                    if (resNew?.success) {
                        SetListJob(resNew.data);
                    }
                    break;
                case 'jobs-for-you':
                    setTitle('Danh sách công việc dành cho bạn');
                    const resForYou = await jobService.viewSuitableJob();
                    if (resForYou?.success) {
                        SetListJob(resForYou.data);
                    }
                    break;
                case 'jobs-natureOfWork':
                    // setTitle('Danh sách công việc nổi b');
                    const resNatureOfWork = await jobService.viewJobByNaturedOfWork(searchParams.get('natureOfWork'));
                    if (resNatureOfWork?.success) {
                        SetListJob(resNatureOfWork.data);
                    }
                    break;
                default:
                    break;
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, type, id, listCareer.length]);
    return (
        <div className="container m-auto grid grid-cols-3 gap-4 mt-[85px] mb-8">
            <div className="col-span-2">
                <Search className={'border-2 my-4 border-sky-700 rounded-full'}></Search>
                <p className="uppercase p-2 font-semibold bg-slate-300 container m-auto">{title}</p>
                <div className="grid grid-cols-2 gap-1 mt-4">
                    {listJob?.map((job) => (
                        <JobItem key={job.id} job={job} className="hover:shadow-md hover:bg-slate-50"></JobItem>
                    ))}
                </div>
            </div>
            <div className="col-span-1 mt-4">
                <div>
                    <h2 className="uppercase font-bold text-sky-600">Ngành nghề</h2>
                    <div className="max-h-[300px] overflow-auto">
                        {listCareer?.map((career) => (
                            <Link
                                className="block hover:text-sky-700"
                                key={career.id}
                                to={`/jobs/careers/${career.id}`}
                            >
                                {career.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="uppercase font-bold text-sky-600">Địa điểm</h2>
                    <div className="max-h-[300px] overflow-auto">
                        {addressArray?.map((address, index) => (
                            <Link
                                className="block hover:text-sky-700"
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate({
                                        pathname: '/jobs',
                                        search: createSearchParams({
                                            keyword: '',
                                            address: address.name,
                                        }).toString(),
                                    });
                                }}
                            >
                                {address.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="uppercase font-bold text-sky-600">Loại hình làm việc</h2>
                    <div className="max-h-[300px] overflow-auto">
                        <Link
                            to={'/jobs/natureOfWork'}
                            className="hover:text-sky-700 pb-1 block"
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
                            Full-time
                        </Link>
                        <Link
                            to={'/jobs/natureOfWork'}
                            className="hover:text-sky-700 pb-1 block"
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
                            Part-time
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListJobSearch;
