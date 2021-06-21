import Head from "next/head";
import { useEffect } from "react";
import { mergeMap } from "rxjs/operators";
import Header from "../components/Header";
import { fromFetch } from "rxjs/fetch";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: Date;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  // useEffect(() => {
  //   fromFetch("http://localhost:5000/episodes")
  //     .pipe(mergeMap((res) => res.json()))
  //     .subscribe((eps) => console.log(eps));
  // }, []);

  console.log(props.episodes);

  return (
    <div>
      <h1>INdex</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    // params: {
    //   _limit: 12,
    //   _sort: "published_at",
    //   _order: "desc",
    // },
  });

  const eps = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  return {
    props: {
      episodes: eps,
    },

    revalidate: 60 * 60 * 8,
  };
};
