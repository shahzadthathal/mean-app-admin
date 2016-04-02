
clientApp.service('MetaService', function() {
       var title = 'Web Shop';
       var metaDescription = '';
       var metaKeywords = '';
       return {
          set: function(newTitle, newMetaDescription, newKeywords) {
              metaKeywords = newKeywords;
              metaDescription = newMetaDescription;
              title = newTitle; 
          },
          metaTitle: function(){ return title; } ,
          metaDescription: function() { return metaDescription; },
          metaKeywords: function() { return metaKeywords; }
       }
    });