import ChangePassword from '~/components/recruiter/changePassword';
import CandidateLayout from '~/layout/candidateLayout';

function ChangePasswordCandidate() {
    return (
        <CandidateLayout>
            <div className="mt-[100px]">
                <ChangePassword type="candidate"></ChangePassword>
            </div>
        </CandidateLayout>
    );
}

export default ChangePasswordCandidate;
