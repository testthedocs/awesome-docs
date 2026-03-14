# MCP Servers

Model Context Protocol (MCP) servers relevant to documentation workflows.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is an open standard that allows AI assistants (such as Claude, Cursor, and other MCP-compatible clients) to connect to external tools and data sources. An MCP server exposes capabilities — like running a linter, querying a knowledge base, or fetching content — that an AI agent can invoke directly within a conversation.

For documentation teams, MCP servers mean your AI assistant can actively use your documentation toolchain, not just talk about it.

## Documentation MCP Servers

### Vale MCP Server

- **Repository**: [errata-ai/vale-mcp](https://github.com/errata-ai/vale-mcp)
- **Description**: An MCP server that exposes [Vale](https://vale.sh/) prose linting capabilities to AI assistants. Allows an AI agent to run Vale checks on text directly within a conversation, returning style and grammar issues according to your configured Vale rules.
- **Use cases**:
  - Ask your AI assistant to lint a draft document against your style guide before publishing
  - Integrate Vale feedback into AI-assisted writing and review workflows
  - Run Vale checks without leaving your AI chat interface

## Contributing

Know of another MCP server useful for documentation workflows? This list is just getting started.

MCP servers relevant to documentation might include servers for:
- Documentation platforms (Confluence, Notion, GitBook)
- Link checking and validation
- Terminology and glossary management
- Translation and localization

*[Contribute to this project](../contributing/) and help grow this list.*

---

*For AI writing tools, see [AI Writing](./writing). For AI review tools and Vale integration patterns, see [AI Review](./review).*
