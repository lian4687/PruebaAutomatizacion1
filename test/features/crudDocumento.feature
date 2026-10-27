Feature: Ciclo de un documento

  Background:
    Given el usuario ha iniciado sesión y se encuentra en el dashboard
    #When el usuario crea un nuevo documento con los datos obligatorios
    
  @crear                        
  Scenario: Creación de un nuevo documento manualmente
   When el usuario crea un nuevo documento con los datos obligatorios   
   Then valido creacion del documento

  @leer
  Scenario: Leer un documento
    Given el usuario crea un nuevo documento con los datos obligatorios 
    When Filtro por rut
    Then Valido el detalle         

  @editar
  Scenario: Editar un documento
  Given el usuario crea un nuevo documento con los datos obligatorios
  When el usuario edita un documento
  Then el usuario valida la edicion del documento

  @eliminar
  Scenario:Eliminar un documento
  Given el usuario crea un nuevo documento con los datos obligatorios
  When el usuario elimina un documento
  Then el usuario valida la eliminacion del documento
