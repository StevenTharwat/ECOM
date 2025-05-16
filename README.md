<!-- # Ecom

**running json-server**

1. download node.js
2. open the project then the db folder
3. open json server `npx json-server --watch db.json`

**running server.js**

1. d
2. open the server folder then copy link of server.js
3. open cmd and cd to server.js
4. node server.js -->
# K&S E-Commerce Platform 🛍️

A modern e-commerce platform built with vanilla JavaScript, featuring role-based access control, product management, and order processing.

![Homepage](static/images/screenshots/homepage.png)

## 🌟 Features

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

### Product Listing
![Products](/ECOM/project/static/images/products.png)

### Admin Dashboard
![Dashboard](static/images/screenshots/dashboard.png)

### Shopping Cart
![Cart](static/images/screenshots/cart.png)

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
