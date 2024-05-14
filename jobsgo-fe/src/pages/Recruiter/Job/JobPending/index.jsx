import FormManagerJob from '~/components/recruiter/formManagerJob';
import RecruiterLayout from '~/layout/recruiterLayout';

function JobPending() {
    return (
        <RecruiterLayout tab={'pending'}>
            <FormManagerJob tab={'pending'} title={'Việc làm đang chờ duyệt'}></FormManagerJob>
        </RecruiterLayout>
    );
}

export default JobPending;
