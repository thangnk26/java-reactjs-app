import FormManagerJob from '~/components/recruiter/formManagerJob';
import RecruiterLayout from '~/layout/recruiterLayout';

function JobDenied() {
    return (
        <RecruiterLayout tab={'jobDenied'}>
            <FormManagerJob tab={'jobDenied'} title={'Việc làm bị từ chối'}></FormManagerJob>
        </RecruiterLayout>
    );
}

export default JobDenied;
