# Bus Tracking Application API Documentation

## Database Collections

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String, // ["Admin", "Driver", "Helper", "Parent"]
  isActive: Boolean,
  createdAt: Date
}
```

**Sample Data:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashedPassword123",
  phone: "1234567890",
  role: "Admin",
  isActive: true,
  createdAt: "2024-01-20T07:00:00.000Z"
}
```

### 2. Buses Collection
```javascript
{
  _id: ObjectId,
  busNumber: String,
  capacity: Number,
  driverId: ObjectId,
  helperId: ObjectId,
  fuelLevel: Number,
  status: String, // ["Active", "Maintenance", "Inactive"]
  location: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  },
  maintenanceHistory: [{
    date: Date,
    description: String,
    cost: Number
  }],
  createdAt: Date
}
```

**Sample Data:**
```javascript
{
  busNumber: "BUS001",
  capacity: 40,
  driverId: "driverObjectId",
  helperId: "helperObjectId",
  fuelLevel: 75,
  status: "Active",
  location: {
    latitude: 18.5204,
    longitude: 73.8567,
    lastUpdated: "2024-01-20T07:30:00.000Z"
  },
  maintenanceHistory: [{
    date: "2024-01-15T00:00:00.000Z",
    description: "Regular maintenance",
    cost: 5000
  }],
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### 3. Students Collection
```javascript
{
  _id: ObjectId,
  name: String,
  parentId: ObjectId,
  busId: ObjectId,
  grade: String,
  section: String,
  pickupLocation: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  dropLocation: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  pickupStatus: String, // ["Pending", "Picked", "Missed"]
  dropStatus: String, // ["Pending", "Dropped", "Missed"]
  attendance: [{
    date: Date,
    status: String // ["Present", "Absent"]
  }],
  createdAt: Date
}
```

**Sample Data:**
```javascript
{
  name: "Jane Smith",
  parentId: "parentObjectId",
  busId: "busObjectId",
  grade: "5",
  section: "A",
  pickupLocation: {
    address: "123 Main St, Pune",
    latitude: 18.5204,
    longitude: 73.8567
  },
  dropLocation: {
    address: "123 Main St, Pune",
    latitude: 18.5204,
    longitude: 73.8567
  },
  pickupStatus: "Pending",
  dropStatus: "Pending",
  attendance: [{
    date: "2024-01-20T00:00:00.000Z",
    status: "Present"
  }],
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### 4. Notifications Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  message: String,
  type: String, // ["Emergency", "Update", "Alert"]
  relatedBus: ObjectId,
  isRead: Boolean,
  createdAt: Date
}
```

**Sample Data:**
```javascript
{
  userId: "userObjectId",
  title: "Bus Delay",
  message: "Bus BUS001 will be delayed by 10 minutes",
  type: "Update",
  relatedBus: "busObjectId",
  isRead: false,
  createdAt: "2024-01-20T07:45:00.000Z"
}
```

## API Routes

### Authentication Routes
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - User login
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

### Bus Routes
- GET `/api/buses` - Get all buses
- GET `/api/buses/:id` - Get single bus
- POST `/api/buses` - Create new bus
- PUT `/api/buses/:id` - Update bus
- DELETE `/api/buses/:id` - Delete bus
- PUT `/api/buses/:id/location` - Update bus location
- POST `/api/buses/:id/maintenance` - Add maintenance record

### Student Routes
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get single student
- POST `/api/students` - Create new student
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student
- PUT `/api/students/:id/pickup` - Update pickup status
- PUT `/api/students/:id/drop` - Update drop status
- POST `/api/students/:id/attendance` - Mark attendance

### Notification Routes
- GET `/api/notifications` - Get user notifications
- POST `/api/notifications` - Create notification
- PUT `/api/notifications/:id` - Mark notification as read
- DELETE `/api/notifications/:id` - Delete notification
- POST `/api/notifications/bulk` - Send bulk notifications
