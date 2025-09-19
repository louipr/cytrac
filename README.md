# Cytrac

**Professional Code Analysis & Visualization Platform**

Cytrac is an advanced code analysis and visualization platform optimized for solopreneur developers and small collaborative workflows. It provides comprehensive multi-language static analysis (TypeScript, JavaScript, Node.js, Python) with interactive visualizations and hybrid cloud deployment capabilities.

## 🏗️ Architecture Overview

**Hybrid Cloud Design:**
- **Frontend**: React SPA hosted on AWS S3 + CloudFront (app.cyrustek.com)
- **Backend**: Node.js API on Oracle Cloud Always-Free ARM VM (api.cytrac.cyrustek.com)
- **Cost Target**: <$5/month total infrastructure across all applications

**Key Capabilities:**
- **Multi-Language Analysis**: TypeScript, JavaScript, Python support via ts-morph, ESLint, Jedi
- **Interactive Visualizations**: D3.js-powered dependency graphs and code maps
- **Local-First Privacy**: Offline analysis with optional cloud collaboration
- **Professional Deployment**: Custom domain strategy with enterprise-grade architecture
- **Multi-Application Platform**: Shared infrastructure supporting future CyrusTek ecosystem

## 📋 Project Status

**Current Phase**: Architecture Complete, Ready for Implementation

### ✅ Completed Documents
- **[Software Requirements Specification (SRS)](docs/requirements/SRS.md)**: Comprehensive functional and non-functional requirements
- **[Software Architecture Document (SAD)](docs/architecture/SAD.md)**: IEEE 1016-2009 compliant architectural design
- **[Architecture Decision Record (ADR-001)](docs/decisions/ADR-001-Inter-Service-Communication-Patterns.md)**: Inter-service communication patterns research
- **Hybrid Cloud Architecture**: AWS + Oracle multi-cloud deployment strategy
- **Cost Optimization Analysis**: <$5/month infrastructure with professional capabilities

### 🚀 Implementation Roadmap
1. **Phase 1**: Monorepo foundation setup (packages/core, packages/cli, packages/web, packages/api)
2. **Phase 2**: MVP core implementation with ts-morph/ESLint integration
3. **Phase 3**: Local development testing and CLI validation
4. **Phase 4**: Oracle ARM VM + AWS S3 cloud infrastructure setup
5. **Phase 5**: React SPA with D3.js visualizations

## 🛠️ Technology Stack

**Backend (Oracle Cloud ARM VM)**
- Node.js 18.18.0+ LTS with TypeScript 4.9+
- Express.js REST API with OpenAPI 3.0+ specification
- ts-morph 27.0+ (TypeScript AST), ESLint 9.0+ (JavaScript), Jedi 0.19+ (Python)

**Frontend (AWS S3 + CloudFront)**
- React 18+ SPA with ES2020+ browser support
- D3.js 7.0+ for interactive data visualization
- Global CDN distribution with <100ms response times

**Development**
- Monorepo structure with modular packages
- Cross-platform support (Windows 10+, macOS 11+, Ubuntu 20.04+)
- Privacy-by-design with local-first analysis

## 💰 Cost-Effective Architecture

**Infrastructure Costs:**
- Frontend: $0.01-0.25/month (AWS S3 + CloudFront)
- Primary API: $0/month (Oracle Always-Free ARM VM - 4 cores, 24GB RAM)
- Additional APIs: $0-5/month each (platform-optimized free tiers)
- **Total: $0.01-25/month** depending on scale and usage

**Professional Features:**
- Custom domain architecture (cyrustek.com ecosystem)
- Free SSL certificates (AWS Certificate Manager + Let's Encrypt)
- Enterprise-grade CDN performance globally
- Multi-application platform scalability

## 📖 Documentation

**Complete documentation available in [`docs/`](docs/) with organized categories:**

### Core Documents
- **[📋 Documentation Hub](docs/)** - Navigation and overview of all documentation
- **[Software Requirements Specification (SRS)](docs/requirements/SRS.md)** - IEEE 830-1998 compliant requirements
- **[Software Architecture Document (SAD)](docs/architecture/SAD.md)** - IEEE 1016-2009 compliant architecture
- **[Architecture Decision Records (ADRs)](docs/decisions/)** - Design decisions and rationale

### Architecture Highlights
- **8 Architectural Viewpoints**: Context, Composition, Logical, Dependency, Information, Patterns, Interface, Structure
- **Hybrid Cloud Strategy**: Local-first development with cost-effective cloud deployment
- **Multi-Application Platform**: Foundation for CyrusTek ecosystem expansion
- **Security-Ready Design**: Modular architecture supporting future authentication without current complexity

## 🎯 Target Use Cases

**Primary**: Solopreneur developers analyzing personal projects (up to 100k LOC)
**Secondary**: Small collaborative workflows with occasional pair programming
**Performance**: Sub-minute analysis for typical projects, 5-minute maximum for large projects
**Memory**: <2GB usage optimized for personal development machines

## 🚀 Getting Started

*Implementation in progress - documentation will be updated as development proceeds*

**Current Status**: Architecture and requirements complete, ready for monorepo initialization and core development.

## 📄 License

*License to be determined during implementation phase*

---

**Part of the CyrusTek Application Ecosystem**  
Professional development tools with enterprise-grade architecture at hobbyist costs.
