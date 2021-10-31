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
