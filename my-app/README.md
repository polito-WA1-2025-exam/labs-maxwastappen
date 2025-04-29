# Poke House - React Frontend

## Overview
Poke House is a modern, interactive React application for ordering customized poke bowls. The application features a sleek, responsive user interface with smooth animations and an intuitive bowl building experience.

## Tech Stack

- **React 19** - Latest version with improved rendering performance
- **Vite 6.2** - Next-generation frontend tooling for fast development and builds
- **Bootstrap 5.3** - Modern, responsive UI framework
- **React Bootstrap** - React components for Bootstrap
- **Bootstrap Icons** - Comprehensive icon library

## Application Structure

### Components Architecture

```
src/
├── components/
│   ├── Navigation.jsx     # Top navigation bar
│   ├── Hero.jsx           # Landing banner with animated elements
│   ├── BowlSizeSelector   # Bowl size options (Regular, Medium, Large)
│   ├── Bases.jsx          # Base selection component (rice, greens)
│   ├── Proteins.jsx       # Protein selection with quantity controls
│   ├── Ingredients.jsx    # Ingredients organized by categories
│   ├── OrderForm.jsx      # Order review and customer details form
│   └── Footer.jsx         # Site footer with contact information
├── styles/
│   ├── App.css            # Application-specific styles
│   └── index.css          # Global styles and CSS variables
└── assets/
    └── react.svg          # Static assets
```

### Key Features

#### Interactive Bowl Builder
- **Multi-step process**: Guide users through base, protein, and ingredient selections
- **Visual Selection Cards**: Each ingredient features high-quality imagery and clear descriptions
- **Real-time Price Updates**: Dynamic calculation of bowl prices based on selections
- **Size Multiplier System**: Bowl pricing scales with size selection

#### Order Management System
- **Item Quantity Controls**: Add or remove individual items from bowls
- **Multi-Bowl Orders**: Support for ordering multiple customized bowls
- **Order Summary**: Clear breakdown of all selected items with pricing
- **Responsive Design**: Optimized for both mobile and desktop experiences

#### User Experience Enhancements
- **Scroll-based Animations**: Components fade in as users scroll through the application
- **Visual Feedback**: Clear indication of selected items with highlighted borders
- **Intuitive Navigation**: Smooth scrolling between different sections

#### Order Finalization
- **Customer Information Form**: Comprehensive form for delivery and contact details
- **Form Validation**: Client-side validation for all required fields
- **Payment Method Selection**: Option for credit card or cash on delivery
- **Order Review**: Detailed summary before final submission

## Styling Approach

The application uses a modern dark-themed design with:

- **Custom Card Components**: Gradient overlays with image backgrounds
- **Visual Hierarchy**: Clear sections with consistent spacing
- **Animation System**: CSS transitions for smooth element entrances
- **Color Scheme**: Rich purple accents on dark backgrounds for modern feel

## Development Scripts

- `npm run dev`: Start the development server with hot module replacement
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally

## Component Details

### Bases Component
Allows users to select a foundation for their poke bowl with options like White Rice, Brown Rice, and Mixed Greens.

### Proteins Component
Provides protein options including Tuna, Salmon, Chicken, and Tofu with quantity controls.

### Ingredients Component
Organizes additional ingredients into categories:
- **Vegetables**: Cucumber, Avocado, Seaweed, Edamame
- **Toppings**: Sesame Seeds, Crispy Onions, Peanuts, Nori Strips
- **Dressings**: Soy Sauce, Spicy Mayo, Teriyaki, Ponzu

### OrderForm Component
Comprehensive form for reviewing the order and collecting customer information including:
- Name, Email, Phone, Delivery Address
- Delivery Time preference
- Special Notes or instructions
- Payment Method selection

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Access the application at http://localhost:5173
