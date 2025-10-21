// ============================================================================
// PRODUCTION-READY LOGGER SERVICE
// ============================================================================
// Purpose: Replace all console.log/error with structured logging
// Features: Environment-aware, typed, extensible for Sentry/DataDog integration
// ============================================================================

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

interface LogContext {
  [key: string]: any
  userId?: string
  requestId?: string
  component?: string
  action?: string
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
}

class Logger {
  private isDevelopment: boolean
  private isTest: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.isTest = process.env.NODE_ENV === 'test'
  }

  /**
   * Format log entry for structured logging
   */
  private formatLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }

    return entry
  }

  /**
   * Send log to external service (Sentry, DataDog, etc.)
   */
  private async sendToExternalService(entry: LogEntry): Promise<void> {
    // In production, send to your logging service
    // Example: Sentry, DataDog, LogRocket, etc.
    if (!this.isDevelopment && !this.isTest) {
      try {
        // Uncomment and configure when ready
        // await fetch(process.env.LOGGING_ENDPOINT, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry)
        // })
      } catch (error) {
        // Fallback to console if external service fails
        console.error('Failed to send log to external service:', error)
      }
    }
  }

  /**
   * Debug level logging (verbose, only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      const entry = this.formatLogEntry('debug', message, context)
      console.debug(`[DEBUG] ${message}`, context)
    }
  }

  /**
   * Info level logging (general information)
   */
  info(message: string, context?: LogContext): void {
    const entry = this.formatLogEntry('info', message, context)
    
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context)
    } else {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Warning level logging (potential issues)
   */
  warn(message: string, context?: LogContext): void {
    const entry = this.formatLogEntry('warn', message, context)
    
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context)
    } else {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Error level logging (errors that don't crash the app)
   */
  error(message: string, error?: Error, context?: LogContext): void {
    // Suppress expected Supabase errors in development
    if (this.isDevelopment && error && 'code' in error) {
      const supabaseError = error as any
      // PGRST116 = Row not found (expected when user hasn't created profile)
      // PGRST301 = Ambiguous reference (expected in some queries)
      if (['PGRST116', 'PGRST301'].includes(supabaseError.code)) {
        return
      }
    }
    
    const entry = this.formatLogEntry('error', message, context, error)
    
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, context)
    } else {
      this.sendToExternalService(entry)
      
      // Send to error tracking service (e.g., Sentry)
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          tags: { component: context?.component, action: context?.action },
          extra: context
        })
      }
    }
  }

  /**
   * Fatal level logging (critical errors that may crash the app)
   */
  fatal(message: string, error: Error, context?: LogContext): void {
    const entry = this.formatLogEntry('fatal', message, context, error)
    
    if (this.isDevelopment) {
      console.error(`[FATAL] ${message}`, error, context)
    } else {
      this.sendToExternalService(entry)
      
      // Always send fatal errors to tracking service
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          level: 'fatal',
          tags: { component: context?.component, action: context?.action },
          extra: context
        })
      }
    }
  }

  /**
   * API request logging
   */
  apiRequest(method: string, url: string, context?: LogContext): void {
    this.info(`API Request: ${method} ${url}`, {
      ...context,
      component: 'API',
      action: 'REQUEST'
    })
  }

  /**
   * API response logging
   */
  apiResponse(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const message = `API Response: ${method} ${url} - ${statusCode} (${duration}ms)`
    const logContext = {
      ...context,
      component: 'API',
      action: 'RESPONSE',
      statusCode,
      duration
    }
    
    if (statusCode >= 500) {
      this.error(message, undefined, logContext)
    } else if (statusCode >= 400) {
      this.warn(message, logContext)
    } else {
      this.info(message, logContext)
    }
  }

  /**
   * Database query logging
   */
  dbQuery(query: string, duration: number, context?: LogContext): void {
    this.debug(`Database Query (${duration}ms)`, {
      ...context,
      component: 'DATABASE',
      action: 'QUERY',
      query: query.substring(0, 200), // Truncate long queries
      duration
    })
  }

  /**
   * User action logging (for analytics and debugging)
   */
  userAction(action: string, userId: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      userId,
      component: 'USER',
      action
    })
  }
}

// Export singleton instance
export const logger = new Logger()

// Export types for use in other files
export type { LogLevel, LogContext, LogEntry }
