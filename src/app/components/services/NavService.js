(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Home',
        icon: 'home',
        sref: '.dashboard'
      },
        {
            name: 'Queries',
            icon: 'youtube_searched_for',
            sref: '.queries'
        },
      // {
      //   name: 'Trends',
      //   icon: 'trending_up',
      //   sref: '.trends'
      // },
        {
            name: 'Results',
            icon: 'history',
            sref: '.history'
        }
      // {
      //   name: 'Table',
      //   icon: 'view_module',
      //   sref: '.table'
      // },
      //
      // {
      //   name: 'Data Table',
      //   icon: 'view_module',
      //   sref: '.data-table'
      // }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
