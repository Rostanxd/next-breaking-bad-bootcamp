interface Character {
  char_id: number,
  name: string,
  birthday: string,
  occupation: string[],
  img: string,
  status: string,
  nickname: string,
  appearance: any[],
  portrayed: string,
  category: any[]
  [key: string]: any,
}

export default Character;
