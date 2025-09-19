---
title: "ADR-001: Inter-Service Communication Patterns for Oracle ARM VM"
date: "September 19, 2025"
status: "Exploring"
authors: "CyrusTek Senior Software Architect"
relates_to: "Cytrac Software Architecture Document (SAD) v2.1"
---

# ADR-001: Inter-Service Communication Patterns for Oracle ARM VM

## Status
**Exploring** - Researching communication patterns for potential multi-service architecture on Oracle Cloud ARM VM

## Context
The Oracle Cloud Always-Free ARM VM (4 cores, 24GB RAM) provides significant compute resources that could host multiple services beyond the primary Cytrac analysis API. This ADR explores communication patterns between co-located services to optimize performance and resource utilization.

### Current State
- Single Cytrac analysis API service running on Oracle ARM VM
- HTTP REST API for external communication (app.cyrustek.com → api.cytrac.cyrustek.com)
- Potential for additional services (devtools, analytics, utilities) on same VM

### Future Scenarios
- **Multi-Service Architecture**: Additional APIs for devtools, analytics, monitoring
- **Shared Analysis Resources**: Common symbol tables, AST caches, metadata stores
- **High-Frequency Communication**: Real-time progress updates, cache invalidation, resource coordination
- **Resource Optimization**: Maximize utilization of 24GB RAM and 4 ARM cores

## Decision
Document communication patterns for future reference, implement HTTP REST initially, with shared memory and Unix sockets available for performance optimization when justified.

## Options Considered

### 1. HTTP REST API (Current Implementation)
- **Status**: Implementing
- **Latency**: 5-10ms per request
- **Use Cases**: Standard service communication, external API endpoints, network-ready interfaces
- **Pros**: 
  - Well-understood patterns and tooling
  - Network-ready for future distribution
  - Standard Express.js middleware ecosystem
  - Easy debugging and monitoring
- **Cons**: 
  - Higher latency overhead
  - JSON serialization costs
  - HTTP protocol overhead
- **Implementation**: Express.js with standard middleware stack

### 2. Unix Domain Sockets (Performance Optimization)
- **Status**: Documented for future implementation
- **Latency**: ~1ms per request
- **Use Cases**: Same-machine RPC calls, moderate performance requirements
- **Pros**: 
  - Lower latency than HTTP
  - Process isolation maintained
  - Standard Node.js net module support
  - Familiar socket programming patterns
- **Cons**: 
  - Unix-specific (not Windows compatible)
  - More complex error handling
  - Requires custom serialization protocol
- **Implementation Pattern**:
  ```javascript
  // Server: Unix socket listener
  const net = require('net');
  const server = net.createServer();
  server.listen('/tmp/cytrac-ipc.sock');
  
  // Client: Connect to socket
  const client = net.createConnection('/tmp/cytrac-ipc.sock');
  ```

### 3. Shared Memory IPC (Ultra-Performance)
- **Status**: Research complete, implementation patterns documented
- **Latency**: ~0.01ms (nanosecond-level access)
- **Use Cases**: High-frequency data sharing, large data structure caching, real-time coordination
- **Pros**: 
  - Ultra-low latency (direct memory access)
  - Zero serialization overhead
  - Efficient for large data structures (ASTs, symbol tables)
  - Maximum utilization of 24GB RAM
- **Cons**: 
  - Complex synchronization requirements
  - Platform-specific implementations
  - Harder debugging and monitoring
  - Memory corruption risks
  - Single-machine limitation

#### Shared Memory Implementation Patterns

**Pattern A: SharedArrayBuffer (Browser-Compatible)**
```javascript
// Create shared buffer
const sharedBuffer = new SharedArrayBuffer(1024 * 1024); // 1MB
const sharedArray = new Int32Array(sharedBuffer);

// Atomic operations for synchronization
Atomics.store(sharedArray, 0, analysisResultId);
const result = Atomics.load(sharedArray, 0);
```

**Pattern B: Memory-Mapped Files (Node.js)**
```javascript
const mmap = require('mmap-io');
const fs = require('fs');

// Create memory-mapped file
const fd = fs.openSync('/tmp/cytrac-shared.dat', 'r+');
const buffer = mmap.map(fd, mmap.PROT_READ | mmap.PROT_WRITE, 0, size);

// Direct buffer access
buffer.writeInt32LE(value, offset);
const data = buffer.readInt32LE(offset);
```

**Pattern C: Redis with Lua Scripts (Structured Shared Data)**
```javascript
// Redis as shared memory coordinator
const redis = require('redis');
const client = redis.createClient();

// Lua script for atomic operations
const luaScript = `
  local key = KEYS[1]
  local data = ARGV[1]
  redis.call('set', key, data)
  return redis.call('get', key)
`;

// Execute atomic operation
const result = await client.eval(luaScript, 1, 'analysis:symbols', symbolData);
```

## Theoretical Resource Sharing Scenarios

### Scenario 1: Shared Analysis Caches
- **Data Types**: AST trees, symbol tables, dependency graphs
- **Size**: 100MB-1GB cached analysis results
- **Access Pattern**: Read-heavy with periodic updates
- **Optimal Pattern**: Memory-mapped files or Redis with persistence
- **Benefits**: Eliminate duplicate analysis across services

### Scenario 2: Real-Time Progress Coordination
- **Data Types**: Analysis progress, status updates, resource locks
- **Size**: Small structures (KB range)
- **Access Pattern**: High-frequency updates (100s per second)
- **Optimal Pattern**: SharedArrayBuffer with atomic operations
- **Benefits**: Sub-millisecond coordination between services

### Scenario 3: Configuration and Metadata Sharing
- **Data Types**: Project configurations, user preferences, feature flags
- **Size**: Small to medium (1-10MB)
- **Access Pattern**: Read-heavy with infrequent updates
- **Optimal Pattern**: Redis with pub/sub notifications
- **Benefits**: Consistent configuration across service ecosystem

### Scenario 4: Large File Processing Coordination
- **Data Types**: File handles, processing queues, completion tracking
- **Size**: Medium structures (1-100MB)
- **Access Pattern**: Producer-consumer with synchronization
- **Optimal Pattern**: Unix sockets with shared memory buffers
- **Benefits**: Efficient large file processing pipeline

## Performance Analysis Matrix

| Communication Method | Latency | Throughput | Complexity | Debug | Network | Best Use Case |
|---------------------|---------|------------|------------|-------|---------|---------------|
| HTTP REST | 5-10ms | Medium | Low | Easy | Yes | External APIs, standard services |
| Unix Sockets | ~1ms | High | Medium | Medium | No | Same-machine RPC calls |
| Shared Memory | ~0.01ms | Ultra-High | High | Hard | No | High-frequency data sharing |
| Redis | ~0.1ms | High | Low | Easy | Yes | Structured shared data |

## Implementation Strategy

### Phase 1: HTTP Foundation (Current)
- Implement all services with HTTP REST APIs
- Establish service boundaries and interfaces
- Build monitoring and debugging infrastructure

### Phase 2: Performance Optimization (Future)
- Profile actual inter-service communication patterns
- Identify bottlenecks and high-frequency communication
- Implement Unix sockets for moderate performance gains

### Phase 3: Ultra-Performance (When Justified)
- Implement shared memory for proven high-frequency use cases
- Establish synchronization patterns and debugging tools
- Monitor memory usage and corruption prevention

## Consequences

### Positive Outcomes
- **Flexibility**: Multiple communication patterns available based on requirements
- **Performance Path**: Clear optimization strategy from simple to ultra-fast
- **Resource Utilization**: Maximize Oracle ARM VM capabilities (24GB RAM, 4 cores)
- **Knowledge Preservation**: Research and patterns documented for future implementation

### Trade-offs Accepted
- **Initial Complexity**: HTTP-first approach may not be optimal long-term
- **Platform Dependencies**: Shared memory patterns limit portability
- **Debugging Complexity**: Advanced patterns harder to troubleshoot
- **Development Overhead**: Multiple communication patterns increase maintenance

### Risk Mitigation
- **Incremental Implementation**: Start simple, optimize when justified
- **Pattern Documentation**: Clear implementation guidelines for each approach
- **Fallback Strategies**: HTTP REST always available as backup
- **Monitoring Integration**: Performance metrics guide optimization decisions

## Related Decisions
- **SAD Section 3.8**: Deployment Architecture supports multi-service VM deployment
- **Future ADR**: Shared memory synchronization patterns and debugging strategies
- **Future ADR**: Service mesh architecture for distributed multi-cloud evolution

## References
- [Node.js net module documentation](https://nodejs.org/api/net.html)
- [SharedArrayBuffer MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
- [Redis Lua scripting](https://redis.io/docs/interact/programmability/lua-api/)
- [Memory-mapped file patterns in Node.js](https://github.com/ozra/mmap-io)
- Oracle Cloud ARM VM specifications and performance characteristics
