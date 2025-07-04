import "./App.css";

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Resources from "./pages/Resource";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide/Guide";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";
import MainLayout from "./components/MainLayout/MainLayout";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserInfo} from "./redux/feature/userSlice";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManagerDashboard from "./pages/Admin/ManagerDashboard";
import CreateUser from "./pages/Admin/AccountManagement/CreateUser/CreateUser";
import ListUser from "./pages/Admin/AccountManagement/ListUser/ListUser";
import EditUser from "./pages/Admin/AccountManagement/EditUser/EditUser";
import CampaignList from "./pages/Admin/Campaign/CampaignList/CampaignList";
import CreateCampaign from "./pages/Admin/Campaign/CreateCampaign/CreateCampaign";
import DetailCampaign from "./pages/Admin/Campaign/DetailCampaign/DetailCampaign";
import CreateHealthCheck from "./pages/Admin/HealthCheck/CreateHealthCheck/CreateHealthCheck";
import HealthCheckDetail from "./pages/Admin/HealthCheck/HealthCheckDetail/HealthCheckDetail";
import HealthCheckList from "./pages/Admin/HealthCheck/HealthCheckList/HealthCheckList";
import StudentHealthCheckList from "./pages/Admin/HealthCheck/StudentList/StudentHealthCheckList";
import StudentVaccineList from "./pages/Admin/Campaign/StudentList/StudentVaccineList";
import MedicalRequest from "./pages/Admin/MedicalRequest/MedicalRequest";
import StudentList from "./pages/Admin/StudentManagement/StudentList/StudentList";
import UserProfileAdmin from "./pages/Admin/Profile/User/UserProfile";
import UpdateUserProfileAdmin from "./pages/Admin/Profile/Edit/UpdateUserProfile";
import Notification from "./pages/Admin/Notification/Notification";
import AddStudent from "./pages/Admin/StudentManagement/AddStudent/AddStudent";

// Nurse pages
import NurseDashboard from "./pages/Nurse/Dashboard";
import AppointmentList from "./pages/Nurse/AppointmentManagement/AppointmentList/AppointmentList";
import NurseCampaignList from "./pages/Nurse/Campaign/CampaignList/CampaignList";
import NurseDetailCampaign from "./pages/Nurse/Campaign/DetailCampaign/DetailCampaign";
// import NurseHistoryCampaign from "./pages/Nurse/Campaign/HistoryCampaign/HistoryCampaign";
// import RecordForm from "./pages/Nurse/Campaign/RecordForm/RecordForm";
import HealthCheckListMain from "./pages/Nurse/HealthCheck/HealthCheckList/HealthCheckList";
import HealthCheckDetailRound from "./pages/Nurse/HealthCheck/HealthCheckDetail/HealthCheckDetail";
import CreateMedicalEvent from "./pages/Nurse/MediacalEvent/CreateMedicalEvent/CreateMedicalEvent";
import MedicalEventList from "./pages/Nurse/MediacalEvent/MedicalEventList/MedicalEventList";
import MedicalEventDetail from "./pages/Nurse/MediacalEvent/MedicalEventDetail/MedicaEventDetail";
import MedicalReceivedList from "./pages/Nurse/MedicalReceived/MedicalReceived/MedicalReceived";
import MedicalReceivedDetail from "./pages/Nurse/MedicalReceived/MedicalReceivedDetail/MedicalReceivedDetail";
import NurseNotification from "./pages/Nurse/Notification/Notification";
import UserProfileNurse from "./pages/Nurse/Profile/User/UserProfile";
import UpdateUserProfileNurse from "./pages/Nurse/Profile/Edit/UpdateUserProfile";

// Parent pages
import ParentHome from "./pages/Parent/ParentHome";
import ParentAppointmentList from "./pages/Parent/Appointment/AppointmentList/AppointmentList";
import ParentAppointmentDetail from "./pages/Parent/Appointment/AppointmentDetails/AppointmentDetail";
import ParentAppointmentHistory from "./pages/Parent/Appointment/AppointmentHistory/AppointmentHistory";
import ParentCalenderAppointment from "./pages/Parent/Appointment/CalenderAppointment/CalenderAppointmentNurse";
import ParentHealthDeclaration from "./pages/Parent/HealthDeclaration/DeclaretionForm/DeclaretionForm";
import ParentDeclarationDetail from "./pages/Parent/HealthDeclaration/DeclarationDetail/DeclarationDetail";
import ParentMyChildren from "./pages/Parent/HealthDeclaration/MyChildren/MyChildren";
import ParentCreateMedicalRegistration from "./pages/Parent/MedicalRegistration/CreateMedicalRes/CreateMedicalResForm";
import ParentMedicalRegistrationList from "./pages/Parent/MedicalRegistration/MediacalRegistrationList/MedicalRegistrationList";
import ParentDetailMedicalRegistration from "./pages/Parent/MedicalRegistration/DetailMedicalRes/DetailMediacalRes";
// import MedicalEventMyChildren from "./pages/Parent/MedicalEvent/MyChildren/MyChildren";
import MedicalEventChildrenList from "./pages/Parent/MedicalEvent/MedicalChild/MedicalChildren";
import MedicalEventChildrenEventList from "./pages/Parent/MedicalEvent/MedicalEventStudent/MedicalEventList";
import MedicalEventChildrenDetail from "./pages/Parent/MedicalEvent/MedicalEventDetail/MedicalEventDetail";
import HealthCheckResult from "./pages/Parent/HealthDeclaration/HealthCheckResult/HealthCheckResult";
import VaccineResult from "./pages/Parent/HealthDeclaration/VaccineResult/VaccineResult";
import ParentNotification from "./pages/Parent/Notification/Notification";
import UserProfile from "./pages/Parent/Profile/User/UserProfile";
import UpdateUserProfile from "./pages/Parent/Profile/Edit/UpdateUserProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import MedicalInventory from "./pages/Admin/MedicalInventory/MedicalInventoryList/MedicalInventory";
import AddMedicalInventory from "./pages/Admin/MedicalInventory/AddInventory/AddInventory";
import VaccineInventory from "./pages/Admin/VaccineList/VaccineInventory/VaccineInventory";
import AddVaccine from "./pages/Admin/VaccineList/AddVaccine/AddVaccine";
import SessionTimeout from "./components/SessionTimeout/SessionTimeout";
import Timeable from "./pages/Parent/Timetable/Timeable";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (role && userId) {
      dispatch(setUserInfo({role, userId}));
    }
  }, [dispatch]);

  return (
    <>
      <SessionTimeout />
      <Routes>
        {/* Trang chung cho tất cả user */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="resources" element={<Resources />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="guide" element={<Guide />} />
          {/* Route dành cho Parent */}
          <Route
            path="parent"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ParentHome />} />
            <Route path="timetable" element={<Timeable />} />
            <Route
              path="appointments-list"
              element={<ParentAppointmentList />}
            />
            <Route
              path="appointment-details"
              element={<ParentAppointmentDetail />}
            />
            <Route
              path="appointment-history"
              element={<ParentAppointmentHistory />}
            />
            <Route
              path="calender-appointment"
              element={<ParentCalenderAppointment />}
            />
            <Route
              path="health-declaration/declaration-form"
              element={<ParentHealthDeclaration />}
            />
            <Route
              path="health-declaration/my-children"
              element={<ParentMyChildren />}
            />
            <Route
              path="health-declaration/detail"
              element={<ParentDeclarationDetail />}
            />
            <Route
              path="medical-registration/create"
              element={<ParentCreateMedicalRegistration />}
            />
            <Route
              path="medical-registration/list"
              element={<ParentMedicalRegistrationList />}
            />
            <Route
              path="medical-registration/detail"
              element={<ParentDetailMedicalRegistration />}
            />
            <Route
              path="medical-event/children-list"
              element={<MedicalEventChildrenList />}
            />
            <Route
              path="medical-event/children-event-list"
              element={<MedicalEventChildrenEventList />}
            />
            <Route
              path="medical-event/children-detail/"
              element={<MedicalEventChildrenDetail />}
            />
            <Route path="profile" element={<UserProfile />} />
            <Route path="notification" element={<ParentNotification />} />
            <Route path="profile/update" element={<UpdateUserProfile />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="healthcheck/result" element={<HealthCheckResult />} />
            <Route path="vaccine/result" element={<VaccineResult />} />
          </Route>
        </Route>

        {/* Route dành cho Admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="account-management/create-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="account-management/list-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ListUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="account-management/edit-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          {/* Các route còn lại cho admin */}
          <Route path="inventory/create" element={<AddMedicalInventory />} />
          <Route
            path="inventory/inventoryList"
            element={<MedicalInventory />}
          />
          <Route path="vaccine/create" element={<AddVaccine />} />
          <Route path="vaccine/inventoryList" element={<VaccineInventory />} />
          <Route path="vaccine/vaccine-schedule" element={<CampaignList />} />
          <Route path="vaccine/create-campaign" element={<CreateCampaign />} />
          <Route
            path="vaccine/vaccine-schedule-details"
            element={<DetailCampaign />}
          />
          <Route
            path="vaccine/vaccine-round/student-list"
            element={<StudentVaccineList />}
          />
          <Route path="health-check/create" element={<CreateHealthCheck />} />
          <Route path="health-check/details" element={<HealthCheckDetail />} />
          <Route path="health-check/schedules" element={<HealthCheckList />} />
          <Route
            path="health-check/details/student-list"
            element={<StudentHealthCheckList />}
          />
          <Route path="medical-requests" element={<MedicalRequest />} />

          <Route
            path="student-management/add-student"
            element={<AddStudent />}
          />
          <Route
            path="student-management/student-list"
            element={<StudentList />}
          />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<UserProfileAdmin />} />
          <Route path="profile/update" element={<UpdateUserProfileAdmin />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>

        {/* Route dành cho Manager */}
        <Route
          path="manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />{" "}
          <Route path="inventory/create" element={<AddMedicalInventory />} />
          <Route
            path="inventory/inventoryList"
            element={<MedicalInventory />}
          />
          <Route path="vaccine/inventoryList" element={<VaccineInventory />} />
          <Route path="vaccine/create" element={<AddVaccine />} />
          <Route path="vaccine/vaccine-schedule" element={<CampaignList />} />
          <Route path="vaccine/create-campaign" element={<CreateCampaign />} />
          <Route
            path="vaccine/vaccine-schedule-details"
            element={<DetailCampaign />}
          />
          <Route
            path="vaccine/vaccine-round/student-list"
            element={<StudentVaccineList />}
          />
          <Route path="health-check/create" element={<CreateHealthCheck />} />
          <Route path="health-check/details" element={<HealthCheckDetail />} />
          <Route path="health-check/schedules" element={<HealthCheckList />} />
          <Route
            path="health-check/details/student-list"
            element={<StudentHealthCheckList />}
          />
          <Route path="medical-requests" element={<MedicalRequest />} />
          <Route
            path="student-management/add-student"
            element={<AddStudent />}
          />
          <Route
            path="student-management/student-list"
            element={<StudentList />}
          />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<UserProfileAdmin />} />
          <Route path="profile/update" element={<UpdateUserProfileAdmin />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>

        {/* Route dành cho Nurse */}
        <Route
          path="nurse"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NurseDashboard />} />
          <Route
            path="appointment-management/appointment-list"
            element={<AppointmentList />}
          />
          <Route path="vaccine/campaign-list" element={<NurseCampaignList />} />
          <Route
            path="campaign/round-campaign"
            element={<NurseDetailCampaign />}
          />
          <Route path="health-check/list" element={<HealthCheckListMain />} />
          <Route
            path="health-check/round-campaign"
            element={<HealthCheckDetailRound />}
          />
          <Route
            path="medical-event/create-medical-event"
            element={<CreateMedicalEvent />}
          />
          <Route
            path="medical-event/medical-event-list"
            element={<MedicalEventList />}
          />
          <Route
            path="medical-event/medical-event-detail/"
            element={<MedicalEventDetail />}
          />
          <Route
            path="medical-received/medical-received-list"
            element={<MedicalReceivedList />}
          />
          <Route
            path="medical-received/medical-received-detail"
            element={<MedicalReceivedDetail />}
          />

          <Route path="notification" element={<NurseNotification />} />
          <Route path="profile" element={<UserProfileNurse />} />
          <Route path="profile/update" element={<UpdateUserProfileNurse />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
