(function(){

  angular
    .module('app')
    .controller('ProfileController', [
      ProfileController
    ]);

  function ProfileController() {
    var vm = this;

    vm.user = {
      title: 'Admin',
      email: 'name@ntua.com',
      firstName: '',
      lastName: '' ,
      company: 'NTUA Inc.' ,
      address: 'NTUA str, 4' ,
      city: 'Athens' ,
      state: '' ,
      biography: '',
      postalCode : '12345'
    };
  }

})();
