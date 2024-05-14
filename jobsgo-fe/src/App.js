import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '~/App.css';
import Home from '~/pages/Candidate/Home';
import Company from './pages/Candidate/Company';
import SearchJob from './pages/Candidate/SearchJob';
import DetailJobPage from './pages/Candidate/DetailJob';
import Login from './components/auth/login';
import Register from './components/auth/register';
import CompanyDetailPage from './pages/Candidate/CompanyDetail';
import CreateCV from './pages/Candidate/CV/CreateCV';
import JobOpen from './pages/Recruiter/Job/JobOpen';
import JobDetailPage from './pages/Recruiter/Job/JobDetail';
import CandidateSelected from './pages/Recruiter/Candidate/CandidateSelected';
import SearchCandidatePage from './pages/Recruiter/SearchCandidate';
import JobPause from './pages/Recruiter/Job/JobPause';
import JobExpired from './pages/Recruiter/Job/JobExpired';
import JobPending from './pages/Recruiter/Job/JobPending';
import CandidateApply from './pages/Recruiter/Candidate/CandidateApply';
import CandidateConsider from './pages/Recruiter/Candidate/CandidateConsider';
import CandidateDenied from './pages/Recruiter/Candidate/CandidateDenied';
import CandidateFit from './pages/Recruiter/Candidate/CandidateFit';
import CreateJobPage from './pages/Recruiter/Job/CreateJob';
import LoginRecruiter from './components/auth/loginRecruiter';
import RegisterRecruiter from './components/auth/registerRecruiter';
import ViewAllCV from './pages/Candidate/CV/ViewAllCV';
import ViewDetailCVPage from './pages/Candidate/CV/ViewDetailCV';
import InfoPage from './pages/Recruiter/Info';
import ChangePasswordPage from './pages/Recruiter/changePassword';
import UpdateCV from './pages/Candidate/CV/UpdateCV';
import UpdateJobPage from './pages/Recruiter/Job/UpdateJob';
import ListApplyPage from './pages/Candidate/listJobApply';
import JobByCareer from './pages/Candidate/JobByCareer';
import JobNoExp from './pages/Candidate/JobNoExp';
import BuyPackage from './pages/Recruiter/BuyPackage';
import ChangePasswordCandidate from './pages/Candidate/changePassword';
import Sidebar from './components/admin/Sidebar';
import CreatePack from './pages/Admin/package/CreatePack';
import JobDenied from './pages/Recruiter/Job/JobDenied';
import LoginAdmin from './components/auth/loginAdmin';
import ForgotPassword from './components/auth/forgotPassword';
import JobFeatured from './pages/Candidate/JobFeatured';
import CompanyFeatured from './pages/Candidate/Company/companyFeatured';
import JobByNatureOfWork from './pages/Candidate/JobByNatureOfWork';
import JobNew from './pages/Candidate/JobNew';
import JobForYou from './pages/Candidate/JobForYou';
import CandidateInfo from './pages/Candidate/CandidateInfo';
import UploadAttachmentsPage from './pages/Candidate/CV/UpLoadAttachments';
import ListAttachmentsPage from './pages/Candidate/listAttachments';
import MailPage from './pages/Recruiter/Mail';
// import Template2Page from './pages/Candidate/CV/Template2';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/company" element={<Company />}></Route>
                    <Route path="/company/featured" element={<CompanyFeatured />}></Route>
                    <Route path="/company/:id" element={<CompanyDetailPage />}></Route>
                    <Route path="/jobs" element={<SearchJob />}></Route>
                    <Route path="/jobs/noExp" element={<JobNoExp />}></Route>
                    <Route path="/jobs/new" element={<JobNew />}></Route>
                    <Route path="/jobs/for-you" element={<JobForYou />}></Route>
                    <Route path="/jobs/featured" element={<JobFeatured />}></Route>
                    <Route path="/jobs/natureOfWork" element={<JobByNatureOfWork />}></Route>
                    <Route path="/jobs/careers/:id" element={<JobByCareer />}></Route>
                    <Route path="/jobs/:id" element={<DetailJobPage />}></Route>
                    <Route path="/jobs/job-applied" element={<ListApplyPage />}></Route>
                    <Route path="/cv/create" element={<CreateCV />}></Route>
                    <Route path="/cv/upload" element={<UploadAttachmentsPage />}></Route>
                    <Route path="/cv/view" element={<ViewAllCV />}></Route>
                    <Route path="/cv/view/:id/template/:template" element={<ViewDetailCVPage />}></Route>
                    <Route path="/cv/update/:id" element={<UpdateCV />}></Route>
                    <Route path="/candidate/changePassword" element={<ChangePasswordCandidate />}></Route>
                    <Route path="/candidate/info" element={<CandidateInfo />}></Route>
                    <Route path="/candidate/attachments" element={<ListAttachmentsPage />}></Route>

                    <Route path="/recruiter/login" element={<LoginRecruiter />}></Route>
                    <Route path="/recruiter/register" element={<RegisterRecruiter />}></Route>
                    <Route path="/recruiter/managerJobs/open" element={<JobOpen />}></Route>
                    <Route path="/recruiter/managerJobs/pause" element={<JobPause />}></Route>
                    <Route path="/recruiter/managerJobs/expired" element={<JobExpired />}></Route>
                    <Route path="/recruiter/managerJobs/pending" element={<JobPending />}></Route>
                    <Route path="/recruiter/managerJobs/denied" element={<JobDenied />}></Route>
                    <Route path="/recruiter/jobs/:id" element={<JobDetailPage />}></Route>
                    <Route path="/recruiter/managerCandidate/apply" element={<CandidateApply />}></Route>
                    <Route path="/recruiter/managerCandidate/selected" element={<CandidateSelected />}></Route>
                    <Route path="/recruiter/managerCandidate/consider" element={<CandidateConsider />}></Route>
                    <Route path="/recruiter/managerCandidate/denied" element={<CandidateDenied />}></Route>
                    <Route path="/recruiter/search" element={<SearchCandidatePage />}></Route>
                    <Route path="/recruiter/fit" element={<CandidateFit />}></Route>
                    <Route path="/recruiter/jobs/create" element={<CreateJobPage />}></Route>
                    <Route path="/recruiter/jobs/update/:id" element={<UpdateJobPage />}></Route>
                    <Route path="/recruiter/info" element={<InfoPage />}></Route>
                    <Route path="/recruiter/changePassword" element={<ChangePasswordPage />}></Route>
                    <Route path="/recruiter/buyPackage" element={<BuyPackage />}></Route>
                    <Route path="/recruiter/email" element={<MailPage />}></Route>

                    <Route path="/admin" element={<Sidebar />}></Route>
                    <Route path="/admin/login" element={<LoginAdmin />}></Route>
                    <Route path="/admin/create_package" element={<CreatePack />}></Route>
                    <Route path="/admin/manage/:id" element={<Sidebar />}></Route>
                    <Route path="/admin/changePassword" element={<Sidebar />}></Route>
                    <Route path="/admin/info" element={<Sidebar />}></Route>
                    <Route path="/admin/changeSetting" element={<Sidebar />}></Route>
                    <Route path="/admin/statistical" element={<Sidebar />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
