# Awesome Docs [![Awesome](https://awesome.re/badge-flat2.svg)](https://awesome.re)

A [curated list](https://github.com/testthedocs/awesome-docs) of awesome documentation tools, guides and good practice.

*If you see a package or project here that is no longer maintained or is not a good fit, please submit a pull request to improve this file.
Thank you!*

## Enhanced Link Cards

The documentation site features **enhanced link cards** that display rich metadata (title, description, logo) for external links. Cards are rendered using a custom `EnhancedLink` Vue component backed by a build-time metadata fetching system.

Key features:
- **Build-time fetching** — metadata is fetched once and cached; no runtime HTTP requests
- **Redirect-aware** — follows HTTP redirects and caches both original and final URLs
- **Rate-limited** — max 5 concurrent requests, 500 ms delay between same-domain requests
- **7-day TTL cache** — stored in `.vitepress/cache/link-metadata.json`
- **Graceful fallbacks** — placeholder icons when logos are unavailable; plain link on error
- **Accessible** — WCAG 2.1 AA compliant with ARIA labels and keyboard navigation

See [Contributing: Enhanced Links](docs/contributing/enhanced-links.md) for usage instructions.

## Contributing

Please take a quick gander at the [contribution guidelines](https://github.com/testthedocs/awesome-docs/blob/master/CONTRIBUTING.md) first.

Thanks to all [contributors](https://github.com/testthedocs/awesome-docs/graphs/contributors); you rock!

## Contents

- [Accessibility](#accessibility)
- [AsciiDoc](#asciidoc)
- [API](#api)
- [Browser Extensions](#browser-extensions)
- [Browser Testing](#browser-testing)
- [Editor](#editor)
- [Feedback](#feedback)
- [GitHub Actions](#github-actions)
- [Hosting](#hosting)
- [Knowledge Base](#knowledge-base)
- [Mockup](#mockup)
- [Quality Assurance](#quality-assurance)
- [Reading](#reading)
- [Screencast](#screencast)
- [Screenshot](#screenshot)
- [Site Generators](#site-generators)
  - [Docsify Extensions](#docsify-extensions)
  - [Hugo Extensions](#hugo-extensions)
  - [MkDocs Extensions](#mkdocs-extensions)
  - [Search](#search)
  - [Sphinx Extensions](#sphinx-extensions)
  - [Sphinx Themes](#sphinx-themes)
- [Spelling](#spelling)
- [Style Guides](#style-guides)
- [Tool Collection](#tool-collection)
- [User Behavior Analytics](#user-behavior-analytics)
- [Viewer](#viewer)
- [Watching](#watching)
- [Writing](#writing)

## Accessibility

- [AXE-CLI](https://github.com/dequelabs/axe-cli)
- [Contrastchecker](https://webaim.org/resources/contrastchecker/)
- [Image Alt text best practices](https://support.siteimprove.com/hc/en-gb/articles/115000013031-Accessibility-Image-Alt-text-best-practices)
- [Lumberjack](https://github.com/JakePartusch/lumberjack)
- [Pa11y](https://pa11y.org/)

## AsciiDoc

- [Asciidoctor](https://asciidoctor.org/)
- [AsciiDoc Alive](https://asciidocalive.docswriter.com/)
- [IntelliJ AsciiDoc Plugin](https://intellij-asciidoc-plugin.ahus1.de/)
- [Asciidoc FX](https://www.asciidocfx.com/)

## API

- [API Guidelines](https://dret.github.io/guidelines/)
- [Bump.sh](https://bump.sh/)
- [Hoppscotch](https://github.com/hoppscotch/hoppscotch)
- [json-schema-sensitivity-checker](https://github.com/cbetta/json-schema-sensitivity-checker)
- [oas](https://openap.is/)
- [OpenAPI 3 CLI](https://github.com/Redocly/openapi-cli)
- [Optic](https://www.useoptic.com/)
- [Postman](https://www.getpostman.com/)
- [RapiDoc](https://mrin9.github.io/RapiDoc/index.html)
- [Redoc-Editor](https://github.com/pointnet/redoc-editor)
- [ReDoc](https://redocly.github.io/redoc/)
- [Restish](https://rest.sh/#/)
- [Speccy](https://github.com/wework/speccy)
- [Spectral](https://stoplight.io/open-source/spectral/)
- [Stoplight Studio](https://stoplight.io/studio/)
- [Swagger](https://swagger.io/)
- [swaggerui](https://github.com/flowchartsman/swaggerui)
- [Tips for better documentation with OpenAPI](https://lornajane.net/posts/2023/tips-for-better-documentation-with-openapi)
- [What we can learn from UX professionals when designing APIs](https://www.linkedin.com/pulse/what-we-can-learn-from-ux-professionals-when-designing-joyce-stack-/)
- [widdershins](https://github.com/Mermade/widdershins)
- [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/restful-api-guidelines/#)

## Browser Extensions

- [Grammarly](https://www.grammarly.com/)
- [LanguageTool](https://languagetool.org/)
- [QuillBot](https://quillbot.com/)
 
## Browser Testing

- [Nightwatch.js](https://nightwatchjs.org/)
- [Playwright](https://playwright.dev/)
- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Selenium](https://www.seleniumhq.org/)

## Editor

- [HackMD](https://hackmd.io/)
- [Lapce](https://github.com/lapce/lapce)
- [Mark Text](https://github.com/marktext/marktext)
- [Swimm](https://swimm.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Zed](https://zed.dev/)
- [Zettlr](https://www.zettlr.com/)

## Feedback

- [Papercups](https://github.com/papercups-io/papercups)

## GitHub Actions

- [Alex Action](https://github.com/theashraf/alex-action)
- [DOCtor-RST](https://github.com/marketplace/actions/doctor-rst)
- [Lighthouse CI Action](https://github.com/treosh/lighthouse-ci-action)
- [Run misspell with reviewdog](https://github.com/marketplace/actions/run-misspell-with-reviewdog)
- [Spellcheck Action](https://github.com/marketplace/actions/github-spellcheck-action)
- [TOC Generator](https://github.com/technote-space/toc-generator)
- [TODO to Issue Action](https://github.com/alstr/todo-to-issue-action)
- [Vale](https://github.com/errata-ai/vale-action)

## Hosting

- [Doctave](https://www.doctave.com/)
- [Docs by Hashnode](https://hashnode.com/products/docs)
- [GitBook](https://www.gitbook.com/)
- [Mintlify](https://www.mintlify.com/)
- [Netlify](https://www.netlify.com/)
- [Read The Docs](https://readthedocs.org/)

## Knowledge Base

- [Logseq](https://logseq.com/)
- [Obsidian](https://obsidian.md)

## Mockup

- [Animockup](https://github.com/alyssaxuu/animockup)
- [Excalidraw](https://excalidraw.com/)
- [Markmap](https://markmap.js.org/)

## Quality Assurance

- [Alex](https://github.com/get-alex/alex)
- [brok](https://github.com/smallhadroncollider/brok)
- [Capitalize My Title](https://capitalizemytitle.com/)
- [case-police](https://github.com/antfu/case-police)
- [Doc Detective](https://github.com/doc-detective/doc-detective)
- [Harper](https://writewithharper.com/)
- [HtmlTest](https://github.com/wjdp/htmltest)
- [InnovationEngine](https://github.com/Azure/InnovationEngine)
- [Linkspector](https://github.com/UmbrellaDocs/linkspector)
- [lychee](https://github.com/lycheeverse/lychee)
- [Readable](https://www.webfx.com/tools/read-able/)
- [Rules example](https://github.com/cisco-open/inclusive-language/blob/main/cisco-rules.yaml)
- [Swimm](https://swimm.io/)
- [Vale](https://vale.sh/)
- [Woke](https://getwoke.tech/)
- [Your automated tester](https://squidler.io/)

## Reading

- [A Guide to Creating Personas](https://marvelapp.com/blog/creating-personas/)
- [A simple technique for evaluating content](https://userresearch.blog.gov.uk/2014/09/02/a-simple-technique-for-evaluating-content/)
- [An examination of translating text to make it as accessible as possible](https://pudding.cool/2022/02/plain/)
- [API Handyman](https://apihandyman.io/)
- [API Knowledge](https://postman-toolboxes.github.io/api-knowledge/)
- [Automating Your Accessibility Tests](https://24ways.org/2017/automating-your-accessibility-tests)
- [Awesome Documentation](https://github.com/vipulgupta2048/awesome-documentation)
- [Become a better writer as a developer](https://dev.to/dhaiwat10/become-a-better-writer-as-a-developer-46oc)
- [Become a technical writer](https://www.instructionalsolutions.com/blog/become-a-technical-writer)
- [Document Like a Scientist](https://noti.st/karissapeth/g3vUiw/document-like-a-scientist)
- [Documentation That Developers Actually Read: The Netflix Approach](https://dev.to/teamcamp/documentation-that-developers-actually-read-the-netflix-approach-1h9i)
- [Free Resources to Learn Technical Writing](https://medium.com/@ann.green/free-resources-to-learn-technical-writing-7d642020cda9)
- [Google - Technical Writing Courses](https://developers.google.com/tech-writing)
- [Grammarly Blog](https://www.grammarly.com/blog/)
- [Great Developer Documentation Examples](https://everydeveloper.com/developer-documentation-examples/)
- [How Google, Twitter, and Spotify built a culture of documentation](https://dev.to/doctave/how-google-twitter-and-spotify-built-a-culture-of-documentation-3e0m)
- [How to write technical posts](https://reasonablypolymorphic.com/blog/writing-technical-posts/)
- [Let's Get Intentional About Documentation](https://counting.substack.com/p/lets-get-intentional-about-documentation)
- [Mastering cURL](https://dev.to/mkinoshita12/mastering-curl-going-from-junior-to-senior-level-debugging-skills-5d80)
- [Maybe it’s time we re-think docs](https://kathkorevec.medium.com/building-a-better-place-for-docs-197f92765409)
- [Scottydocs.com](https://github.com/scottydocs)
- [Semantic Line Breaks](https://sembr.org/)
- [Setting up the alex.js language linter in your project](https://dev.to/unmock/setting-up-the-alex-js-language-linter-in-your-project-3bpl)
- [Systematic approach to technical documentation authoring](https://diataxis.fr/)
- [Technical Documentation in Software Development](https://www.altexsoft.com/blog/business/technical-documentation-in-software-development-types-best-practices-and-tools/)
- [Technical Documentation Tool and Web Guide](https://www.indoition.com/tools-websites-technical-documentation.htm)
- [User Guide Template](https://clickhelp.com/clickhelp-technical-writing-blog/user-guide-template/)
- [What nobody tells you about documentation](https://www.divio.com/blog/documentation/)
- [Where to start with analytics for documentation](https://thisisimportant.net/posts/documentation-site-analytics-start/)
- [Why does inclusive language matter](https://writer.com/inclusion-glossary/)
- [Write good examples by starting with real code](https://jvns.ca/blog/2021/07/08/writing-great-examples/)
- [Writing great documentation](https://medium.com/@episod/writing-great-documentation-44d90367115a)
- [Writing Technical Stuff for Non-Technical Readers](https://quickfix.es/2020/10/the-baseline/)

## Screencast

- [Asciinema](https://asciinema.org/)
- [Codio](https://present.readthedocs.io/en/latest/codio.html)
- [Editly](https://github.com/mifi/editly)
- [Kap](https://github.com/wulkano/kap) (macOS)
- [Peek](https://github.com/phw/peek)
- [Screenity](https://github.com/alyssaxuu/screenity)
- [Terminalizer](https://github.com/faressoft/terminalizer)

## Screenshot

- [Carbon](https://carbon.now.sh)
- [Flameshot](https://github.com/lupoDharkael/flameshot)
- [shot-scraper](https://github.com/simonw/shot-scraper)
- [Shottr](https://shottr.cc/)

## Site Generators

- [11ty](https://www.11ty.dev/)
- [Antora](https://antora.org/)
- [Astro](https://astro.build/)
  - [Starlight](https://starlight.astro.build/)
- [Document Node](https://documentnode.io/)
- [Docus](https://docus.dev/)
- [Docusaurus](https://docusaurus.io/)
- [DocFX](https://dotnet.github.io/docfx/)
- [Docsify](https://docsify.js.org/)
- [Docsite](https://github.com/sourcegraph/docsite)
- [Dokz](https://dokz.vercel.app/)
- [Fumadocs](https://fumadocs.vercel.app/)
- [Gatsby Docs Kit](https://github.com/brainhubeu/gatsby-docs-kit)
- [Gridsome](https://gridsome.org)
- [Log4brains](https://github.com/thomvaill/log4brains)
- [mdBook](https://github.com/rust-lang/mdBook)
- [MDX-GO](https://github.com/jxnblk/mdx-go)
- [MkDocs](https://www.mkdocs.org/)
- [Nextra](https://github.com/shuding/nextra)
- [Portray](https://github.com/timothycrosley/portray)
- [Quartz](https://github.com/jackyzha0/quartz)
- [RcPress](https://github.com/YvesCoding/rcpress)
- [Sphinx](https://www.sphinx-doc.org/en/master/)
- [VitePress](https://vitepress.dev/)
- [Vocs](https://vocs.dev/)
- [VuePress](https://github.com/wevm/vocs/)
- [xyd](https://xyd.dev)
- [Zola](https://www.getzola.org/)

### Docsify Extensions

- [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/)

### Hugo Extensions

- [Hugo modules](https://discourse.gohugo.io/t/hugo-modules-for-dummies/20758/8)

### MkDocs Extensions

- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Tooltipster Links Plugin](https://github.com/midnightprioriem/mkdocs-tooltipster-links-plugin)

### Search

- [Meilisearch](https://www.meilisearch.com/)
- [pagefind](https://pagefind.app/)
- [Typesense](https://typesense.org/)

### Sphinx Extensions

- [consoletest](https://github.com/intel/dffml/blob/master/dffml/util/testing/consoletest/README.md)
- [Contentui](https://github.com/ulrobix/sphinxcontrib-contentui)
- [MyST](https://myst-parser.readthedocs.io/en/latest/using/intro.html)
- [Sphinx Substitution Extensions](https://github.com/adamtheturtle/sphinx-substitution-extensions)
- [sphinx-design](https://sphinx-design.readthedocs.io/en/latest/)

### Sphinx Themes

- [Furo](https://github.com/pradyunsg/furo)
- [Sphinx Themes](https://sphinx-themes.org/)
- [The Sphinx Book Theme](https://sphinx-book-theme.readthedocs.io/en/latest/)

## Spelling

- [PySpelling](https://facelessuser.github.io/pyspelling/)

## Style Guides

- [18F](https://content-guide.18f.gov/)
- [Accessibility - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Accessible social media content](https://www.accessible-social.com/quick-guide)
- [Aiven](https://github.com/aiven/devportal/blob/main/CONTRIBUTING.rst#style-guide)
- [Apple Style Guide](https://help.apple.com/applestyleguide/)
- [Atlassian](https://atlassian.design/content/)
- [BBC](https://www.bbc.co.uk/editorialguidelines/guidelines)
- [Buffer](https://buffer.com/resources/style-guide/)
- [CLI Guidelines](https://clig.dev/)
- [Container terminology](https://jacobtomlinson.dev/posts/2023/being-intentional-with-container-terminology/)
- [Datagrok](https://datagrok.ai/help/develop/help-pages/writing-style)
- [Developer Style Guide](https://github.com/lornajane/developer-style-guide)
- [DigitalOcean](https://www.digitalocean.com/community/tutorials/digitalocean-s-technical-writing-guidelines)
- [Federal (US) plain language guidelines](https://plainlanguage.gov/guidelines/)
- [GitHub](https://github.com/github/docs/blob/main/contributing/content-style-guide.md#content-style-guide-for-github-docs-)
- [GitLab](https://docs.gitlab.com/ee/development/documentation/styleguide/)
- [Google](https://developers.google.com/style/)
- [Guidelines for Inclusive Language](https://guides.18f.gov/content-guide/our-style/inclusive-language/)
- [Human words for technical docs](https://coda.io/@dave-connis/human-words-for-technical-docs)
- [Linode](https://www.linode.com/docs/linode-writers-formatting-guide/)
- [Mailchimp](https://styleguide.mailchimp.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Michigan State University](https://msu.edu/course/be/485/bewritingguideV2.0.pdf)
- [Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)
- [MongoDB](https://www.mongodb.com/docs/meta/style-guide/)
- [Monzo](https://monzo.com/tone-of-voice/)
- [NC State University - IT Accessibility Handbook](https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/)
- [Rackspace](https://github.com/rackerlabs/docs-style-guide/tree/master/style-guide)
- [Red Hat Guidelines](https://redhat-documentation.github.io/)
- [Red Hat Style Guide](https://stylepedia.net/style/)
- [Salesforce](https://developer.salesforce.com/docs/atlas.en-us.salesforce_pubs_style_guide.meta/salesforce_pubs_style_guide/overview.htm)
- [Shopify](https://polaris.shopify.com/content/product-content)
- [Splunk](https://docs.splunk.com/Documentation/StyleGuide/latest/StyleGuide/Howtouse)
- [Sprout](https://sproutsocial.com/seeds/writing/)
- [SUSE](https://documentation.suse.com/style/current/single-html/docu_styleguide/)
- [The essential guide to conscious language](https://consciousstyleguide.com/)
- [The Writer](http://www.thewriter.com/what-we-think/style-guide/)
- [United Nations](https://www.un.org/dgacm/content/editorial-manual)
- [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/)
- [Website Style Guide Resources](http://styleguides.io/)
- [Write The Docs](https://www.writethedocs.org/guide/writing/style-guides/)

## Tool Collection

- [adr-tools](https://github.com/npryce/adr-tools)
- [Awesome Design Tools](https://github.com/goabstract/Awesome-Design-Tools)
- [Bluehawk](https://mongodb-university.github.io/Bluehawk/)
- [Calculate max length for UI elements](https://max-char-length-calculator.netlify.app/)
- [Code Hike](https://codehike.org/)
- [CSS+JS Code snippets for enhancing online documentation](https://www.indoition.com/en/products/code-snippets-for-online-documentation.htm)
- [docToolchain](https://github.com/doctoolchain/doctoolchain)
- [D2 Declarative Diagramming](https://d2lang.com/)
- [DIV Table Generator](https://divtable.com/generator/)
- [Driver.js](https://github.com/kamranahmedse/driver.js)
- [fixred](https://github.com/rhysd/fixred)
- [gatsby-theme-adr](https://github.com/Lullabot/gatsby-theme-adr)
- [Loom](https://www.loom.com/)
- [Markdoc](https://markdoc.io/)
- [markdown-doctest](https://github.com/Widdershin/markdown-doctest)
- [Merge Docs Pro](https://www.mergedocs.pro)
- [Penpot](https://penpot.app/)
- [Playwright](https://github.com/microsoft/playwright)
- [Pocket Marketing List](https://github.com/rubymorillo/pocket-marketing-tech-list)
- [readme.so](https://readme.so/)
- [rstcheck](https://github.com/myint/rstcheck)
- [rundoc](https://gitlab.com/nul.one/rundoc)
- [Shepherd](https://github.com/shipshapecode/shepherd)
- [Squoosh](https://squoosh.app/)
- [Tables Generator](https://www.tablesgenerator.com/)
- [Tools for Technical Writers](https://github.com/heyawhite/tech-writing-tools)
- [vendir](https://carvel.dev/vendir/)
- [Writerside](https://www.jetbrains.com/writerside/)

## User Behavior Analytics

- [Clarity](https://clarity.microsoft.com/)

## Viewer

- [Glow - Render Markdown on the CLI](https://github.com/charmbracelet/glow)
- [mdv](https://github.com/xrfang/mdv/)

## Watching

- [SmartBear](https://www.youtube.com/channel/UC3iDZqrLWQZ4dh8zn2rU9hA)

## Writing

- [How to write a basic how-to](https://www.redhat.com/sysadmin/howto-write-howto)
- [How to write a README](https://www.redhat.com/sysadmin/how-write-readme)
- [Words matter](https://www.acm.org/diversity-inclusion/words-matter)
