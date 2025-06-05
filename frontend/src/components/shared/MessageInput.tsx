import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddMessage } from "@/hooks/useDatabase";

interface MessageInputFormProps {
  databaseId: number;
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({ databaseId }) => {
  const [messageInput, setMessageInput] = useState("");
  const addMessageMutation = useAddMessage();

  const handleAddMessage = () => {
    if (!messageInput.trim()) return;

    // eslint-disable-next-line no-useless-escape
    const messageRegex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (!messageRegex.test(messageInput) || messageInput.length > 10) {
      return;
    }

    addMessageMutation.mutate(
      { content: messageInput, databaseId },
      {
        onSuccess: () => {
          setMessageInput("");
        },
      }
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="message">Сообщение для записи</Label>
      <div className="flex gap-2">
        <Input
          id="message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Введите сообщение (макс. 10 символов)"
          maxLength={10}
          disabled={addMessageMutation.isPending}
          className="flex-1"
        />
        <Button
          onClick={handleAddMessage}
          disabled={addMessageMutation.isPending}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default MessageInputForm;
