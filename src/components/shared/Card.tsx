import { postCardType } from "@/types/card.type";

type CardProps = {
  card: postCardType;
};

export const Card = ({ card }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{card.title}</h2>
      </div>
      <div className="card-content">
        <p>{card.body}</p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>User ID: {card.userId}</span>
          <span className="ml-4">ID: {card.id}</span>
        </div>
      </div>
    </div>
  );
};

