import { useEffect } from "react";
import $ from "./cardrain.module.scss";
import Card from "../../molecules/Card/Card";
import { TweenMax, Linear } from "gsap";
import { cx } from "../../../../core/helpers/join-classnames";

interface Props {
  amount: number;
  cards: Record<string, string>[];
}

const CardRain: React.FC<Props> = ({ amount, cards }) => {
  useEffect(() => {
    if (cards.length !== 0) {
      for (let i = amount - 1; i >= 0; i--) {
        const pos = Math.floor(Math.random() * 90 + 1);
        const delay = Math.random();
        const speed = Math.random() * 10 + 5;

        const card: HTMLElement = document.createElement("div"),
          symbol: HTMLImageElement = document.createElement("img"),
          text: HTMLElement = document.createElement("p");

        const item: number = Math.floor(Math.random() * cards.length);
        card.className = $.card;
        text.innerHTML = cards[item].name;
        text.style.color = cards[item].color;
        text.className = cx($.card__text);
        symbol.className = $.card__symbol;
        symbol.src = cards[item].image;
        card.style.left = pos.toString() + "%";

        card.appendChild(symbol);
        card.appendChild(text);

        TweenMax.to(card, speed, {
          y: window.innerHeight,
          rotationY: 360,
          delay: delay,
          repeat: -1,
          ease: Linear.easeNone,
        });

        document.getElementById("cardrain")!.appendChild(card);
      }
    }
  }, [amount, cards]);

  return <section id="cardrain" className={$.cardrain} />;
};

export default CardRain;
