import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSearchMessage } from "@/hooks/useDatabase";

interface MessageSearchFormProps {
  databaseId: number;
}

const MessageSearchForm: React.FC<MessageSearchFormProps> = ({
  databaseId,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const searchMessageMutation = useSearchMessage();

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    searchMessageMutation.mutate({ content: searchInput, databaseId });
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="search">Поиск сообщения</Label>
        <div className="flex gap-2">
          <Input
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Введите сообщение для поиска"
            disabled={searchMessageMutation.isPending}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={searchMessageMutation.isPending}
          >
            Найти
          </Button>
        </div>
      </div>

      {searchMessageMutation.data && (
        <div className="bg-emerald-200 text-left p-4 rounded-lg">
          <div>
            Сообщение{" "}
            <strong className="text-2xl">
              {searchMessageMutation.data?.message}
            </strong>{" "}
            в контейнере
            <strong className="text-xl pl-2">
              {searchMessageMutation.data?.containerId}
            </strong>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageSearchForm;
