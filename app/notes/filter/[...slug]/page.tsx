import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HOME_PAGE,
  OG_IMAGE,
  OG_DESCRIPTION,
  SITE_NAME,
} from "@/config/metaData";
import type { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const tag = slug?.[0] === "All" ? "" : slug?.[0];
  const title = `${SITE_NAME} | ${
    tag ? `Notes filtered by ${tag}` : "All notes"
  }`;

  return {
    title,
    description: OG_DESCRIPTION,
    openGraph: {
      title,
      description: OG_DESCRIPTION,
      url: `${HOME_PAGE}/notes/filter/${tag || "All"}`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "article",
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = params;
  const tag = slug?.[0] === "All" ? "" : slug?.[0];

  const queryClient = new QueryClient();
  const search = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        ...(tag ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
