# Hospital Management System

## Overview
The Hospital Management System is a full-stack application built with React, Vite, and Express. It manages hospital data, including creation, retrieval, updating, and deletion of hospital records. The project leverages MongoDB for data storage and provides a seamless user experience with React for the frontend.

## Project Video
[Watch the project video here](Screen Recording 2025-03-02 162307.mp4)
<video controls src="Screen Recording 2025-03-02 162307.mp4" title="Title"></video>
<video controls src="Screen Recording 2025-03-02 162307.mp4" title="Title"></video>

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, read, update, and delete hospital records.
- Search hospitals by city.
- View detailed information about each hospital.
- Add and update hospital details.

## Installation
### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hospital-management-system.git
   cd hospital-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the backend server:
   ```bash
   npm run dev:server
   ```

## Usage
### Frontend
- Navigate to `http://localhost:3000` in your browser to access the frontend.
- Use the navigation bar to create, edit, and view hospitals.

### Backend
- The backend API is available at `http://localhost:5000/api/v1/hospitals`.
- Endpoints:
  - `POST /create`: Create a new hospital.
  - `GET /`: Get hospitals by city.
  - `GET /:id`: Get hospital by ID.
  - `DELETE /delete`: Delete a hospital.
  - `PUT /update`: Update a hospital.
  - `POST /details`: Add hospital details.

## Project Structure
```
hospital-management-system/
├── public/
├── server/
│   ├── controllers/
│   │   └── hospitalController.js
│   ├── models/
│   │   └── Hospital.js
│   ├── routes/
│   │   └── hospitalRoutes.js
│   └── server.js
├── src/
│   ├── api/
│   │   └── hospitalApi.js
│   ├── assets/
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── ConfirmationModal.jsx
│   │   ├── HospitalCard.jsx
│   │   ├── Navbar.css
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── CreateHospital.css
│   │   ├── CreateHospital.jsx
│   │   ├── EditHospital.css
│   │   ├── EditHospital.jsx
│   │   ├── Home.css
│   │   ├── Home.jsx
│   │   ├── HospitalDetails.css
│   │   ├── HospitalDetails.jsx
│   │   ├── HospitalList.css
│   │   └── HospitalList.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Creates by by: shekhar shakti(https://github.com/shekharshakti)

## License
This project is licensed under the MIT License.
