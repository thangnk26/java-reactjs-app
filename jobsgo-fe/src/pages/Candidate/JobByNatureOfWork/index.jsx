import ListJobSearch from '~/components/candidate/listJobSearch';
import CandidateLayout from '~/layout/candidateLayout';

function JobByNatureOfWork() {
    return (
        <CandidateLayout>
            <ListJobSearch type="jobs-natureOfWork"></ListJobSearch>
        </CandidateLayout>
    );
}

export default JobByNatureOfWork;
