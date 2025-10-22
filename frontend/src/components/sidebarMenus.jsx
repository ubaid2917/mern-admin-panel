export const sidebarMenus = {

    admin: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "User", path: "/users/list" },
        { name: "Patients", path: "/patients/list" },
        { name: "Smart Card", path: "/cards/list" },
        { name: "Appointment", path: "/appointments/list" },
        { name: "Category", path: "/category" },
        { name: "Chat", path: "/chat/list" },
        {
            name: "Doctor Details",
            dropdown: [
                { name: "Departments", path: "/departments/list" },
                { name: "Doctors", path: "/doctors/list" },
                { name: "Something else", path: "/something" },
            ],
        },
    ],
    doctor: [
        { name: "Dashboard", path: "/doctor/dashboard" },
        { name: "Appointments", path: "/doctor/appointments" },
        { name: "Patients", path: "/doctor/patients" },
    ],
    patient: [
        { name: "Dashboard", path: "/patient/dashboard" },
        { name: "Appointments", path: "/patient/appointments" },
        { name: "Patients", path: "/patient/patients" },
    ],
};

