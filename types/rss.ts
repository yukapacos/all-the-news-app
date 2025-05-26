import { ReactElement } from "react";

export type FeedItem =
  | { label: string; url: string; icon: ReactElement }
  | { label: string; urls: string[]; icon: ReactElement };
