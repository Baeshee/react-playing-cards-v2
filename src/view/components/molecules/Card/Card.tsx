import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { cx } from "../../../../core/helpers/join-classnames";
import $ from "./card.module.scss";

interface Props {
  card: Record<string, string>;
  extra?: string;
  identifier?: number;
}

const Card: React.FC<Props> = ({ card, extra, identifier }) => {
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
    <div
      id={identifier ? identifier.toString() : ""}
      className={cx($.card, "card", extra ? extra : null)}
    >
      <section className={$.card__upper}>
        <p className={$.text}>{card.letter}</p>
        <Icon
          icon={card.icon}
          width={iconSize}
          height={iconSize}
          color={card.color}
        />
      </section>
      <section className={$.card__middle}>
        <p className={$.card__middle__before} style={{ color: card.color }}>
          {card.content}
        </p>
        <p className={$.card__middle__after} style={{ color: card.color }}>
          {card.content}
        </p>
        <img
          className={$.image}
          src={`${card.image}`}
          alt="svg"
          height={imageHeight}
          width="auto"
        />
        <h2 style={{ color: card.color }}>{card.name}</h2>
      </section>
      <section className={$.card__bottom}>
        <p className={$.text}>{card.letter}</p>
        <Icon
          icon={card.icon}
          width={iconSize}
          height={iconSize}
          color={card.color}
        />
      </section>
    </div>
  );
};

export default Card;
