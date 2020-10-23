import {createRef} from '../ref';

interface Log {
  (...data: unknown[]): void;
}

interface LogException {
  (message?: string, ...optionalParams: unknown[]): void;
}

interface LogUtility {
  log: Log;
  info: Log;
  error: Log;
  debug: Log;
  exception: LogException;
}

interface Logger extends LogUtility {
  name: string;
}

class LoggerMap extends Map<string, Logger> {
  get(key: string) {
    let logger = super.get(key);
    if (!logger) {
      logger = createLogger(key);
      this.set(key, logger);
    }
    return logger;
  }
}

function createLogger(name: string, logObject: LogUtility = console): Logger {
  const {log, info, error, debug, exception} = logObject;
  return {
    name,
    log,
    info,
    error,
    debug,
    exception,
  };
}

function createLoggerMap(): LoggerMap {
  return new LoggerMap();
}

const logMapRef = createRef<LoggerMap>();

function resolveLogMap() {
  if (!logMapRef.current) {
    logMapRef.current = createLoggerMap();
  }
  return logMapRef.current;
}

function resolveKey(key?: string) {
  const mainKey = '__main';
  return key || mainKey;
}

export function getLogger(key?: string): LogUtility {
  key = resolveKey(key);

  const logMap = resolveLogMap();
  return logMap.get(key);
}
