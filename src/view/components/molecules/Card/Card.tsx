import { useEffect, useState } from "react";
import $ from "./card.module.scss";
import { Icon } from "@iconify/react";

interface Props {
  card: Record<string, string>;
}

const Card: React.FC<Props> = ({ card }) => {
  const [iconSize, setIconSize] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    if (window.innerWidth >= 800) {
      setIconSize(30);
      setImageHeight(80);
    } else if (window.innerWidth <= 799) {
      setIconSize(20);
      setImageHeight(50);
    }
  }, []);

  return (
    <div className={$.card}>
      <section className={$.card__upper}>
        <p className={$.text}>{card.letter}</p>
        <Icon icon={card.icon} width={iconSize} height={iconSize} />
      </section>
      <section className={$.card__middle}>
        <p className={$.card__middle__before} style={{ color: card.color }}>
          {card.content}
        </p>
        <p className={$.card__middle__after} style={{ color: card.color }}>
          {card.content}
        </p>
        <img
          src={`${card.image}`}
          alt="svg"
          height={imageHeight}
          width="auto"
        />
        <h2 style={{ color: card.color }}>{card.name}</h2>
      </section>
      <section className={$.card__bottom}>
        <p className={$.text}>{card.letter}</p>
        <Icon icon={card.icon} width={iconSize} height={iconSize} />
      </section>
    </div>
  );
};

export default Card;
