import { useEffect, useState } from "react";

import { useListaParticipantes } from "../../state/hook/useListaParticipantes";
import { useResultadoSorteio } from "../../state/hook/useResultadoSorteio";

import './estilos.css';
import Card from "../../componentes/Card";

const Sorteio = () => {
    const participantes = useListaParticipantes();
    const resultado = useResultadoSorteio();

    const [participanteAtual, setParticipanteAtual] = useState('');
    const [amigoSecreto, setAmigoSecreto] = useState('');

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if(resultado.has(participanteAtual)) {
            setAmigoSecreto(resultado.get(participanteAtual)!);
        }
    }
    
    useEffect(() => {
        if(amigoSecreto) {
            // após 5 segundos, remove o participante
            setTimeout(() => {
                setAmigoSecreto('');
            }, 5000);
        }
    }, [amigoSecreto])

    return (
        <Card>
            <section className="sorteio">
                <h2>Quem vai tirar o papel?</h2>
                <form onSubmit={sortear}>
                    <select
                        required
                        name="participanteDaVez"
                        id="participanteDaVez"
                        placeholder="Selecione o seu nome"
                        value={participanteAtual}
                        onChange={evento => setParticipanteAtual(evento.target.value)}
                    >
                        <option>Selecione seu nome</option>
                        {participantes.map(participante => (
                            <option key={participante}>
                                {participante}
                            </option>
                        ))}
                    </select>
                    <button className="botao-sortear">
                        Sortear
                    </button>
                </form>
                <p>Clique em sortear para ver quem é seu amigo secreto!</p>
                {amigoSecreto &&  <p className="resultado" role="alert">{amigoSecreto}</p>}
                <footer className="sorteio">
                    <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
                </footer>
            </section>
        </Card>
    )
};

export default Sorteio;