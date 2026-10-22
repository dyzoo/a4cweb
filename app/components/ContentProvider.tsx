"use client";

import { createContext, useContext, ReactNode } from "react";
import { defaultContent, type SiteContent } from "@/lib/defaultContent";

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
