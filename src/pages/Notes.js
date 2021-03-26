import { Button, Container, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: { width: "600px", height: "auto" },
};

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
  fieldPadding: {
    padding: 10,
  },
  alignment: {
    textAlign: "center",
    marginBottom: "10",
  },
});

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
  return (
    <div className="note">
      {notes.map((note) => (
        <Container key={note.id}>
          <Box display="flex" justifyContent="center" className={classes.field}>
            <Box borderRadius="borderRadius" {...defaultProps}>
              <Typography
                className={classes.fieldPadding}
                variant="h5"
                component="h2"
                color="textSecondary"
                gutterBottom
              >
                {note.title}
              </Typography>
              <Typography
                className={classes.fieldPadding}
                variant="subtitle1"
                component="h3"
                color="textPrimary"
                style={{ textTransform: "capitalize" }}
              >
                {note.category}
              </Typography>
              <Typography
                className={classes.fieldPadding}
                variant="subtitle1"
                component="h3"
                color="textPrimary"
              >
                {note.details}
              </Typography>
            </Box>
          </Box>
        </Container>
      ))}
      <Container className={classes.alignment}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push("/create")}
        >
          Create
        </Button>
      </Container>
    </div>
  );
}
