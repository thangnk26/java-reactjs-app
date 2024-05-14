import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import JobItem from './jobItem';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CompanyItem from './companyItem';
import { useEffect, useState } from 'react';
import * as jobService from '~/service/jobService';
import * as userService from '~/service/userService';
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="cursor-pointer absolute top-[50%] right-0 z-10 translate-y-[-50%] translate-x-[50%] w-[50px] h-[50px] rounded-full shadow-ssm flex justify-center items-center"
            onClick={onClick}
        >
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="cursor-pointer absolute top-[50%] left-0 z-10 translate-y-[-50%] translate-x-[-50%] w-[50px] h-[50px] rounded-full shadow-ssm flex justify-center items-center"
            onClick={onClick}
        >
            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </div>
    );
}
function CustomSlider({ type, title, option = 'job' }) {
    const [data, setData] = useState([]);
    const [linkShowAll, setLinkShowAll] = useState([]);
    let settings = {
        infinite: false,
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        slidesToScroll: 2,
        dots: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    if (option === 'company') {
        settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
    }

    useEffect(() => {
        const getData = async () => {
            if (type === 'jobs-featured') {
                setLinkShowAll(`jobs/featured`);
                const res = await jobService.viewJobFeatured();
                if (res?.success) {
                    setData(res.data);
                }
            } else if (type === 'company-featured') {
                setLinkShowAll(`company/featured`);
                const res = await userService.getAllRecruiterFeatured();
                if (res?.success) {
                    setData(res.data);
                }
            } else if (type === 'jobs-for-you') {
                setLinkShowAll(`jobs/for-you`);
                const res = await jobService.viewSuitableJob();
                if (res?.success) {
                    setData(res.data);
                }
            } else if (type === 'jobs-new') {
                setLinkShowAll(`/jobs/new`);
                const res = await jobService.viewJobNew();
                if (res?.success) {
                    setData(res.data);
                }
            } else {
                setData([]);
            }
        };
        getData();
    }, [type]);
    return (
        <div className={`${option === 'company' ? 'bg-white' : ' bg-slate-100'} mt-16 pb-8`}>
            <div className="container m-auto ">
                <div className="py-3 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Link to={linkShowAll} className="text-sky-700 hover:opacity-80">
                        Xem tất cả
                    </Link>
                </div>
                <div>
                    {option === 'job' ? (
                        <Slider {...settings}>
                            {data?.map((job) => (
                                <div key={job?.id}>
                                    <JobItem job={job}></JobItem>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <Slider {...settings}>
                            {data?.map((company) => (
                                <div key={company?.id} className="hover:scale-110">
                                    <CompanyItem company={company}></CompanyItem>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomSlider;
