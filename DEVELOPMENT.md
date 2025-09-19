# Cytrac Development Environment Setup

## Prerequisites

### Required Software
- **Node.js**: 18.18.0+ LTS (20.x recommended)
- **npm**: 9.0.0+ (comes with Node.js)
- **Git**: Latest stable version
- **VS Code**: Recommended IDE with extensions below

### Recommended VS Code Extensions
- **TypeScript and JavaScript Language Features** (built-in)
- **ESLint** (`ms-vscode.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **Jest** (`orta.vscode-jest`)
- **GitLens** (`eamodio.gitlens`)

## Project Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/louipr/cytrac.git
cd cytrac

# Install all dependencies (includes workspaces)
npm install
```

### 2. Verify Installation
```bash
# Run type checking across all packages
npm run type-check

# Run linting across all packages  
npm run lint

# Run tests across all packages
npm run test

# Build all packages
npm run build
```

## Development Workflow

### Working with Workspaces

The project uses npm workspaces with the following packages:
- `@cytrac/core` - Core analysis engine
- `@cytrac/cli` - Command-line interface
- `@cytrac/api` - REST API server  
- `@cytrac/web` - React SPA frontend

### Common Commands

```bash
# Install dependency in specific package
npm install <package> --workspace=@cytrac/core

# Run script in specific package
npm run dev --workspace=@cytrac/api

# Run script in all packages
npm run build --workspaces

# Clean all build artifacts
npm run clean
```

### Development Servers

```bash
# Start API development server (with hot reload)
npm run dev --workspace=@cytrac/api

# Start web development server  
npm run dev --workspace=@cytrac/web

# Watch mode for core package
npm run dev --workspace=@cytrac/core
```

## Code Quality Standards

### TypeScript Configuration
- **Strict mode enabled** across all packages
- **ES2020+ target** for modern JavaScript features
- **Path mapping** configured for internal package references

### Linting Rules
- **ESLint with Airbnb base config**
- **TypeScript-specific rules** enabled
- **120-character line limit**
- **Automatic import sorting**

### Testing Standards
- **Jest** for unit testing
- **80% coverage threshold** required
- **Supertest** for API integration testing
- **Playwright** for E2E testing (future)

### Code Formatting
- **Prettier** with consistent configuration
- **2-space indentation**
- **Single quotes** for strings
- **Trailing commas** for ES5+ compatibility

## Project Structure

```
cytrac/
├── docs/                    # Documentation
│   ├── requirements/        # SRS and requirements docs
│   ├── architecture/        # SAD and architectural docs
│   ├── decisions/          # Architecture Decision Records
│   └── development/        # SPMP and development docs
├── packages/               # Monorepo packages
│   ├── core/              # Analysis engine
│   ├── cli/               # Command-line interface
│   ├── api/               # REST API server
│   └── web/               # React SPA frontend
├── .github/               # GitHub Actions workflows
├── coverage/              # Test coverage reports
└── node_modules/          # Dependencies
```

## Package Development Guide

### Core Package (`@cytrac/core`)
- **Purpose**: Multi-language analysis engine
- **Dependencies**: ts-morph, ESLint, Jedi (future)
- **Key Files**: 
  - `src/analyzers/` - Language-specific analyzers
  - `src/coordinator.ts` - Analysis coordination
  - `src/types.ts` - Type definitions

### CLI Package (`@cytrac/cli`) 
- **Purpose**: Command-line interface
- **Dependencies**: Commander.js, Chalk, Ora
- **Key Files**:
  - `src/cli.ts` - Main CLI entry point
  - `src/commands/` - Command implementations
  - `src/formatters/` - Output formatters

### API Package (`@cytrac/api`)
- **Purpose**: REST API server
- **Dependencies**: Express.js, OpenAPI tools
- **Key Files**:
  - `src/server.ts` - Express server setup
  - `src/routes/` - API route handlers
  - `src/middleware/` - Custom middleware

### Web Package (`@cytrac/web`)
- **Purpose**: React SPA with D3.js visualizations
- **Dependencies**: React, D3.js, Vite
- **Key Files**:
  - `src/components/` - React components
  - `src/visualizations/` - D3.js charts
  - `src/hooks/` - Custom React hooks

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear all node_modules and reinstall
npm run clean
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check

# Rebuild TypeScript references
npx tsc --build --force
```

#### Test Failures
```bash
# Run tests in verbose mode
npm run test -- --verbose

# Run specific test file
npm run test -- packages/core/src/analyzer.test.ts
```

#### Linting Issues
```bash
# Auto-fix linting issues where possible
npm run lint -- --fix

# Check specific file
npx eslint packages/core/src/index.ts
```

### Performance Optimization

#### Large Project Analysis
- Analysis engine designed for <2GB memory usage
- Streaming processing for large codebases
- Configurable concurrency limits

#### Development Speed
- TypeScript incremental compilation
- Jest watch mode for rapid testing
- Hot reload for API and web development

## Contributing Guidelines

### Commit Message Format
Follow conventional commit format:
```
type(scope): description

Examples:
feat(core): add Python analysis support
fix(api): resolve memory leak in analysis queue
docs(readme): update installation instructions
```

### Pull Request Process
1. Create feature branch from `develop`
2. Ensure all tests pass and coverage meets threshold
3. Update documentation as needed
4. Submit PR with clear description
5. Address review feedback
6. Squash and merge when approved

### Code Review Checklist
- [ ] TypeScript strict mode compliance
- [ ] Test coverage ≥80%
- [ ] ESLint rules passing
- [ ] Documentation updated
- [ ] Performance considerations addressed
- [ ] Security best practices followed

---

For questions or issues, refer to the project documentation in `docs/` or create an issue in the repository.
