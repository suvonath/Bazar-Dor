# বাজার দর (BazarDor)

**বাজার দর (BazarDor)** is a Bengali-language market-price tracking web
application that helps users explore the prices of everyday essentials
in Bangladesh. Browse products by category, see which prices are rising
or falling, compare available price information, and manage an account
through a clean, responsive interface.

> **Note:** Market prices may change by location and over time. Always
> verify current prices with local sellers.

## ✨ Key Features

1.  **Daily market overview** --- Browse everyday essentials from a
    single home page, including rice, lentils, oil, vegetables, fish,
    meat, eggs and dairy, and spices.
2.  **Price movement highlights** --- Quickly discover products marked
    as having rising or falling prices.
3.  **Category browsing and sorting** --- Explore products by category
    and sort them by price from low to high or high to low.
4.  **Product price details** --- View product-specific price
    information, including market-level comparisons and price summaries
    where provided by the API.
5.  **Account and profile management** --- Register or sign in with
    email and password, use Google or GitHub social sign-in, update
    profile information, and sign out.

## 🧰 Technologies Used

  ---------------------------------------------------------------------------------------
  Technology                                          Purpose
  --------------------------------------------------- -----------------------------------
  [Next.js](https://nextjs.org/) 16                   React framework, routing, and
                                                      application structure

  [React](https://react.dev/) 19                      Component-based user interface

  [TypeScript](https://www.typescriptlang.org/)       Type-safe application code

  [Tailwind CSS](https://tailwindcss.com/) 4          Responsive styling and
                                                      utility-first design

  [Better Auth](https://www.better-auth.com/)         Authentication and session
                                                      management

  [SQLite](https://www.sqlite.org/) via               Local database adapter for
  `better-sqlite3`                                    authentication

  [`react-hot-toast`](https://react-hot-toast.com/)   Success and error notifications

  BazarDor API                                        Product, category, and market-price
                                                      data
  ---------------------------------------------------------------------------------------

## 🗂️ Project Structure

The following is a high-level overview of the main files represented in
the project code:

``` text
bazar-dor/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page and market overview
│   │   ├── category/
│   │   │   └── [slug]/page.tsx      # Category listing and price sorting
│   │   ├── product/
│   │   │   └── [slug]/page.tsx      # Product details
│   │   ├── signin/page.tsx          # Sign-in page
│   │   ├── signup/page.tsx          # Registration page
│   │   ├── profile/page.tsx         # Profile management
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts
│   │   ├── layout.tsx               # Shared layout, navbar, footer, and toasts
│   │   ├── globals.css              # Global styles
│   │   └── not-found.tsx            # Custom 404 page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   └── lib/
│       ├── auth.ts                  # Server-side authentication setup
│       └── auth-client.ts           # Client-side authentication
├── package.json
├── tsconfig.json
└── README.md
```

> Your pasted code shows some paths under `src/` and some references
> without `src/`. Adjust this tree to match the actual folders in your
> repository before submitting.

## 🚀 Getting Started

### Prerequisites

-   Node.js compatible with your installed Next.js version
-   npm
-   Git

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd bazar-dor
```

Replace `<YOUR_REPOSITORY_URL>` with the URL of your GitHub repository.

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. Add the values required
by your local authentication configuration:

``` env
NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Configure the Google and GitHub OAuth applications and their callback
URLs for your local and deployed environments. Never commit real
credentials or secret keys to GitHub.

The application code also uses a BazarDor API for product and category
data. Confirm that the configured API endpoints are available before
running or deploying the app.

### 4. Run the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Check the production build

``` bash
npm run lint
npm run build
npm start
```

## 🔌 Data Sources

The application fetches product and category information from the
BazarDor API. The code shared for this project references these
endpoints:

-   Products:
    `https://openapi.programming-hero.com/api/bazardor/products`
-   Categories:
    `https://openapi.programming-hero.com/api/bazardor/categories`

Some code versions also reference a category-specific product endpoint.
Keep the endpoints consistent with the API specification supplied for
your project.

## 🔐 Authentication

The application uses Better Auth for email/password authentication and
Google/GitHub social sign-in. The authentication setup uses
`better-sqlite3` as its database adapter in the supplied code. Ensure
your database setup, OAuth credentials, and provider callback URLs are
configured correctly for your environment.

## 📱 Interface

BazarDor uses a Bengali-first interface, responsive product grids,
category navigation, loading placeholders, empty states, toast
notifications, and a custom not-found page.

## ⚠️ Disclaimer

BazarDor is intended to make market-price information easier to browse.
Displayed prices are indicative and may not reflect the exact price at
every market or shop. Confirm prices locally before making purchasing
decisions.

## 📄 License

No license is specified in the supplied project files. Add a `LICENSE`
file and update this section if you intend to distribute the project
publicly.
