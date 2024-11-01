import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axiosInstance from '../../services/axios-interceptor.service';

export default function Home() {
  const [boards, setBoards] = useState();

  useEffect(() => {
    axiosInstance.get('/boards').then((response) => {
      setBoards(response.data);
    });
  }, []);

  return (
    <div className={styles['container']}>
      <p>{JSON.stringify(boards)}</p>
    </div>
  );
}
