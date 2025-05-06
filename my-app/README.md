# Poke House Application

This is a React application for Poke House, a restaurant specializing in customizable poke bowls.

## Multi-Page Structure

The application has been structured to support multiple pages through routes for improved organization and user experience.

### Page Structure

#### Home Page
- **URL Path**: `/`
- **Components**:
  - Navigation
  - Hero
  - Featured menu items preview
  - Footer

#### Bowl Builder Page
- **URL Path**: `/build`
- **Components**:
  - Navigation
  - BowlSizeSelector
  - Bases
  - Proteins
  - Ingredients
  - Bowl summary section
  - "Add to Order" button
  - Footer

#### Cart Page
- **URL Path**: `/cart`
- **Components**:
  - Navigation
  - OrderForm (order summary)
  - Continue building button
  - Checkout button
  - Footer

#### Checkout Page
- **URL Path**: `/checkout`
- **Components**:
  - Navigation
  - OrderForm (customer details form)
  - Payment processing components
  - Footer

#### Order Confirmation Page
- **URL Path**: `/confirmation`
- **Components**:
  - Navigation
  - Order confirmation details
  - "Return to Menu" button
  - Footer

#### About Page
- **URL Path**: `/about`
- **Components**:
  - Navigation
  - About content
  - Footer

#### Contact Page
- **URL Path**: `/contact`
- **Components**:
  - Navigation
  - Contact form
  - Map/location information
  - Footer

#### Menu Page
- **URL Path**: `/menu`
- **Components**:
  - Navigation
  - Menu categories
  - Menu items listings
  - Footer

## Implementation Notes

To implement this structure:

1. Install React Router: `npm install react-router-dom`
2. Create separate page components that combine the relevant components
3. Set up routes in App.jsx
4. Modify the Navigation component to use `<Link>` components instead of anchor tags
5. Implement state management across pages (using Context API, Redux, or URL parameters)

## Development Setup

This project uses Vite as the build tool:

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## Vite React Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
