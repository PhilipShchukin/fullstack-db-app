import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMessages } from "@/hooks/useDatabase";

interface MessagesTableProps {
  databaseId: number;
}

const MessagesTable: React.FC<MessagesTableProps> = ({ databaseId }) => {
  const { data: messagesData, isLoading: isLoadingMessages } =
    useMessages(databaseId);

  if (isLoadingMessages) {
    return <div className="text-center py-4">Загрузка данных...</div>;
  }

  if (!messagesData || messagesData.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Сообщения</TableHead>
          <TableHead className="text-center">Контейнеры</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messagesData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.content}</TableCell>
            <TableCell>{row.containerId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MessagesTable;
