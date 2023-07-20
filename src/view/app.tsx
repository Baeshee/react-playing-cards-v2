import { useEffect, useState } from "react";
import $ from "../styles/app.module.scss";
import { getData } from "../core/services/firebase/handlers";
import Card from "./components/molecules/Card/Card";
import gsap from "gsap";
import { horizontalLoop } from "../core/hooks/autoScroll";

const App: React.FC = () => {
  const [cards, setCards] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const res = await getData("cards");

      setCards(res);
      sessionStorage.setItem("cards", JSON.stringify(res));
    };

    if (!sessionStorage.getItem("cards")) {
      getCards();
    } else {
      setCards(JSON.parse(sessionStorage.getItem("cards") ?? "{}"));
    }
  }, []);

  // GSAP (Not working)
  // useEffect(() => {
  //   gsap.utils.toArray(`.scrolling`).forEach((line: any) => {
  //     const gsapCards = line.querySelectorAll("div"),
  //       tl = horizontalLoop(gsapCards, {
  //         speed: 1,
  //         reversed: false,
  //         repeat: -1,
  //       });
  //   });
  // }, [cards]);

  return (
    <article className={$.app}>
      <section>
        <section className={$.scrolling}>
          {cards.map((card: Record<string, string>, index) => (
            <Card key={index} card={card} />
          ))}
        </section>
      </section>
    </article>
  );
};

export default App;
