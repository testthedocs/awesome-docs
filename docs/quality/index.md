# Quality Assurance

Tools and practices for ensuring documentation quality, accuracy, and consistency.

## Language & Style Tools

### Grammar & Writing
<ResourceGrid>
<EnhancedLink url="https://github.com/get-alex/alex" title="Alex" description="Detect insensitive or inconsiderate language in docs." />
<EnhancedLink url="https://writewithharper.com/" title="Harper" description="Grammar checker tailored for technical writing workflows." />
<EnhancedLink url="https://vale.sh/" title="Vale" description="Syntax-aware prose linter with customizable style rules." />
<EnhancedLink url="https://getwoke.tech/" title="Woke" description="Inclusive language scanner for code and documentation." />
</ResourceGrid>

### Style Consistency
<ResourceGrid>
<EnhancedLink url="https://github.com/antfu/case-police" title="case-police" description="Enforce consistent naming and case usage." />
<EnhancedLink url="https://titlecaseconverter.com/" title="Title Case Converter" description="Convert headings and titles to consistent case styles." />
</ResourceGrid>

## Link & Content Validation

### Link Checking
<ResourceGrid>
<EnhancedLink url="https://github.com/lycheeverse/lychee" title="lychee" description="Fast Rust-based link checker for docs and READMEs." />
<EnhancedLink url="https://github.com/UmbrellaDocs/linkspector" title="Linkspector" description="Crawler for broken links and link quality checks." />
<EnhancedLink url="https://github.com/wjdp/htmltest" title="HtmlTest" description="HTML validation and broken-link testing tool." />
<EnhancedLink url="https://github.com/smallhadroncollider/brok" title="brok" description="Find and report broken links in text files." />
</ResourceGrid>

### Content Testing
<ResourceGrid>
<EnhancedLink url="https://github.com/doc-detective/doc-detective" title="Doc Detective" description="Run executable tests to verify doc accuracy." />
<EnhancedLink url="https://swimm.io/" title="Swimm" description="Keep docs aligned with evolving codebases." />
</ResourceGrid>

## Accessibility & Readability

### Accessibility Testing
<ResourceGrid>
<EnhancedLink url="https://github.com/dequelabs/axe-cli" title="AXE-CLI" description="Command-line accessibility testing powered by axe-core." />
<EnhancedLink url="https://pa11y.org/" title="Pa11y" description="Automated accessibility testing for web pages." />
<EnhancedLink url="https://github.com/JakePartusch/lumberjack" title="Lumberjack" description="Accessibility auditing and issue reporting utility." />
</ResourceGrid>

### Readability Analysis
<ResourceGrid>
<EnhancedLink url="https://www.webfx.com/tools/read-able/" title="Readable" description="Analyze content readability and grade levels." />
<EnhancedLink url="https://webaim.org/resources/contrastchecker/" title="Contrastchecker" description="Validate color contrast for accessibility compliance." />
</ResourceGrid>

## Automation & CI/CD

### Automated Testing
<ResourceGrid>
<EnhancedLink url="https://squidler.io/" title="Your Automated Tester" description="Platform for automated documentation testing." />
<EnhancedLink url="https://github.com/Azure/InnovationEngine" title="InnovationEngine" description="Automation and analysis framework for content workflows." />
</ResourceGrid>

## Quality Assurance Workflow

### Pre-Publishing Checklist
1. **Grammar & Style** - Run through Alex, Vale, or similar tools
2. **Link Validation** - Check all internal and external links
3. **Accessibility** - Ensure content meets accessibility standards
4. **Readability** - Verify content is appropriate for target audience
5. **Consistency** - Check terminology and formatting consistency

### Continuous Quality
- Set up automated checks in CI/CD pipeline
- Regular link validation schedules
- Style guide enforcement
- User feedback integration

### Tools Integration
Most quality assurance tools can be integrated into:
- **Git Hooks** - Run checks before commits
- **CI/CD Pipelines** - Automated quality gates
- **Editor Extensions** - Real-time feedback
- **GitHub Actions** - Automated PR checks

## Best Practices

### Establish Standards
- Create and maintain a style guide
- Define quality metrics and thresholds
- Document review processes
- Train team members on tools and standards

### Monitor Continuously
- Regular audits of documentation quality
- Track metrics over time
- User feedback analysis
- Tool effectiveness evaluation

## AI-Powered Review

For AI-powered review tools, agent skills, and prompt templates for documentation review, see our [AI Review](/ai/review) section.
