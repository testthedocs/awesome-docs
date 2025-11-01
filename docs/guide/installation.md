# Installation

Learn how to install and set up this documentation site.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) package manager

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/testthedocs/awesome-docs.git
   cd awesome-docs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm docs:dev
   ```

4. **Build for production**
   ```bash
   pnpm docs:build
   ```

## Verification

After installation, you should be able to access the documentation at `http://localhost:5173` when running the development server.

## Troubleshooting

If you encounter issues:

- Ensure you're using Node.js version 16 or higher
- Clear the node_modules and try reinstalling: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Check that all dependencies are properly installed