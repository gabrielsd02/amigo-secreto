import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../../state/hook/useListaParticipantes";
import Rodape from ".";

jest.mock("../../state/hook/useListaParticipantes", () => {
    return {
        useListaParticipantes: jest.fn()
    }
});

const mockSorteio = jest.fn();
const mockNavegacao = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
});

jest.mock('../../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
});

describe('quando não existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });
    
    it('Deve não iniciar a brincadeira', () => {
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>);

        const botao = screen.getByRole('button');
        expect(botao).toBeDisabled();
    });
});

describe('quando existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(['Ana', 'João', 'Pedro']);
    });

    it('Deve verificar se pode iniciar a brincadeira', () => {
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>);

        const botao = screen.getByRole('button');
        expect(botao).not.toBeDisabled();
    });

    it('Deve iniciar a brincadeira', () => {
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>);

        const botao = screen.getByRole('button');
        fireEvent.click(botao);

        expect(mockNavegacao).toHaveBeenCalled();
        expect(mockNavegacao).toHaveBeenCalledTimes(1);
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
        expect(mockSorteio).toHaveBeenCalledTimes(1);
    });
});