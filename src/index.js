import Build from './util/Build';

// Block React Dev Tools when in Production
if ( Build.isProduction === true ){
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
  }
}

// Load Main app
const start = () => {
  var main = require('./components/Main');
  main.default();
};

start();
