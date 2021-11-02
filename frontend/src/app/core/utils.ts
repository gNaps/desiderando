import * as moment from "moment";

export const getTime = (time: string) => {
  const date = new Date(time);
  return moment(date).format("DD/MM/YYYY");
};

export const getTimeFromNow = (time: string) => {
  const value: string = moment(time, "YYYY-MM-DDThh:mm:ss.sssZ").fromNow();
  const split = value.split(" ");
  if (split[0] === "an") split[0] = "1";
  return `${split[0] + split[1].charAt(0)}  ago`;
};

export const categories = [
  { id: 1, name: 'CATEGORY.VIDEOGAME'},
  { id: 2, name: 'CATEGORY.TRIP'},
  { id: 3, name: 'CATEGORY.BOOK'},
  { id: 4, name: 'CATEGORY.HOME'},
  { id: 5, name: 'CATEGORY.TECH'},
  { id: 6, name: 'CATEGORY.MOTORS'},
  { id: 7, name: 'CATEGORY.FASHION'},
  { id: 8, name: 'CATEGORY.OTHER'}
];
