import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../state/hook/useAdicionarParticipante";
import { useMensagemErro } from "../../state/hook/useMensagemErro";

import './estilos.css'

const Formulario = () => {
    const [nome, setNome] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const mensagemErro = useMensagemErro();
    const adicionarNaLista = useAdicionarParticipante();

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        adicionarNaLista(nome);
        setNome('');
        inputRef.current?.focus();
    }

    return (
        <form onSubmit={adicionarParticipante}>
            <div className="grupo-input-btn">
                <input 
                    ref={inputRef}
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    type="text" 
                    placeholder="Insira os nomes dos participantes" 
                />
                <button disabled={!nome}>Adicionar</button>
            </div>
            {mensagemErro && <p role="alert">{mensagemErro}</p>}
        </form>
    )
}

export default Formulario;