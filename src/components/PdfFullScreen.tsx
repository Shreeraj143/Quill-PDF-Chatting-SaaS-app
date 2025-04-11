import { Expand, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import { Document, Page } from "react-pdf";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";
import { DialogTitle } from "@radix-ui/react-dialog";

interface PdfFullscreenProps {
  fileUrl: string;
  fileName: string;
}

const PdfFullscreen = ({ fileUrl, fileName }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width, ref } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) setIsOpen(visible);
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant={"ghost"} className="gap-1.5" aria-label="fullscreen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-sm sm:w-xl md:w-3xl lg:w-4xl xl:w-7xl !max-w-none p-6">
        <DialogTitle>{fileName}</DialogTitle>
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref} className="w-full max-w-[1200px] px-4 sm:px-8 mx-auto">
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() =>
                toast.error("Error loading PDF", {
                  description: "Please try again later",
                })
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, index) => (
                <Page
                  key={index}
                  width={width ? Math.min(width, 1200) : 800}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
