# Invoice Management App

A fully responsive Invoice Management Application built as part of the HNG Internship Stage 2 task.

## Live Demo
Live Demo: [https://invoice-app.pxxl.click/](https://invoice-app.pxxl.click/)

## Tech Stack

- **React** (Vite)
- **Tailwind CSS v4** — CSS-first design tokens
- **React Router DOM** — client-side routing
- **React DatePicker** — custom styled date picker
- **Lucide React** — icons
- **LocalStorage** — data persistence

## Features

- Create, Read, Update, Delete invoices
- Save invoices as Draft
- Mark invoices as Paid
- Filter invoices by status (Draft, Pending, Paid)
- Light / Dark mode toggle (persists on reload)
- Fully responsive — 320px, 768px, 1024px+
- Form validation with error states
- Delete confirmation modal
- Slide-in drawer for create/edit forms
- Custom styled date picker and payment terms dropdown

## Architecture

```
src/
├── components/
│   ├── filter/          # Filter dropdown
│   ├── invoice/
│   │   ├── form/        # BillFrom, BillTo, Payment, ItemList, Footer
│   │   └── detail/      # DetailCard, DetailHeader, ItemsTable
│   ├── layout/          # Sidebar / mobile header
│   └── ui/              # StatusBadge, Modal
├── context/             # ThemeContext, InvoiceContext
├── pages/               # ListPage, DetailPage
├── utils/               # helpers.js, validation.js
└── index.css            # Design tokens + component classes
```
## Design System

All colors, typography, and spacing are defined as CSS custom properties in `index.css` under `@theme`. Component styles live in `@layer components`. This means the entire app's visual language can be updated from one file.

## Getting Started

```bash
npm install
npm run dev
```

## Accessibility

- Semantic HTML throughout
- All inputs have associated labels
- Buttons use `<button>` elements
- Modal has `role="dialog"` and `aria-modal="true"`
- Icon buttons have `aria-label`
- Keyboard navigable

## Trade-offs

- Used LocalStorage over a backend for simplicity and speed
- Calendar uses react-datepicker with custom CSS rather than a fully custom build
- Form is a slide-in drawer rather than a separate page to preserve list context

## Author

Built by WebNova — HNG Internship Stage 2, April 2026