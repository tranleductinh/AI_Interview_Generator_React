import React from "react";

const HistoryList = ({ handleOpenDialog, handleDelete, data }) => {
  return (
    <div className="space-y-3">
      {data.length > 0 ? (
        data.map((item) => (
          <div
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition cursor-pointer group"
            
          >
            <div className="flex justify-between gap-4">
              <button onClick={() => handleOpenDialog(item.id)} className="flex-1 text-left hover:opacity-80 transition">
                <div className="flex gap-3 mb-2 items-center">
                  <h3 className="text-foreground font-semibold">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-primary text-xs">
                    {item.level}
                  </span>
                  <span className="bg-secondary px-2 py-1 text-secondary-foreground rounded-full text-xs">
                    {item.language}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Oct 22, 2025, 07:34 PM
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.parts.length} questions
                </p>
              </button>
              <button onClick={() => handleDelete(item.id)} className="group-hover:opacity-100 transition opacity-0 p-2 hover:bg-destructive/10 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-trash2 w-4 h-4 text-destructive "
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No interview sessions found</p>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
