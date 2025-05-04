import { atom } from "recoil";

const listaParticipantesState = atom<string[]>({
    key: 'listaParticipantesState',
    default: []
});

export const resultadoAmigoSecreto = atom<Map<string, string>>({
    key: 'resultadoAmigoSecreto',
    default: new Map()
});

const erroState = atom<string>({
    key: 'erroState',
    default: ''
});

export { listaParticipantesState, erroState };