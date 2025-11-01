# Contributing to Awesome Docs

We welcome contributions to make this documentation resource even better! This guide will help you get started with contributing to the project.

## Quick Start for Contributors

If you want to contribute to this project, follow these steps to set up your development environment.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git** - For version control
- **Node.js** (version 16 or higher) - JavaScript runtime
- **pnpm** - Package manager (faster than npm)

### Development Setup

We use [Taskfile](https://taskfile.dev/) to streamline development tasks. Here's how to get started:

1. **Clone the repository**
   ```bash
   git clone https://github.com/testthedocs/awesome-docs.git
   cd awesome-docs
   ```

2. **Set up your environment**
   ```bash
   # Install system dependencies (Node.js and pnpm)
   task setup:deps
   ```

3. **Start the development server**
   ```bash
   # Run the local development server
   task docs:dev
   ```

4. **Access the documentation**
   Open your browser and visit `http://localhost:5173/`

### Available Tasks

Our project uses Taskfile for automation. Here are the available commands:

#### Setup Tasks (One-time)
```bash
task setup:node    # Install Node.js if missing
task setup:pnpm    # Install pnpm if missing  
task setup:deps    # Install VitePress dependencies
```

#### Documentation Tasks (Daily workflow)
```bash
task docs:dev      # Start development server
task docs:build    # Build static site for production
task docs:preview  # Preview the built site
```

#### List all available tasks
```bash
task -l            # Show all available tasks
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit documentation files in the `docs/` directory
   - Add new tools, resources, or improve existing content
   - Test your changes with `task docs:dev`

3. **Test your changes**
   ```bash
   # Start development server to preview changes
   task docs:dev
   
   # Build to ensure everything compiles
   task docs:build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the GitHub repository
   - Create a pull request from your feature branch
   - Describe your changes and why they're valuable

## What Can You Contribute?

### Adding New Tools
- Add new documentation tools to appropriate categories
- Include clear descriptions and use cases
- Provide working links and verify they're current

### Improving Existing Content
- Fix broken links or outdated information
- Improve tool descriptions or categorization
- Add missing tools to existing categories

### Creating New Categories
- Suggest new tool categories that are missing
- Organize tools that don't fit existing categories
- Create comprehensive category pages

### Documentation Improvements
- Fix typos, grammar, or formatting issues
- Improve navigation or user experience
- Add examples or usage guides

## Content Guidelines

### Tool Requirements
- **Active Maintenance**: Tools should be actively maintained
- **Documentation Focus**: Tools must be relevant to documentation creation/management
- **Quality**: Include only high-quality, useful tools
- **Description**: Provide clear, concise descriptions

### Style Guidelines
- Use consistent formatting and structure
- Include proper links and references
- Follow the existing content organization
- Use clear, professional language

### Review Process
1. All contributions are reviewed by maintainers
2. We check for quality, relevance, and accuracy
3. Feedback may be provided for improvements
4. Approved changes are merged into the main branch

## Getting Help

- **Issues**: Report bugs or suggest features in [GitHub Issues](https://github.com/testthedocs/awesome-docs/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/testthedocs/awesome-docs/discussions)
- **Questions**: Feel free to ask questions in your pull requests

## Development Tips

### Working with VitePress
- Files in `docs/` become pages automatically
- Use Markdown for content creation
- The site rebuilds automatically when you save changes
- Check the browser console for any errors

### Project Structure
```
docs/
├── .vitepress/           # VitePress configuration
│   ├── config.mjs        # Site configuration
│   └── theme/            # Custom theming
├── index.md              # Homepage
├── generators.md         # Site generators page
├── api.md               # API documentation tools
├── quality.md           # Quality assurance tools
└── contributing/        # Contributing documentation
    └── index.md         # This file
```

### Testing Your Changes
Always test your changes before submitting:
- Verify all links work correctly
- Check that new content appears in navigation
- Ensure the site builds without errors
- Test the search functionality with your new content

## Community & Recognition

### Contributors

Thanks to all [contributors](https://github.com/testthedocs/awesome-docs/graphs/contributors) who have helped make this resource better - you rock! 🎉

Your contributions help the entire documentation community by:
- Making tools more discoverable
- Sharing knowledge and best practices
- Keeping information current and accurate
- Building a comprehensive resource for everyone

### Recognition

If you see a package or project here that is no longer maintained or is not a good fit, please submit a pull request to improve this file. Thank you!

## License & Legal

This project is licensed under [CC0 1.0 Universal](https://github.com/testthedocs/awesome-docs/blob/main/LICENSE).

### What This Means
- **Public Domain**: This work is in the public domain
- **No Rights Reserved**: You can copy, modify, distribute and perform the work
- **Commercial Use**: You can use this work for commercial purposes
- **No Attribution Required**: Though attribution is appreciated, it's not required

### Contributing Agreement
By contributing to this project, you agree that your contributions will be licensed under the same CC0 1.0 Universal license.

Thank you for contributing to Awesome Docs! 🎉