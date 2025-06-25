# Hospital Management System API Documentation

## Overview

The **Hospital Management System API** is a RESTful backend that manages doctor-patient interactions, appointments, and medical records. It is divided into three main modules:
- **Admin**
- **Doctor**
- **User (Patient)**

Each module has its own API endpoints and access controls.

---

## System Structure

- **Admin Module:** Full control over all system data (doctors, patients, appointments, queries)
- **Doctor Module:** Manage appointments, view/add patient medical histories
- **User Module (Patient):** Book appointments, view personal medical history, manage profile

---

## Database Schema & Entity Relationships

### Entity Diagram (Textual)
- **Admins** (admin_id) — manages all resources
- **Doctors** (doctor_id) —< appointments >— (patient_id) **Patients**
- **Appointments** reference both **Doctors** and **Patients**
- **Medical Histories** reference both **Doctors** and **Patients**
- **Session Logs** track authentication for Doctors and Patients
- **Contact Queries** are submitted by users/patients

### Table Definitions

<details>
<summary><b>Admins</b></summary>

| Field        | Type           | Description               |
|--------------|----------------|---------------------------|
| admin_id     | INT (PK)       | Auto-incremented ID       |
| username     | VARCHAR(255)   | Admin username            |
| password     | VARCHAR(255)   | Hashed password           |
| email        | VARCHAR(255)   | Email address             |
| last_login   | DATETIME       | Last login timestamp      |
</details>

<details>
<summary><b>Doctors</b></summary>

| Field          | Type           | Description              |
|----------------|----------------|--------------------------|
| doctor_id      | INT (PK)       | Auto-incremented ID      |
| first_name     | VARCHAR(255)   | First name               |
| last_name      | VARCHAR(255)   | Last name                |
| specialization | VARCHAR(255)   | Medical specialty        |
| email          | VARCHAR(255)   | Email address            |
| phone_number   | VARCHAR(15)    | Phone number             |
| password       | VARCHAR(255)   | Hashed password          |
| status         | VARCHAR(50)    | Active/Inactive          |
</details>

<details>
<summary><b>Patients</b></summary>

| Field             | Type           | Description              |
|-------------------|----------------|--------------------------|
| patient_id        | INT (PK)       | Auto-incremented ID      |
| first_name        | VARCHAR(255)   | First name               |
| last_name         | VARCHAR(255)   | Last name                |
| dob               | DATE           | Date of birth            |
| email             | VARCHAR(255)   | Email                    |
| phone_number      | VARCHAR(15)    | Contact number           |
| gender            | VARCHAR(10)    | Gender                   |
| address           | TEXT           | Address                  |
| status            | VARCHAR(50)    | Active/Inactive          |
| registration_date | DATETIME       | Registration timestamp   |
</details>

<details>
<summary><b>Appointments</b></summary>

| Field            | Type           | Description                                               |
|------------------|----------------|-----------------------------------------------------------|
| appointment_id   | INT (PK)       | Auto-incremented ID                                       |
| patient_id       | INT (FK)       | References `patients.patient_id`                          |
| doctor_id        | INT (FK)       | References `doctors.doctor_id`                            |
| appointment_date | DATETIME       | Scheduled date/time                                       |
| status           | VARCHAR(20)    | Pending/Confirmed                                         |
| reason           | TEXT           | Appointment reason                                        |
| created_at       | DATETIME       | Creation timestamp                                        |
| updated_at       | DATETIME       | Last update timestamp                                     |
</details>

<details>
<summary><b>Medical Histories</b></summary>

| Field         | Type         | Description                                |
|---------------|--------------|--------------------------------------------|
| history_id    | INT (PK)     | Auto-incremented ID                        |
| patient_id    | INT (FK)     | References `patients.patient_id`           |
| doctor_id     | INT (FK)     | References `doctors.doctor_id`             |
| diagnosis     | TEXT         | Medical diagnosis                          |
| treatment     | TEXT         | Treatment details                          |
| date          | DATETIME     | Date of diagnosis/treatment                |
</details>

<details>
<summary><b>Contact Queries</b></summary>

| Field          | Type           | Description           |
|----------------|----------------|-----------------------|
| query_id       | INT (PK)       | Auto-incremented ID   |
| user_name      | VARCHAR(255)   | Name of submitter     |
| email          | VARCHAR(255)   | Email of submitter    |
| query_message  | TEXT           | Content of the query  |
| status         | VARCHAR(20)    | Pending/Responded     |
| submitted_date | DATETIME       | Submission timestamp  |
</details>

<details>
<summary><b>Doctor Session Logs</b></summary>

| Field       | Type         | Description                      |
|-------------|--------------|----------------------------------|
| log_id      | INT (PK)     | Auto-incremented ID              |
| doctor_id   | INT (FK)     | References `doctors.doctor_id`   |
| login_time  | DATETIME     | Login time                       |
| logout_time | DATETIME     | Logout time                      |
</details>

<details>
<summary><b>User Session Logs</b></summary>

| Field       | Type         | Description                      |
|-------------|--------------|----------------------------------|
| log_id      | INT (PK)     | Auto-incremented ID              |
| user_id     | INT (FK)     | References `patients.patient_id` |
| login_time  | DATETIME     | Login time                       |
| logout_time | DATETIME     | Logout time                      |
</details>

---

## API Endpoint Design

| Resource         | Endpoint Pattern                | Description                         |
|------------------|--------------------------------|-------------------------------------|
| Admins           | `/admins`                  | Admin management                    |
| Doctors          | `/doctors`                 | Doctor management                   |
| Patients         | `/patients`                | Patient management                  |
| Appointments     | `/appointments`            | Appointment scheduling              |
| Medical History  | `/medical-histories`       | Medical records                     |
| Contact Queries  | `/contact-queries`         | "Contact Us" queries                |
| Session Logs     | `/session-logs/{role}`     | Doctor/User session tracking        |

---

## Example Workflows

**Patient Books Appointment:**  
1. Patient logs in  
2. `POST /appointments` with doctor_id and date  
3. Appointment status set to pending/confirmed

**Doctor Adds Medical History:**  
1. Doctor logs in  
2. `POST/medical-histories` with patient_id, diagnosis, treatment

**Admin Manages Doctor:**  
1. Admin logs in  
2. `POST/doctors` to add new doctor  
3. `PUT/doctors/{id}` to update doctor info

---

### To access DB inside container:
``docker exec -it hospital-postgres sh``.

``psql -U postgres -d db_name``

## Extensibility Suggestions

- **Notifications:** Add SMS/email notifications for appointments
- **Payments:** Integrate payment gateway
- **Mobile App:** REST endpoints are mobile-ready

---

## Security Best Practices

- Use HTTPS
- Hash passwords
- Validate all user input
- Use role-based access control

---

*For more details, see the [full schema](./4.%20Hospital%20management%20system.md) and implementation files.*
