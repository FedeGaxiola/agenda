app.controller('agendaController', function($scope,$ionicPopup,$state,$stateParams,$ionicModal, Nota) {
    $scope.notasGuardadas=[];
    $scope.notaActual={};
    $scope.modificar=false;
    $scope.btnEliminar=false;

    $scope.initNotas = function(){
        $scope.btnEliminar=false;
        $scope.modificar=false;
        $scope.notasGuardadas=[];
        Nota.all().then(function(notas){
            notas.forEach(function(nota){
                nota.check=false;
                $scope.notasGuardadas.push(nota);
            });
        });
    }
    
    $scope.guardarNota = function(){
        if($scope.modificar==false){
            var member={};
            member.idNota=null;
            member.FechaCreacion=$scope.notaActual.FechaCreacion;
            member.Contenido=$scope.notaActual.Contenido;
            Nota.add(member).then(function(res){
                $scope.initNotas();
                $scope.modalNota.hide();
            });
        } else{
            var member={};
            member.idNota=$scope.notaActual.idNota;
            member.FechaCreacion=$scope.notaActual.FechaCreacion;
            member.Contenido=$scope.notaActual.Contenido;
            Nota.update(member, member).then(function(res){
                $scope.initNotas();
                $scope.modalNota.hide();
            });
        }
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
        } else{
            $scope.notaActual=angular.copy(nota);
            $scope.modalNota.show();
        }
    }

    $scope.validarSeleccion=function(){
        console.log("validando seleccion");
        $scope.btnEliminar=false;

        $scope.notasGuardadas.forEach(function(nota) {
            if(nota.check==true) $scope.btnEliminar=true;
        });

        console.log($scope.btnEliminar);
    }

    $scope.eliminarNotas=function(){
        $ionicPopup.confirm({
            title: '¿Desea eliminar los elementos seleccionados?',
            cancelText: 'Cancelar',
            okText: 'Eliminar',
            okType: 'button-assertive',
            cancelType: 'button-balanced'
        }).then(function(res){
            if(res){
                //Líneas de código para eliminar notas
                console.log("Entre a Eliminar");
                var lista=[];

                $scope.notasGuardadas.forEach(function(nota) {
                    if(nota.check==true) lista.push(nota.idNota);
                });        
                
                lista.forEach(function(idNota){
                    Nota.remove(idNota);
                });

                $scope.initNotas();
            }
        });
    }
    
    //Creación del objeto modal
	$ionicModal.fromTemplateUrl('views/agendaModal.html', function(modal){
		$scope.modalNota = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
    });
});