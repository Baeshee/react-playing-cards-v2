/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import { useEffect } from "react";
import { cx } from "../../../../core/helpers/join-classnames";
import Card from "../../molecules/Card/Card";
import $ from "./CardScrolling.module.scss";
import gsap from "gsap";
import { horizontalLoop } from "../../../../core/hooks/autoScroll";

interface Props {
  cards: Record<string, string>[];
  identifier: string;
  reverse?: boolean;
  speed?: number;
}

const CardScrolling: React.FC<Props> = ({
  cards,
  identifier,
  reverse = false,
  speed = 0.5,
}) => {
  cards = cards.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (cards.length === 0) {
      setTimeout(() => {
        gsap.utils.toArray(`.${identifier}`).forEach((line: any) => {
          const gsapCards = line.querySelectorAll("div"),
            tl = horizontalLoop(gsapCards, {
              speed: speed,
              reversed: reverse,
              repeat: -1,
            });
        });
      }, 1000);
    } else {
      gsap.utils.toArray(`.${identifier}`).forEach((line: any) => {
        const gsapCards = line.querySelectorAll("div"),
          tl = horizontalLoop(gsapCards, {
            speed: speed,
            reversed: reverse,
            repeat: -1,
          });
      });
    }
  }, []);

  return (
    <section className={cx($.flex, "gsap-scroll", identifier)}>
      {cards.map((card: Record<string, string>) => (
        <Card key={card.name} card={card} />
      ))}
    </section>
  );
};

export default CardScrolling;
