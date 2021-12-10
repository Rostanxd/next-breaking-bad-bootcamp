import Character from "../../../util/models";
import Config from "../../../src/config";

const breakingBadCharactersApi = `${Config.breakingBadBaseUrl}/characters`;

import styles from "./styles.module.css";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "../../../src/components";

type CharacterItemProps = {
  character: Character,
  errorMessage: string,
}

const errorMessages = {
  default: "Ups, there was an error. Try it again later!",
  userDosNotExist: "Sorry it seems like this character does not exist!"
}

const Character = (props: CharacterItemProps) => {
  // Using useStatus to handle the status of the component
  // If you are using SSG or SSR, you read the value from `props`, otherwise this gonna be `undefined`
  const [character, setCharacter] = useState(props.character);
  const [loading, setLoading] = useState(typeof props.character === "undefined");
  const [errorMessage, setErrorMessage] = useState(props.errorMessage);

  // If you are not using SSG or SSR, you can get the character id
  // from the URL, for that you have to use useRouter to read the path parameter
  const router = useRouter();
  const query = router.query;
  const characterId = query.id;

  // Components
  const renderLoadingComponent = () => {
    return (
      <div className={styles.container}>
        <div style={{paddingTop: "5rem"}}>
          <LoadingSpinner/>
        </div>
      </div>
    );
  }

  const renderErrorMessage = () => {
    return (
      <div className={styles.container}>
        <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUOnXKnRL0jeo6y4_Nzt0RggJHYbxI_RjJUgCvmdG28BAwpAx"/>
        <span style={{fontStyle: "italic"}}>"Say my name!..."</span>
        <span style={{marginTop: "0.25rem"}}>- Walter White</span>
        <div className={styles.errorBox}>
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }

  const renderCharacterInfo = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{character.name}</h1>
        <img alt={character.name} src={character.img}/>
        <table className={styles.infoTable} cellSpacing={0} cellPadding={0}>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Occupations</td>
            <td>
              <span>{character.occupation.join(", ")}</span>
            </td>
          </tr>
          <tr>
            <td>Birthday</td>
            <td><span>{character.birthday}</span></td>
          </tr>
          <tr>
            <td>Status</td>
            <td><span>{character.status}</span></td>
          </tr>
          <tr>
            <td>Nickname</td>
            <td><span>{character.nickname}</span></td>
          </tr>
        </table>
      </div>
    );
  }

  //  The purpose of this useEffect is handle the state of the component
  useEffect(() => {
    // If the `characterId` exist in params and the `character` is undefined
    //  that means we are not rendering from the server, and the api needs to be called
    //  from the client-side
    if (!!characterId && typeof character === "undefined") {
      fetch(`${breakingBadCharactersApi}/${characterId}`)
        .then((request) => {
          if (request.status === 200) {
            request.json()
              .then((data) => {
                const character = data?.[0] ?? {char_id: 0};
                setCharacter(character);
                setLoading(false);
                if (character.char_id === 0) {
                  setErrorMessage(errorMessages.userDosNotExist);
                }
              })
              .catch((error) => {
                setLoading(false);
                setErrorMessage(errorMessages.default);
                console.error("There was an error", error);
              });
          } else {
            setLoading(false);
            setErrorMessage(errorMessages.default);
          }
        })
        .catch((error) => {
          console.error("There was an error", error);
          setErrorMessage(errorMessages.default);
          setLoading(false);
        });
    }
  }, [characterId]);

  return (
    <>
      {
        // Here we are loading...
        loading && renderLoadingComponent()
      }
      {
        // We got an error...
        !loading &&
        !!errorMessage &&
        renderErrorMessage()
      }
      {
        // Otherwise we render the character info component!!
        !loading &&
        character.char_id !== 0 &&
        renderCharacterInfo()
      }
    </>
  );
}


/*
  Uncomment the function `getServerSideProps` if you want to use SSR (Server Side rendering).
  Don't uncomment the @ts-ignore flag above the function
*/
// @ts-ignore
// export async function getServerSideProps({params}) {
//   const req = await fetch(`${breakingBadCharactersApi}/${params.id}`);
//   const data = await req.json();
//   // const character = data.length > 0 ? data[0] : {};
//
//   // If the user does not exist we are sending a char_id as 0,
//   // and a prop called `errorMessage` to display a message in the page.
//   const character = data?.[0] ?? {char_id: 0};
//
//   return {
//     props: {
//       character: character,
//       errorMessage: character.char_id === 0 ? errorMessages.userDosNotExist : "",
//     }
//   };
// }

/*
  Uncomment the functions `getStaticProps` and `getStaticPaths` if you want to use SSG (Server Static Generation).
  Don't uncomment the @ts-ignore flag above the function

  Note that using SSG, we cannot send the error message if the user does not exist, this because
  the pages are created statically based in the ALL possible paths.
  To handle this problem we could customize the 404 page.
*/
// // @ts-ignore
// export async function getStaticProps({params}) {
//   const req = await fetch(`${breakingBadCharactersApi}/${params.id}`);
//   const data = await req.json();
//   // const character = data.length > 0 ? data[0] : {};
//   const character = data?.[0] ?? {};
//
//   return {
//     props: {
//       character: character,
//     }
//   };
// }

// export async function getStaticPaths() {
//   const req = await fetch(breakingBadCharactersApi);
//   const data = await req.json();
//   //  Getting all the dynamic paths
//   const paths = data.map((character: Character) => {
//     return {
//       params: {
//         id: character.char_id.toString(),
//       }
//     };
//   });
//
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default Character;
