import React from "react";
import { useAuth } from "./AuthContext";

const Favorites: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {user!.favorites.map((item) => (
          <li key={item._id}>
            <a href={`#${item._id}`}>{item.name}</a>
          </li>
        ))}
        <a href="#1"></a>
      </ul>
    </div>
  );
};

export default Favorites;
