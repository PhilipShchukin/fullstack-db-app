import React from "react";

interface SearchResultData {
  message?: string;
  containerId?: number;
}

interface SearchResultProps {
  result: SearchResultData | undefined;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-emerald-200 text-left p-4 rounded-lg">
      <div>
        Сообщение <strong className="text-2xl">{result.message || ""}</strong> в
        контейнере
        <strong className="text-xl pl-2">{result.containerId || ""}</strong>
      </div>
    </div>
  );
};

export default SearchResult;
