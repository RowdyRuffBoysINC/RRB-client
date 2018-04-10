/*
eslint-disable
*/

/**
 *
 * @param {*} text a message to return as text
 * @param {*} level valid options are info, log, warn, error
 */

// Trace function used throughout code to provide helpful logs.
// In this instance its acceptable to have console logs in production
export const trace = (text, level = 'info') => {
  if (typeof text === 'string') text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  switch (level.toLowerCase().trim()) {
    case 'info':
      console.info(now, text);
      break;
    case 'log':
      console.log(now, text);
      break;
    case 'warn':
      console.warn(now, text);
      break;
    case 'error':
      console.error(now, text);
      break;
  }
};

/**
 *
 * @param {*} message
 */
export const error = (message) => {
  trace(message, 'error');
};
