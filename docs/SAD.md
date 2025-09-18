# Software Architecture Document (SAD)

## 1. Introduction
This document describes the architecture for Cytrac, a code analysis tool supporting TypeScript, JavaScript, Node.js, and Python. It maps architectural decisions to requirements defined in the SRS.

## 2. Architectural Goals and Constraints
- Modularity: The system is composed of distinct modules for analysis, user interfaces, and language support.
- API-driven: Analysis capabilities are exposed via well-defined interfaces for CLI, GUI, and external integration.
- Extensibility: The architecture supports adding new language analyzers and features.
- Separation of concerns: Analysis, reporting, and code transformation are distinct components.
- Initial scope: Only Node.js/TypeScript and Python are supported in the first release.

## 3. Use Case View
- Analyze codebase via CLI or GUI
- Visualize analysis results interactively
- Remove dead code generated during development

## 4. Logical View
- Analysis Engine: Core logic for code analysis
- Language Modules: TypeScript/Node.js and Python analyzers
- CLI Module: Command-line interface for analysis
- GUI Module: Graphical interface for running analysis and visualization
- Integration API: Interface for external tools (e.g., Copilot)

## 5. Process View
- User initiates analysis via CLI or GUI
- Analysis engine processes codebase using language modules
- Results are returned to CLI/GUI for visualization and reporting

## 6. Deployment View
- CLI and GUI can be deployed together or separately
- Analysis engine runs locally; future support for remote execution possible

## 7. Implementation View
- Modular codebase with clear interfaces between components
- Pluggable language analyzers
- API endpoints for analysis and results retrieval

## 8. Data View
- Input: Source code files
- Output: Structured analysis results (JSON)
- Visualization: Data consumed by GUI for interactive display

## 9. Infrastructure View
- Runs on Node.js runtime
- GUI accessible via modern web browsers
- File system access for codebase analysis

## 10. Interface View
- CLI commands for analysis
- GUI actions for running analysis and viewing results
- API for integration with external tools

## 11. Design Rationale
The architecture is designed for flexibility, maintainability, and integration with modern development workflows and tools. It supports current requirements and future extensibility.
