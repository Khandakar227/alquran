import ReactLogger from 'react-terminal-logger/console-logger'

export const log = (...args) => {
  ReactLogger.config({
      visible : ["log", "error", "info", "warn", "logr"]
});
ReactLogger.start();
logr(...args)
}
