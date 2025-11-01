# GitHub Actions

GitHub Actions workflows and marketplace actions specifically designed for documentation, content validation, and quality assurance.

## Content Validation Actions

### Language & Grammar

- [Alex Action](https://github.com/theashraf/alex-action) - Catch insensitive, inconsiderate writing
- [Vale](https://github.com/errata-ai/vale-action) - Syntax-aware linter for prose
- [Spellcheck Action](https://github.com/marketplace/actions/github-spellcheck-action) - Spell checking for documentation
- [Run misspell with reviewdog](https://github.com/marketplace/actions/run-misspell-with-reviewdog) - Misspelling detection with review comments

### Documentation Format Validation

- [DOCtor-RST](https://github.com/marketplace/actions/doctor-rst) - Validate reStructuredText files
- Markdown linting (various actions available for markdown validation)

## Content Generation & Management

### Table of Contents

- [TOC Generator](https://github.com/technote-space/toc-generator) - Automatically generate table of contents for README files

### Issue Management

- [TODO to Issue Action](https://github.com/alstr/todo-to-issue-action) - Convert TODO comments in code to GitHub issues

## Performance & Quality

### Website Performance

- [Lighthouse CI Action](https://github.com/treosh/lighthouse-ci-action) - Run Lighthouse performance audits on documentation sites

## Setting Up Documentation Workflows

### Basic Validation Pipeline

Here's an example workflow that combines multiple documentation quality checks:

```yaml
name: Documentation Quality Check

on:
  pull_request:
    paths:
      - '**.md'
      - 'docs/**'

jobs:
  validate-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Vale Linting
        uses: errata-ai/vale-action@reviewdog
        with:
          files: docs
          
      - name: Spell Check
        uses: streetsidesoftware/cspell-action@v2
        with:
          files: "docs/**/*.md"
          
      - name: Alex Inclusive Language Check
        uses: theashraf/alex-action@v1.0.0
        with:
          path: 'docs'
```

### Advanced Documentation Pipeline

For more comprehensive documentation workflows:

1. **Content Validation**: Spell checking, grammar checking, inclusive language
2. **Link Checking**: Validate internal and external links
3. **Format Validation**: Markdown linting, structure validation  
4. **Site Building**: Test documentation site builds
5. **Performance Testing**: Lighthouse audits for documentation sites
6. **Accessibility Testing**: Automated accessibility checks

## Best Practices

### Workflow Configuration

- **Path-based triggers**: Only run documentation checks when documentation files change
- **Parallel jobs**: Run different validation checks in parallel for faster feedback
- **Review integration**: Use reviewdog for inline comments on pull requests
- **Conditional execution**: Skip certain checks for draft PRs or specific branches

### Quality Gates

- Set up required status checks for documentation validation
- Use branch protection rules to enforce documentation quality
- Configure different validation levels for different types of content

### Integration Tips

- Combine with existing CI/CD pipelines
- Use caching to speed up action execution  
- Configure notifications for documentation quality issues
- Set up automated fixes where possible (e.g., spelling corrections)

## Related Tools

For more comprehensive documentation quality assurance, see our [Quality Assurance](/quality) section which includes additional tools that can be integrated into GitHub Actions workflows.

These actions help maintain high-quality documentation by automating validation, ensuring consistency, and catching issues early in the development process.