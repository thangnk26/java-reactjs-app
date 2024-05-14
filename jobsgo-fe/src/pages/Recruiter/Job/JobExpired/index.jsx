import FormManagerJob from '~/components/recruiter/formManagerJob';
import RecruiterLayout from '~/layout/recruiterLayout';

function JobExpired() {
    return (
        <RecruiterLayout tab={'expired'}>
            <FormManagerJob tab={'expired'} title={'Việc làm đã hết hạn'}></FormManagerJob>
        </RecruiterLayout>
    );
}

export default JobExpired;
