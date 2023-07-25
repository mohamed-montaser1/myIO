import { TextInput } from "@/components/inputs";
import { AuthLayout } from "@/layouts";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
}));

export default function Login() {
  let classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component={"h1"} variant="h5" className={classes.heading}>
        <FormattedMessage id="title.login" />
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextInput
          required
          label="input.email"
          type="email"
          onChange={setEmail}
        />

        <TextInput
          required
          label="input.password"
          type="password"
          onChange={setPassword}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          <FormattedMessage id={"btn.continue"} />
        </Button>
      </form>
    </AuthLayout>
  );
}

function NoAccount() {
  return (
    <Typography align="center">
      <Link href="/register" passHref>
        <MuiLink variant="body2">
          <FormattedMessage id="dontHaveAccount" />
        </MuiLink>
      </Link>
    </Typography>
  );
}
