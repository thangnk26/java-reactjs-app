import Mail from '~/components/recruiter/mail';
import RecruiterLayout from '~/layout/recruiterLayout';

function MailPage() {
    return (
        <RecruiterLayout tab={'mail'}>
            <Mail tab={'mail'} title={'Email'}></Mail>
        </RecruiterLayout>
    );
}

export default MailPage;
