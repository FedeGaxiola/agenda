app.controller('agendaController', function($scope,$ionicPopup,$state,$stateParams,$ionicModal, Nota) {
    $scope.notasGuardadas=[];
    $scope.notaActual={};
    $scope.modificar=false;

    $scope.initNotas = function(){
        $scope.notasGuardadas=[];
        Nota.all().then(function(notas){
            notas.forEach(function(nota){
                nota.check=false;
                $scope.notasGuardadas.push(nota);
            });
        });
    }
    
    $scope.guardarNota = function(){
        var member={};
        member.idNota=null;
        member.FechaCreacion=$scope.notaActual.FechaCreacion;
        member.Contenido=$scope.notaActual.Contenido;
        Nota.add(member).then(function(res){
            $scope.initNotas();
            $scope.modalNota.hide();
        });
    }

    $scope.abrirModal=function(nota){
        if(nota==null)  $scope.modificar=false;
        else $scope.modificar=true;

        if($scope.modificar==false){
            var Fecha = new Date();
            var dd = Fecha.getDate();
            var mm = Fecha.getMonth();

            if(dd<10) dd="0"+dd;
            if(mm<10) mm="0"+mm;

            $scope.notaActual.FechaCreacion=dd+"/"+mm+"/"+Fecha.getFullYear();
            $scope.notaActual.Contenido="";
            $scope.modalNota.show();
        }
    }
    
    //Creación del objeto modal
	$ionicModal.fromTemplateUrl('views/agendaModal.html', function(modal){
		$scope.modalNota = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
    });
});