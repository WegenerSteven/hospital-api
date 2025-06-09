@Injectable()
export class AppointmentsPolicies {
  // Define policies for appointments here
  // For example, you can define methods to check if a user can create, read, update, or delete appointments
  canCreateAppointment(user: any): boolean {
    return user && user.role === 'Doctor'; // Example condition
  }

  canReadAppointment(user: any): boolean {
    return user && (user.role === 'Doctor' || user.role === 'Patient'); // Example condition
  }

  canUpdateAppointment(user: any): boolean {
    return user && user.role === 'Doctor'; // Example condition
  }

  canDeleteAppointment(user: any): boolean {
    return user && user.role === 'Doctor'; // Example condition
  }
}
