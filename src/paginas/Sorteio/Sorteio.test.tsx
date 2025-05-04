import { 
    render, 
    screen,
    fireEvent
} from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { useListaParticipantes } from "../../state/hook/useListaParticipantes";
import { useResultadoSorteio } from "../../state/hook/useResultadoSorteio";
import Sorteio from ".";

jest.mock("../../state/hook/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn()
    }
});

jest.mock("../../state/hook/useResultadoSorteio", () => {
    return {
        useResultadoSorteio: jest.fn()
    }
});

describe('página do sorteio', () => {
    const participantes = [
        'Ana',
        'Matheus',
        'Clara'
    ];
    const resultado = new Map([
        ['Ana', 'João'],
        ['João', 'Clara'],
        ['Clara', 'Ana']
    ]);

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
    });
        
    it('Deve exibir o amigo secreto para todos os participantes', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>);

        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length + 1);
    });

    it('Deve exibir o amigo secreto quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const select = screen.getByPlaceholderText('Selecione o seu nome');
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        });

        const botao = screen.getByRole('button');
        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole('alert');
        expect(amigoSecreto).toBeInTheDocument();
    });
})
