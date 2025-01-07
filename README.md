Here is a summary of all the APIs provided by the backend, including their request and response details:

---

### **1. Health Check**
- **Endpoint**: `GET /health`
- **Description**: Checks the health status of the server and database.
- **Request**: None
- **Response**:
  ```json
  {
    "status": "up",
    "message": "It's healthy",
    "open_connections": "10",
    "in_use": "5",
    "idle": "5",
    "wait_count": "0",
    "wait_duration": "0s",
    "max_idle_closed": "0",
    "max_lifetime_closed": "0"
  }
  ```

---

### **2. Hello World**
- **Endpoint**: `GET /`
- **Description**: Returns a simple "Hello World" message.
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Hello World"
  }
  ```

---

### **3. User APIs**

#### **Create User**
- **Endpoint**: `POST /users`
- **Description**: Creates a new user.
- **Request**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "password123",
    "role": "employee"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "message": "User created successfully"
  }
  ```

#### **Get User by ID**
- **Endpoint**: `GET /users/:id`
- **Description**: Retrieves a user by their ID.
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "hashed_password",
    "role": "employee"
  }
  ```

#### **Get User by Username**
- **Endpoint**: `GET /users/username/:username`
- **Description**: Retrieves a user by their username.
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "hashed_password",
    "role": "employee"
  }
  ```

#### **List Users**
- **Endpoint**: `GET /users`
- **Description**: Retrieves all users.
- **Request**: None
- **Response**:
  ```json
  [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "password": "hashed_password",
      "role": "employee"
    }
  ]
  ```

#### **Update User**
- **Endpoint**: `PUT /users/:id`
- **Description**: Updates an existing user by their ID.
- **Request**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "new_password",
    "role": "manager"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User updated successfully"
  }
  ```

#### **Delete User**
- **Endpoint**: `DELETE /users/:id`
- **Description**: Deletes a user by their ID.
- **Request**: None
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

#### **Authenticate User**
- **Endpoint**: `POST /users/authenticate`
- **Description**: Authenticates a user and returns a JWT token.
- **Request**:
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

---

### **4. Company APIs**

#### **Create Company**
- **Endpoint**: `POST /companies`
- **Description**: Creates a new company.
- **Request**:
  ```json
  {
    "companyName": "Tech Corp"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "message": "Company created successfully"
  }
  ```

#### **Get Company by ID**
- **Endpoint**: `GET /companies/:id`
- **Description**: Retrieves a company by its ID.
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "companyName": "Tech Corp"
  }
  ```

#### **List Companies**
- **Endpoint**: `GET /companies`
- **Description**: Retrieves all companies.
- **Request**: None
- **Response**:
  ```json
  [
    {
      "id": 1,
      "companyName": "Tech Corp"
    }
  ]
  ```

#### **Update Company**
- **Endpoint**: `PUT /companies/:id`
- **Description**: Updates an existing company by its ID.
- **Request**:
  ```json
  {
    "companyName": "Tech Corp Updated"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Company updated successfully"
  }
  ```

#### **Delete Company**
- **Endpoint**: `DELETE /companies/:id`
- **Description**: Deletes a company by its ID.
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Company deleted successfully"
  }
  ```

---

### **5. Employee APIs**

#### **Create Employee**
- **Endpoint**: `POST /employees`
- **Description**: Creates a new employee.
- **Request**:
  ```json
  {
    "userID": 1,
    "registrationNumber": "EMP123",
    "qualification": "Software Engineer",
    "companyID": 1
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "message": "Employee created successfully"
  }
  ```

#### **Get Employee by ID**
- **Endpoint**: `GET /employees/:id`
- **Description**: Retrieves an employee by their ID.
- **Request**: None
- **Response**:
  ```json
  {
    "id": 1,
    "userID": 1,
    "registrationNumber": "EMP123",
    "qualification": "Software Engineer",
    "companyID": 1
  }
  ```

#### **Get Employees by Company ID**
- **Endpoint**: `GET /employees/by-company/:id`
- **Description**: Retrieves all employees for a specific company.
- **Request**: None
- **Response**:
  ```json
  [
    {
      "id": 1,
      "userID": 1,
      "registrationNumber": "EMP123",
      "qualification": "Software Engineer",
      "companyID": 1
    }
  ]
  ```

#### **Update Employee**
- **Endpoint**: `PUT /employees/:id`
- **Description**: Updates an existing employee by their ID.
- **Request**:
  ```json
  {
    "userID": 1,
    "registrationNumber": "EMP123",
    "qualification": "Senior Software Engineer",
    "companyID": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Employee updated successfully"
  }
  ```

#### **Delete Employee**
- **Endpoint**: `DELETE /employees/:id`
- **Description**: Deletes an employee by their ID.
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Employee deleted successfully"
  }
  ```

---

### **6. Employee Workday APIs**

#### **Create Employee Workday**
- **Endpoint**: `POST /employee-workdays`
- **Description**: Creates a new employee workday.
- **Request**:
  ```json
  {
    "employeeID": 1,
    "date": "2023-10-01T00:00:00Z",
    "workHours": 8.5,
    "isFreeDay": false,
    "notes": "Worked on project X"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "message": "Employee workday created successfully"
  }
  ```

#### **Get Employee Workday by ID**
- **Endpoint**: `GET /employee-workdays/:id`
- **Description**: Retrieves an employee workday by its ID.
- **Request**: None
- **Response**:
  ```json
  {
    "employeeID": 1,
    "date": "2023-10-01T00:00:00Z",
    "workHours": 8.5,
    "isFreeDay": false,
    "notes": "Worked on project X"
  }
  ```

#### **Get Employee Workdays by Employee ID**
- **Endpoint**: `GET /employees/:employee_id/workdays`
- **Description**: Retrieves all workdays for a specific employee.
- **Request**: None
- **Response**:
  ```json
  [
    {
      "employeeID": 1,
      "date": "2023-10-01T00:00:00Z",
      "workHours": 8.5,
      "isFreeDay": false,
      "notes": "Worked on project X"
    }
  ]
  ```

#### **Update Employee Workday**
- **Endpoint**: `PUT /employee-workdays/:id`
- **Description**: Updates an existing employee workday by its ID.
- **Request**:
  ```json
  {
    "employeeID": 1,
    "date": "2023-10-01T00:00:00Z",
    "workHours": 8.5,
    "isFreeDay": false,
    "notes": "Worked on project X"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Employee workday updated successfully"
  }
  ```

#### **Delete Employee Workday**
- **Endpoint**: `DELETE /employee-workdays/:id`
- **Description**: Deletes an employee workday by its ID.
- **Request**: None
- **Response**:
  ```json
  {
    "message": "Employee workday deleted successfully"
  }
  ```

---

### **7. Database Migration**
- **Endpoint**: `GET /migrate`
- **Description**: Runs database migrations.
- **Request**: None
- **Response**:
  ```text
  Database migrated successfully
  ```

---

This summary provides an overview of all the APIs, their purposes, and the expected request and response formats.