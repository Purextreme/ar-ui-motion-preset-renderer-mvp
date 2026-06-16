import type { ReactNode } from "react";

type EditorLayoutProps = {
  left: ReactNode;
  center: ReactNode;
  bottom: ReactNode;
};

export function EditorLayout({ left, center, bottom }: EditorLayoutProps) {
  return (
    <div className="editor-layout">
      {left}
      {center}
      {bottom}
    </div>
  );
}
