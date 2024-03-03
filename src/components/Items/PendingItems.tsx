import PendingItem from "@components/Items/PendingItem";
import { ReactNode } from "react";

function PendingItems() {
  const arrayOfPending: ReactNode[] = [];
  for (let i = 0; i < 50; i++) {
    arrayOfPending.push(
      <li key={i}>
        <PendingItem />
      </li>
    );
  }
  return (
    <div>
      <ol>{arrayOfPending && arrayOfPending.map((node) => node)}</ol>
    </div>
  );
}

export default PendingItems;
