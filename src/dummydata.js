const start = new Date(2022, 6, 1);
const end = new Date();
const dummydata = [
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Laundry",
    desc: "washing all the white clothes",
    duedate: null,
    tags: ["work", "homework", "low priority"],
    status: "OPEN",
  },

  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Studies",
    desc: "doing maths homework",
    duedate: new Date("12/07/2022"),
    tags: ["work", "homework", "high priority"],
    status: "DONE",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Community work",
    desc: "going to the NGO",
    duedate: new Date("11/07/2022"),
    tags: ["volunteering", "low priority"],
    status: "OVERDUE",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Movies",
    desc: "watching doctor strange 2",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["leisure"],
    status: "OPEN",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Dance class",
    desc: "going to dance class",
    duedate: null,
    tags: [],
    status: "OPEN",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Visit",
    desc: "visiting grandma",
    duedate: null,
    tags: ["high priority"],
    status: "OVERDUE",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Visit",
    desc: "visiting sumit",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["leisure", "low priority"],
    status: "OPEN",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Workout",
    desc: "excercising for 2 hours",
    duedate: null,
    tags: ["work"],
    status: "WORKING",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "revising DSA",
    desc: "studing for interview",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["work", "high priority", "homework"],
    status: "DONE",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Cleaning",
    desc: "cleaning the room",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["home stuff"],
    status: "WORKING",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Dishes",
    desc: "doing dishes",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["home stuff"],
    status: "OVERDUE",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Seminar",
    desc: "attending web seminar",
    duedate: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    tags: ["work", "high priority"],
    status: "OPEN",
  },
  {
    key: Math.random(),
    timeStamp: new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    title: "Visit",
    desc: "visiting dewansh",
    duedate: null,
    tags: [],
    status: "OPEN",
  },
];
export default dummydata;
