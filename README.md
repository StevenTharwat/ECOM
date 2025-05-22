# K&S E-Commerce Platform 🛍️

A modern e-commerce platform built with vanilla JavaScript, featuring role-based access control, product management, and order processing.

![Homepage](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/1.png)

## 🌟 Features

# ⚙️ Dynamic Admin Controller Engine
The platform includes a powerful controller engine that governs the entire admin panel and dynamically rebuilds it based on entity configurations.

# 🔧 How It Works
A central Controller.js file acts as the source of truth for all entities (users, products, and orders).

Each entity defines:

CRUD permissions per role (admin, seller, buyer)

Field metadata (type, visibility, validation, dynamic options)

Custom validation logic (e.g., email uniqueness)

Data source (linked directly to the database modules)

# 🧠 Smart Admin Panel Rebuilding
**The admin panel is not hardcoded — it rebuilds itself automatically based on the root object inside Controller.js.**

This allows easy scalability and maintainability; simply update Controller.js to:

Add new entities

Adjust field rules

Modify role permissions

This approach ensures a centralized, scalable, and secure admin experience, reducing frontend complexity and promoting consistency across modules.

- **User Authentication & Authorization**
  - Role-based access (Admin, Seller, Buyer)
  - Secure login/registration
  - Profile management

- **Product Management**
  - Product listing and search
  - Category filtering
  - Price sorting
  - Image upload support

- **Shopping Experience**
  - Cart functionality
  - Order tracking
  - Checkout process
  - Real-time inventory updates

- **Admin Dashboard**
  - User management
  - Product approval
  - Order tracking
  - Sales analytics

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Web browser (Chrome/Firefox recommended)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/k-s-ecommerce.git
cd ECOM
```

2. Install dependencies:
```sh
# For the main server
cd server
npm install
npm install multer

# For the database
cd ../db
npm install
```

3. Start the servers:
```sh
# Start JSON server (from db folder)
cd db
npx json-server --watch db.json

# Start file upload server (from server folder)
cd ../server
node server.js
```

4. Open index.html in your web browser or use a local development server.

## 🏗️ Project Structure

```
ECOM/
├── db/                    # Database files
│   └── db.json           # JSON database
├── project/              # Frontend files
│   ├── index.html       # Main entry point
│   ├── screens/         # Page templates
│   └── static/          # Assets
│       ├── css/        # Stylesheets
│       ├── js/         # JavaScript files
│       └── images/     # Image assets
└── server/              # Backend server
    └── server.js       # File upload server
```

## 👥 User Roles

### Admin
- Full system access
- User management
- Product approval
- Order management

### Seller
- Product management
- Order fulfillment
- Sales tracking

### Buyer
- Browse products
- Place orders
- Track deliveries

## 🖥️ Screenshots

### Login & Registration 
![Login](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/2.png)
![Registration](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/3.png)


### Product Listing
![Products](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/8.png)

### Admin Dashboard
![Dashboard](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/4.png)
![Dashboard](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/5.png)
![Dashboard](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/6.png)
![Dashboard](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/7.png)

### Shopping Cart
![Cart](https://github.com/StevenTharwat/ECOM/blob/main/ScreenShots/9.png)

## 🔒 Security Features

- Password encryption
- Role-based access control
- Session management
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- JSON Server for backend simulation
- Express.js for file upload handling

---
Developed with ❤️ by Steven & Kareem
