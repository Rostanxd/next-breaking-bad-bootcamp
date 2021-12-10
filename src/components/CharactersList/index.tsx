import CharacterItem from "../CharacterItem";
import styles from "./styles.module.css";
import Character from "../../../util/models";

type CharacterListProps = {
  characters: Character[],
}

const CharacterList = (props: CharacterListProps) => {
  const characters = props.characters;

  return (
    <>
      <p className={styles.title}>
        Characters
      </p>
      <div className={styles.grid}>
        {characters.map((character: Character) => {
          return (
            <CharacterItem
              key={character.char_id}
              character={character}
            />
          );
        })}
      </div>
    </>
  );
};

CharacterList.defaultProps = {
  characters: [],
}

export default CharacterList;
