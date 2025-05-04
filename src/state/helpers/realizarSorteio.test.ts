import { realizarSorteio } from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {
    it('Deve não permitir o participante não sortear seu próprio nome', () => {
        const participantes = ['Ana', 'Cleber', 'João', 'Pedro', 'Gabriel', 'Julia'];
        const sorteio = realizarSorteio(participantes);

        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante);
            expect(amigoSecreto).not.toEqual(participante);
        });
    });
});