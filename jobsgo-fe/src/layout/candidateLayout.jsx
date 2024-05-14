import Footer from '~/components/candidate/footer';
import Header from '~/components/candidate/header';

function CandidateLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default CandidateLayout;
