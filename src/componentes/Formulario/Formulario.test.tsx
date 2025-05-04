import { 
    act, 
    fireEvent, 
    render, 
    screen 
} from "@testing-library/react";
import { RecoilRoot } from "recoil";

import Formulario from ".";

describe('Comportamento do Formulário', () => {
    it('Deve retornar erro quando input estiver vazio, assim, novos participantes não podem ser adicionados', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        expect(input).toBeInTheDocument();
        expect(botao).toBeInTheDocument();
        expect(botao).toBeDisabled();
    });
    
    it('Deve adicionar um participante caso exista um nome preenchido', () => {    
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
    
        expect(input).toHaveFocus();
        expect(input).toHaveValue("");
    });
    
    it('Deve retornar erro ao ter nomes duplicados na lista', () => {    
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
    
        const mensagemErro = screen.getByRole('alert');
        expect(mensagemErro.textContent).toBe("Nomes duplicados não são permitidos!");
    });
    
    it('Deve sumir com a mensagem de erro após os timers', () => {    
        jest.useFakeTimers();
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
        let mensagemErro = screen.queryByRole('alert');
    
        expect(mensagemErro).toBeInTheDocument();
    
        // quando existem updates no estado a serem feitos durante os testes
        // eles precisam estar dentro da função act
        act(() => {
            jest.runAllTimers();
        });
    
        mensagemErro = screen.queryByRole('alert');
        expect(mensagemErro).toBeNull();
    });
});

// Diferença entre getByRole e queryByRole
// os 2 consultam uma role, porem o get irá retornar erro no teste caso não encontrar
// já o query, não irá retornar erro no teste e irá prosseguir com o teste