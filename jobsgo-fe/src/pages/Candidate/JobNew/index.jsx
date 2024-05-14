import ListJobSearch from '~/components/candidate/listJobSearch';
// import Search from '~/components/candidate/search';
import CandidateLayout from '~/layout/candidateLayout';

function JobNew() {
    return (
        <CandidateLayout>
            {/* <Search className={'container mt-[85px] mx-auto border-2 border-sky-700 rounded-full'}></Search> */}
            <ListJobSearch type="jobs-new"></ListJobSearch>
        </CandidateLayout>
    );
}

export default JobNew;
