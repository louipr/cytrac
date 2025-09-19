---
title: "Cytrac Software Architecture Document (SAD)"
version: 2.1
date: "September 18, 2025"
authors: "CyrusTek Senior Software Architect"
reviewed_by: "Architecture Review Board"
status: "Professional Architecture Specification"
compliance: "IEEE Std 1016-2009 (Software Design Descriptions)"
source_document: "Cytrac Software Requirements Specification (SRS) v3.0"
repository: "https://github.com/louipr/cytrac"
---

# Cytrac Software Architecture Document (SAD)

## 1. Introduction

### 1.1 Purpose
This Software Architecture Document (SAD) describes the comprehensive architectural design of Cytrac, a code analysis and visualization platform optimized for solopreneur developers and small collaborative workflows. This document provides architectural views, design rationale, and implementation guidelines while maintaining focus on architectural concerns.

### 1.2 Scope  
This document covers the complete architectural design for Cytrac's capabilities:
- **Multi-language static analysis** (TypeScript, JavaScript, Node.js, Python) supporting projects up to 100k lines of code
- **Interactive visualization platform** with local-first web interface optimized for single-user operation
- **Command-line and API interfaces** supporting personal workflow automation and integration
- **Security-ready modular architecture** supporting privacy-by-design with optional authentication middleware
- **Local-first deployment** with hybrid cloud architecture supporting cost-effective collaboration and scalability

### 1.3 Definitions and Acronyms
- **AST**: Abstract Syntax Tree - Hierarchical representation of source code structure
- **CLI**: Command Line Interface - Terminal-based user interface
- **GUI**: Graphical User Interface - Web-based interactive interface  
- **REST API**: Representational State Transfer Application Programming Interface
- **SPA**: Single Page Application - React-based frontend architecture
- **LSP**: Language Server Protocol - Standardized language analysis protocol

### 1.4 References
- Cytrac Software Requirements Specification (SRS) v3.0
- IEEE Std 1016-2009: Software Design Descriptions
- IEEE Std 830-1998: Software Requirements Specifications
- TypeScript Language Specification v5.2+
- ESLint Architecture Documentation v9.0+
- React Architecture Patterns v18+

### 1.5 Overview
This document follows IEEE Std 1016-2009 architectural viewpoint structure, providing comprehensive design perspectives:

1. **Context Viewpoint** - System boundaries, stakeholder relationships, and external interfaces
2. **Composition Viewpoint** - High-level system decomposition and component organization  
3. **Logical Viewpoint** - Functional architecture and key domain abstractions
4. **Dependency Viewpoint** - Component relationships, data flow, and interaction patterns
5. **Information Viewpoint** - Data models, storage architecture, and information management
6. **Patterns Viewpoint** - Architectural patterns, design patterns, and implementation strategies
7. **Interface Viewpoint** - External interfaces, APIs, and integration specifications
8. **Structure Viewpoint** - Physical organization, deployment architecture, and development structure

Each viewpoint addresses specific architectural concerns while maintaining traceability to the system requirements.

## 2. System Context and Goals

### 2.1 Architectural Goals
The architecture prioritizes solopreneur development workflows with the following design objectives:

#### 2.1.1 Primary Architectural Objectives
- **Single-User Optimization**: Simplified architecture optimized for personal development workflows
- **Local-First Operation**: Privacy-by-design with offline analysis capabilities
- **Performance Efficiency**: Sub-minute analysis for typical personal projects, 5-minute maximum for large projects
- **Security-Ready Architecture**: Modular design enabling future authentication middleware without current complexity
- **Extensible Foundation**: Composition-based architecture supporting future language library integrations and collaboration features

#### 2.1.2 Quality Attribute Requirements
- **Reliability**: Graceful error handling with local recovery mechanisms
- **Portability**: Cross-platform operation (Windows 10+, macOS 11+, Ubuntu 20.04+)
- **Maintainability**: High test coverage with modular, well-documented architecture
- **Usability**: Minimal learning curve for experienced developers with comprehensive tooling
- **Privacy**: Local-first analysis protecting proprietary source code by design

### 2.2 Architectural Constraints

#### 2.2.1 Technology Constraints
- **Backend Platform**: Node.js 18.18.0+ LTS with TypeScript 4.9+
- **Frontend Framework**: React 18+ with ES2020+ browser support
- **Analysis Libraries**: ts-morph 27.0+, ESLint 9.0+, Python Jedi 0.19+
- **API Architecture**: RESTful with OpenAPI 3.0+ specification
- **Data Storage**: JSON-based with optional file persistence

#### 2.2.2 Operational Constraints
- **Memory Limits**: <2GB for projects up to 100k lines of code
- **Performance Targets**: Sub-minute analysis for typical projects, 5-minute maximum for large projects
- **Network Requirements**: Offline-capable analysis, network only for package installation and updates
- **Security Model**: Local-first with privacy-by-design, security-ready for future middleware integration

#### 2.2.3 Hybrid Cloud Deployment Constraints
- **Frontend Hosting**: AWS S3 + CloudFront with sub-100ms global response times
- **Primary Backend**: Oracle Cloud Always-Free ARM VM (4 cores, 24GB RAM, permanent free tier)
- **Multi-Cloud Strategy**: Cost-optimized platform selection per service (Railway, Google Cloud Run, Vercel Functions)
- **Domain Architecture**: Custom domain (cyrustek.com) with strategic subdomain routing
- **SSL Requirements**: Free certificate management via AWS Certificate Manager and Let's Encrypt
- **Cost Target**: <$5/month total infrastructure costs across all applications and APIs

### 2.3 Architectural Drivers
Key requirements driving architectural decisions:

| Driver | Architectural Impact |
|--------|---------------------|
| Single-user optimization | Simplified concurrency, local storage, no authentication layer |
| Local-first privacy | File system analysis, no cloud dependencies, offline operation |
| Performance targets | Delegates to library optimizations (ts-morph, ESLint, Jedi) |
| Multi-language support | Direct library integration with minimal wrapper layers |
| Security-ready design | Standard Express middleware patterns for future authentication |
| Developer workflow integration | CLI (Commander.js), IDE plugins, CI/CD automation hooks |
| Future extensibility | Library ecosystem extensibility, standard configuration patterns |
| **Cost optimization** | **Hybrid cloud deployment with AWS S3 frontend, Oracle ARM backend** |
| **Professional branding** | **Custom domain strategy with app.cyrustek.com, api.[app].cyrustek.com** |
| **Multi-application scaling** | **Shared frontend infrastructure, distributed backend platforms** |
| **Global performance** | **CloudFront CDN for sub-100ms response times worldwide** |

## 3. Architectural Views

This section presents the system architecture through multiple complementary viewpoints, following IEEE 1016-2009 guidelines for comprehensive architectural documentation.

### 3.1 Context Viewpoint

The Context Viewpoint defines system boundaries, external entities, and stakeholder relationships.

#### 3.1.1 System Context Diagram

```mermaid
graph TB
    subgraph "Development Environment"
        DEV1[Primary Developer<br/>Solopreneur]
        DEV2[Collaborating Developer<br/>Optional]
        FS[File System<br/>Source Code]
        VCS[Version Control<br/>Git Repositories]
        IDE[IDE Systems<br/>VS Code]
        CICD[CI/CD Pipeline<br/>GitHub Actions]
    end
    
    subgraph "AWS Cloud Infrastructure"
        S3[S3 Bucket<br/>app.cyrustek.com]
        CF[CloudFront CDN<br/>Global Distribution]
        ACM[Certificate Manager<br/>SSL/TLS]
    end
    
    subgraph "React Frontend (AWS Hosted)"
        GUI[Web GUI Interface<br/>SPA Application]
        VIZ[Visualization Engine<br/>D3.js, Charts]
        UI[Analysis Dashboard<br/>Interactive Reports]
    end
    
    subgraph "Oracle Cloud Infrastructure"
        ARM[ARM VM<br/>4 cores, 24GB RAM]
        API[REST API Server<br/>api.cytrac.cyrustek.com]
        LANG[Language Analyzers<br/>ts-morph, ESLint, Jedi]
        STORAGE[Analysis Storage<br/>Results & Cache]
    end
    
    subgraph "Multi-Cloud Extensions"
        CLI[CLI Tool<br/>Local/Remote]
        EXT[Future APIs<br/>Railway, GCR, Vercel]
    end
    
    %% Development workflow
    DEV1 --> IDE
    DEV1 --> CLI
    DEV2 -.-> GUI
    IDE -.-> API
    CICD --> ARM
    VCS --> ARM
    
    %% Cloud infrastructure
    CF --> GUI
    S3 --> CF
    ACM --> CF
    GUI --> API
    
    %% Processing flow
    FS --> CLI
    CLI --> API
    API --> LANG
    LANG --> STORAGE
    GUI --> VIZ
    VIZ --> UI
    
    %% Extensions
    EXT -.-> GUI
    
    classDef aws fill:#FF9900,color:#fff
    classDef oracle fill:#F80000,color:#fff
    classDef frontend fill:#61DAFB,color:#000
    classDef dev fill:#e1f5fe
    
    class S3,CF,ACM aws
    class ARM,API,LANG,STORAGE oracle
    class GUI,VIZ,UI frontend
    class DEV1,DEV2,FS,VCS,IDE,CICD dev
```

#### 3.1.2 External Entities

**Primary Stakeholders**
- **Solopreneur Developer**: Primary user performing daily analysis on personal projects up to 100k lines of code
- **Collaborating Developer**: Secondary user for occasional code review and pair programming sessions

**External Systems**
- **Local File System**: Source code repositories (local development directories, mounted drives)
- **Version Control Systems**: Git repositories for change tracking and incremental analysis
- **CI/CD Integration**: GitHub Actions for automated analysis in personal project workflows
- **IDE Environments**: Visual Studio Code integration for real-time analysis feedback
- **Package Managers**: npm, pip for dependency analysis and installation management

**Cloud Infrastructure**
- **AWS S3 + CloudFront**: Global CDN hosting for React SPA frontend (app.cyrustek.com)
- **Oracle Cloud ARM VM**: Always-free compute hosting for primary analysis API (api.cytrac.cyrustek.com)
- **Multi-Cloud Platforms**: Cost-optimized hosting for additional APIs (Railway, Google Cloud Run, Vercel Functions)
- **DNS Management**: Domain routing and SSL certificate management (cyrustek.com ecosystem)

### 3.2 Composition Viewpoint

The Composition Viewpoint describes the system's high-level decomposition into major architectural components.

#### 3.2.1 High-Level System Decomposition

```mermaid
graph TB
    subgraph "CYTRAC SYSTEM"
        subgraph "User Interface Layer"
            CLI[CLI Interface<br/>Commander.js]
            GUI[Web GUI<br/>React SPA]
            API[REST API<br/>Express.js]
        end
        
        subgraph "Analysis Coordination"
            COORD[Analysis Coordinator<br/>Orchestration & Results]
        end
        
        subgraph "Visualization & Export"
            D3[D3.js Graphs<br/>Interactive Charts]
            EXPORT[Export Engine<br/>Multiple Formats]
        end
        
        subgraph "Language Library Integrations"
            TSMORPH[ts-morph Library<br/>TypeScript/JavaScript]
            JEDI[Python Jedi Library<br/>Python Analysis]
            ESLINT[ESLint Library<br/>Linting & Analysis]
        end
    end
    
    %% Interface connections
    CLI --> COORD
    GUI --> COORD
    API --> COORD
    
    %% Core processing flow
    COORD --> TSMORPH
    COORD --> JEDI
    COORD --> ESLINT
    COORD --> D3
    COORD --> EXPORT
    
    classDef interface fill:#e3f2fd
    classDef coord fill:#f1f8e9
    classDef viz fill:#fce4ec
    classDef lang fill:#fff8e1
    
    class CLI,GUI,API interface
    class COORD coord
    class D3,EXPORT viz
    class TSMORPH,JEDI,ESLINT lang
```

#### 3.2.2 Component Responsibilities

| Component | Primary Responsibilities |
|-----------|-------------------------|
| **User Interface Layer** | CLI (Commander.js), Web GUI (React), API (Express.js) request handling |
| **Analysis Coordination** | Orchestrates library calls, aggregates results, manages configuration |
| **Visualization & Export** | D3.js interactive graphs, report generation, multiple export formats |
| **Library Integrations** | ts-morph (TypeScript/JavaScript), Jedi (Python), ESLint (linting) |

### 3.3 Logical Viewpoint

The Logical Viewpoint presents the functional architecture and key domain abstractions that implement the system's analysis capabilities.

#### 3.3.1 Functional Architecture

```mermaid
graph TB
    subgraph "PRESENTATION LAYER"
        CLI_H[CLI Handler<br/>Commander.js Commands]
        WEB_F[Web Frontend<br/>React SPA + D3.js]
        REST_A[REST API<br/>Express.js Routes]
    end
    
    subgraph "APPLICATION LAYER"
        COORD[Analysis Coordinator<br/>Orchestrates Library Calls]
        CONFIG[Configuration<br/>dotenv/config Libraries]
    end
    
    subgraph "LIBRARY INTEGRATION LAYER"
        TSMORPH[ts-morph<br/>TypeScript AST Analysis]
        JEDI[Python Jedi<br/>Python Analysis]
        ESLINT[ESLint<br/>JavaScript/TypeScript Linting]
        FS[Node.js fs<br/>File System Operations]
    end
    
    %% Presentation to Application connections
    CLI_H --> COORD
    WEB_F --> COORD
    REST_A --> COORD
    
    %% Application to Library connections
    COORD --> TSMORPH
    COORD --> JEDI
    COORD --> ESLINT
    COORD --> FS
    CONFIG --> COORD
    
    classDef presentation fill:#e8f5e8
    classDef application fill:#fff3e0
    classDef library fill:#fce4ec
    
    class CLI_H,WEB_F,REST_A presentation
    class COORD,CONFIG application
    class TSMORPH,JEDI,ESLINT,FS library
```

#### 3.3.2 Key Abstractions

**Analysis Pipeline (Core Domain Model)**

```typescript
// High-level analysis coordination interface
interface CytracAnalysisCoordinator {
  analyze(projectPath: string, options: AnalysisOptions): Promise<AnalysisResult>;
  onProgress?: (progress: { stage: string; percentage: number }) => void;
}

// Configuration options with library delegation
interface AnalysisOptions {
  languages?: string[];
  memoryLimit?: number;
  outputPath?: string;
}
```

**Security-Ready Architecture (Future Extension Points)**
```typescript
// Extension points for future authentication
interface SecurityContext {
  sessionId: string;
  user?: Express.User;        // Standard Express patterns
  permissions?: string[];
}

// Configuration management approach
interface ConfigurationService {
  get<T>(key: string): T;
  loadFromEnvironment(): void;
  loadFromFile(path: string): void;
}
```

### 3.4 Dependency Viewpoint

The Dependency Viewpoint illustrates component relationships and data flow patterns supporting analysis workflows.

#### 3.4.1 Component Dependency Graph

```mermaid
graph TD
    CLI[CLI App<br/>Commander.js]
    WEB[Web App<br/>React + D3.js]
    API[REST API<br/>Express Server]
    
    COORD[Analysis Coordinator<br/>Library Orchestration]
    
    TSMORPH[ts-morph Library<br/>TypeScript/JavaScript]
    JEDI[Jedi Library<br/>Python Analysis]
    ESLINT[ESLint Library<br/>Linting & Rules]
    
    %% Primary interface dependencies
    CLI --> COORD
    WEB --> COORD  
    API --> COORD
    
    %% Library integration dependencies
    COORD --> TSMORPH
    COORD --> JEDI
    COORD --> ESLINT
    
    classDef interface fill:#e1f5fe
    classDef coord fill:#f3e5f5
    classDef library fill:#fff8e1
    
    class CLI,WEB,API interface
    class COORD coord
    class TSMORPH,JEDI,ESLINT library
```

#### 3.4.2 Data Flow Architecture

```mermaid
flowchart TD
    SOURCE[Source Code Files<br/>TypeScript, JavaScript, Python]
    
    COORD[Analysis Coordinator<br/>File Discovery & Routing]
    
    TSMORPH[ts-morph Processing<br/>TypeScript/JavaScript AST]
    JEDI[Jedi Processing<br/>Python Analysis]
    ESLINT[ESLint Processing<br/>Linting & Quality]
    
    AGGREGATOR[Result Aggregation<br/>Combine Library Results]
    
    subgraph "Output Interfaces"
        CLI_OUT[CLI Output<br/>Text & JSON]
        WEB_VIZ[Web Visualization<br/>D3.js Graphs]
        API_RESP[API Response<br/>JSON Export]
    end
    
    %% Data flow sequence
    SOURCE --> COORD
    
    COORD --> TSMORPH
    COORD --> JEDI
    COORD --> ESLINT
    
    TSMORPH --> AGGREGATOR
    JEDI --> AGGREGATOR
    ESLINT --> AGGREGATOR
    
    %% Output distribution
    AGGREGATOR --> CLI_OUT
    AGGREGATOR --> WEB_VIZ
    AGGREGATOR --> API_RESP
    
    classDef source fill:#fff3e0
    classDef library fill:#e3f2fd
    classDef output fill:#e8f5e8
    classDef coord fill:#f3e5f5
    
    class SOURCE source
    class COORD,AGGREGATOR coord
    class TSMORPH,JEDI,ESLINT library
    class CLI_OUT,WEB_VIZ,API_RESP output
```

### 3.5 Information Viewpoint

The Information Viewpoint defines data models, storage architecture, and information management strategies aligned with local-first operational requirements.

#### 3.5.1 Data Model

**Core Analysis Data Structures**

```typescript
// Extends library interfaces with minimal Cytrac metadata
interface CytracProjectMetadata extends Partial<ts.morph.ProjectOptions> {
  analysisTimestamp: Date;
  executionTime: number;
  cytracVersion: string;
}

// Leverages library symbol types with confidence indicators
interface CytracSymbol {
  tsMorphSymbol?: ts.morph.Symbol;
  jediDefinition?: jedi.Definition;
  confidence: number;                 // 0.0-1.0 for dynamic analysis
}

// Aggregated analysis results
interface AnalysisResult {
  project: CytracProjectMetadata;
  symbols: CytracSymbol[];
  dependencyGraph: any;              // Library-generated output
  metrics: AnalysisMetrics;
}
```

#### 3.5.2 Storage Architecture

**Local-First Storage Strategy**

```
Project Root/
├── .cytrac/                    # Analysis cache and config
│   ├── config.json            # Project-specific settings
│   ├── cache/                 # Analysis result caching
│   │   ├── symbols.json       # Symbol analysis cache
│   │   ├── dependencies.json  # Dependency graph cache
│   │   └── metadata.json      # Project metadata cache
│   └── exports/               # Generated reports
│       ├── analysis-report.pdf
│       ├── dependency-graph.svg
│       └── dead-code-report.csv
```

**Configuration Hierarchy**
```
System Level:    ~/.cytrac/config.json
Project Level:   ./cytrac-config.json  
Runtime Level:   Environment variables + CLI flags
```

### 3.6 Patterns Viewpoint

The Patterns Viewpoint describes architectural patterns and design strategies that support system requirements for modularity, extensibility, and security-ready design.

#### 3.6.1 Architectural Patterns

**1. Layered Architecture Pattern**
- **Purpose**: Clear separation of concerns with defined interfaces
- **Implementation**: Presentation → Application → Domain → Infrastructure
- **Benefits**: Maintainability, testability, extensibility
- **SRS Alignment**: Supports modular architecture requirement

**2. Composition-Based Language Analysis Pattern**
```typescript
// Architectural approach: Composition with library delegation
interface AnalysisCapability {
  canAnalyze(filePath: string): boolean;
  analyze(filePath: string): Promise<AnalysisResult>;
}

class LanguageAnalysisCoordinator {
  private analyzers: Map<string, AnalysisCapability>;
  
  // Composition: Contains analysis capabilities rather than inheritance
  // - TypeScript/JavaScript: Delegates to ts-morph
  // - Python: Delegates to Jedi
  // - Runtime extensibility: Add analyzers without code changes
  
  async analyzeFile(filePath: string): Promise<AnalysisResult> {
    // Route to appropriate analyzer based on file type
  }
}
```

**3. Standard Express Middleware Pattern**
- **Purpose**: Leverage Express.js middleware ecosystem for request processing
- **Architecture**: Standard middleware stack with session tracking and authentication extension points
- **Implementation**: Express.Request extensions for security context, standard middleware patterns

**4. Observer Pattern with EventEmitter**
- **Purpose**: Progress reporting and event-driven analysis coordination
- **Architecture**: Node.js EventEmitter for standard event handling
- **Implementation**: Analysis progress events, completion notifications

#### 3.6.2 Design Patterns

**Adapter Pattern for Language Libraries**
- **Purpose**: Composition-based coordination with library delegation rather than inheritance
- **Benefits**: Direct library access, runtime flexibility, reduced coupling
- **Implementation**: File extension-based routing to composed library instances

**Standard Express Patterns**  
- **Purpose**: Use established Express.js middleware and routing patterns
- **Benefits**: Leverages existing ecosystem, reduces custom code
- **Implementation**: Standard middleware stack, conventional REST endpoints

### 3.7 Interface Viewpoint

The Interface Viewpoint specifies external interfaces, APIs, and integration patterns that implement user interface and integration requirements.

#### 3.7.1 User Interfaces

**User Interface Architecture**

- **Command Line Interface**: Commander.js-based CLI with standard command patterns
- **Web Interface**: React SPA with component-based architecture and D3.js visualizations
- **REST API**: Express.js application with standard middleware patterns

**API Endpoint Structure**

*Core Analysis Endpoints (MVP)*
```
POST /api/v1/analysis           # Initiate analysis
GET  /api/v1/analysis/:id       # Retrieve results
GET  /api/v1/analysis/:id/status # Check analysis progress
GET  /api/v1/health             # System health check
```

*Architectural Extension Points (Future)*
```
# Result Access Patterns
GET  /api/v1/analysis/:id/symbols      # Symbol analysis results
GET  /api/v1/analysis/:id/dependencies # Dependency graph data
GET  /api/v1/analysis/:id/metrics      # Code quality metrics
GET  /api/v1/analysis/:id/export       # Export in multiple formats

# Configuration & Management
GET  /api/v1/languages          # Supported language capabilities
GET  /api/v1/version            # API version and features
POST /api/v1/projects           # Project registration (collaboration)
```

**API Architecture Principles:**
- **RESTful Design**: Standard HTTP methods and resource patterns
- **Asynchronous Processing**: POST creates analysis job, GET retrieves results
- **Progressive Enhancement**: Core endpoints support MVP, extensions enable advanced features
- **Stateless Operation**: Each request contains complete context for analysis
- **Version Management**: `/v1/` prefix enables backward-compatible API evolution

#### 3.7.2 Integration Interfaces

**IDE Integration Architecture**
- **Approach**: Language Server Protocol (LSP) implementation for IDE integration
- **Libraries**: Standard vscode-languageserver for VS Code extension development
- **Capabilities**: Real-time analysis feedback, navigation support, incremental updates

**CI/CD Integration Architecture**
```yaml
# GitHub Actions Example
- name: Run Cytrac Analysis
  uses: cytrac-action@v1
  with:
    project-path: './src'
    format: 'json'
    quality-gate: true
    confidence-threshold: 0.8
```

### 3.8 Structure Viewpoint

The Structure Viewpoint defines physical organization and deployment architecture supporting local-first development with hybrid cloud deployment capabilities for cost-effective collaboration and scaling.

#### 3.8.1 Physical Architecture

**Development Structure**
```
cytrac/
├── packages/
│   ├── core/                  # Analysis engine
│   │   ├── src/
│   │   │   ├── analyzers/     # Language-specific analyzers
│   │   │   ├── engine/        # Core analysis logic
│   │   │   └── types/         # TypeScript definitions
│   │   └── package.json
│   │
│   ├── cli/                   # Command line interface
│   │   ├── src/
│   │   │   ├── commands/      # CLI command implementations
│   │   │   └── utils/         # CLI utilities
│   │   └── package.json
│   │
│   ├── web/                   # Web frontend (React)
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── pages/         # Page components
│   │   │   ├── services/      # API clients
│   │   │   └── types/         # Frontend types
│   │   └── package.json
│   │
│   └── api/                   # REST API server
│       ├── src/
│       │   ├── routes/        # Express routes
│       │   ├── middleware/    # Request middleware
│       │   └── services/      # Business logic
│       └── package.json
│
├── tools/                     # Build and development tools
├── docs/                      # Documentation
└── tests/                     # Integration tests
```

#### 3.8.2 Deployment Architecture

**Local Development Deployment (Primary)**
```
Developer Machine
├── Node.js Runtime (18.18.0+)
├── Cytrac CLI (Global Install)
├── Analysis Results Cache (~/.cytrac/)
└── Project-Specific Config (./cytrac-config.json)
```

**Hybrid Cloud Deployment Architecture**

**Frontend Layer (AWS S3 + CloudFront)**
```
AWS S3 Static Hosting
├── Shared Frontend Bucket (app.cyrustek.com)
│   ├── /cytrac → Cytrac React SPA
│   ├── /devtools → DevTools React SPA (future)
│   └── /shared → Common assets and libraries
├── Global CloudFront CDN Distribution
├── AWS Certificate Manager SSL (*.cyrustek.com)
└── Route 53 DNS Management

Benefits: Ultra-low cost (~$0.01/month), global CDN performance
```

**Backend Layer (Distributed Multi-Cloud)**
```
Oracle Cloud Always-Free ARM VM
├── api.cytrac.cyrustek.com → Cytrac Analysis API
│   ├── Express.js REST Server
│   ├── ts-morph + ESLint + Jedi Analysis Engine
│   ├── 4 ARM cores, 24GB RAM (free forever)
│   └── Let's Encrypt SSL Certificate

Future API Distribution:
├── api.devtools.cyrustek.com → Railway/Google Cloud Run
├── api.analytics.cyrustek.com → Vercel Functions/AWS Lambda
└── api.[app].cyrustek.com → Cost-optimized hosting per requirements

Benefits: Zero backend costs, optimal platform selection per service
```

**Complete Architecture Flow**
```
Users → app.cyrustek.com (AWS CloudFront CDN)
       ├── Cached globally for <100ms response times
       ├── /cytrac SPA → api.cytrac.cyrustek.com (Oracle ARM VM)
       ├── /devtools SPA → api.devtools.cyrustek.com (Platform TBD)
       └── /[app] SPA → api.[app].cyrustek.com (Platform TBD)

Cost Structure:
├── Frontend: $0.01-0.25/month (AWS S3 + CloudFront)
├── Primary API: $0/month (Oracle always-free)
├── Additional APIs: $0-5/month each (free tiers + optimal platforms)
└── Total: $0.01-25/month depending on scale and usage
```

**Domain and SSL Strategy**
```
Domain Architecture:
├── cyrustek.com → Main company/personal site
├── app.cyrustek.com → Unified SPA hosting (all applications)
└── api.[app].cyrustek.com → Distributed API endpoints

SSL Certificates:
├── *.cyrustek.com → AWS Certificate Manager (free)
├── *.cytrac.cyrustek.com → Let's Encrypt wildcard (free)
└── Platform SSL → Automatic for Railway, Vercel, Cloud Run
```

## 4. Design Rationale

This section documents the key architectural decisions, their rationale, and the trade-offs considered during the design process.

### 4.1 Architectural Decisions

#### 4.1.1 Monorepo with Modular Packages
**Decision**: Use monorepo structure with separate packages for core, CLI, web, and API components
**Rationale**: 
- Supports modular architecture requirements for maintainable personal development
- Enables selective deployment patterns (CLI-only for automation, web interface for visualization)
- Facilitates independent testing and development of analysis vs. visualization components
- Maintains clear separation of concerns supporting high test coverage requirements
- Enables future extensibility when personal projects grow into collaboration scenarios

#### 4.1.2 Hybrid Cloud Architecture Strategy
**Decision**: Local-first development with hybrid cloud deployment using AWS S3 for frontend and distributed multi-cloud backend hosting
**Rationale**:
- **Cost Optimization**: AWS S3 + CloudFront provides enterprise CDN at ~$0.01/month for frontend hosting
- **Zero-Cost Backend**: Oracle Cloud Always-Free ARM VM (4 cores, 24GB RAM) provides production-grade compute at $0/month
- **Platform Flexibility**: Distributed backend enables optimal platform selection per service requirements (Railway, Google Cloud Run, Vercel)  
- **Scalability**: Unified frontend supports multiple applications while maintaining independent backend scaling
- **Professional Architecture**: Custom domain strategy (app.cyrustek.com, api.[app].cyrustek.com) provides branded, enterprise-grade user experience
- **Developer Experience**: ARM64 development on M3 Pro Mac aligns perfectly with Oracle ARM production deployment
- **Risk Mitigation**: Multi-cloud approach reduces vendor lock-in while maintaining cost efficiency

#### 4.1.3 Security-Ready Architecture without Current Implementation
**Decision**: Design API middleware integration points without current authentication implementation
**Rationale**:
- Supports security-ready architecture requirements
- Avoids unnecessary complexity for current solopreneur use case
- Enables incremental security feature addition when collaboration needs arise
- Maintains architectural extensibility for optional future security features

#### 4.1.4 Composition-Based Language Support
**Decision**: Use composition with library delegation rather than inheritance-based plugin architecture
**Rationale**:
- Supports extensibility requirements for future language additions
- Enables runtime addition of new language analyzers without inheritance constraints
- Maintains loose coupling with direct library delegation for better performance
- Follows "composition over inheritance" principle for better flexibility
- Aligns with library-centric architecture approach throughout the system

### 4.2 Technology Selection Rationale

#### 4.2.1 Core Technology Stack
| Technology | Version Requirement | Rationale | Architecture Alignment |
|------------|-------------------|-----------|----------------------|
| **Node.js** | 18.18.0+ LTS | ESLint 9.0+ compatibility requirement, mature ecosystem, 208k+ ts-morph users | Technology constraints |
| **TypeScript** | 4.9+ (5.2+ preferred) | Type safety, ts-morph AST compatibility, modern language features | AST analysis requirements |
| **ts-morph** | 27.0+ | Mature TypeScript AST manipulation, 208k+ weekly downloads, comprehensive API | Technical research validation |
| **ESLint** | 9.0+ | Static analysis engine, extensible rule system, Node.js 18.18.0+ requirement | JavaScript analysis capability |
| **Python Jedi** | 0.19+ | Python static analysis, Python 3.8+ support, mature autocomplete engine | Python analysis capability |
| **React** | 18+ | Modern frontend framework, component architecture, ES2020+ browser support | Interactive visualization requirements |
| **Express.js** | 4.18+ | Lightweight REST framework, middleware pattern, security middleware ready | Security-ready architecture |
| **D3.js** | 7.0+ | Interactive data visualization, SVG manipulation, graph algorithms | Visualization requirements |

#### 4.2.2 Design Pattern Selection
- **Layered Architecture**: Clean separation supporting high test coverage requirements
- **Composition Pattern**: Library coordination through delegation rather than inheritance
- **Observer Pattern**: Standard Node.js EventEmitter for progress reporting
- **Middleware Pattern**: Standard Express middleware for request processing

### 4.3 Interface Design Rationale

#### 4.3.1 Minimal Abstraction Strategy
**Decision**: Use thin wrappers around existing library APIs rather than heavy abstraction layers
**Rationale**:
- **ts-morph** already provides comprehensive TypeScript AST analysis with 208k+ weekly downloads and mature API
- **ESLint** offers extensive JavaScript analysis capabilities with established patterns
- **Python Jedi** delivers proven Python analysis functionality
- **Express.js** provides standard middleware patterns for HTTP request handling
- **React** ecosystem includes established patterns for SPA development

**Benefits**:
- Reduced development complexity and maintenance overhead
- Direct access to full library capabilities without abstraction limitations
- Easier debugging and troubleshooting with direct library integration
- Lower learning curve for developers familiar with these established tools
- Better performance by avoiding unnecessary abstraction layers

#### 4.3.2 Standard Pattern Usage
**Decision**: Leverage existing framework patterns (Express middleware, React components, Node.js EventEmitter)
**Rationale**:
- Existing patterns are well-documented, tested, and understood by developers
- Framework ecosystems provide extensive tooling and community support
- Standard patterns reduce architectural complexity and improve maintainability
- Integration with existing developer workflows and tools is simplified

### 4.4 Performance Design Decisions

#### 4.4.1 Memory Management Strategy
**Decision**: Streaming AST processing with configurable memory limits
**Rationale**: Supports memory targets for personal project scale with graceful degradation
**Implementation**: Delegates memory management to ts-morph and ESLint library optimizations

#### 4.4.2 Analysis Performance Strategy  
**Decision**: Progressive analysis with early result feedback
**Rationale**: Achieves performance targets while providing immediate developer feedback
**Implementation**: File discovery → Symbol extraction → Reference analysis (leverages library optimizations)

#### 4.4.3 Local Caching Strategy  
**Decision**: Project-level caching with file-system persistence
**Rationale**: Enables fast re-analysis for unchanged code during development
**Implementation**: JSON-based cache in `.cytrac/cache/` with file modification tracking

## 5. Conclusion

### 5.1 Architecture Summary
This hybrid cloud architecture provides a professional, cost-effective foundation for Cytrac and future applications, implementing all system requirements with enterprise-grade deployment capabilities at near-zero operational costs. The local-first development approach combined with strategic cloud deployment optimizes both development productivity and production scalability.

### 5.2 Implementation Priorities
1. **AWS Frontend Infrastructure**: S3 + CloudFront setup for unified SPA hosting (app.cyrustek.com)
2. **Oracle ARM VM Backend**: Primary API hosting with ts-morph + ESLint + Jedi analysis engine
3. **Library Integration Foundation**: Multi-language analysis capabilities with composition-based architecture
4. **CLI Interface**: Local development tool maintaining privacy-by-design principles
5. **Hybrid Deployment Pipeline**: Automated deployment for both AWS frontend and Oracle backend components

### 5.3 Future Evolution Path
The hybrid cloud architecture supports seamless scaling and evolution:

**Near-term Expansion (0-12 months):**
- **Additional SPAs**: Deploy devtools, analytics applications to shared app.cyrustek.com frontend
- **API Distribution**: Distribute new APIs across optimal platforms (Railway, Google Cloud Run, Vercel Functions)
- **Domain Strategy**: Implement api.[app].cyrustek.com subdomain pattern for service isolation
- **Monitoring Integration**: Unified frontend monitoring with distributed backend observability

**Medium-term Growth (1-2 years):**
- **Team Collaboration**: Optional authentication middleware leveraging Oracle VM + AWS infrastructure
- **Advanced Visualization**: Enhanced D3.js components with shared asset optimization via CloudFront
- **Integration Ecosystem**: IDE plugins, CI/CD integrations maintaining hybrid deployment model
- **Multi-Language Expansion**: Additional analysis engines (Java, C#, Go, Rust) distributed across cost-optimized platforms

**Long-term Architecture (2+ years):**
- **Microservices Evolution**: Service mesh architecture across multi-cloud deployment maintaining cost efficiency
- **Geographic Distribution**: CloudFront + Oracle Cloud regions for global performance optimization
- **Enterprise Features**: Advanced security, compliance, and governance while preserving cost-effective hybrid model
- **Platform Strategy**: CyrusTek application ecosystem leveraging proven hybrid cloud architecture patterns

This architecture achieves enterprise-grade capabilities at hobbyist costs, positioning Cytrac as both a professional development tool and a scalable foundation for future application development.
