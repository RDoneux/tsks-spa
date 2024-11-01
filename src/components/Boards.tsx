import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../services/axios-interceptor.service';
import IBoard from '../interfaces/IBoard';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns/format';

export default function Boards() {
  const [boards, setBoards] = useState<IBoard[]>();

  useEffect(() => {
    axiosInstance
      .get<IBoard[]>('/boards')
      .then((response: AxiosResponse<IBoard[]>) => {
        setBoards(response.data);
      });
  }, []);

  return (
    <div className="w-full p-8">
      <h1 className="text-6xl uppercase">Boards</h1>
      <ul className="mt-10 grid gap-5">
        {boards?.map((board: IBoard) => (
          <li
            className="transition-all hover:bg-neutral-900 rounded px-2 py-1"
            key={board.id}
          >
            <NavLink
              to={`/board/${board.id}`}
              className="grid grid-cols-[auto_1fr_1fr_100px_250px] gap-8"
            >
              <img width={30} src="/logo.svg"></img>
              <h2>{board.boardName}</h2>
              <h3 className="col-start-4 justify-self-start">
                {board.columnCount} column{board.columnCount !== 1 ? 's' : ''}
              </h3>
              <h3 className="justify-self-end">
                {format(new Date(board.updatedAt), 'h:m:s a | eee do MMM yyyy')}
              </h3>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
