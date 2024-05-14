import ListJobSearch from '~/components/candidate/listJobSearch';
import CandidateLayout from '~/layout/candidateLayout';

function JobByCareer() {
    return (
        <CandidateLayout>
            <ListJobSearch type="jobs-career"></ListJobSearch>
        </CandidateLayout>
    );
}

export default JobByCareer;
