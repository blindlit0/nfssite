## Department of Food Science & Nutrition Website

This is a React + TypeScript + Vite app for the Department of Food Science & Nutrition. It includes routing, a basic site layout, a Home page, and a Welfare page placeholder.

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

### App Structure

- `src/main.tsx`: App entry. Wraps the app in `BrowserRouter`.
- `src/App.tsx`: Declares routes using `react-router-dom`.
- `src/components/Layout.tsx`: Shared header/nav, social links, and footer.
- `src/pages/Home.tsx`: Landing page content.
- `src/pages/Welfare.tsx`: Placeholder page for welfare initiatives.

### Routing

- `/`: Home page
- `/welfare`: Welfare page

### Social Links

Social links to LinkedIn and Instagram are in the header. Replace URLs with official department profiles in `src/components/Layout.tsx`.
