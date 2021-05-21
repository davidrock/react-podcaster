import Head from "next/head";
import { useEffect } from "react";
import { mergeMap } from "rxjs/operators";
import Header from "../components/Header";
import { fromFetch } from "rxjs/fetch";

export default function Home(props) {
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

export async function getStaticProps() {
  const response = await fetch("http://localhost:5000/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },

    revalidate: 60 * 60 * 8,
  };
}
