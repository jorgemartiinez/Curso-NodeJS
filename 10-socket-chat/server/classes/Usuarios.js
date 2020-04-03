class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        const persona = { id, nombre, sala };
        this.personas.push(persona);
        console.log('Añadimos la persona', persona, 'a', this.personas);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.find(persona => persona.id == id);
        console.log(this.personas);
        console.log('Get persona', persona, 'con id', id);
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasPorSala = this.personas.filter(persona => persona.sala === sala);
        console.log('sala', sala, 'personas por sala', personasPorSala);
        return personasPorSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id); // hacemos una referencia a la persona que vamos a borrar, ya que la perderemos del array después
        this.personas = this.personas.filter(persona => persona.id !== id);
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
};