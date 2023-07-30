import gsap, { Power2 } from "gsap";
import { useEffect } from "react";
import { cx } from "../../../../core/helpers/join-classnames";
import $ from "./cardthrow.module.scss";

interface Props {
  cards: Record<string, string>[];
}

const CardThrow: React.FC<Props> = ({ cards }) => {
  let container: HTMLElement | null;
  let pulled = 0;
  let count = 1;
  const cardWidth = 100,
    cardHeight = 150;

  useEffect(() => {
    container = document.getElementById(`container`);
    if (cards.length !== 0) {
      init();

      window.addEventListener("click", () => {
        pull();
      });
    }
  }, [cards]);

  const init = () => {
    if (pulled < 3) {
      pull();

      setTimeout(() => {
        init();
      }, 1000);

      pulled++;
      console.log(pulled);
    }
  };

  const pull = () => {
    const tl: gsap.core.Timeline = gsap.timeline(),
      position: Record<string, number> = getContainerCenter(),
      card: HTMLElement = addCard();

    count++;

    gsap.set(card, {
      y: -container!.offsetHeight,
      x: container!.offsetWidth / 2,
      zIndex: count,
    });
    const offsetX: number = container!.offsetWidth * 0.5,
      offsetY: number = container!.offsetHeight * 0.5;
    tl.addLabel("start")
      .to(
        card,
        {
          duration: 1.5,
          ease: Power2.easeOut,
          x: position.x + getRandom(-offsetX, offsetX),
          y: position.y + getRandom(-offsetY, offsetY),
        },
        "start"
      )
      .to(
        card,
        {
          duration: 1.4,
          ease: Power2.easeOut,
          rotation: getRandom(360),
        },
        "start"
      );
  };

  const addCard = () => {
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

    card.appendChild(symbol);
    card.appendChild(text);
    container!.appendChild(card);

    return card;
  };

  const getRandom = (min: number, max: number | null = null) => {
    const realMax = max === null ? min * 2 : max;
    return min + Math.random() * (realMax - min);
  };

  const getContainerCenter = () => {
    return {
      x: container!.offsetLeft + container!.offsetWidth / 2 - cardWidth / 2,
      y: container!.offsetTop + container!.offsetHeight / 2 - cardHeight / 2,
    };
  };

  return (
    <section className={$.wrapper}>
      <p className={$.title}>Click to throw a new card</p>
      <section id="container" className={$.container} />
    </section>
  );
};

export default CardThrow;
