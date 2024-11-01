import { useEffect, useState } from 'react';
import IBoard from '../../interfaces/IBoard';
import axiosInstance from '../../services/axios-interceptor.service';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export default function Board() {
  const [board, setBoard] = useState<IBoard>();
  const { boardId } = useParams();

  useEffect(() => {

    axiosInstance
      .get<IBoard>(`/boards/columns/${boardId}`)
      .then((response: AxiosResponse<IBoard>) => {
        setBoard(response.data);
      });
  }, []);

  return (
    <>
      <p>{JSON.stringify(board)}</p>
    </>
  );
}
