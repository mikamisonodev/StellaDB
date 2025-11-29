import { heroui } from "@heroui/theme";

import dark from "./theme/dark";
import layout from "./theme/layout";
import light from "./theme/light";

export default heroui({
    themes: {
        light: { colors: light },
        dark: { colors: dark },
    },
    layout: layout,
});
