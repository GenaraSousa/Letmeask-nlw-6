import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import Swal from 'sweetalert2';

export function Home(): JSX.Element {

    const history = useHistory();
    const [roomCode, setRoomCode] = useState('');
    const { singInWithGoogle, user } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await singInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            Swal.fire({
                title:"Sala não existe.",
                icon: 'error',
                confirmButtonColor: '#E73F5D'
            });
            return;
        }

        if(roomRef.val().endedAt){
            Swal.fire({
                title:"Sala encerrada.",
                icon: 'error',
                confirmButtonColor: '#E73F5D'
            });
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração sobre perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="letmeAsk, logo da aplicação" />

                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit' >
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}