import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function RTL({ children }) {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
}
