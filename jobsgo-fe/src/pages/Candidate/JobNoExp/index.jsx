import ListJobSearch from '~/components/candidate/listJobSearch';
// import Search from '~/components/candidate/search';
import CandidateLayout from '~/layout/candidateLayout';

function JobNoExp() {
    return (
        <CandidateLayout>
            {/* <Search className={'container mt-[85px] mx-auto border-2 border-sky-700 rounded-full'}></Search> */}
            <ListJobSearch type="jobs-noExp"></ListJobSearch>
        </CandidateLayout>
    );
}

export default JobNoExp;
