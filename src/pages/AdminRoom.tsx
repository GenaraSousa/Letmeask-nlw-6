
import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import likeImg from '../assets/images/like.svg';
import emptyQuestonsImg from '../assets/images/empty-questions.svg';
import Swal from 'sweetalert2';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            andedAt: new Date(),
        });
        history.push('/');
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighliteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    async function handleDeleteQuestion(questionId: string) {
        const result = await Swal.fire({
            title: 'Excluir pergunta',
            text: "Tem certeza que quer excluir essa pergunta?",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#E73F5D',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'

        })
        if (result.isConfirmed) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button isOutlined onClick={() => handleEndRoom()} >Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

                </div>
                <div className="question-list">

                    {questions.length > 0 ? (
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    <div className="total-likes">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span> {question.likeCount}</span>
                                    </div>

                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleHighliteQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque a pergunta" />
                                            </button>
                                        </>)
                                    }
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                            )
                        })
                    ) : (
                        <div className="empty-questions">
                            <img src={emptyQuestonsImg} alt="Ilustração simbolizando não ter perguntas na sala" />
                            <h3>Nenhuma pergunta por aqui...</h3>
                            <div>
                                <span>Envie o código dessa sala para seus amigos e </span>
                                <span> comece responder perguntas!</span>
                            </div>
                        </div>
                    )}
                </div>


            </main>


        </div>
    )
}