module.exports = {
    user: require('./user'),
    patient: require('./patient'),
    department: require('./department'),
    doctor: require('./doctor'), 
    patientCard: require('./patient_card').create,
    updatePatientCard: require('./patient_card').update,
    appointment: require('./appointment'),
}
