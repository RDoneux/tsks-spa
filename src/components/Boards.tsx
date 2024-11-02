import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../services/axios-interceptor.service';
import IBoard from '../interfaces/IBoard';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns/format';
import toast from 'react-hot-toast';
import anime from 'animejs';
import Modal from './Modal';

export default function Boards() {
  const [boards, setBoards] = useState<IBoard[]>();
  const [modalOpen, setModalOpen] = useState<string>('');

  useEffect(() => {
    updateBoards();
  }, []);

  useEffect(() => {
    anime({
      targets: '#modal',
      opacity: modalOpen ? 1 : 0,
      translateY: modalOpen ? [-100, 0] : [0, -100],
      duration: 200,
      easing: 'easeInOutQuad'
    });
  }, [modalOpen]);

  function updateBoards() {
    axiosInstance
      .get<IBoard[]>('/boards')
      .then((response: AxiosResponse<IBoard[]>) => {
        setBoards(response.data);
      });
  }

  async function deleteBoard(id: string) {
    setModalOpen('');

    await toast.promise(axiosInstance.delete(`/boards/${id}`), {
      loading: 'Deleting board...',
      success: 'Successfully deleted board',
      error: (error) =>
        toast.error(`There was an error deleting the board: ${error.message}`)
    });

    updateBoards();
  }

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-6xl uppercase">Boards</h1>
        <ul className="mt-10 grid gap-5">
          {boards?.map((board: IBoard) => (
            <li
              className="flex gap-10 transition-all hover:bg-neutral-900 rounded px-2 py-1"
              key={board.id}
            >
              <NavLink
                to={`/board/${board.id}`}
                className="w-full grid grid-cols-[auto_1fr_1fr_100px_250px] gap-8"
              >
                <img width={30} src="/logo.svg" />
                <h2>{board.boardName}</h2>
                <h3 className="col-start-4 justify-self-start">
                  {board.columnCount} column{board.columnCount !== 1 ? 's' : ''}
                </h3>
                <h3 className="justify-self-end">
                  {format(
                    new Date(board.updatedAt),
                    'h:mm:ss a | eee do MMM yyyy'
                  )}
                </h3>
              </NavLink>

              <span
                className="text-[20px] leading-[25px] transition-all hover:text-red-400 material-symbols-outlined cursor-pointer"
                onClick={() => setModalOpen(board.id)}
              >
                delete
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        onConfirm={() => deleteBoard(modalOpen)}
        onCancel={() => setModalOpen('')}
        title="Are you sure?"
        description="The board will not be recoverable if you delete it now."
      />
    </>
  );
}
