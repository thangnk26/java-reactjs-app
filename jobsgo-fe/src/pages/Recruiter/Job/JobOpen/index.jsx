import FormManagerJob from '~/components/recruiter/formManagerJob';
import RecruiterLayout from '~/layout/recruiterLayout';

function JobOpen() {
    return (
        <RecruiterLayout tab={'open'}>
            <FormManagerJob tab={'open'} title={'Việc làm đang tuyển'}></FormManagerJob>
        </RecruiterLayout>
    );
}

export default JobOpen;
