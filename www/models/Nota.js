app.factory('Nota', function($cordovaSQLite, DBA) {
    var self = this;
  
    self.all = function() {
      return DBA.query("SELECT * FROM notas ORDER BY idNota desc")
        .then(function(result){
          return DBA.getAll(result);
        });
    }
  
    self.get = function(memberId) {
      var parameters = [memberId];
      return DBA.query("SELECT * FROM notas WHERE idNota = (?)", parameters)
        .then(function(result) {
          return DBA.getById(result);
        });
    }
  
    self.add = function(member) {
      var parameters = [member.idNota,member.FechaCreacion,member.Contenido];
      return DBA.query("INSERT INTO notas (idNota,FechaCreacion,Contenido) VALUES (?,?,?)", parameters);
    }
  
    self.remove = function(member) {
      console.log("Eliminando de db");
      console.log(member);
      var parameters = [member];
      return DBA.query("DELETE FROM notas WHERE idNota = (?)", parameters);
    }

    self.removeMany = function(lista) {
      console.log("Eliminando de db");
      
      //var parameters = [lista];
     var parameters = lista;
      console.log(parameters);
      return DBA.query("DELETE FROM notas WHERE idNota IN (?)", parameters);
    }
  
    self.update = function(origMember, editMember) {
      var parameters = [editMember.FechaCreacion,editMember.Contenido, editMember.idNota];
      return DBA.query("UPDATE notas SET FechaCreacion = (?), Contenido = (?) WHERE idNota = (?)", parameters);
    }
  
    return self;
  });