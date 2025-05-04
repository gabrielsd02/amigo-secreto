import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import ListaParticipantes from './index';
import { useListaParticipantes } from "../../state/hook/useListaParticipantes";

jest.mock("../../state/hook/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn()
    }
});

describe('uma lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });

    it('Deve ser renderizada sem elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes/>
        </RecoilRoot>);

        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(0);
    });
});

describe('uma lista preenchida de participantes', () => {
    const participantes = ['Ana', 'João'];
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    });

    it('Deve ser renderizada com elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes/>
        </RecoilRoot>);

        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(participantes.length);
    });
});