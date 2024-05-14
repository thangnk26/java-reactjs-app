import ListJobSearch from '~/components/candidate/listJobSearch';
// import Search from '~/components/candidate/search';
// import ItemSearchJob from '~/components/candidate/search/itemSearchJob';
import CandidateLayout from '~/layout/candidateLayout';

function SearchJob() {
    return (
        <CandidateLayout>
            {/* <Search className={'container mt-[85px] mx-auto border-2 border-sky-700 rounded-full'}></Search> */}
            {/* <ItemSearchJob></ItemSearchJob> */}
            <ListJobSearch></ListJobSearch>
        </CandidateLayout>
    );
}

export default SearchJob;
