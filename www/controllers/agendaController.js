app.controller('agendaController', function($scope,$ionicPopup,$state,$stateParams,$ionicModal) {
	//Creación del objeto modal
	$ionicModal.fromTemplateUrl('views/agendaModal.html', function(modal){
		$scope.modalNota = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
    });
});