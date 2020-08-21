class Usuarios {
  constructor() {
    //inicializa a las personas que estan conectadas al chat
    this.personas = [];
  }
  //Agrega a la persona al chat
  agregarPersona(id, nombre,sala) {
    let persona = { id, nombre,sala };
    this.personas.push(persona);
    return this.personas;
  }
  //Encuentra a persona por id
  getPersona(id) {
    let persona = this.personas.filter((persona) => persona.id === id)[0];
    return persona;
  }
  //obtiene todas las persoas
  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala) {
    let personasEnSala = this.personas.filter(persona=> persona.sala === sala)
    return personasEnSala
  }

  deletePersona(id) {
    //Para no perder la referencia al borrar
    let personaBorrada = this.getPersona(id);
    //Para borrar a la persona
    this.personas = this.personas.filter((persona) => persona.id != id);
    //Retorna a la persona que fue borrada
    return personaBorrada;
  }
}

module.exports = {
  Usuarios,
};
