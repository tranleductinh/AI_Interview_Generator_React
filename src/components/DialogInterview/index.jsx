import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionsList from "../QuestionList";
import { useLocation } from "react-router-dom";

export function DialogInterview({ open, onOpenChange, data }) {
  const location = useLocation();
  const pathname = location.pathname
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="w-full max-h-[90vh] sm:max-w-2xl p-0 overflow-y-auto"
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="flex justify-between items-center p-4 border-border border-b">
              <div>
                <h2 className="text-xl text-foreground">
                  {data.metadata.jobTitle}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {data.metadata.level} • {data.metadata.language}
                </p>
              </div>
              <DialogClose asChild>
                <button className="p-2 hover:bg-muted rounded-lg transition">
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
                    className="lucide lucide-x w-5 h-5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="p-4">
            <QuestionsList result={data} pathname={pathname} />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DialogInterview;
