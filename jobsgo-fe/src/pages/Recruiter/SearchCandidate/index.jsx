import SearchCandidate from '~/components/recruiter/searchCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function SearchCandidatePage() {
    return (
        <RecruiterLayout tab={'search'}>
            <SearchCandidate tab={'search'} title={'Kết quả tìm kiếm'}></SearchCandidate>
        </RecruiterLayout>
    );
}

export default SearchCandidatePage;
