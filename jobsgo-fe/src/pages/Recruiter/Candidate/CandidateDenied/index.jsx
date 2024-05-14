import FormManagerCandidate from '~/components/recruiter/formManagerCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function CandidateDenied() {
    return (
        <RecruiterLayout tab={'denied'}>
            <FormManagerCandidate tab={'denied'} title={'Danh sách ứng viên bị từ chối'}></FormManagerCandidate>
        </RecruiterLayout>
    );
}

export default CandidateDenied;
