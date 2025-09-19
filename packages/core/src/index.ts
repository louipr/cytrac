/**
 * @fileoverview Cytrac Core Analysis Engine
 * @author CyrusTek
 * @version 0.1.0
 */

/**
 * Core analysis result interface per SAD section 3.4.1
 */
export interface AnalysisResult {
  readonly filePath: string;
  readonly language: string;
  readonly confidence: number;
  readonly metrics: AnalysisMetrics;
  readonly issues: AnalysisIssue[];
  readonly dependencies: string[];
}

/**
 * Analysis metrics per SRS functional requirements  
 */
export interface AnalysisMetrics {
  readonly linesOfCode: number;
  readonly complexityScore: number;
  readonly maintainabilityIndex: number;
  readonly technicalDebt: number;
}

/**
 * Analysis issue representation
 */
export interface AnalysisIssue {
  readonly type: 'error' | 'warning' | 'info';
  readonly message: string;
  readonly line: number;
  readonly column: number;
  readonly rule?: string;
}

/**
 * Language analyzer capability interface per SAD section 3.6.1
 */
export interface LanguageAnalyzer {
  /**
   * Check if this analyzer can handle the given file
   */
  canAnalyze(filePath: string): boolean;
  
  /**
   * Perform analysis on the given file
   */
  analyze(filePath: string): Promise<AnalysisResult>;
  
  /**
   * Get supported file extensions
   */
  getSupportedExtensions(): readonly string[];
}

/**
 * Analysis coordinator - main entry point per SAD section 3.6.1
 */
export class AnalysisCoordinator {
  private readonly analyzers = new Map<string, LanguageAnalyzer>();
  
  /**
   * Register a language analyzer
   */
  public registerAnalyzer(language: string, analyzer: LanguageAnalyzer): void {
    this.analyzers.set(language, analyzer);
  }
  
  /**
   * Analyze a single file
   */
  public async analyzeFile(filePath: string): Promise<AnalysisResult | null> {
    // Find appropriate analyzer
    for (const [, analyzer] of this.analyzers) {
      if (analyzer.canAnalyze(filePath)) {
        return analyzer.analyze(filePath);
      }
    }
    
    return null; // No analyzer found
  }
  
  /**
   * Analyze multiple files
   */
  public async analyzeFiles(filePaths: string[]): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    
    for (const filePath of filePaths) {
      const result = await this.analyzeFile(filePath);
      if (result) {
        results.push(result);
      }
    }
    
    return results;
  }
}

/**
 * Create a new analysis coordinator with default configuration
 */
export function createAnalysisCoordinator(): AnalysisCoordinator {
  return new AnalysisCoordinator();
}

// Default export
export default {
  AnalysisCoordinator,
  createAnalysisCoordinator,
};
