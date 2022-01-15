import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    width: "75%",

    backgroundColor: "white",
  },

  image: {
    backgroundImage: `url(${"https://freepngimg.com/thumb/web_design/31748-9-coder-transparent.png"})`,
    height: "70vh",
    backgroundRepeat: "no-repeat",
    backgroundColor: "tomato",
    width: "30%",
    backgroundPosition: "center 80%",
    backgroundSize: "150px 150px",
    padding: "45px 35px",
    "& > *": {
      color: "#fff",
      fontWeight: 600,
    },
  },
  login: {
    padding: "25px 35px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    "& > *": {
      marginTop: 20,
    },
  },
  text: {
    color: "#2874f0",
    textAlign: "center",
    marginTop: 100,
  },
  loginText: {
    color: "#2874f0",
    textAlign: "center",
    marginTop: 10,
  },
  loginBtn: {
    backgroundColor: "#2874f0",
    color: "#fff",
    height: 48,
    borderRadius: 2,
  },
  signupBtn: {
    backgroundColor: "#fb641b",
    color: "#fff",
    height: 48,
    borderRadius: 2,
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarImg: {
    width: "3vmax",
    borderRadius: "100%",
  },
  avatarInput: {
    display: "flex",
    padding: "0%",
    "&:file-selector-button": {
      cursor: "pointer",
      width: "100%",
      zIndex: "2",
      height: "5vh",
      border: "none",
      margin: "0%",
      font: "400 0.8vmax",
      transition: "all 0.5s",
      padding: "0 1vmax",
      color: "rgba(0,0,0,0.623)",
      backgroundColor: "rgb(255,255,255)",
    },
  },
}));
