import { PropsWithChildren, useState } from 'react';
import axiosInstance from '../services/axios-interceptor.service';
import IColumn from '../interfaces/IColumn';
import { useDroppable } from '@dnd-kit/core';

interface ColummProps {
  column: IColumn;
}

export default function Column({
  column,
  children
}: PropsWithChildren<ColummProps>) {
  const [columnName, setColumnName] = useState<string>(column.columnName);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id
  });

  const style = {
    backgroundColor: isOver ? '#333' : undefined
  };

  function updateColumnName(columnName: string) {
    setColumnName(columnName);
    axiosInstance.put(`columns/${column.id}`, {
      columnName
    });
  }

  return (
    <section
      ref={setNodeRef}
      style={style}
      className="w-full flex flex-col gap-6 bg-neutral-700 rounded p-2"
    >
      <input
        className="text-2xl bg-transparent focus-within:outline-none"
        value={columnName}
        onChange={(e) => updateColumnName(e.target.value)}
      />
      {children}
    </section>
  );
}
