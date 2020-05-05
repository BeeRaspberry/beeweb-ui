(function(window) {
    window['env'] = window['env'] || {};
  
    // Environment variables
    window['env']['production'] = '${PRODUCTION}';
    window['env']['apiUrl'] = '${API_URL}';
    window['env']['debug'] = '${DEBUG}';
  })(this);