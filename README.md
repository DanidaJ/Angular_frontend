
# README: Frontend for Ticket Booking System

## Overview
The frontend is developed using Angular to provide a user-friendly interface for booking tickets and viewing events. It communicates with the backend APIs to fetch and update data in real-time.

---

## Technologies Used
- **Angular 16**: Frontend framework.
- **TypeScript**: Programming language for Angular.
- **HTML5/CSS3**: For UI structure and styling.
- **Bootstrap**: CSS framework for responsive design.
- **Node.js & npm**: For package management.

---

## Prerequisites
- Node.js (v16 or higher).
- npm (v8 or higher).
- Angular CLI (v16 or higher).

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   ng serve
   ```

4. **Access the Application**:
   Open your browser and navigate to: `http://localhost:4200`

---

## Key Features

1. **View Events**:
   - Events are displayed as cards.
   - Shows ticket availability.

2. **Book Tickets**:
   - Button to book tickets.
   - Sends event and user data to the backend.

3. **Responsive Design**:
   - Bootstrap ensures mobile-friendly layouts.

4. **Local Storage for User Data**:
   - Stores user credentials (username and password) for login.

---

## Angular Structure

```
frontend/
├── src/
   ├── app/
      ├── components/
         ├── event/
         ├── booking/
         ├── user/
         ├── login/
      ├── app.module.ts
   ├── assets/
   ├── environments/
```

---

## Components

1. **Event Component**:
   - Fetches events from the backend.
   - Displays them in card format.

2. **Ticket Booking Component**:
   - Handles ticket booking functionality.
   - Sends user and event data to the backend.

---

## Communication with Backend

- **API Base URL**:
  Set in `environment.ts`:
  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api/v1'
  };
  ```

---

## Troubleshooting

1. **Backend Not Running**:
   Ensure the backend server is running on `http://localhost:8080`.

   ```

2. **Dependencies Error**:
   Delete `node_modules` and reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## Future Enhancements
- Implement user authentication with JWT.
- Add real-time notifications for ticket bookings.
- Support multi-language UI (e.g., Sinhala, Tamil, English).
- Enhance ticket booking UI with animations.

