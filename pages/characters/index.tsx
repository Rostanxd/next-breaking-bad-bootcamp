import {useEffect, useState} from "react";

import Config from "../../src/config";
import CharacterList from "../../src/components/CharactersList";

const breakingBadCharactersApi = `${Config.breakingBadBaseUrl}/characters`;

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(breakingBadCharactersApi)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setCharacters(data);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <CharacterList characters={characters}/>
    </>
  );
}

export default Characters;
