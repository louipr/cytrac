/**
 * @fileoverview Cytrac REST API Server
 * @author CyrusTek
 * @version 0.1.0
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createAnalysisCoordinator, type AnalysisResult } from '@cytrac/core';

/**
 * API Server application per SPMP WP4
 */
export class CytracAPIServer {
  private readonly app: express.Application;
  private readonly coordinator = createAnalysisCoordinator();
  private readonly port: number;

  constructor(port = 3001) {
    this.port = port;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Configure Express middleware per SAD section 3.7.1
   */
  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://app.cyrustek.com', 'https://cytrac.cyrustek.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true,
    }));

    // Rate limiting (100 requests per 15 minutes per IP)
    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP',
    }));

    // Body parsing and compression
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  /**
   * Set up API routes per OpenAPI 3.0+ specification
   */
  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        version: '0.1.0',
        timestamp: new Date().toISOString(),
        phase: 'Foundation Complete (WP1)',
      });
    });

    // API info endpoint
    this.app.get('/api/v1/info', (req, res) => {
      res.json({
        name: 'Cytrac Analysis API',
        version: '0.1.0',
        description: 'Professional code analysis and visualization API',
        capabilities: {
          languages: ['TypeScript', 'JavaScript', 'Python'],
          maxFileSize: '10MB',
          maxAnalysisTime: '5 minutes',
          memoryLimit: '<2GB',
        },
        endpoints: {
          analyze: '/api/v1/analyze',
          status: '/api/v1/status/:jobId',
          results: '/api/v1/results/:jobId',
        },
        implementation: {
          phase: 'Foundation (WP1 Complete)',
          nextPhase: 'Core Engine (WP2)',
          architecture: 'Hybrid Cloud (AWS + Oracle)',
          cost: '<$5/month',
        },
      });
    });

    // Analysis endpoint (placeholder for WP2)
    this.app.post('/api/v1/analyze', (req, res) => {
      const { files, options } = req.body;
      
      res.json({
        jobId: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'queued',
        message: '🚧 Analysis implementation coming in Phase 2 (WP2)',
        files: files?.length || 0,
        options: options || {},
        estimated: '< 1 minute for typical projects',
      });
    });

    // Job status endpoint (placeholder)
    this.app.get('/api/v1/status/:jobId', (req, res) => {
      const { jobId } = req.params;
      
      res.json({
        jobId,
        status: 'pending',
        progress: 0,
        message: 'Implementation coming in WP2',
        phase: 'Foundation Complete',
      });
    });

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Endpoint ${req.method} ${req.originalUrl} not found`,
        availableEndpoints: [
          'GET /health',
          'GET /api/v1/info',
          'POST /api/v1/analyze',
          'GET /api/v1/status/:jobId',
        ],
      });
    });

    // Error handler
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('API Error:', err);
      res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        timestamp: new Date().toISOString(),
      });
    });
  }

  /**
   * Start the API server
   */
  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        console.log(`🚀 Cytrac API Server running on port ${this.port}`);
        console.log(`📋 Health check: http://localhost:${this.port}/health`);
        console.log(`📊 API info: http://localhost:${this.port}/api/v1/info`);
        console.log(`🏗️  Phase: Foundation (WP1) Complete`);
        console.log(`🔄 Next: Core Analysis Engine (WP2)`);
        resolve();
      });
    });
  }

  /**
   * Get the Express application instance
   */
  public getApp(): express.Application {
    return this.app;
  }
}

// Export for testing
export default CytracAPIServer;
