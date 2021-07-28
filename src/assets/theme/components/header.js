const componentStyles = (theme) => ({
  header: {
    position: "relative",
    background:
      "linear-gradient(87deg," + theme.palette.info.main + ",#1171ef)",
    paddingBottom: "2rem",
    paddingTop: "8rem",
    [theme.breakpoints.up("md")]: {
      paddingTop: "8rem",
    },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
