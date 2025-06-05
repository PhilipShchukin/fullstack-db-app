import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DatabaseStatsProps {
  totalMessages: number;
  containersCount: number;
}

const DatabaseStats: React.FC<DatabaseStatsProps> = ({
  totalMessages,
  containersCount,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between text-sm">
          <span>
            Общее количество сообщений: <strong>{totalMessages}</strong>
          </span>
          <span>
            Количество контейнеров: <strong>{containersCount || ""}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseStats;
