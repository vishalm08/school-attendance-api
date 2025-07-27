# School Period Attendance API

Backend API for managing school attendance with real-time updates using Fastify, MySQL, and Socket.IO.

---

## Project Overview

This API allows managing school classes, students, periods, and attendance marking with live attendance updates broadcasted via WebSocket. It includes:

- Create and list classes
- Add students and assign them to classes
- Define school periods with start/end times
- Mark attendance with statuses (PRESENT, ABSENT, LATE)
- Prevent duplicate attendance entries for same student, period, and date
- Real-time attendance update broadcast using Socket.IO
- JWT-based authentication for secure access

---

## Technologies Used

- **Fastify**: Fast, lightweight Node.js web framework
- **MySQL**: Relational database for persistent storage
- **Socket.IO**: Real-time bidirectional communication
- **JWT**: Token-based authentication
- **bcrypt**: Secure password hashing

---

## Setup & Installation

1. Clone the repo

   ```bash
   git clone https://github.com/vishalm08/school-attendance-api.git
   cd school-attendance-api
   ```
