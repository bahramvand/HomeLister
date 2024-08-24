import { useLoaderData } from 'react-router-dom';

export default function ListOfCards() {
  const cards = useLoaderData();
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>{card.address}</li>
      ))}
    </ul>
  );
}
