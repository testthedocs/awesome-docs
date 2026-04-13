# AI Review

AI-powered review tools, agent skills, and prompt resources for documentation review workflows.

## AI Review Tools

Tools that use AI to review, critique, and improve documentation quality.

### Style & Prose Review

- [Vale](https://vale.sh/) - Syntax-aware prose linter; integrates with AI workflows via the [Vale MCP Server](./mcp-servers)
- [Harper](https://writewithharper.com/) - Grammar checker built for developers, runs locally with no data sent to the cloud
- [Alex](https://github.com/get-alex/alex) - Catches insensitive and inconsiderate writing; pairs well with AI review workflows

### AI-Assisted Review Platforms

- [Grammarly Business](https://www.grammarly.com/business) - Team-level AI writing and review with style guide enforcement
- [Writer](https://writer.com/) - AI writing platform with built-in style guide, terminology management, and review workflows for teams
- [Acrolinx](https://www.acrolinx.com/) - Enterprise AI content governance platform for large documentation teams

### Code Review with Docs Context

- [GitHub Copilot Code Review](https://github.com/features/copilot) - AI-assisted pull request review that can flag missing or outdated documentation
- [Reviewdog](https://github.com/reviewdog/reviewdog) - Automated code review tool that integrates linters (including Vale) into PR workflows

## Agent Skills & Prompts

Prompt templates, system prompts, and agent skill patterns for documentation review workflows.

### Review Prompt Patterns

Effective prompt patterns for AI-assisted documentation review:

- **Completeness check** — Ask the AI to identify missing sections, undefined terms, or steps that assume unstated prerequisites
- **Audience alignment** — Provide the target audience profile and ask the AI to flag content that is too advanced, too basic, or uses unexplained jargon
- **Consistency audit** — Paste multiple pages and ask the AI to identify inconsistent terminology, formatting, or tone across them
- **Accuracy review** — Provide the relevant code or API spec alongside the docs and ask the AI to flag discrepancies
- **Readability pass** — Ask the AI to score readability and suggest specific rewrites for sentences above a target complexity level

### Structured Review Checklists as Prompts

Convert your documentation review checklist into a prompt template:

```
Review the following documentation against these criteria:
1. Is every term defined on first use?
2. Are all code examples syntactically correct?
3. Does the content match the stated audience level?
4. Are there any broken or missing cross-references?
5. Is the tone consistent with [your style guide]?

Flag each issue with: [ISSUE TYPE] - [location] - [description]
```

### Vale + AI Integration

Vale's rule-based linting and AI review are complementary:
- Use Vale for deterministic, rule-based checks (style guide enforcement, terminology)
- Use AI for subjective review (clarity, completeness, audience fit)
- The [Vale MCP Server](./mcp-servers) enables AI agents to run Vale checks directly within a conversation

---

*For non-AI quality assurance tools, see [Quality Assurance](../quality/). For AI writing assistance, see [AI Writing](./writing).*
