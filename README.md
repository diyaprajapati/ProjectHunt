# ProjectHunt

**Empowering developers to showcase their projects and connect with the community.**

[See website from here](https://project-hunt-nu.vercel.app)

## Features

**User Authentication**: Secure JWT-based login and registration.
**Project Management**: Upload, edit, and manage projects with ease.
**Upvote System**: Toggle-based upvoting for user interaction.
**Responsive UI**: Sleek, mobile-friendly interface built with React.

## Tech Stack

- **Frontend:** React.js with Axios for API communication and TailwindCSS.
- **Backend:** Spring Boot for robust business logic.
- **Database:** PostgreSQL for efficient data storage.
- **Authentication:** JWT tokens securely stored in `localStorage`.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/ProjectHunt.git
   cd ProjectHunt
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Configuration**
   Update the `application.properties` file:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/projecthunt
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/{id}` - Update a project
- `DELETE /api/projects/{id}` - Delete a project

### Upvotes
- `POST /api/upvotes/{projectId}` - Toggle upvote for a project

## Usage Guide

1. **Register/Login**: Access the platform securely.
2. **Add a Project**: Share your project ideas and innovations.
3. **Explore Projects**: Browse projects shared by others.
4. **Upvote Projects**: Show appreciation for great projects.

## Contributors
- **Diya Prajapati**
- **Urvi Ponda**

---
*Empower your ideas with ProjectHunt and connect with fellow innovators!*
