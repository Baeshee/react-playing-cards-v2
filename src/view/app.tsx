/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { getData } from "../core/services/firebase/handlers";
import $ from "../styles/app.module.scss";
import Card from "./components/molecules/Card/Card";
import CardRain from "./components/organisms/CardRain/CardRain";
import CardScrolling from "./components/organisms/CardScrolling/CardScrolling";
import CardThrow from "./components/organisms/CardThrow/CardThrow";

const App: React.FC = () => {
  const [cards, setCards] = useState<Record<string, string>[]>([]);
  const [page, setPage] = useState<number>(0);

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

  return (
    <article className={$.app}>
      {page !== 0 ? (
        <div className={$.backButton}>
          <Icon
            icon={"ion:arrow-back"}
            width={40}
            height={40}
            color={page === 2 ? "#000" : "#fff"}
            onClick={() => setPage(0)}
          />
        </div>
      ) : null}
      {page === 0 ? (
        <section className={$.flexContainer}>
          <h1>React GSAP Playground</h1>
          <section className={$.optionWrapper}>
            <p className={$.option} onClick={() => setPage(1)}>
              Card Overview
            </p>
            <p className={$.option} onClick={() => setPage(2)}>
              Card Scolling
            </p>
            <p className={$.option} onClick={() => setPage(3)}>
              Card Throw
            </p>
            <p className={$.option} onClick={() => setPage(4)}>
              Card Rain
            </p>
          </section>
        </section>
      ) : page === 2 ? (
        <section className={$.scrollingWrapper}>
          <CardScrolling cards={cards} identifier={"flex"} speed={0.1} />
          <CardScrolling
            cards={cards}
            identifier={"flex-1"}
            speed={0.1}
            reverse={true}
          />
          <CardScrolling cards={cards} identifier={"flex-2"} speed={0.1} />
          <CardScrolling
            cards={cards}
            identifier={"flex-3"}
            reverse={true}
            speed={0.1}
          />
        </section>
      ) : page === 1 ? (
        <section className={$.grid}>
          {cards.map((card: Record<string, string>) => (
            <Card key={card.name} card={card} />
          ))}
        </section>
      ) : page === 3 ? (
        <CardThrow cards={cards} />
      ) : page === 4 ? (
        <CardRain cards={cards} amount={50} />
      ) : null}
    </article>
  );
};

export default App;
