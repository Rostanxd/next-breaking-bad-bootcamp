import Character from "../../../util/models";
import styles from "./styles.module.css";

type CharacterItemProps = {
  character: Character,
}

const CharacterItem = (props: CharacterItemProps) => {
  const character = props.character;

  return (
    <a href={`/characters/${character.char_id}`} className={styles.card}>
      <h2 style={{marginBottom: '2rem'}}>{character.name} &rarr;</h2>
      <div className={styles.imagePortrait}>
        <img src={character.img} alt="Avatar"/>
      </div>
      <div className={styles.cardFooter}>
      {
        character.occupation.slice(0, 1).map((occupation) => {
          return (
            <p style={{textAlign: 'center'}}>{occupation}</p>
          );
        })
      }
      </div>
    </a>
  );
}

CharacterItem.defaultProps = {
  character: {
    img: "https://es.web.img3.acsta.net/pictures/18/04/04/22/52/3191575.jpg",
    name: "N/A",
    occupation: [""],
  },
}

export default CharacterItem;
